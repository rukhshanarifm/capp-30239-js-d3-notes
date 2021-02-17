// 8. promises

new Promise((resolve, reject) => {
  // do some asnyc or risky action
  if (Math.random() > 0.5) {
    resolve([1, 2, 3, 4, 5, 6]);
  } else {
    reject();
  }
})
  .then((d) => {
    console.log(d);
  })
  .catch((e) => {
    console.log('rejected');
  });

// why do you care

const x = fetch('./your-json-file.json')
  .then((d) => d.json())
  .then((d) => {
    console.log(d); //your json
  });

Promise.all(
  ['./your-json-file.json', './your-other-json-file.json'].map((url) => fetch(url).then((d) => d.json())),
).then((result) => {
  const [firstFileResult, secondFileResult] = result;
});

// Demo: Getting data in our example app from last time
