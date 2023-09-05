Array.prototype.filter2 = function (callback) {
  const filteredArray = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      filteredArray.push(this[i]);
    }
  }
  return filteredArray;
};

const numbers = [1, 2, 3, 4, 5, 6];
const getEvenNum = numbers.filter2(function (num) {
  return num % 2 === 0;
});

console.log(getEvenNum);
