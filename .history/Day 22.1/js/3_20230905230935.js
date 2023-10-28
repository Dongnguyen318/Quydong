Array.prototype.push2 = function (...elements) {
  for (let i = 0; i < elements.length; i++) {
    this[this.length] = elements[i];
  }
  return this.length;
};

const myArray = [1, 2, 3];
console.log(myArray.push2(4, 5, 6));
