// 4 iterators
const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// for loops
const forArr = [];
for (let i = 0; i < myArr.length; i += 1) {
  forArr.push(myArr[i] * 2);
}

const whileArr = [];
let j = 0;
while (j < 10) {
  whileArr.push(myArr[j] * 2);
  j += 1;
}
// console.log(whileArr);

// it's pretty easy to get bugs with these!
// instead functional programming to the rescue!!

const forEachArr = [];
myArr.forEach((val, idx) => {
  forEachArr.push(val * 2);
});
// console.log(forEachArr);

const mapArr = myArr.map(function (val, idx) {
  return val * 2;
});
// console.log(mapArr);

// ~~~~~~~~~~~~ reduce ~~~~~~~~~~
const result = myArr.reduce((acc, val, idx) => {
  return [acc].concat([val]);
}, []);
console.log(JSON.stringify(result, null, 2));

// Rosetta stoning it

// problem set up, an array of objects like this
const input = [
  {value: 'a', key: 'good squids'},
  {value: 'b', key: 'eat good dough'},
  {value: 'c', key: 'and are fast and boulbus'},
];

// should create an object of objects like this
const output = {
  a: {key: 'good squids', value: 'a'},
  b: {key: 'eat good dough', value: 'b'},
  c: {key: 'and are fast and boulbus', value: 'c'},
};

// python
// def myFun(arr):
//     myMap = {}
//     for row in arr:
//         myMap[row["value"]] = row
//     return myMap

// function myFun(arr) {
//     const myMap = {}
//     for (let i = 0; i < arr.length; i++ ) {
//         myMap[arr[i].value] = arr[i];
//     }
//     return myMap;
// }

// const myFun = (arr) =>
//   arr.reduce((acc, row) => {
//     acc[row.value] = row;
//     return acc;
//   }, {});
