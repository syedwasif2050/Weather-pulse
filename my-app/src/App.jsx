import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('karachi');
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Apni API Key yahan dalein
  const API_KEY = "0ddaeb3f6426d97c33ae5f754728761d"; 

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found!');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      setCity(search);
      fetchWeather(search);
      setSearch('');
    }
  };

  // Mausam ke hisab se CSS class select karne ke liye function
  const getWeatherClass = () => {
    if (!weatherData) return 'default-bg';
    const mainWeather = weatherData.weather[0].main.toLowerCase();
    if (mainWeather.includes('clear')) return 'sunny-bg';
    if (mainWeather.includes('cloud')) return 'cloudy-bg';
    if (mainWeather.includes('rain') || mainWeather.includes('drizzle')) return 'rainy-bg';
    if (mainWeather.includes('snow')) return 'snowy-bg';
    if (mainWeather.includes('thunderstorm')) return 'stormy-bg';
    return 'default-bg';
  };

  return (
    <div className={`app-container ${getWeatherClass()}`}>
      <div className="weather-card">
        <h2 className="app-title">Weather Pulse ⚡</h2>
        
        {/* Modern Search Bar */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </button>
        </form>

        {/* Loading Animation */}
        {loading && (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
            <p>Gathering atmospheric data...</p>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="error-message">⚠️ {error}</div>}

        {/* Dynamic Weather Display */}
        {weatherData && !loading && !error && (
          <div className="weather-info animate-fade-in">
            <span className="live-badge">LIVE</span>
            <h3 className="city-name">{weatherData.name}, {weatherData.sys.country}</h3>
            
            <div className="temp-display">
              <img 
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} 
                alt="weather icon" 
              />
              <div className="temp-number">
                <h1>{Math.round(weatherData.main.temp)}</h1>
                <span className="celsius">°C</span>
              </div>
            </div>
            
            <p className="description">{weatherData.weather[0].description}</p>
            
            <div className="grid-details">
              <div className="detail-box">
                <span>Feels Like</span>
                <strong>{Math.round(weatherData.main.feels_like)}°C</strong>
              </div>
              <div className="detail-box">
                <span>Humidity</span>
                <strong>{weatherData.main.humidity}%</strong>
              </div>
              <div className="detail-box">
                <span>Wind Speed</span>
                <strong>{weatherData.wind.speed} m/s</strong>
              </div>
              <div className="detail-box">
                <span>Pressure</span>
                <strong>{weatherData.main.pressure} hPa</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;