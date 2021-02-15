// 4. Iterators

// iterative iterators
const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newArr = [];
for (let i = 0; i < 10; i++) {
  newArr.push(i * 2);
}

let j = 0;
const otherArr = [];
while (j < 10) {
  otherArr.push(i * 2);
  j++;
}

// Functional iterators

// forEach
const newArr2 = [];
myArr.forEach((x, idx) => {
  newArr.push(x * 2);
});

// map
// given an array input, run a function on each cell in that input
const arr = myArr.map((el, idx) => {
  return el * 2;
});
const altArr = myArr.map((el) => el * 2);

// reduce
// given an array and initial value, recursively call the function on each
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sum = digits.reduce((acc, val, idx, arr) => {
  return acc + val;
}, 0); // 55
const sum = digits.reduce((acc, d) => acc + d, 0);
console.log(sum); //55

const arrs = [[1], [1, 2, 3], [1, 2, 3, 5]];
const out = arrs.reduce((el, d) => el.concat(d), []);
console.log(out); //[1, 1, 2, 3, 1, 2, 3, 5]

// Rosetta stoning it:

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

// javascript
function myFun(arr) {
  const myMap = {};
  for (let i = 0; i < arr.length; i++) {
    myMap[arr[i].value] = arr[i];
  }
  return myMap;
}

// python
// def myFun(arr):
//   myMap = {}
//   for row in arr:
//     myMap[row["value"]] = row
//   return myMap
