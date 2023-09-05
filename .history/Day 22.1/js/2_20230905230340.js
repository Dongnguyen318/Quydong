var price = 100000;
Number.prototype.getCurrency = function (unit) {
  return this.toLocaleString("ar-EG") + ` ${unit}`;
};
console.log(price.getCurrency("đ"));
