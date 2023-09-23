const productList = document.querySelector(".product-list");
const productListTable = productList.querySelector(".product-list-table");
const cartList = document.querySelector(".cart-list");
const cartListTable = cartList.querySelector(".cart-list-table");
const editBtn = cartList.querySelector(".edit-btn");

// tạo sản phẩm trong bảng
let arrProducts = [
  { productName: "Sản phẩm 1", price: 1000 },
  { productName: "Sản phẩm 2", price: 2000 },
  { productName: "Sản phẩm 3", price: 3000 },
  { productName: "Sản phẩm 4", price: 4000 },
];

arrProducts.forEach(function (element, index) {
  let tableRow = document.createElement("tr");
  tableRow.innerHTML = `
    <td>${index + 1}</td>
    <td>${element.productName}</td>
    <td>${element.price}</td>
    <td>
        <input type="number">
        <button class="add-btn">Thêm vào giỏ</button>
    </td>
    `;
  productListTable.children[1].append(tableRow);
});

let listInput = productListTable.querySelectorAll("input");

listInput.forEach(function (element) {
  element.value = 1;
});

// thêm sản phẩm vào list

function getParentElement(childElement, level = 1) {
  while (level > 0) {
    childElement = childElement.parentElement;
    level--;
  }
  return childElement;
}

let target,
  rowProduct,
  productQuantity,
  objectInfoItem,
  bodyCartTable,
  dataCartItem,
  rowCartTotal;
let arrCartProduct = [];
let innerEditBtn = `
<hr>
<button class="update-cart-btn">Cập nhật giỏ hàng</button>
<button class="delete-cart-btn">Xóa giỏ hàng</button>`;

if (localStorage.getItem("cart"))
  arrCartProduct = JSON.parse(localStorage.getItem("cart"));

document.addEventListener("DOMContentLoaded", function () {
  if (arrCartProduct.length > 0) {
    cartListTable.previousElementSibling.style.display = "none";
    cartListTable.innerHTML = `
        <thead>
            <tr>
                <th width="5%">STT</th>
                <th width="30%">Tên sản phẩm</th>
                <th width="20%">Giá</th>
                <th width="20%">Số lượng</th>
                <th width="20%">Thành tiền</th>
                <th width="5%">Xóa</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="3">Tổng</td>
                <td></td>
                <td colspan="2"></td>
            </tr>
        </tbody>`;

    bodyCartTable = cartListTable.children[1];
    rowCartTotal = bodyCartTable.querySelector("tr:last-child");

    for (let i = 0; i < arrCartProduct.length; i++) {
      let rowCartItem = document.createElement("tr");
      dataCartItem = `
            <td>${i + 1}</td>
            <td>${arrCartProduct[i].name}</td>
            <td>${arrCartProduct[i].price}</td>
            <td><input type="number" value="${
              arrCartProduct[i].quantity
            }" class="input-cart"></td>
            <td>${arrCartProduct[i].perTotal}</td>
            <td><button class="delete-btn">Xóa</button></td>`;
      rowCartItem.innerHTML = dataCartItem;
      bodyCartTable.insertBefore(rowCartItem, rowCartTotal);

      rowCartTotal.children[1].innerText =
        +rowCartTotal.children[1].innerText + +arrCartProduct[i].quantity;
      rowCartTotal.children[2].innerText =
        +rowCartTotal.children[2].innerText + +arrCartProduct[i].perTotal;

      editBtn.innerHTML = innerEditBtn;
    }
  }
});

productListTable.addEventListener("click", function (e) {
  target = e.target;

  if (target.classList.contains("add-btn")) {
    rowProduct = getParentElement(target, 2);
    productQuantity = +target.previousElementSibling.value;

    if (productQuantity && productQuantity > 0) {
      if (arrCartProduct.length === 0) {
        cartListTable.previousElementSibling.style.display = "none";
        cartListTable.innerHTML = `
                <thead>
                    <tr>
                        <th width="5%">STT</th>
                        <th width="30%">Tên sản phẩm</th>
                        <th width="20%">Giá</th>
                        <th width="20%">Số lượng</th>
                        <th width="20%">Thành tiền</th>
                        <th width="5%">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3">Tổng</td>
                        <td></td>
                        <td colspan="2"></td>
                    </tr>
                </tbody>`;
      }
      bodyCartTable = cartListTable.children[1];
      rowCartTotal = bodyCartTable.querySelector("tr:last-child");

      let nameCartItem = rowProduct.children[1].innerText;
      let priceCartItem = rowProduct.children[2].innerText;
      let quantityCartItem = rowProduct.children[3].firstElementChild.value;
      let perTotalCartItem = +priceCartItem * +quantityCartItem;

      objectInfoItem = {
        name: nameCartItem,
        price: priceCartItem,
        quantity: quantityCartItem,
        perTotal: perTotalCartItem,
      };

      arrCartProduct.push(objectInfoItem);

      if (arrCartProduct.length > 1) {
        for (let i = 0; i < arrCartProduct.length; i++) {
          let check = false;
          for (let j = i + 1; j < arrCartProduct.length; j++) {
            if (arrCartProduct[i].name === arrCartProduct[j].name) {
              arrCartProduct[i].quantity =
                +arrCartProduct[i].quantity + +arrCartProduct[j].quantity;
              arrCartProduct[i].perTotal =
                +arrCartProduct[i].quantity * +arrCartProduct[i].price;
              arrCartProduct.splice(j, 1);
              check = true;
              break;
            }
          }
          if (check) break;
        }
      }

      bodyCartTable.innerHTML = `
            <tbody>
                <tr>
                    <td colspan="3">Tổng</td>
                    <td>0</td>
                    <td colspan="2">0</td>
                </tr>
            </tbody>`;
      rowCartTotal = bodyCartTable.querySelector("tr:last-child");

      localStorage.setItem("cart", JSON.stringify(arrCartProduct));
      arrCartProduct = arrCartProduct = JSON.parse(
        localStorage.getItem("cart")
      );
      for (let i = 0; i < arrCartProduct.length; i++) {
        let rowCartItem = document.createElement("tr");
        dataCartItem = `
                <td>${i + 1}</td>
                <td>${arrCartProduct[i].name}</td>
                <td>${arrCartProduct[i].price}</td>
                <td><input type="number" value="${
                  arrCartProduct[i].quantity
                }" class="input-cart"></td>
                <td>${arrCartProduct[i].perTotal}</td>
                <td><button class="delete-btn">Xóa</button></td>`;
        rowCartItem.innerHTML = dataCartItem;
        bodyCartTable.insertBefore(rowCartItem, rowCartTotal);

        rowCartTotal.children[1].innerText =
          +rowCartTotal.children[1].innerText + +arrCartProduct[i].quantity;
        rowCartTotal.children[2].innerText =
          +rowCartTotal.children[2].innerText + +arrCartProduct[i].perTotal;
      }

      editBtn.innerHTML = innerEditBtn;
    }
  }
});
// xoá sản phẩm
