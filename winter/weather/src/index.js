import "./style.css";
import { fetchWeather } from "./weather.js";

const form = document.getElementById("search-form");
const input = document.getElementById("location-input");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const weatherDiv = document.getElementById("weather");

function showLoading() {
  loadingDiv.classList.remove("hidden");
  errorDiv.classList.add("hidden");
  weatherDiv.classList.add("hidden");
}

function showError(msg) {
  loadingDiv.classList.add("hidden");
  errorDiv.classList.remove("hidden");
  errorDiv.textContent = msg;
  weatherDiv.classList.add("hidden");
}

function showWeather(data) {
  loadingDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");
  weatherDiv.classList.remove("hidden");

  weatherDiv.innerHTML = "";

  const location = document.createElement("h2");
  location.textContent = data.location;

  const condition = document.createElement("p");
  condition.classList.add("condition");
  condition.textContent = data.condition;

  const temp = document.createElement("p");
  temp.classList.add("temp");
  temp.textContent = Math.round(data.temp) + "\u00B0C";

  const details = document.createElement("div");
  details.classList.add("details");

  const feelsLike = document.createElement("p");
  feelsLike.textContent = "Feels like: " + Math.round(data.feelsLike) + "\u00B0C";

  const humidity = document.createElement("p");
  humidity.textContent = "Humidity: " + data.humidity + "%";

  const wind = document.createElement("p");
  wind.textContent = "Wind: " + data.wind + " km/h";

  details.appendChild(feelsLike);
  details.appendChild(humidity);
  details.appendChild(wind);

  weatherDiv.appendChild(location);
  weatherDiv.appendChild(condition);
  weatherDiv.appendChild(temp);
  weatherDiv.appendChild(details);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (!location) return;

  showLoading();

  try {
    const data = await fetchWeather(location);
    console.log(data);
    showWeather(data);
  } catch (err) {
    showError("Could not find weather for that location.");
  }
});
