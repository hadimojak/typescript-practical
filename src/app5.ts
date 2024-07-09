// function add(n1: number, n2: number) {
//   return n1 + n2;
// }

// const num1 = 4;
// const num2 = 5.5;
// console.log(add(num1, num2));

const arr: { name?: string; age?: number }[] = [{ age: 34 }, { name: "asdasd" }];

const myTuple: [number, string] = [2, "3"];

myTuple.push("asdasd");

enum myEnum {
  hadi = "asdasd",
  ali = "a2222",
}

const obj: any = [123, 234];

// function reportFn(mes:string,num:number){}

function afterSubmit(num: number, mes: string, reportFn: (num: number, message: string) => string): string {
  const result = reportFn(num, mes);
  return result;
}

// console.log(
//   afterSubmit(123, "hellow", (mes: number, num: string) => {
//     return `${mes}: ${num}`;
//   })
// );

function errorThrow(message: string, code: number): never {
  throw { message, code };
}

errorThrow("hellow", 12);
