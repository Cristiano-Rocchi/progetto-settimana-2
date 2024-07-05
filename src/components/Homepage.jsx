import React, { useState } from "react";
import { Card, CardBody, CardText } from "react-bootstrap";
import Search from "./Search";

const Homepage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [previsioniData, setPrevisioniData] = useState([]);

  const fetchWeatherData = async (location) => {
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=6da7eee9a45c0d2282620aa60ef43b5e`
      );
      const geoData = await geoResponse.json();

      const { lat, lon, name } = geoData[0];

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6da7eee9a45c0d2282620aa60ef43b5e&units=metric`
      );
      const weatherData = await weatherResponse.json();

      setWeatherData({
        temperature: Math.round(weatherData.main.temp).toFixed(0),
        city: name,
        date: new Date().toLocaleDateString(),
      });

      const previsioniResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6da7eee9a45c0d2282620aa60ef43b5e&units=metric`
      );
      const previsioniData = await previsioniResponse.json();

      setPrevisioniData(previsioniData.list.slice(1, 5));
    } catch (error) {
      console.error("Errore durante il recupero dei dati:", error);
    }
  };

  return (
    <>
      <Search onSearch={fetchWeatherData} />
      {weatherData && (
        <div id="homepage">
          <h3>{weatherData.date}</h3>
          <div>{weatherData.temperature}°C</div>
          <h2>{weatherData.city}</h2>
        </div>
      )}
      <div id="homeCard">
        {previsioniData.map((previsione, index) => (
          <Card key={index}>
            <CardBody>
              <CardText>
                <div>{new Date(previsione.dt * 1000).toLocaleDateString()}</div>
                <h1>{new Date(previsione.dt * 1000).getHours()}:00</h1>
                <div>{previsione.weather[0].main}</div>
                <div>{Math.round(previsione.main.temp)}°C</div>
              </CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Homepage;
