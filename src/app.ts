const names: Array<string> = ["ali", "max"];

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("done done");
  }, 3000);
});

promise.then((data) => {
  console.log(data);
});
