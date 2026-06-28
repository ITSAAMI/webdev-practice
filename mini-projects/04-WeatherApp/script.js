const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContent = document.getElementById('weatherContent');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    weatherContent.style.display = 'none';
}

function hideError() {
    errorMessage.style.display = 'none';
}

async function getWeather(city) {
    if (!city.trim()) {
        showError('Please enter a city name.');
        return;
    }
    
    showLoading(true);
    hideError();
    
    try {
        // Mock data for demo - Replace with real API call
        const mockData = {
            'london': {
                name: 'London',
                main: { temp: 15, feels_like: 13, humidity: 72, pressure: 1013 },
                weather: [{ description: 'Cloudy' }],
                wind: { speed: 4.5 }
            },
            'paris': {
                name: 'Paris',
                main: { temp: 16, feels_like: 14, humidity: 65, pressure: 1015 },
                weather: [{ description: 'Partly Cloudy' }],
                wind: { speed: 3.2 }
            },
            'tokyo': {
                name: 'Tokyo',
                main: { temp: 22, feels_like: 20, humidity: 55, pressure: 1018 },
                weather: [{ description: 'Sunny' }],
                wind: { speed: 2.5 }
            },
            'new york': {
                name: 'New York',
                main: { temp: 18, feels_like: 16, humidity: 60, pressure: 1012 },
                weather: [{ description: 'Clear' }],
                wind: { speed: 3.8 }
            },
            'sydney': {
                name: 'Sydney',
                main: { temp: 25, feels_like: 24, humidity: 50, pressure: 1020 },
                weather: [{ description: 'Sunny' }],
                wind: { speed: 4.1 }
            }
        };
        
        const data = mockData[city.toLowerCase()];
        
        if (!data) {
            showError('City not found. Try: London, Paris, Tokyo, New York, or Sydney');
            showLoading(false);
            return;
        }
        
        displayWeather(data);
    } catch (error) {
        showError('Failed to fetch weather data. Please try again.');
        console.error('Error:', error);
    }
    
    showLoading(false);
}

function displayWeather(data) {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', dateOptions);
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${data.main.pressure} mb`;
    
    weatherContent.style.display = 'block';
    hideError();
}

searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather(cityInput.value);
    }
});