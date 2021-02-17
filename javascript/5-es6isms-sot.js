// 5. es6 isms

// spread operator
// You might know it as scatter, splat(*), unpack operator in python

const argList = [1, 2, 3, 'a', 'b', 'c'];
console.log(1, 2, 3, 'a', 'b', 'c');
console.log(...argList); // 1 2 3 "a" "b" "c"

const myExampleObject = {
  coolProperty: 1,
  coolProperty2: 'banana',
  lyrics: 'a squid eating dough is both fast and boulbus',
};
const myOtherObject = {
  artist: 'beefheart',
  album: 'Trout Mask Replica',
  coolProperty: 'doughnut!',
};
const combined = {
  ...myExampleObject,
  ...myOtherObject,
};

console.log(combined);
// Object {coolProperty: "doughnut!", coolProperty2: "banana", lyrics: "a squid eating dough is both fast and boulbus", artist: "beefheart", album: "Trout Mask Replica"}

// destructuring

// destructuring works on objects
const exampleObject = {a: 1, b: 3};
function exampleFunc({a, b}) {
  console.log(a, b);
}

// destructuring works on arrays
const myArr = ['bat', 'man', 'cat', 'man'];
const [a, b, c] = myArr;

// Template literals

const myAge = 29;
const myName = 'Andrew';
const exampleString = `Hello my name is ${myName}. I am ${myAge} years old!`;
console.log(exampleString);
