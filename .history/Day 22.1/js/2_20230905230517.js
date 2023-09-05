var price = 100000;
Number.prototype.getCurrency = function (unit) {
  return (
    this.toLocaleString("ja-JP", { style: "currency", currency: "JPY" }) +
    ` ${unit}`
  );
};
console.log(price.getCurrency("đ"));
