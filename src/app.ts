// import * as L from "leaflet";

const form = <HTMLFormElement>document.querySelector("form");
const countryInput = <HTMLInputElement>document.getElementById("country");
const cityInput = <HTMLInputElement>document.getElementById("city");
const street1Input = <HTMLInputElement>document.getElementById("street1");

const LOCATIONIQ_KEY = "pk.49f671cd5434809527981baab89b28ad";

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const countryName = countryInput.value;
  const cityName = cityInput.value;
  const street1Name = street1Input.value;

  const options = { method: "GET", headers: { accept: "application/json" } };

  if (!countryName || !cityName || !street1Name) throw new Error("could not fetch");

  fetch(
    `https://us1.locationiq.com/v1/search/structured?street=${street1Name}&city=${cityName}&county=${countryName}&format=json&limit=1&key=${LOCATIONIQ_KEY}`,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) throw new Error("could not fetch");

      const coordinates = { lat: data[0].lat, lon: data[0].lon };

      const map = L.map("map").setView([coordinates.lat, coordinates.lon], 13); // Default to London
      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Add a marker to the map
      const marker = L.marker([coordinates.lat, coordinates.lon]).addTo(map);

      // Add a popup to the marker
      marker.bindPopup("<b>Hello!</b><br>This is a Leaflet map.").openPopup();
    })
    .catch((err) => {
      console.error(err);
      throw new Error("could not fetch");
    });
}

form.addEventListener("submit", searchAddressHandler);
