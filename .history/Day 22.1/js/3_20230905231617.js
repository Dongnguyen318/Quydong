var arr = ["a", "c", "k", "S"];
Array.prototype.push2 = function (...value) {
  var result = this;
  console.log(result);
  for (var i = 0; i < value.length; i++) {
    result[result.length] = value[i];
  }

  return result;
};
console.log(a.push2("@"));
