var customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 22, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

var Customer = function (name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
};

var result = [];

function createCustomers(customers) {
  for (var key of customers) {
    new Customer(key.name, key.age, key.address);
    var getName = key.name.split(" ");
    getName.splice(1, getName.length - 2);
    key["shortName"] = getName.join(" ");
    result.push(key);
  }
  return result.sort((a, b) => a.age - b.age);
}
console.log(createCustomers(customers));
