const apiKey = '5cb69850b41dec777f4e53ab5988d76b';
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityList = document.getElementById('cityList');
const addCityForm = document.getElementById('addCityForm');
const newCityInput = document.getElementById('newCityInput');
const backToWeatherButton = document.getElementById('backToWeatherButton');

const savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

// Fetch Weather for a City
async function fetchWeather(city) {
  const url = `${weatherBaseUrl}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('City not found');
  }
  return await response.json();
}

// Display Saved Cities
async function displaySavedCities() {
  cityList.innerHTML = '';
  for (const city of savedCities) {
    try {
      const weatherData = await fetchWeather(city);
      const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      cityList.innerHTML += `
        <div class="city">
          <h3>${weatherData.name}, ${weatherData.sys.country}</h3>
          <img src="${iconUrl}" alt="${weatherData.weather[0].description}">
          <p><strong>Temperature:</strong> ${weatherData.main.temp}°C</p>
          <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</p>
        </div>
      `;
    } catch {
      cityList.innerHTML += `<div class="city"><h3>${city}</h3><p>Weather data not available.</p></div>`;
    }
  }
}

// Add City to Saved List
addCityForm.addEventListener('submit', event => {
  event.preventDefault();
  const city = newCityInput.value.trim();
  if (city && !savedCities.includes(city)) {
    savedCities.push(city);
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
    displaySavedCities();
  }
  newCityInput.value = '';
});

// Back to Main Weather App
backToWeatherButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Display Saved Cities on Load
displaySavedCities();
