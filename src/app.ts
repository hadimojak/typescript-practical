class Department {
  protected empolyees: string[] = [];
  // public name: string;

  constructor(public name: string, private readonly id: string) {}

  describe(this: Department): void {
    console.log("depart: " + this.name + "  id is  " + this.id);
  }

  addEmployee(employee: string) {
    // this.id='qwe'
    this.empolyees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.empolyees);
  }
}

class ITDepartment extends Department {
  public admins: string[];

  constructor(id: string, admins: string[]) {
    super("IT", id);
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private reports: string[];

  constructor(id: string, reports: string[]) {
    super("accounting", id);
    this.reports = reports;
  }

  addEmployee(name: string): void {
    if (name === "hadi") {
      return;
    }
    this.empolyees.push(name);
  }

  addReport(report: string) {
    this.reports.push(report);
  }

  getReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("1664", ["hadi"]);
const acc = new AccountingDepartment("6654", ["bad report"]);

acc.addReport("some report");

console.log({ it });
console.log({ acc });

it.addEmployee("gholi");
it.addEmployee("ali");

it.describe();
it.printEmployeeInfo();

// const department2 = { name: "ahmad", describe: department.describe };

// department2.describe();
