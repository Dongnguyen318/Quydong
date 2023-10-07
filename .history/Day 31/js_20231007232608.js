const count = document.querySelector(".count");
const btn = document.querySelector(".btn");

let timer = 0;
const INTEVAL = 1000;
let countNumber = 10;
let isDisabled = false;

const countDown = function (timestamp) {
  if (timestamp >= timer) {
    countNumber--;
    count.innerText = countNumber;
    timer = timestamp + INTEVAL;
  }
  if (countNumber > 0) {
    requestAnimationFrame(countDown);
  }

  if (countNumber === 0) {
    isDisabled = true;
    btn.removeAttribute("disabled");
  }

  btn.addEventListener("click", function () {
    if (isDisabled) {
      window.location.href = "https://www.facebook.com/tintucvtv24";
    }
  });
};

countDown();
