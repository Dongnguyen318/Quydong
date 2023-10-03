var btnPrimary = document.querySelector(".btn-primary");
var collapse = document.querySelector(".collapse");

btnPrimary.addEventListener("click", function () {
  collapse.classList.toggle("show");
  if (collapse.classList.contains("show")) {
    document.addEventListener("click", function (e) {
      if (!collapse.contains(e.target) && !btnPrimary.contains(e.target)) {
        collapse.classList.remove("show");
      }
    });
  }
});

var btnBold = document.querySelector(".btn-bold");
var btnItalic = document.querySelector(".btn-italic");
var btnUnderline = document.querySelector(".btn-underline");
var btnColor = document.querySelector("#color");

btnColor.addEventListener("change", function () {
  document.execCommand("foreColor", false, this.value);
});

btnBold.addEventListener("click", function () {
  document.execCommand("bold", false, null);
});
btnItalic.addEventListener("click", function () {
  document.execCommand("italic", false, null);
});
btnUnderline.addEventListener("click", function () {
  document.execCommand("underline", false, null);
});

var content = document.querySelector(".content");
var countChars = document.querySelector(".count-char");
var countWords = (document = document.querySelector(".count-word"));
content.addEventListener("input", function () {
  if (countWords) {
    countWords.innerText = `Số từ: ${this.innerText.split(" ").length}`;
  }
  if (countChars) {
    countChars.innerText = `Số ký tự: ${this.innerText.length}`;
  }
});

var btnNew = document.querySelector(".btn-new");
var btnTxt = document.querySelector(".btn-txt");
var btnPdf = document.querySelector(".btn-pdf");
var valueInput = document.querySelector(".value-input");
console.log(valueInput.value);
btnNew.addEventListener("click", function () {
  valueInput.value = "";
  content.innerHTML = "";
  countWords.innerText = `Số từ: 0`;
  countChars.innerText = `Số ký tự: 0`;
  collapse.classList.remove("show");
});

btnTxt.addEventListener("click", function (e) {
  const blob = new Blob([content.textContent]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${valueInput.value}.txt`;
  link.click();
});

btnPdf.addEventListener("click", function (e) {
  html2pdf(content).save(valueInput.value);
});
