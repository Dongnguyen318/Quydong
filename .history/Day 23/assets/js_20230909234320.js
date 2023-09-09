//hiển thị form đăng nhập
var btn = document.querySelector(".btn");
var popup = document.querySelector(".popup");
var overlay = document.querySelector(".overlay");

var inputs = document.querySelectorAll("input");
var inputBoxs = document.querySelectorAll(".input-box");

var loginForm = document.querySelector(".form--login");
var registerForm = document.querySelector(".form--register");
var loginBtn = document.querySelector(".btn-login");
var registerBtn = document.querySelector(".btn-register");

btn.addEventListener("click", function () {
  popup.classList.toggle("actives");
  overlay.classList.toggle("actives");
});
// reset khi ấn ra ngoài form
overlay.addEventListener("click", function () {
  popup.classList.toggle("actives");
  overlay.classList.toggle("actives");

  registerBtn.classList.remove("active-title");
  loginBtn.classList.add("active-title");
  registerForm.classList.remove("form-active");
  loginForm.classList.add("form-active");
  inputs.forEach(function (input) {
    input.value = "";
  });

  formBox.forEach(function (formBox) {
    var form = formBox.querySelector("form");
    var errors = form.querySelector(".error");
    errors.classList.remove("active-alert");
  });
});

//Chuyển form đăng nhập sang form đăng ký
registerBtn.addEventListener("click", function () {
  registerBtn.classList.add("active-title");
  loginBtn.classList.remove("active-title");
  registerForm.classList.add("form-active");
  loginForm.classList.remove("form-active");
  //reset
  inputs.forEach(function (input) {
    input.value = "";
  });
  inputBoxs.forEach(function (inputBox) {
    var input = inputBox.querySelector("input");
    input.style.borderColor = "#ddd";
  });

  formBox.forEach(function (formBox) {
    var form = formBox.querySelector("form");
  });
});
loginBtn.addEventListener("click", function () {
  registerBtn.classList.remove("active-title");
  loginBtn.classList.add("active-title");
  registerForm.classList.remove("form-active");
  loginForm.classList.add("form-active");
  inputs.forEach(function (input) {
    input.value = "";
  });
});
