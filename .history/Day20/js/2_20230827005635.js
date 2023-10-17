var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
function flat(arr = []) {
  return arr.reduce((first, el) => {
    return first.concat(Array.isArray(el) ? flat(el) : el);
  }, []);
}
const result = flat(arr);
console.log("Mảng ban đầu: ", arr);
console.log("Mảng sau khi làm phẳng: ", result);
