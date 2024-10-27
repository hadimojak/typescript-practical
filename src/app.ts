/* eslint-disable @typescript-eslint/no-unused-vars */
//#region class decorator
function Logger(logName: string) {
  return function (_: Function) {
    console.log("1- logging... " + logName);
  };
}

function withTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(constructor1: T) {
    return class extends constructor1 {
      constructor(..._: any[]) {
        super();
        const ULElement = document.getElementById(hookId) as HTMLUListElement;
        // divElement.innerHTML = template;
        (document.querySelector("ul") as HTMLUListElement).innerHTML = this.name;
      }
    };
  };
}

@Logger("warn")
@withTemplate(`<p>hellow decorator</p>`, "app")
class Person {
  name = "maxii";

  constructor() {
    console.log("creating person");
  }
}

new Person()

// //#region property decorator
// function Log(target: any, propertyName: string | symbol) {
//   console.log("1 -property decorator...", target, propertyName);
// }

// //#region accessor decorator
// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("2 -accessor decorator");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// //#region method decorator
// function Log3(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
//   console.log("3- method decorator");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// //#region parameter decorator
// function Log4(target: any, name: string | symbol, index: number) {
//   console.log("4- parameter decorator");
//   console.log(target);
//   console.log(name);
//   console.log(index);
// }

// class Product {
//   @Log
//   title: string;
//   private _price: number;

//   @Log2
//   set price(val: number) {
//     if (val > 0) this._price = val;
//     else throw new Error("val is not valid price number");
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }

//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     return this._price * (1 + tax);
//   }
// }
