// type Admin = {
//   name: string;
//   privileges: string[];
// };

// type Emloyee = {
//   name: string;
//   startDate: Date;
// };

// type ElevatedEmpolee = Admin & Emloyee;

// // interface ElevatedEmpolee extends Emloyee, Admin {}

// const emp1: ElevatedEmpolee = {
//   name: "ali",
//   privileges: ["USER"],
//   startDate: new Date(),
// };

// type Combinable = string | number;

// type Numberic = number | boolean;

// type Univarsal = Combinable & Numberic;

// function add(a: number, b: number): number;
// function add(a: string, b: string): string;
// function add(a: number, b: string): string;
// function add(a: string, b: number): string;
// function add(a: Combinable, b: Combinable) {
//   if (typeof a === "string" || typeof b === "string") {
//     return a.toString() + b.toString();
//   } else return a + b;
// }

// const result = add("max", "arbabi");
// // console.log(result.split(""));

interface Job {
  title: string;
  description: string;
}

interface Fetch {
  id: string;
  name: string;
  job?: Job 
}

const fetchedUserData: Fetch = {
  id: "uuid",
  name: "hadi",
  job: { title: "ceo", description: "my own company" },
};

if ("job" in fetchedUserData) {
  console.log(fetchedUserData?.job?.title);
}

const userInput1 = null;
const storedData = userInput1 ?? "DEFAULT";
console.log(storedData);


// type UnknownEmployee = Emloyee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log("name :", emp.name);
//   if ("privileges" in emp) {
//     console.log("privilege :", emp.privileges);
//   }
//   if ("startDate" in emp) {
//     console.log("privilege :", emp.startDate);
//   }
// }

// // printEmployeeInformation(emp1);

// class Car {
//   drive() {
//     console.log("driving");
//   }
// }

// class Truck {
//   drive() {
//     console.log("driving a truck");
//   }

//   loadCargo(amount: number) {
//     console.log("carring :", amount);
//   }
// }

// type Vhicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vhicle: Vhicle) {
//   vhicle.drive();
//   // if ("loadCargo" in vhicle) {
//   //   vhicle.loadCargo(5000);
//   // }
//   if (vhicle instanceof Truck) {
//     vhicle.loadCargo(5000);
//   }
// }

// // useVehicle(v2);
// // useVehicle(v1);

// interface Bird {
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runSpeed: number;
// }

// type Animal = Bird | Horse; //onion type

// function moveAnimal(animal: Animal) {
//   switch (animal.type) {
//     case "bird":
//       console.log(`moving with speed : ${animal.flyingSpeed}`);
//       break;
//     case "horse":
//       console.log(`moving with speed : ${animal.runSpeed}`);
//       break;
//     default:
//       console.log("no animal");
//       break;
//   }
// }

// // moveAnimal({ runSpeed: 80, type: "horse" });

// const userInput = document.getElementById("user-input");

// if (userInput) {
//   (userInput as HTMLInputElement).value = "new value";
// }

// interface ErrorContainer {
//   //{ email:errorString,userName :errorMessage}
//   [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
//   email: "not a valid email",
//   userName: "most start with a capital caracter",
// };


