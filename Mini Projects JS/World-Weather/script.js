const API_KEY = "5b8b4fe9697a75ef3b316b87b08a2f91";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const elements = {
  cityInput: document.getElementById("cityInput"),
  searchBtn: document.getElementById("searchBtn"),
  loading: document.getElementById("loading"),
  error: document.getElementById("error"),
  defaultMessage: document.getElementById("defaultMessage"),
  weatherInfo: document.getElementById("weatherInfo"),
  cityName: document.getElementById("cityName"),
  weatherIcon: document.getElementById("weatherIcon"),
  temperature: document.getElementById("temperature"),
  description: document.getElementById("description"),
  feelsLike: document.getElementById("feelsLike"),
  humidity: document.getElementById("humidity"),
  windSpeed: document.getElementById("windSpeed"),
  pressure: document.getElementById("pressure"),
};

// Weather icons
const weatherIcons = {
  "01d": "☀️",
  "01n": "🌙",
  "02d": "⛅",
  "02n": "☁️",
  "03d": "☁️",
  "03n": "☁️",
  "04d": "☁️",
  "04n": "☁️",
  "09d": "🌧️",
  "09n": "🌧️",
  "10d": "🌦️",
  "10n": "🌧️",
  "11d": "⛈️",
  "11n": "⛈️",
  "13d": "❄️",
  "13n": "❄️",
  "50d": "🌫️",
  "50n": "🌫️",
};

function showLoading() {
  elements.loading.style.display = "block";
  elements.error.style.display = "none";
  // elements.defaultMessage.style.display = 'show';
  elements.weatherInfo.classList.remove("show");
}

function hideLoading() {
  elements.loading.style.display = "none";
}

function showError(message) {
  hideLoading();
  elements.error.textContent = message;
  elements.error.style.display = "block";
  // elements.defaultMessage.style.display = 'show';
  elements.weatherInfo.classList.remove("show");
}

function showWeather() {
  hideLoading();
  elements.error.style.display = "none";
  // elements.defaultMessage.style.display = 'none';
  elements.weatherInfo.classList.add("show");
}

async function fetchWeather(city) {
  try {
    showLoading();
    const response = await fetch(
      `${"https://api.openweathermap.org/data/2.5/weather"}?q=${city}&appid=${"5b8b4fe9697a75ef3b316b87b08a2f91"}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling.");
      } else {
        throw new Error("Unable to fetch weather data.");
      }
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function showDemoWeather(city) {
  const demoData = {
    name: city,
    main: {
      temp: 24,
      feels_like: 26,
      humidity: 60,
      pressure: 1015,
    },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    wind: {
      speed: 2.5,
    },
  };
  displayWeather(demoData);
}

function displayWeather(data) {
  elements.cityName.textContent = data.name;
  elements.temperature.textContent = `${Math.round(data.main.temp)}°C`;
  elements.description.textContent = data.weather[0].description;
  elements.weatherIcon.textContent = weatherIcons[data.weather[0].icon] || "🌤️";

  elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  elements.humidity.textContent = `${data.main.humidity}%`;
  elements.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  elements.pressure.textContent = `${data.main.pressure} hPa`;

  showWeather();
}

// Event listeners
elements.searchBtn.addEventListener("click", () => {
  const city = elements.cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

elements.cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = elements.cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});
