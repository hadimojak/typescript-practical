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
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return "last report: " + this.lastReport;
    }
    throw new Error("no report found");
  }

  set mostRecentReport(value: string) {
    if (!value) throw new Error("pass in a valid value !!");
    this.addReport(value);
  }

  constructor(id: string, reports: string[]) {
    super("accounting", id);
    this.reports = reports;
    this.lastReport = reports[0];
  }

  addEmployee(name: string): void {
    if (name === "hadi") {
      return;
    }
    this.empolyees.push(name);
  }

  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }

  getReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("1664", ["hadi"]);
const acc = new AccountingDepartment("665224", []);

acc.mostRecentReport = "good reports";
acc.mostRecentReport = "good reports2";
console.log(acc.mostRecentReport);

const acc1 = new AccountingDepartment("6654", ["bad report"]);

console.log(it, acc1);
