function add(n1: number, n2: number) {
  if (typeof n1 !== "number" || typeof n2 !== "number") {
    throw new Error("incorrect input ");
  }
  return n1 + n2;
}

console.log(add(4, 5));
