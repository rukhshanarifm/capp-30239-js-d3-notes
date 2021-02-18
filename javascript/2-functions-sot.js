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

// currying

function curry() {
  let sum = 0;
  const currier = (val) => {
    if (!Number.isFinite(val)) {
      return sum;
    }
    sum = sum + val;
    return currier;
  };
  return currier;
}

console.log(curry()(1)(2)(3)());

// important built ins

// math ops
console.log(Math.random());
const exampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pick = () => exampleArray[Math.floor((exampleArray.length - 1) * Math.random())];

// type of

console.log(typeof 2); // "number"
console.log(typeof 'hello'); // "string"
console.log(typeof undefined); // "undefined"

console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof ((x) => x * 2)); // "function"
