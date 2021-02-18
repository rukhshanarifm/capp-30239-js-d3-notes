// 0. hello world
console.log('hello world');

// what is javascript?
// - Interpreted programming language
// - high-level, often just-in-time compiled, and multi-paradigm.
// - curly-bracket syntax
// - dynamic typing
// - prototype-based object-orientation
// - first-class functions

// why is javascript?
// - because netscape made mistakes
// - because interactions was always necessary

// variables
let a = 10;
let b = a;
a = 0;

const constExample = '1';
constExample = '2'; // Error

let letExample = '2';
letExample = '3'; // good!

var varExample = '2';
varExample = '3'; //also fine!

// comments
// they come in two forms
// this this
/**
 * and like this
 */
// prefer single line comments because they are easier to hot key your way out of

// 1. Primitives
// primitives are immutable
let reaction = 'yikes';
reaction[0] = 'l';
console.log(reaction); // ?

console.log(reaction); // yikes

let pet = 'Narwhal';
pet = 'The Kraken';
console.log(pet); // ???
console.log(pet); // 'The Kraken'
// variable assignment is NOT immutable

// booleans
let isSad = true;
let isHappy = !isSad;
let isFeeling = isSad || isHappy;
let isConfusing = isSad && isHappy; // Result?

let isSad = true;
let isHappy = !isSad; // false
let isFeeling = isSad || isHappy;
// true || false -> true
let isConfusing = isSad && isHappy;
// true & false -> false

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

// string

// objects
// Good reference https://sdras.github.io/object-explorer/

console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof new Date()); // "object"
console.log(typeof /\d+/); // "object"
console.log(typeof Math); // "object"

let rapper = {name: 'Malicious'};
// Dot notation
rapper.name = 'Malice';
// Bracket notation
rapper['name'] = 'No Malice';

// arrays
// Good reference https://sdras.github.io/array-explorer/
// aka very special objects

const myExampleArr = [];

// Push mutates
myExampleArr.push('123');
console.log(myExampleArr); // ['123']

// Concat acts immutably
const newArray = myExampleArr.concat('dog bingo');
console.log(myExampleArr); // ['123']
console.log(newArray); // ["123", 'dog bingo']

// zero indexed
console.log(newArray[1]); // 'dog bingo'
console.log(newArray.length); // 2

// equality

// always use triple equals! === never ==
// assets/equality-1.png assets/equality-2.png

// dates
const myDate = new Date('September 4th, 1982');
const rightNow = new Date().getTime();
