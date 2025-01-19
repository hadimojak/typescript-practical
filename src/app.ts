const form = <HTMLFormElement>document.querySelector("form");
const addressInput = <HTMLInputElement>document.getElementById("address");

const LOCATIONIQ_KEY = "pk.49f671cd5434809527981baab89b28ad";

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  const options = {method: 'GET', headers: {accept: 'application/json'}};

  fetch('https://us1.locationiq.com/v1/search/structured?street=30%20metri%20nirooye%20havayi&city=tehran&county=iran&key=pk.49f671cd5434809527981baab89b28ad', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

  console.log({ enteredAddress });
}

form.addEventListener("submit", searchAddressHandler);
