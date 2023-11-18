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
