var listNumber = [1, 5, 1, 3, 2, 3, 6, 10];

if (listNumber.length !== 0) {
  var result = listNumber.filter((value, index) => {
    return listNumber.indexOf(value) === index;
  });
} else {
  console.log("Không có phần tử nào trong mảng trùng nhau");
}

console.log(result);
