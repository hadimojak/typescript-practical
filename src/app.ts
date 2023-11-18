type Admin = {
  name: string;
  privileges: string[];
};

type Emloyee = {
  name: string;
  startDate: Date;
};

type ElevatedEmpolee = Admin & Emloyee;

// interface ElevatedEmpolee extends Emloyee, Admin {}

const emp1: ElevatedEmpolee = {
  name: "ali",
  privileges: ["USER"],
  startDate: new Date(),
};

type Combinable = string | number;

type Numberic = number | boolean;

type Univarsal = Combinable & Numberic;

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  } else return a + b;
}

type UnknownEmployee = Emloyee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("name :", emp.name);
  if ("privileges" in emp) {
    console.log("privilege :", emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("privilege :", emp.startDate);
  }
}

printEmployeeInformation(emp1);

class Car {
  drive() {
    console.log("driving");
  }
}

class Truck {
  drive() {
    console.log("driving a truck");
  }

  loadCargo(amount: number) {
    console.log("carring :", amount);
  }
}

type Vhicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vhicle: Vhicle) {
  vhicle.drive();
  // if ("loadCargo" in vhicle) {
  //   vhicle.loadCargo(5000);
  // }
  if (vhicle instanceof Truck) {
    vhicle.loadCargo(5000);
  }
}

useVehicle(v2);
useVehicle(v1);
