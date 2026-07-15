import React, { useState, useEffect } from 'react';
import './App.css'; // Styling ke liye

function App() {
  const [city, setCity] = useState('Lahore'); // Default city
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

  // Jab page pehli baar load ho toh default city ka weather dikhaye
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

  return (
    <div className="app-container">
      <div className="weather-card">
        <h2>Weather Forecast 🌦️</h2>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter city name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Loading State */}
        {loading && <p className="loading">Loading data...</p>}

        {/* Error Message */}
        {error && <p className="error-message">⚠️ {error}</p>}

        {/* Weather Data Display */}
        {weatherData && !loading && !error && (
          <div className="weather-info">
            <h3>{weatherData.name}, {weatherData.sys.country}</h3>
            <div className="temp-container">
              <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt="weather icon" 
              />
              <h1>{Math.round(weatherData.main.temp)}°C</h1>
            </div>
            <p className="description">{weatherData.weather[0].description}</p>
            
            <hr />
            
            <div className="details">
              <div>
                <p>Humidity</p>
                <strong>{weatherData.main.humidity}%</strong>
              </div>
              <div>
                <p>Wind Speed</p>
                <strong>{weatherData.wind.speed} m/s</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;