const form = <HTMLFormElement>document.querySelector("form");
const addressInput = <HTMLInputElement>document.getElementById("address");

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  console.log({ enteredAddress });
}

form.addEventListener("submit", searchAddressHandler);
