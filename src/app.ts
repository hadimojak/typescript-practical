// const names: Array<string> = ["ali", "max"];

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("done done");
//   }, 3000);
// });

// promise.then((data) => {
//   console.log(data);
// });

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ age: 32 }, { name: "asd" });

console.log(mergedObj);
