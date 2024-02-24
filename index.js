const apiKey = "1d6a1b1c2c6c3c56c03a52f79e54cda8";
const baseUrl = "http://api.openweathermap.org";
const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-button");
const iconUrl = "https://openweathermap.org/img/wn/";

searchBtn.addEventListener("click", function () {
  let city = searchBox.value;

  const url = `${baseUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let latitude = data[0].lat;
      let longitude = data[0].lon;
      getForecast(latitude, longitude);
      getTodayForecast(latitude, longitude);
    });

  searchBtn.style.backgroundcolor = "red";
});
function getForecast(lat, lon) {
  const url = `${baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
function getTodayForecast(lat, lon) {
  const url = `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      showTodayWeather(data);
    });
}

function showTodayWeather(data) {
  const h2 = document.querySelector(".city-weather h2");
  h2.classList.add("city-heading");
  h2.innerHTML = `${data.name} (${new Date(
    data.dt * 1000
  ).toLocaleDateString()}) <img class='icon-img' src='${iconUrl}${
    data.weather[0].icon
  }@2x.png'> `;

  let temperature = ` Temp: ${data.main.temp} degrees `;
  let windSpeedVar = `Wind Speed: ${data.wind.speed} MPH`;
  let humidityVar = `Humidity: ${data.main.humidity}% `;

  const cityTemp = document.querySelector(".temp");
  cityTemp.innerHTML = temperature;

  const windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = windSpeedVar;

  const humidity = document.querySelector(".humidity");
  humidity.innerHTML = humidityVar;
  ////////////////////////////////////////
  // weather blocks data ///

  const block1 = document.querySelector(".block1");
  const block1Date = block1.querySelector(".date");
  block1Date;
  block1Date.innerHTML = `${new Date(data.dt * 1000).toLocaleDateString()}`;

  const block1Icon = block1.querySelector(".icon");
  block1Icon.innerHTML = `<img class='icon-img' src='${iconUrl}${data.weather[0].icon}@2x.png'> `;
  block1Icon.style.width = "75px";

  const block1Temp = block1.querySelector(".temperature");
  block1Temp.innerHTML = temperature;

  console.log(data.list[10]);
}
