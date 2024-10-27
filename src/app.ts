/* eslint-disable @typescript-eslint/no-unused-vars */
function Logger(logName: string) {
  console.log("logger");

  return function (constructor: Function) {
    console.log("1- logging... " + logName);
    // console.log(constructor);
  };
}

function withTemplate(template: string, hookId: string) {
  console.log("template");

  return function (constructor: any) {
    const p = new constructor();
    console.log("2");

    const divElement = document.getElementById(hookId) as HTMLDivElement;
    divElement.innerHTML = template;
    (document.querySelector("p") as HTMLParagraphElement).innerHTML = p.name;
  };
}

@Logger("warn")
@withTemplate(`<p>hellow decorator</p>`, "app")
class Person {
  name = "max";

  constructor() {
    console.log("creating person");
  }
}

// const person = new Person();

// console.log(person);
