class Department {
  // private empolyees: string[] = [];
  // public name: string;

  constructor(public name: string, private empolyees: string[] = []) {}

  describe(this: Department): void {
    console.log("depart: " + this.name);
  }

  addEmployee(employee: string) {
    this.empolyees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.empolyees);
  }
}

const department = new Department("hadi");

department.addEmployee("gholi");
department.addEmployee("ali");

department.describe();
department.printEmployeeInfo();

// const department2 = { name: "ahmad", describe: department.describe };

// department2.describe();
