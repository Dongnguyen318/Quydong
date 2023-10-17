Array.prototype.filter2 = function (callback) {
  var filteredArray = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      filteredArray.push(this[i]);
    }
  }
  return filteredArray;
};

var numbers = [1, 2, 3, 4, 5, 6];
var getOddNum = numbers.filter2(function (num) {
  return num % 2 !== 0;
});

console.log(getOddNum);
