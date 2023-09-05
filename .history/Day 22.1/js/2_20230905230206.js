var price = 100000;
Number.prototype.getCurrency = function (unit) {
  return this.toLocaleString(vi) + ` ${unit}`;
};
console.log(price.getCurrency("đ"));
