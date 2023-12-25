function Logger(logString: string) {
  return function (_constructor: Function) {
    console.log("logging :", logString);
    // console.log(constructor);
  };
}

function withTemplate(template: string, hookId: string) {
  return function (constructor: any) { // use _ to tell typescript i dont wanna use this constructor
    console.log('rendering template');
    
    const element = document.getElementById(hookId);
    const p = new constructor()
    if (element) {
      element.innerHTML = template;
    (element.querySelector('h1') as HTMLHeadingElement).textContent=p.name
    }

  };
}

// @Logger('heeeeeeeeeeeeeeeeeey')

@Logger('hellow')
@withTemplate("<h1>hellow decorator<h1>", "app")
class Person {
  name = "max";

  constructor() {
    this.name;
    console.log("craeting person");
  }
}

const person = new Person();
console.log(person);
