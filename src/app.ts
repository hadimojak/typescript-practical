/* eslint-disable @typescript-eslint/no-unused-vars */
//#region class decorator
function Logger(logName: string) {
  return function (_: Function) {
    console.log("1- logging... " + logName);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._args: any[]) {
        super();
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);

        if (hookEl) {
          const LIEL = document.createElement("li") as HTMLLIElement;
          LIEL.innerHTML = template;
          console.log("111111111111", LIEL, this.name);
          (LIEL.querySelector("h1") as HTMLHeadingElement).innerText = _args[0];
          hookEl.appendChild(LIEL);

          // hookEl.appendChild(template);
          // hookEl.querySelector("h1")!.textContent = this.name;
        }
        console.log(this.name);
        
      }
    };
  };
}

// @Logger("warn")
@WithTemplate(`<h1>My Person Object</h1>`, "app1")
class Person {
  name = "hadi";

  constructor(n: string) {
    this.name = n;
    console.log("creating person");
  }
}

new Person('annnn');
new Person('annnn2');
new Person('annnn4');

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
