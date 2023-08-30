type Print = (num: number) => void;

function add(num1: number, num2: number) {
  return num1 + num2;
}

function printRes(num: number) {
  console.log(num);
}

function addAndHanle(n1, n2, cb: (num) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHanle(5, 4, printRes);
