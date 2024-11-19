abstract class Department {
  static mainPage = "102";
  protected empolyees: string[] = [];
  // public name: string;

  constructor(public name: string, protected readonly id: string) {}

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    // this.id='qwe'
    this.empolyees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.empolyees);
  }

  static createEmployee(employee: string) {
    return { employee };
  }
}

class ITDepartment extends Department {
  public admins: string[];

  constructor(id: string, admins: string[]) {
    super("IT", id);
    this.admins = admins;
  }

  describe() {
    console.log("it departmant - ", this.id);
  }
}

class AccountingDepartment extends Department {
  private reports: string[];
  private lastReport: string;
  private static instance: AccountingDepartment;

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

  private constructor(id: string, reports: string[]) {
    super("accounting", id);
    this.reports = reports;
    this.lastReport = reports[0];
  }

  static getInstance(id: string, reports: string[]) {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment(id, reports);
    return this.instance;
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

  describe() {
    console.log("accounting departmant - ", this.id);
  }
}

const employee1 = Department.createEmployee("hamid");

// console.log(employee1, Department.mainPage);

const it = new ITDepartment("1664", ["hadi"]);
// const acc = new AccountingDepartment("665224", []);
const accounting = AccountingDepartment.getInstance("5454", []);

accounting.mostRecentReport = "good reports";
accounting.mostRecentReport = "good reports2";
accounting.describe();
console.log(accounting);

// console.log(acc.mostRecentReport);

// const acc1 = new AccountingDepartment("6654", ["bad report"]);
// acc1.describe();
it.describe();

// console.log(it, acc1);
