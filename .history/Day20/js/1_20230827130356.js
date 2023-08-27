var arrA = [1, 4, 3, 2, 5, 3, 6, 8, 1];
var arrB = [5, 2, 6, 7, 1, 3];
var result = arrA.reduce((first, el) => {
  return arrB.includes(el) && first.push(el), first;
}, []);
console.log("Kết quả giao giữa 2 mảng là: ", result);
