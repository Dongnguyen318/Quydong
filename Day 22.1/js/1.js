function total(str, ...args) {
  for (var value of args) {
    value = +value;
    if (!isNaN(value) && value !== isFinite && typeof value === "number") {
      str += value;
    } else {
      return "Dữ liệu không hợp lệ";
    }
  }
  return str;
}

console.log(total(5, 3, 2, "a"));
