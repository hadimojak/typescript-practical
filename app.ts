// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "ali",
//   age: 32,
//   hobbies: ["sports", "studying"],
//   role: [1, "admin"],
// };

enum Role {
  admin = "ADMIN",
  user = 0,
  reporter,
}

const person = {
  name: "ali",
  age: 32,
  hobbies: ["sports", "studying"],
  role: Role.admin,
};

// let favArr: string[];

// for (const hobby of person.hobbies) console.log(hobby);
console.log(person.role);
