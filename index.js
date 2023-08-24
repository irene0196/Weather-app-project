function introduceDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayList = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayList];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = introduceDate(currentTime);

function followC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#number");
  temperatureElement.innerHTML = 14;
}
let cel = document.querySelector("#celsius");
cel.addEventListener("click", followC);

function followF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#number");
  temperatureElement.innerHTML = 66;
}
let far = document.querySelector("#fahrenheit");
far.addEventListener("click", followF);

function displayWeatherCondition(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let searchNumber = document.querySelector("#number");
  searchNumber.innerHTML = Math.round(response.data.main.temp);
  let searchHumidity = document.querySelector("#humidity");
  searchHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let searchWind = document.querySelector("#wind");
  searchWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}Km/h`;
  let searchSummary = document.querySelector("#summary");
  searchSummary.innerHTML = response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "b8ba3e735f381b54990c33403e47482a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchBar(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let city = document.querySelector("#search-input");
city.addEventListener("submit", searchBar);

function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "b8ba3e735f381b54990c33403e47482a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b8ba3e735f381b54990c33403e47482a&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
