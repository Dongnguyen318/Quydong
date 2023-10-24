const timeQuiz = document.querySelector(".quiz-wrapper .quiz__time");
const runTimeQuiz = document.querySelector(".quiz__run-time");
const quizActionSentence = document.querySelector(".quiz__action-sentence");
const stopBlock = document.querySelector(".quiz__stop");
const btnPlay = document.querySelector(".quiz__stop .btn-play-again");
const stopScore = document.querySelector(".quiz__stop-score span");
const incorrectAnswer = document.querySelector(".quiz__incorrect span");
const correctAnswer = document.querySelector(".quiz__correct span");
const quizStatus = document.querySelector(".quiz__status");
const quizStart = document.querySelector(".quiz__start");
const btnStart = document.querySelector(".quiz__start .btn-start");
const audio = document.querySelector("audio");
const audioWrong = document.querySelector("#wrongAnswer");
const audioRight = document.querySelector("#rightAnswer");

import { client } from "./clients.js";
const totalTime = 10;
let startTime = 0;
var i = 0;
let scorePlayer = 0,
  incorrect = 0,
  correct = 0,
  check = false;

/*Start */
const handleStart = () => {
  correctAnswer.innerText = "0";
  scorePlayer = 0;
  incorrect = 0;
  correct = 0;
  i = 0;
  quizStart.style.display = "block";
  btnStart.addEventListener("click", () => {
    let second = 0;
    var intervalId = setInterval(function () {
      second += 1;
      btnStart.innerText = second;
    }, 1000);

    setTimeout(function () {
      clearInterval(intervalId);
      quizStart.style.display = "none";
      btnStart.innerText = "Start";
      audio.play();
    }, 4000);

    getData(0);
  });
};

handleStart();

const getData = async (i) => {
  console.log(i);
  const { data: questions } = await client.get(`/questions`);
  quizStatus.style.background = "transparent";
  quizStatus.innerText = "";
  const n = questions.length;
  if (i === 0) {
    incorrectAnswer.innerText = n;
  }
  if (i >= n) {
    audio.pause();
    i = 0;
    stopBlock.style.display = "block";
  }
  const sen = `${i + 1}/${n}`;
  quizActionSentence.innerText = sen;
  render(questions[i], n);
};

const handleTime = () => {
  startTime = 0;
  function animate(time) {
    console.log("time: ", time);
    if (!startTime) {
      startTime = time;
    }
    const elapsedTime = time - startTime;
    const progress = elapsedTime / (totalTime * 1000);
    runTimeQuiz.style.width = progress * 100 + "%";

    if (elapsedTime < totalTime * 1000) {
      requestAnimationFrame(animate);
    } else {
      i++;
      startTime = 0;
      getData(i);
    }
  }
  requestAnimationFrame(animate);
};

// getData(0);

const quizWrapper = document.querySelector(".quiz-wrapper");
const container = quizWrapper.querySelector(".quiz-wrapper .container");
const score = quizWrapper.querySelector(".quiz__action-score span");
const rateStop = document.querySelector(".quiz__stop-rate-correct");
console.log(rateStop);

const render = (data, n) => {
  const html = `
    <div class="quiz__question">
        <div class="quiz__title">${data.question}</div>
        <div class="quiz__list-answer">
            ${data.answer
              .map(
                (value, index) =>
                  `<div class="quiz__answer" data-index="${index}">${value.text}</div>`
              )
              .join("")}
        </div>
    </div>
`;
  container.innerHTML = html;
  handleTime();
  const quizAnswers = quizWrapper.querySelector(".quiz__list-answer");
  const list = quizWrapper.querySelectorAll(".quiz__answer");
  quizAnswers.addEventListener("click", (e) => {
    const dataIndex = e.target.dataset.index;
    if (dataIndex !== undefined) {
      if (+dataIndex !== +data.key) {
        audioWrong.play();
        quizStatus.style.background = "#ff3535";
        quizStatus.innerText = "incorrect";
        e.target.style.background = "#ff3535";
        // list[data.key].style.background = "green";
        list.forEach((value, index) => {
          if (index == +data.key) {
            value.style.background = "#46cb18";
          } else if (index !== +dataIndex) {
            value.style.visibility = "hidden";
          }
        });
        const random = Math.floor(Math.random() * (200 - 0) + 1);
        if (scorePlayer - random > 0) {
          scorePlayer -= random;
        }
        score.innerText = `${scorePlayer}`;
        quizAnswers.style.pointerEvents = "none";
        i++;
        setTimeout(() => {
          audioWrong.pause();
          audioWrong.currentTime = 0;
          getData(i);
        }, 1500);
      } else {
        audioRight.play();
        quizStatus.style.background = "#46cb18";
        quizStatus.innerText = "correct";
        correct++;
        e.target.style.background = "#46cb18";
        list.forEach((value, index) => {
          if (index !== +data.key) {
            value.style.visibility = "hidden";
          }
        });
        scorePlayer += Math.floor(Math.random() * (2001 - 1000) + 1000);
        score.innerText = `${scorePlayer}`;
        quizAnswers.style.pointerEvents = "none";
        i++;
        setTimeout(() => {
          audioRight.pause();
          audioRight.currentTime = 0;
          getData(i);
        }, 1500);
      }
    }
    handleEnd(scorePlayer, n, correct);
  });
};
