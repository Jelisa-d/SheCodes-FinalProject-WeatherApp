function showCurrentDate(date) {
  let weekDays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let allMonths = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let day = weekDays[date.getDay()];
  let month = allMonths[date.getMonth()];
  let currentDate = date.getDate();
  return `${day} ${currentDate} ${month}`;
};

function showCurrentTime(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  };
  if (minutes < 10) {
    minutes = `0${minutes}`;
  };
  return `${hour}:${minutes}`;
};

let now = new Date();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = showCurrentDate(now);

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = showCurrentTime(now);


function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=926d7c030f98479669418fa4cb14101f&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getApi(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-a-city").value;
  search(city);
};

function showWeather(response) {
  console.log(response.data);
  let city = document.querySelector("h3");
  let citySearch = response.data.name;
  city.innerHTML = citySearch;

  let degrees = document.querySelector("#number-degrees");
  let temperature = response.data.main.temp;
  degrees.innerHTML = Math.round(temperature);

  let description = document.querySelector("#weather-description")
  let descriptionWeather = response.data.weather[0].description;
  description.innerHTML = descriptionWeather;

  let max = document.querySelector("#max-temperature");
  let maxTemp = response.data.main.temp_max;
  max.innerHTML = Math.round(maxTemp);

  let min = document.querySelector("#min-temperature");
  let minTemp = response.data.main.temp_min;
  min.innerHTML = Math.round(minTemp);

  let humidity = document.querySelector("#humidity");
  let humidityOutput = response.data.main.humidity;
  humidity.innerHTML = humidityOutput;

  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
};

let cityInput = document.querySelector("#enter-a-city-form");
cityInput.addEventListener("submit", getApi);

search("Amsterdam")