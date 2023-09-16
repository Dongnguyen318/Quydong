var carousel = document.querySelector(".carousel");
var carouselInner = document.querySelector(".carousel-inner");
var carouselNav = document.querySelector(".carousel-nav");
var navNext = document.querySelector(".next");
var navPrev = document.querySelector(".prev");
var carouselItems = document.querySelectorAll(".item");
var carouselDots = document.querySelector(".carousel-dots");
var position = 0;
var htmlDots = "";
//   Bước 1 : Tính toán số lượng ảnh
var carouselItems = carouselInner.querySelectorAll(".item");

if (carouselItems.length) {
  // Xử lý
  // Lấy chiều rộng của 1 item
  var itemWidth = carouselInner.clientWidth; // Trả về chiều rộng của element

  // Tính tổng chiểu rộng các item
  var totalWidth = itemWidth * carouselItems.length;

  //Cập nhật css cho carouse-inner
  carouselInner.style.width = `${totalWidth}px`;

  //Xử lý khi ấn vào dot

  // Tự động thêm thẻ span vào html của class  số lượng tương ứng với các item
  carouselItems.forEach(function (index) {
    htmlDots += `<span class="item-dot" data-index="${index}"></span>`;
    carouselDots.innerHTML = htmlDots;
  });

  // Thêm active cho thẻ con đầu tiên
  carouselDots.firstChild.classList.add("active-dot");

  var itemDots = document.querySelectorAll(".item-dot");

  var index = 0;
  var activeDots = function () {
    itemDots.forEach(function (item) {
      item.classList.remove("active-dot");
    });
    itemDots[index].classList.add("active-dot");
  };
  itemDots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      index = parseInt(this.getAttribute("data-index"));
      console.log(index);
      position = -index * itemWidth;
      carouselInner.style.translate = `${position}px`;
      activeDots();
    });
  });

  // Xử lý chuyển slide khi ấn vào nút next

  navNext.addEventListener("click", function () {
    if (Math.abs(position) < totalWidth - itemWidth) {
      position -= itemWidth;
      carouselInner.style.translate = `${position}px`;
      index++;
      activeDots();
    }
  });
  navPrev.addEventListener("click", function () {
    if (position < 0) {
      position += itemWidth;
      carouselInner.style.translate = `${position}px`;
      index--;
      activeDots();
    }
  });
}
