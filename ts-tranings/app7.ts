interface Named {
    readonly name?: string;
    outputName?: string;
  }
  
  interface Greatable extends Named {
    greet(pharse: string): void;
  }
  
  // type addfn = (a: number, b: number) => number;
  
  interface addfn {
    (a: number, b: number): number;
    name: string;
  }
  
  const add: addfn = (a, b) => a + b;
  console.log(add(5, 10));
  
  class Person implements Greatable {
    name?: string;
    age: number;
  
    constructor(n: string, age: number) {
      if (n) {
        this.name = n;
      }
      this.age = age;
    }
  
    greet(pharse: string): void {
      if (this.name) console.log("helow there ", this.name, pharse);
      else console.log("no valid");
    }
  }
  
  const user1 = new Person("", 23);
  
  user1.greet("an");
  console.log(user1);
  