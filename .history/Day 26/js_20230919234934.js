//Tạo element
var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");
var progressWidth = progressBar.clientWidth;
var progressBarWidth = progressBar.clientWidth;

var isDrag = false;
var initialClientX = 0;
var current = 0;
var currentWidth = 0;

var handleChange = function (width) {
  var value = (width * 100) / progressBarWidth;
  if (value < 0) {
    value = 0;
  }

  if (value > 100) {
    value = 100;
  }

  progress.style.width = `${value}%`;
  currentWidth = width;
};

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    handleChange(e.offsetX);
    isDrag = true;
    initialClientX = e.clientX;
    current = e.offsetX;
  }
});

progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  isDrag = true;
  initialClientX = e.clientX;
});

document.addEventListener("mouseup", function () {
  isDrag = false;
  current = currentWidth;
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    // console.log(e.clientX);
    var moveWidth = e.clientX - initialClientX;
    handleChange(current + moveWidth);
    //moveWidth chỉ là khoảng kéo thêm
  }
});

var audio = document.querySelector("audio");
var currentTimeEl = progressBar.previousElementSibling;
var durationEl = progressBar.nextElementSibling;

var playBtn = document.querySelector(".player .play-btn");

var playIcon = `<i class="fa-regular fa-circle-play"></i>`;
var pauseIcon = `<i class="fa-regular fa-circle-pause"></i>`;
var getTime = function (second) {
  var min = Math.floor(second / 60);
  var sec = Math.floor(second % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};
// Lắng nghe sự kiện loaded data -> khi nào file audio tải xong

audio.addEventListener("loadeddata", function () {
  durationEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  } else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});
audio.addEventListener("timeupdate", function () {
  currentTimeEl.innerText = getTime(audio.currentTime);
  var percent = (audio.currentTime * 100) / audio.duration;
  progress.style.width = `${percent}%`;
});
audio.addEventListener("pause", function () {
  playBtn.innerHTML = playIcon;
});
audio.addEventListener("play", function () {
  playBtn.innerHTML = pauseIcon;
});

var timePlaying = document.querySelector("time-playing");
progressBar.addEventListener("mousemove", function (e) {
  timePlaying.style.opacity = 1;
  var positionTimePlaying = e.offsetX;
  var timePlay = (positionTimePlaying / progressWidth) * audio.duration;
  timePlaying.style.left = `${
    positionTimePlaying - timePlaying.clientWidth / 2
  }px`;
  timePlaying.innerText = getTime(timePlay);
});

progressBar.addEventListener("mouseout", function () {
  timePlaying.style.opacity = 0;
});
