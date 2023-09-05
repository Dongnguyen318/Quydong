function total(str, ...args) {
  for (var value of args) {
    value = +value;
    if (!isNaN(value) && value !== isFinite && typeof value === "number") {
      str += value;
    } else {
      return "dữ liệu truyền vào không hợp lệ";
    }
  }
  return str;
}

console.log(total(2, 3, 4, "1"));
