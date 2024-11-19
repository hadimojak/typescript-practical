interface Admin {
  name: string;
  privileges: string[];
}

interface GeneralEmployee {
  name: string;
  startDate: Date;
}

interface ElevatedEmpolyee extends Admin, GeneralEmployee {}
// type ElevatedEmpolyee = Admin & GeneralEmployee;

const obj: ElevatedEmpolyee = {
  name: "a",
  privileges: ["admin"],
  startDate: new Date(),
};

type numeric = number | string;

type stringy = string | boolean;

type combine = numeric & stringy;

function add(n1: numeric, n2: numeric) {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return +n1 + +n2;
  }
  return n1 + n2;
}

type unknownEmployee = GeneralEmployee | Admin;

function printEmpInfo(emp: unknownEmployee) {
  console.log("name  " + emp.name);
  if ("privileges" in emp && "startDate" in emp) {
    console.log("privileges  " + emp.privileges);
    console.log("startDate   " + emp.startDate);
  }
}

// printEmpInfo(obj);

class Car {
  drive() {
    console.log("driving car");
  }
}

class Truck {
  drive() {
    console.log("driving truck");
  }

  loadCargo(amount: number) {
    console.log(`loading cargo... ${amount}`);
  }
}

type vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: vehicle) {
  vehicle.drive();
  if ("loadCargo" in vehicle && vehicle instanceof Truck) {
    vehicle.loadCargo(500);
  }
}

useVehicle(v1);
useVehicle(v2);
