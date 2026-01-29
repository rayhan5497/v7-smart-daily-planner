/**
 * V7 Smart Daily Planner - Weather Module
 * Weather display with API integration and fallback mock data
 */

const WeatherModule = (function () {
    // API Configuration
    // Replace with your OpenWeatherMap API key (optional)
    const API_KEY = ''; // Leave empty to use mock data
    const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    // Weather condition icons (SVG data URIs)
    const WEATHER_ICONS = {
        'Clear': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
        'Clouds': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"></path></svg>`,
        'Rain': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"></path></svg>`,
        'Drizzle': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="12" y1="15" x2="12" y2="17"></line><path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"></path></svg>`,
        'Thunderstorm': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0018 7h-1.26a8 8 0 10-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>`,
        'Snow': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line></svg>`,
        'Mist': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="8" x2="21" y2="8"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="16" x2="21" y2="16"></line></svg>`,
        'Fog': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="8" x2="21" y2="8"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="16" x2="21" y2="16"></line></svg>`,
        'Default': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"></path></svg>`
    };

    // Mock weather data (used when API key is not provided)
    const MOCK_WEATHER_DATA = [
        { temp: 22, condition: 'Clear', location: 'New Delhi', humidity: 45, wind: 12 },
        { temp: 18, condition: 'Clouds', location: 'Mumbai', humidity: 68, wind: 8 },
        { temp: 25, condition: 'Clear', location: 'Bangalore', humidity: 52, wind: 15 },
        { temp: 28, condition: 'Clouds', location: 'Chennai', humidity: 75, wind: 10 },
        { temp: 15, condition: 'Rain', location: 'Kolkata', humidity: 85, wind: 20 }
    ];

    // DOM Elements
    let elements = {};

    /**
     * Initialize the weather module
     */
    function init() {
        cacheElements();
        fetchWeather();
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements = {
            weatherDisplay: document.getElementById('weatherDisplay')
        };
    }

    /**
     * Fetch weather data
     */
    async function fetchWeather() {
        // Show loading state
        renderLoading();

        // If no API key, use mock data
        if (!API_KEY) {
            setTimeout(() => {
                const mockData = MOCK_WEATHER_DATA[Math.floor(Math.random() * MOCK_WEATHER_DATA.length)];
                render(mockData);
            }, 500);
            return;
        }

        // Try to get user's location
        if ('geolocation' in navigator) {
            try {
                const position = await getCurrentPosition();
                const { latitude, longitude } = position.coords;

                const response = await fetch(
                    `${API_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                );

                if (!response.ok) {
                    throw new Error('Weather API error');
                }

                const data = await response.json();
                render({
                    temp: Math.round(data.main.temp),
                    condition: data.weather[0].main,
                    location: data.name,
                    humidity: data.main.humidity,
                    wind: Math.round(data.wind.speed * 3.6) // Convert m/s to km/h
                });
            } catch (error) {
                console.error('Error fetching weather:', error);
                useFallbackData();
            }
        } else {
            useFallbackData();
        }
    }

    /**
     * Get current position as a promise
     */
    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                maximumAge: 300000 // 5 minutes cache
            });
        });
    }

    /**
     * Use fallback mock data
     */
    function useFallbackData() {
        const mockData = MOCK_WEATHER_DATA[0];
        render(mockData);
    }

    /**
     * Render loading state
     */
    function renderLoading() {
        elements.weatherDisplay.innerHTML = `
      <div class="weather-loading">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 2s linear infinite;">
          <path d="M21 12a9 9 0 11-6.219-8.56"></path>
        </svg>
        <p style="margin-top: 0.5rem;">Loading weather...</p>
      </div>
      <style>
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      </style>
    `;
    }

    /**
     * Render weather data
     */
    function render(data) {
        const icon = WEATHER_ICONS[data.condition] || WEATHER_ICONS['Default'];

        elements.weatherDisplay.innerHTML = `
      <div class="weather-icon" style="color: var(--color-primary);">
        ${icon}
      </div>
      <div class="weather-temp">
        ${data.temp}<span>°C</span>
      </div>
      <div class="weather-condition">${data.condition}</div>
      <div class="weather-location">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        ${data.location}
      </div>
      <div class="weather-details">
        <div class="weather-detail">
          <div class="weather-detail-value">${data.humidity}%</div>
          <div class="weather-detail-label">Humidity</div>
        </div>
        <div class="weather-detail">
          <div class="weather-detail-value">${data.wind} km/h</div>
          <div class="weather-detail-label">Wind</div>
        </div>
      </div>
    `;
    }

    // Public API
    return {
        init,
        render
    };
})();
