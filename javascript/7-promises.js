// // 7 promises

// const x = new Promise((resolve, reject) => {
//   // async or risky action
//   if (Math.random() > 0.5) {
//     resolve([1, 2, 3, 4, 5, 6]);
//   } else {
//     reject('you got baaaaad luck friend');
//   }
// })
//   .then((result) => {
//     console.log('wow it work', result);
//   })
//   .catch((error) => {
//     console.error('oh no it did not', error);
//   });

// const x = fetch('./json-file.json').then(x => x.json()).then(x => console.log(x))
