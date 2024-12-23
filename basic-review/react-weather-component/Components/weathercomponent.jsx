import React, { useState } from 'react';
import { Search, Droplet, Wind } from 'lucide-react';
import styles from './weathercomponent.module.css';

const WeatherComponent = ({ apiKey, BG='linear-gradient(135deg, #6e8efb, #a777e3)' }) => {
  const [city, setCity] = useState(''); // User-inputted city
  const [weather, setWeather] = useState(null); // Weather data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      console.log(data)
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather when user presses "Enter"
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className={styles.container} style={{background: BG}}>
      <h1 className={styles.title}>Weather Forecast</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.searchInput}
        />
        <button onClick={fetchWeather} className={styles.searchButton}>
          <Search size={20} />
        </button>
      </div>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {weather && (
        <div className={styles.weatherInfo}>
          <h2 className={styles.cityName}>{weather.location.name}</h2>
          <div className={styles.weatherMain}>
            <img src={weather.current.condition.icon} alt="weather-icon" className={styles.weatherIcon} />
            <div className={styles.temperature}>
              <span className={styles.tempC}>{weather.current.temp_c}°C</span>
              <span className={styles.tempF}>{weather.current.temp_f}°F</span>
            </div>
          </div>
          <p className={styles.condition}>{weather.current.condition.text}</p>
          <div className={styles.weatherDetails}>
            <div className={styles.detail}>
              <Droplet size={20} />
              <span>Humidity: {weather.current.humidity}%</span>
            </div>
            <div className={styles.detail}>
              <Wind size={20} />
              <span>Wind: {weather.current.wind_kph} km/h {weather.current.wind_dir}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
