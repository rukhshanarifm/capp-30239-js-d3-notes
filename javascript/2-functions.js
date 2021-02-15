// 2. Functions!

// basics
// example 1
function double(x) {
  return x * 2;
}
const double = (x, y) => x * 2;
const double = (x) => {
  console.log(x);
  return x * 2;
};
console.log(double(10)); // 20

// example 2
function double(x) {
  x = x * 2;
}

let money = 10;
double(money);
console.log(money); // ?
double(money); // 20
console.log(money); //10

// functions are compositional (though not really to the level of a functional language)
const doMath = (op, left) => op(left);
doMath(double, 3); // 6

// scopes
function sum(n) {
  var v = (x) => sum(n + x);
  v.valueOf = () => n;
  return v;
}
console.log(v); // Error: v is not defined
console.log(+sum(1)(2)(3)(4)); //10

// important built ins

// console.log
// math ops
// type of

console.log(typeof 2); // "number"
console.log(typeof 'hello'); // "string"
console.log(typeof undefined); // "undefined"

console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof ((x) => x * 2)); // "function"
