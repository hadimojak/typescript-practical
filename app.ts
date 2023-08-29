function add(
  n1: number | string,
  n2: number | String,
  resultType: "number" | "string"
) {
  if (resultType === "number") {
    return `${resultType} is  ${+n1 + +n2}`;
  }
  if (resultType === "string") {
    return `${resultType} is ${n1.toString() + n2.toString()}`;
  }
}

const num1 = 7;
const num2 = 4;

const result = add(num1, num2, 'number');
console.log(result);

console.log(add("hellow", " there", "string"));

console.log(add("6", "5", "number"));
