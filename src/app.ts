import {ProjectInput} from "./components/project-input.js"
import {ProjectList} from "./components/project-list.js"

  // function ValidateInput(validateFn: (instance: any) => boolean) {
  //   return function (_: any, _2: string, descriptor: PropertyDescriptor) {
  //     const originalMethod = descriptor.value;

  //     descriptor.value = function (...args: any[]) {
  //       if (!validateFn(this)) alert("invalid input1");
  //       else return originalMethod.apply(this, args);
  //     };
  //   };
  // }

  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");

