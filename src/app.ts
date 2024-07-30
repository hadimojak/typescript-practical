const divEl = document.getElementById("app") as HTMLDivElement;

divEl.innerHTML = "<p>hellow sag</p>";

const btn = document.getElementById("button") as HTMLButtonElement;

btn.addEventListener("click", (val) => {
  console.log(val.target);
});
