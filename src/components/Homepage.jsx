import { useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import Search from "./Search";

const Homepage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [previsioniData, setPrevisioniData] = useState([]);

  const fetchWeatherData = async (location) => {
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=10&appid=6da7eee9a45c0d2282620aa60ef43b5e`
      );
      const geoData = await geoResponse.json();

      const { lat, lon, name } = geoData[0];

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6da7eee9a45c0d2282620aa60ef43b5e&units=metric`
      );
      const weatherData = await weatherResponse.json();

      setWeatherData({
        temperature: Math.round(weatherData.main.temp),
        city: name,
        date: new Date().toLocaleDateString(),
        minima: Math.round(weatherData.main.temp_min),
        massima: Math.round(weatherData.main.temp_max),
        umidita: Math.round(weatherData.main.humidity),
        vento: weatherData.wind.speed,
        pressione: weatherData.main.pressure,
      });

      const previsioniResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6da7eee9a45c0d2282620aa60ef43b5e&units=metric`
      );
      const previsioniData = await previsioniResponse.json();

      setPrevisioniData(previsioniData.list.slice(1, 7));
    } catch (error) {
      console.error("Errore durante il recupero dei dati:", error);
    }
  };

  return (
    <Container>
      <Search onSearch={fetchWeatherData} />
      {weatherData && (
        <div id="homepage">
          <div>
            <div className="d-flex justify-content-end">
              <div className="btn btn-warning d-flex rounded-pill py-3 px-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                  width="20px"
                >
                  <path
                    d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
                    fill="black"
                    stroke="black"
                  />

                  <circle cx="256" cy="192" r="48" fill="black" />
                </svg>
                <div className="fs-4 ms-1">
                  <strong>{weatherData.city.toUpperCase()}</strong> •{" "}
                  {weatherData.date}
                </div>
              </div>
            </div>
            <div className="text-white d-flex justify-content-center ">
              <div className="position-relative temperatura">
                {weatherData.temperature}
                <span className="position-absolute">°</span>
              </div>
            </div>
            <section className="d-flex justify-content-center">
              <article className="border border-white rounded-4 col-5 cardInfo">
                <div className="d-flex justify-content-around mt-4 mb-3">
                  <div className="d-flex">
                    <div className="me-1 mt-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" stroke="white" />

                        <line x1="12" y1="6" x2="12" y2="12" stroke="white" />

                        <line x1="14" y1="12" x2="12" y2="12" stroke="white" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="mb-0 opacity-50 fs-5">Pressure</h5>
                      <p className="fs-4">{weatherData.pressione}mb</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="me-1 mt-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 8.5C20 7.1 18.9 6 17.5 6C16.1 6 15 7.1 15 8.5C15 9.32843 14.3284 10 13.5 10H3"
                          stroke="white"
                        />
                        <path
                          d="M20 15.5C20 14.1 18.9 13 17.5 13C16.1 13 15 14.1 15 15.5C15 16.3284 14.3284 17 13.5 17H0"
                          stroke="white"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="mb-0 opacity-50 fs-5">Wind</h5>
                      <p className="fs-4">{weatherData.vento}km/h</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-around mb-4">
                  <div className="d-flex">
                    <div className="me-1 mt-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="4" stroke="white" />
                        <line x1="12" y1="2" x2="12" y2="4" stroke="white" />
                        <line x1="12" y1="20" x2="12" y2="22" stroke="white" />
                        <line
                          x1="4.222"
                          y1="4.222"
                          x2="5.636"
                          y2="5.636"
                          stroke="white"
                        />
                        <line
                          x1="18.364"
                          y1="18.364"
                          x2="19.778"
                          y2="19.778"
                          stroke="white"
                        />
                        <line x1="2" y1="12" x2="4" y2="12" stroke="white" />
                        <line x1="20" y1="12" x2="22" y2="12" stroke="white" />
                        <line
                          x1="4.222"
                          y1="19.778"
                          x2="5.636"
                          y2="18.364"
                          stroke="white"
                        />
                        <line
                          x1="18.364"
                          y1="5.636"
                          x2="19.778"
                          y2="4.222"
                          stroke="white"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="mb-0 opacity-50 fs-5">Min/Max</h5>
                      <p className="fs-4">
                        {weatherData.minima}° {weatherData.massima}°
                      </p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="me-1 mt-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C12 2 4 10 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 10 12 2 12 2Z"
                          stroke="white"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="mb-0 opacity-50 fs-5">Humidity</h5>
                      <p className="fs-4">{weatherData.umidita} %</p>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          </div>
          <article className="d-flex justify-content-center mt-5">
            <div className="btn btn-warning nextHour">Next Hours</div>
          </article>
        </div>
      )}

      <Row id="homeCard">
        {previsioniData.map((previsione, index) => (
          <Col key={index}>
            <Card>
              <CardBody>
                <CardText>
                  <div className="opacity-50">
                    {new Date(previsione.dt * 1000).toLocaleDateString()}
                  </div>
                  <h1>{new Date(previsione.dt * 1000).getHours()}:00</h1>
                  <div className="opacity-50">{previsione.weather[0].main}</div>
                  <div>{Math.round(previsione.main.temp)}°C</div>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Homepage;
