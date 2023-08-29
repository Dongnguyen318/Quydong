const price = 120000;
Number.prototype.getCurrency = function (unit) {
  return this.toLocaleString("de-DE") + ` ${unit}`;
};
console.log(price.getCurrency("a"));
