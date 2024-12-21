const apiKey = '5cb69850b41dec777f4e53ab5988d76b'; // Replace with your OpenWeatherMap API key
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastBaseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const forecastInfo = document.getElementById('forecast');

async function fetchWeather(city) {
  const url = `${weatherBaseUrl}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('City not found');
  return await response.json();
}

async function fetchAndDisplayWeather(city) {
  try {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  fetchAndDisplayWeather(city);
});
