import { useEffect, useState } from "react";
import "./App.css";
import { WeatherCard } from "./components/weatherCard";

const API_KEY = "304335653f0e4016a8693431231407";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setweatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(event.target.elements.city.value);
  };

  const fetchWeatherData = async (city) => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Handle the data returned by the API
      setweatherData(data);
    } catch (error) {
      // Handle errors
      alert("Failed to fetch weather data");
      setweatherData(null);
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  return (
    <>
      <form className="serach-container" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter city name" name="city" />
        <button className="search-btn">Search</button>
      </form>
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className="weather-conatiner">
          <WeatherCard
            title={"Temperture"}
            data={`${weatherData.current.temp_c}°C`}
          />
          <WeatherCard
            title={"Humidity"}
            data={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title={"Condition"}
            data={weatherData.current.condition.text}
          />
          <WeatherCard
            title={"Wind Speed"}
            data={`${weatherData.current.wind_kph} kph`}
          />
        </div>
      )}
    </>
  );
}

export default App;
