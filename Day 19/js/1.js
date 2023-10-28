var arr = [2, 34, 2, 11, 4, 44, 23];
var max = arr[0],
  min = arr[0];
var maxPosition, minPosition;

for (var i = 0; i < arr.length; i++) {
  if (max < arr[i]) {
    max = arr[i];
    maxPosition = i;
  }

  if (min > arr[i]) {
    min = arr[i];
    minPosition = i;
  }
}
console.log("Số lớn nhất là:" + max + " ở vị trí: " + maxPosition);
console.log("Số nhỏ nhất là:", min + " ở vị trí: " + minPosition);
