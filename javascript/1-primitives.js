// 0. hello world
// console.log('hello world');

// what is javascript?
// - Interpreted programming language
// - high-level, often just-in-time compiled, and multi-paradigm.
// - curly-bracket syntax {}
// - dynamic typing
// - prototype-based object-orientation
// - first-class functions

// why is javascript?
// - because netscape made mistakes
// - because interactions was always necessary

// variables - (let, const), var
// const x = 10;
// const y = x;
// x = 0;

// const constExample = 'a';
// constExample = 'b' // error

// let letExample = '2';
// letExample = '3';

// var varExample = '2';
// varExample = '3';

// which should i use? const for constant and let for non-constants
// -> let bots wins

// comments
/**
 * these are block comments
 * blh
 * blah
 *
 * blah
 */
// prefer single line comment

// 1. Primitives
let reaction = 'yikes';
reaction[0] = 'l';
console.log(reaction); // ? -> yikes
// primitives immutable
let pet = 'Narwhal';
pet = 'The Kraken';
console.log(pet); // 'The Kraken'
// variable assignment is NOT immutable
// primitive string, numbers, booleans, (and special ones)

// booleans - true false
let isSad = true;
let isHappy = !isSad;
let isFeeling = isSad || isHappy;
let isConfusing = isSad && isHappy;

let isSad = true; // true
let isHappy = !isSad; // false
let isFeeling = isSad || isHappy; // (true || false) -> true
let isConfusing = isSad && isHappy; // (true && false) -> false
// gotcha here: must use || and &&. | & also exist, but these bit-wise operators.

// numbers
// only one type of number in javascript^*
console.log(typeof 28); // "number"
console.log(typeof 3.14); // "number"
console.log(typeof -140); // "number"

// there are some special numbers in javascript
let scale = 0;
let a = 1 / scale; // Infinity
let b = 0 / scale; // NaN
let c = -a; // -Infinity
let d = 1 / c; // -0
// typeof (b) === “number” !

// truthy and falsy
// ternary CONDITION ? TRUE_BRANCH : FALSE_BRANCH
// conditionals
// if (CONDITION) {

// } else if () {

// } else {

// }

// strings
const str1 = 'asd';
const str2 = 'asd';
const str3 = `asd`;

// objects
// Good reference https://objectexplorer.netlify.app/
// very much the same as dictionaries
// {key: value}
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof new Date()); // "object"
console.log(typeof /\d+/); // "object"
console.log(typeof Math); // "object"

let rapper = {name: 'Malicious'};
// dot notation
rapper.name = 'Malice';
// bracket notation
rapper['rapper'] = 'no malice';
const xxxx = 'rapper';
rapper[xxxx] = 'no malice 2';
rapper.cds = 10;

Object.keys(rapper); // ['name', 'cds']
Object.values(rapper); // ['no malice 2', 10]
Object.entries(rapper); // [['name', 'no malice 2'], ['cds', 10]];

// arrays
// https://sdras.github.io/array-explorer/
const exVar = !false;
const myArr = [1, 'a', 'b', false];

myArr.push('hi'); // [1, 'a', 'b', false, 'hi']

myArr.concat(['hi']); // [1, 'a', 'b', false, 'hi', 'hi']
console.log(myArr); // [1, 'a', 'b', false, 'hi']

const myVal = myArr.pop(); // 'hi', mutate myArr to remove trailing hi

myArr[0]; // 1
myArr.length; // 4
myArr[myArr.length - 1]; // false

// equality
// -> NEVER EVER EVER EVER USE ==  (== is type coercive)
// ONLY EVERY USE === (strict equality)

// dates
const myDate = new Date('September 1, 2001');
