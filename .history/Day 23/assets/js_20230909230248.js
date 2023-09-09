//hiển thị form đăng nhập (popup) và lớp overlay
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
//reset khi click vào overlay
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
});

//Chuyển form đăng nhập sang form đăng ký và ngược lại. Làm mới value và loại bỏ thông báo lỗi
registerBtn.addEventListener("click", function () {
  registerBtn.classList.add("active-title");
  loginBtn.classList.remove("active-title");
  registerForm.classList.add("form-active");
  loginForm.classList.remove("form-active");
  //reset value
  inputs.forEach(function (input) {
    input.value = "";
  });
  //reset alert
  inputBoxs.forEach(function (inputBox) {
    var input = inputBox.querySelector("input");
    var error = inputBox.querySelector(".error");
    input.style.borderColor = "#ddd";
    error.classList.remove("active-error");
  });

  formBox.forEach(function (formBox) {
    var form = formBox.querySelector("form");
    var errors = form.querySelector(".error");
    errors.classList.remove("active-alert");
  });
});

loginBtn.addEventListener("click", function () {
  registerBtn.classList.remove("active-title");
  loginBtn.classList.add("active-title");
  registerForm.classList.remove("form-active");
  loginForm.classList.add("form-active");
  //reset value
  inputs.forEach(function (input) {
    input.value = "";
  });
});
