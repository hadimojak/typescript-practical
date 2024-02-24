//class decorator
function Logger(logString: string) {
  return function (_constructor: Function) {
    console.log("logging :", logString);
    // console.log(constructor);
  };
}

function withTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    // use _ to tell typescript i dont wanna use this constructor
    // console.log('rendering template');

    const element = document.getElementById(hookId);
    const p = new constructor();
    if (element) {
      element.innerHTML = template;
      (element.querySelector("h1") as HTMLHeadingElement).textContent = p.name;
    }
  };
}

// @Logger('heeeeeeeeeeeeeeeeeey')

@Logger("hellow")
@withTemplate("<h1>hellow decorator<h1>", "app")
class Person {
  name = "max";

  constructor() {
    this.name;
    // console.log("craeting person");
  }
}

// const person = new Person();
// console.log(person);

function log(target: any, propName: string | symbol) {
  console.log("propDecorator : ", propName);
  console.log("target : ", target);
}

function
class Product {
  @log
  title: string;
  private price: number;

  set setPrice(val: number) {
    if (val > 0) this.price = val;
    else throw new Error("invalid price range");
  }

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getPriceWithTax(tax: number) {
    return this.price * (1 + tax);
  }
}


const product = new Product('book',450)   
