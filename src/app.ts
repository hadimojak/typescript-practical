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

// console.log(mergedObj);

interface lengthy {
  length: number;
}
function countAndPrint<T extends lengthy>(element: T): [T, string] {
  let description = "Got no value";
  if (element.length === 1) {
    description = "got 1 element";
  } else if (element.length > 1) {
    description = "got " + element.length + " elements";
  }
  return [element, description];
}

// console.log(countAndPrint("hi there"));
// console.log(countAndPrint([2, 3, 4]));
// console.log(countAndPrint({ name: "hadi" }));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

console.log(extractAndConvert({ name: "ali" }, "name"));
