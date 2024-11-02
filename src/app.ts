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

new Person("annnn");
new Person("annnn2");
new Person("annnn4");

//#region property decorator
function Log(target: any, propertyName: string | symbol) {
  console.log("1 -property decorator...", target, propertyName);
}

//#region accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("2 -accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//#region method decorator
function Log3(target: any, name: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
  console.log("3- method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
  return {};
}

//#region parameter decorator
function Log4(target: any, name: string | symbol, index: number) {
  console.log("4- parameter decorator");
  console.log(target);
  console.log(name);
  console.log(index);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) this._price = val;
    else throw new Error("val is not valid price number");
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function Autobind(_: any, _2: string | symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  console.log({ descriptor });

  const adjDiscriptop: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDiscriptop;
}

// class Printer {
//   message = "this works";

//   @Autobind
//   showMessage() {
//     console.log(this.message);
//   }
// }
// const p = new Printer();

// const button = document.querySelector("button") as HTMLButtonElement;
// button.addEventListener("click", p.showMessage);

console.log("---------------------------------------------------------------");

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    throw new Error("validate failed");
  }
  console.log(createdCourse);
});
