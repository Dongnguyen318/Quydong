const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

let Customer = function (name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
};

let result = [];

function createCustomers(customers) {
  for (let key of customers) {
    new Customer(key.name, key.age, key.address);
    let getName = key.name.split(" ");
    getName.splice(1, getName.length - 2);
    key["shortName"] = getName.join(" ");
    result.push(key);
  }
  return result.sort((a, b) => a.age - b.age);
}
console.log(createCustomers(customers));
