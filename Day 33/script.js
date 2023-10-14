const result = document.querySelector(".result");
const btn = document.querySelector(".btn");
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = "vi-VN";
let searchStatus = ""; // Biến lưu
//Các thông báo hành động
const actions = {
  google: {
    url: "https://www.google.com",
    message: "Đang thực hiện tìm kiếm Google...",
  },
  facebook: {
    url: "https://www.facebook.com",
    message: "Đang thực hiện tìm kiếm Facebook...",
  },
  youtube: {
    url: "https://www.youtube.com",
    message: "Đang thực hiện tìm kiếm YouTube...",
  },
  "google drive": {
    url: "https://drive.google.com",
    message: "Đang thực hiện tìm kiếm Google Drive...",
  },
  "google maps": {
    url: "https://maps.google.com",
    message: "Đang thực hiện tìm kiếm Bản đồ Google...",
  },
  "bản đồ": {
    url: "https://maps.google.com",
    message: "Đang thực hiện tìm kiếm Bản đồ Google...",
  },
};

function openUrl(url) {
  if (url) {
    window.open(url, "_blank");
  }
}

function showExecutingMessage(message) {
  result.textContent = message;
  searchStatus = message; // Cập nhật trạng thái tìm kiếm
}

function handleDirections(input) {
  const url = `https://maps.google.com/maps?q=${encodeURIComponent(input)}`;
  openUrl(url);
}

function handleMusic(input) {
  const url = `https://zingmp3.vn/tim-kiem/bai-hat.html?q=${encodeURIComponent(
    input
  )}`;
  openUrl(url);
}

function handleVideo(input) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    input
  )}`;
  openUrl(url);
}

btn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  let action = "default";

  for (const keyword in actions) {
    if (transcript.includes(keyword)) {
      action = keyword;
      break;
    }
  }

  switch (action) {
    case "default":
      showExecutingMessage("Không thực hiện được yêu cầu");
      break;
    case "google":
    case "facebook":
    case "youtube":
    case "google drive":
    case "google maps":
      const { url, message } = actions[action];
      showExecutingMessage(message);
      openUrl(url);
      break;
    default:
      showExecutingMessage("Không thực hiện được yêu cầu");
  }
};

recognition.onend = () => {
  // trang thái tìm kiếm khí kết thúc
  result.textContent = searchStatus;
};
