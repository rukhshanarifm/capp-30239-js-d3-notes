// 2 - functions!

// basics

function double(x) {
  return x * 2;
}
// double(1, 2, 3);
// const double = (x) => x * 2;
// const double = (x) => {
//     // write fun stuff here
//     return x * 2;
// }
// console.log(double(123)); // 246

// function double(x) {
//   x = x * 2;
// }
// ????
// let money = 10;
// double(money);
// console.log(money); // ?

// const doMath = (op, left) => op(left);
// console.log(doMath(double, 3));

// // scopes
// function sum(n) {
//   var v = (x) => sum(n + x);
//   v.valueOf = () => n;
//   return v;
// }
// console.log(v); // Error: v is not defined
// console.log(+sum(1)(2)(3)(4)); //10

// function curry() {
//     let sum = 0;
//     const curreier = (val) => {
//         if (!Number.isFinite(val)) {
//             return sum;
//         }
//         sum = sum + val;
//         return curreier;
//     }
//     return curreier;
// }
// // console.log(curry()(1)(2)(3)()) // 6

// console.log(Math.random());

const exampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function pick(arr) {
//   const randomNumber = Math.floor(Math.random() * arr.length);
//   return exampleArray[randomNumber];
// }
const pick = (arr) => exampleArray[Math.floor(Math.random() * arr.length)];

console.log(pick(exampleArray));
