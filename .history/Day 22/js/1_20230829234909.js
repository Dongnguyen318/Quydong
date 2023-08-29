function sum(...args) {
  var total;
  var number = args.every((el) => {
    return typeof el === "number" && el != NaN && el != Infinity;
  });
  if (number) {
    total = args.reduce((first, el) => {
      return first + el;
    });
    return total;
  } else {
    return ` Dữ liệu đầu vào không phải là số`;
  }
}
console.log("result: ", sum(4, 2, -93));
