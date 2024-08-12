class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe(): void {
    console.log("depart: " + this.name);
  }
}

const department = new Department("hadi");

// console.log({ department });
department.describe();

const department2 = { describe: department.describe };

department2.describe();
