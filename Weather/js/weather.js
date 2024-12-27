const apiKey = '5cb69850b41dec777f4e53ab5988d76b';
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastBaseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const forecastInfo = document.getElementById('forecast');

// Fetch Current Weather
async function fetchWeather(city) {
  const url = `${weatherBaseUrl}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('City not found');
  }
  return await response.json();
}

// Fetch 7-Day Forecast
async function fetchForecast(city) {
  const url = `${forecastBaseUrl}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Forecast not available');
  }
  return await response.json();
}

// Display Current Weather
function displayWeather(data) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="${data.weather[0].description}">
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}

// Display 7-Day Forecast
function displayForecast(data) {
  const days = {};
  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) {
      days[date] = item;
    }
  });

  forecastInfo.innerHTML = '';
  Object.values(days).forEach(day => {
    const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    forecastInfo.innerHTML += `
      <div class="card">
        <h4>${day.dt_txt.split(' ')[0]}</h4>
        <img src="${iconUrl}" alt="${day.weather[0].description}">
        <p><strong>${day.main.temp}°C</strong></p>
        <p>${day.weather[0].description}</p>
      </div>
    `;
  });
}

// Handle Form Submission
form.addEventListener('submit', event => {
  event.preventDefault();
  const city = cityInput.value.trim();
  weatherInfo.innerHTML = `<p>Loading...</p>`;
  forecastInfo.innerHTML = '';
  fetchWeather(city)
    .then(data => {
      displayWeather(data);
      return fetchForecast(city);
    })
    .then(displayForecast)
    .catch(error => {
      weatherInfo.innerHTML = `<p>${error.message}</p>`;
    });
});
