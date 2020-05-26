const api = {
  key: "cd70d5c50323c16355d5483df1ed22eb",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchBox.value);
    searchBox.value = "";
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)} <span>&deg;с</span>`;
  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;
  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)} °с / ${Math.round(
    weather.main.temp_max
  )} °с`;
}

function dateBuilder(d) {
  let months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень"
  ];
  let days = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П’ятниця",
    "Субота"
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

getResults("Obukhiv");
