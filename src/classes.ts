abstract class Departemant {
  // neme: string;
  protected emplyees: string[] = [];

  get getValue() {
    return this.emplyees;
  }

  set pushToEmployees(name: string) {
    this.emplyees.push(name);
  }

  constructor(public readonly name: string) {
    // this.neme = n;
  }

  describe(this: Departemant) {
    console.log(`${this.name} hey bitch`);
  }

  addEmployee(employee: string) {
    this.emplyees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.emplyees.length);
    console.log(this.emplyees);
  }
}

class ITDepartment extends Departemant {
  private static instance: ITDepartment;

  private constructor(public name: string, public grade: number) {
    super(name);
  }

  static getInstance(name: string, grade: number) {
    if (ITDepartment.instance) {
      return this.instance;
    }
    this.instance = new ITDepartment(name, grade);
    return this.instance;
  }

  addEmployee(name: string) {
    this.emplyees.push(name);
  }
}

// const account = new Departemant("acounting");

// account.addEmployee("hadi");
// account.addEmployee("ali");

// account.printEmployeeInfo();

const IT = ITDepartment.getInstance("holli", 15);
console.log(IT);
IT.addEmployee("iran");

IT.printEmployeeInfo();
// console.log(IT.getValue, "heeerrree");
IT.pushToEmployees = "hoseindani";
// console.log(IT.getValue, "heeerrree");
