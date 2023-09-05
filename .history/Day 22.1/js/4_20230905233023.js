Array.prototype.filter2 = function (callback) {
  var filteredArray = [];
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      filteredArray.push(this[i]);
    }
  }
};

var numbers = [1, 2, 3, 4, 5, 6];
var getOddNum = numbers.filter2(function (Number) {
  return Number % 2 !== 0;
});

console.log(getOddNum);
