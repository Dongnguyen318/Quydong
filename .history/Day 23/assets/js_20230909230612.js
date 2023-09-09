//hiển thị form đăng nhập (popup) và lớp overlay
var btn = document.querySelector(".btn");
var popup = document.querySelector(".popup");
var overlay = document.querySelector(".overlay");

var inputs = document.querySelectorAll("input");

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
