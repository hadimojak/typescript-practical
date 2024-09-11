
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin, Employee {}

type ElevatedEmployee = Admin & Employee;

type UnknownEmloyee = Employee | Admin;

const e1: ElevatedEmployee = {
  name: "hadi",
  privileges: ["create-server"],
  startDate: new Date(),
};

const e2: UnknownEmloyee = {
  name: "hadi",
  startDate: new Date(),
};

type Combinale = string | number;
type Numeric = number | boolean;

type Universal = Combinale & Numeric;

function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: number): number;
function add(a: number, b: string): string;
function add(a: Combinale, b: Combinale) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add(3, 4);
const result1 = add(3, "4");
const result2 = add("qweqwe", "asdasd");

function printEmployeeInformation(emp: UnknownEmloyee) {
  console.log("name: " + emp.name);
  if ("privileges" in emp) console.log("privileges: " + emp.privileges);
  if ("startDate" in emp) console.log("startDate: " + emp.startDate);
}

// printEmployeeInformation(e2);

class Car {
  drive() {
    console.log("driveing");
  }
}

class Truck {
  drive() {
    console.log("driveing");
  }
  loadCargo(amount: number) {
    console.log("loading cargo : " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) vehicle.loadCargo(1500);
}

// useVehicle(v1)
// useVehicle(v2)

interface Bird {
  type?: "bird";
  flyingSpeed: number;
}

interface Horse {
  type?: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(anima: Animal): string | undefined {
  let speed;
  switch (anima.type) {
    case "bird":
      speed = "moving with speed " + anima.flyingSpeed;
      break;
    case "horse":
      speed = "moving with speed " + anima.runningSpeed;
      break;

    default:
      break;
  }

  return speed;
}

const horse: Horse = {
  runningSpeed: 140,
  type: "horse",
};

// console.log(moveAnimal(horse));

// const para = <HTMLInputElement>document.getElementById("inpt");
const para = document.getElementById("inpt");

if (para) {
  (para as HTMLInputElement).value = "aaaaa";
}

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "not valid email",
  username: "must be start with capital",
};

const fetchedUserData = {
  id: "uuid",
  name: "max",
  job: { title: "CEO", description: "halishop company" },
};



console.log(fetchedUserData?.job?.title);
