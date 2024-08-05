const divEl = document.getElementById("app") as HTMLDivElement;

divEl.innerHTML = "<p>hellow sag</p>";

const btn = document.getElementById("button") as HTMLButtonElement;
function clickHandler(message: string) {
  console.log(message + ": clicked");
}

btn.addEventListener("click", clickHandler.bind(null, "there"));
