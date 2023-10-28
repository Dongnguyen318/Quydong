var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");
var timePlaying = progressBar.querySelector(".time-playing");

// tinh khoang cach di chuyen con chuot bang clientX
var initialClientX = 0;

var progressBarWidth = progressBar.clientWidth;
var progressWidth = progressBar.clientWidth;
var isDrag = false;
var currentWidth;
var current = 0;
var initialTime = 0;

var handleChange = function (width) {
  var value = (width * 100) / progressBarWidth;
  progress.style.width = `${value}%`;
  currentWidth = width;

  if (value < 0) {
    value = 0;
  }

  if (value > 100) {
    value = 100;
  }
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

document.addEventListener("mouseup", function (e) {
  isDrag = false;
  var current = currentWidth;
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var moveWidth = e.clientX - initialClientX;
    handleChange(current + moveWidth);
    if (timePlay < 0) {
      timePlay = 0;
    } else if (timePlay > audio.duration) {
      timePlay = audio.duration;
    }
  }
});

// Xay dung trinh phat nhac
var audio = document.querySelector("audio");
var playBtn = document.querySelector(".play-btn");
var currentTimeEl = progressBar.previousElementSibling;
var durationEl = progressBar.nextElementSibling;
var getTime = function (seconds) {
  var mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
var playIcon = `<i class="fa-solid fa-play"></i>`;
playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  } else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});
// hien thoi gian khi di chuyen chuot
progressBar.addEventListener("mousemove", function (e) {
  timePlaying.style.opacity = 1;
  var positionTimePlaying = e.offsetX;
  var timePlay = (positionTimePlaying / progressWidth) * audio.duration;
  timePlaying.style.left = `${
    positionTimePlaying - timePlaying.clientWidth / 2
  }px`;
  timePlaying.innerText = getTime(timePlay);
});
// tat hien thoi gian khi blur ra khoi progressBar
progressBar.addEventListener("mouseout", function () {
  timePlaying.style.opacity = 0.5;
});
// hien tong thoi gian bai hat
audio.addEventListener("loadeddata", function () {
  durationEl.innerText = getTime(audio.duration);
});
// Xu ly phat lai tu dau khi het bai hat
audio.addEventListener("ended", function () {
  audio.pause();
  playBtn.innerHTML = playIcon;
  audio.currentTime = 0;
  progress.style.width = 0;
});
