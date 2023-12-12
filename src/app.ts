/* eslint-disable quotes */
/* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-unused-vars */
// /* eslint-disable quotes */
// const names: Array<string> = ["hadi", "ali"];

// const names1: string[] = [...names];

// const promise:Promise<string> = new Promise((resulve) => {
//   setTimeout(() => {
//     resulve("this is done ");
//   }, 2000);
// });

// promise.then((data) => console.log(data));

//type constraints
// function merge<T extends object, U extends object>(obj1: T, obj2: U) {
//   return Object.assign(obj1, obj2);
// }

// const mergedObj = merge<{ name: string; hobbies: string[] }, { age: number }>(
//   { name: "ali", hobbies: ["footbal"] },
//   { age: 32 }
// );
// console.log(mergedObj);

// interface Lengthy {
//   length: number;
// }

// function countAndPrint<T extends Lengthy>(element: T): [T, string] {
//   let descriptionText = "got no value";
//   if (element.length === 0) {
//     descriptionText = "got " + "1" + " element";
//   } else if (element.length > 1) {
//     descriptionText = "got " + element.length + " element";
//   }
//   return [element, descriptionText];
// }

// console.log(countAndPrint("hi there"));

// function extractAndConvert<T extends object, U extends keyof T>(
//   obj: T,
//   key: U
// ) {
//   return obj[key];
// }

// console.log(extractAndConvert({ name: "hadi" }, "name"));

class DataStorage<T> {
  // private data:Array<T> = [];
  constructor(private data: T[]) {}

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>(["name", "age"]);
textStorage.addItem("hi");
textStorage.addItem("there");

console.log(textStorage.getItems());
