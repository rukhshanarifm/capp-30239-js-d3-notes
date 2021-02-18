// 5. es6isms
// what is es6
// ecmascript 6 -> european commission something something.....

// magic is bad engineering
// good engineering is repeatable, understandable, and documented

// spread operator
// unpack operator *, spread operator *, ...

// const argList = [1, 2, 3, 'a', 'b', 'c'];
// console.log(argList);
// console.log(...argList);
// // totally the same as
// console.log(1, 2, 3, 'a', 'b', 'c');

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

const finalObj = {
  coolProperty2: '123',
  ...myExampleObject,
  ...myOtherObject,
};

// [...[1, 2, 3], ...[4, 5, 6]]
// object short hands

const propName = 'wowza';
const exObj = {[propName + 'asd']: 123};
console.log(exObj);

// destructuring
const exampleObject = {a: 1, b: 3};
function myFunc(props) {
  const {a, b} = props;
  console.log(a);
  console.log(b * 10);
}
// myFunc(exampleObject);

// destructuring works on arrays
const myArr = ['bat', 'man', 'cat', 'man'];
const [a, b, c] = myArr;
console.log(a, c);

// Template literals

const myName = 'andrew';
// const myStr = 'my name is ' + Name + ' wow what a good name.';
const myStr = `my name is ${myName + myName} wow what a good name`;
console.log(myStr);
