//Feature #1
function currentDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function showWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );

  //document.querySelector("#humidity").innerHTML = Math.round(
  //response.data.humidity.speed
  //);

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function makeSubmition(event) {
  event.preventDefault();
  let city = document.querySelector("#cityWeatherForecast").value;
  let h2 = document.querySelector("#city");

  if (city.value) {
    h2.innerHTML = city.value;
  } else {
    h2.innerHTML = null;
    alert("Please type city name !");
  }
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "548d49c1c558397f60419672a958837";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function getNowLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let instantTime = new Date();
dateElement.innerHTML = currentDate(instantTime);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", makeSubmition);

let currentLocationSubmit = document.querySelector("#current-location");
currentLocationSubmit.addEventListener("click", getNowLocation);

searchCity("Gaborone");

//Bonus Feature
//function clickCelcius(event) {
//event.preventDefault();
//let reading = document.querySelector("#degree");
//reading.innerHTML = 70;
//}

//function clickFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#degree");
//temperatureElement.innerHTML = 20;
//}

//let celciustemp = document.querySelector("#key2");
//celciustemp.addEventListener("click", clickCelcius);

//let fahrenheittemp = document.querySelector("#key")
//fahrenheittemp.addEventListener("click", clickFahrenheit);
