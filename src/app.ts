const button = document.querySelector("button");

function clickHandler(message: string) {
  console.log("cliecked  " + message);
}

if (button) {
  button.addEventListener("click", clickHandler.bind(null, "hellow"));
}
