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

function add(a: Combinale, b: Combinale) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

// console.log(add(3, 4));
// console.log(add(3, "4"));
// console.log(add("qweqwe", "asdasd"));

function printEmployeeInformation(emp: UnknownEmloyee) {
  console.log("name: " + emp.name);
  if ("privileges" in emp) console.log("privileges: " + emp.privileges);
  if ("startDate" in emp) console.log("startDate: " + emp.startDate);
}

printEmployeeInformation(e2);

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

useVehicle(v1)
useVehicle(v2)