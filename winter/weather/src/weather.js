const API_KEY = "YOUR_API_KEY";

export async function fetchWeather(location) {
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebDataServices/rest/services/timeline/" +
    encodeURIComponent(location) +
    "?unitGroup=metric&key=" +
    API_KEY +
    "&contentType=json";

  const response = await fetch(url);
  if (!response.ok) throw new Error("Location not found");
  const data = await response.json();
  return processWeather(data);
}

function processWeather(data) {
  const current = data.currentConditions;
  return {
    location: data.resolvedAddress,
    temp: current.temp,
    feelsLike: current.feelslike,
    humidity: current.humidity,
    wind: current.windspeed,
    condition: current.conditions,
    icon: current.icon,
  };
}
