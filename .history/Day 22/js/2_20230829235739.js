var price = 120000;
Number.prototype.getCurrency = function (unit) {
  return this.toLocaleString() + ` ${unit}`;
};
console.log(price.getCurrency("đ"));
