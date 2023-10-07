const count = document.querySelector(".count");
const btn = document.querySelector(".btn");

let timer = 0;
const INTEVAL = 1000;
let countNumber = 30;
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
      window.location.href = "https://fullstack.edu.vn/";
    }
  });
};

countDown();
