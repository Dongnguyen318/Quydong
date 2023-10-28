function prime(n) {
  for (var i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}

function sumPrime(arr) {
  var sum = 0;
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (prime(arr[i])) {
      sum += arr[i];
      count++;
    }
  }
  if (count !== 0) {
    console.log((1.0 * sum) / count);
  } else {
    console.log("Không có số nguyên tố");
  }
}

sumPrime([5, 9, 11]);
