import { useState } from "react";
import { Card, CardBody, CardText, Col, Container, Row } from "react-bootstrap";
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
          <div className="pb-5">
            <div className="head d-flex justify-content-between">
              <div className="position-relative logo">
                <h1 className="text-white position-relative ">
                  CLIMA ALERT APP
                </h1>
                <div>
                  <svg
                    className="position-absolute logoSvg"
                    id="underlineSvg"
                    width="390.5px"
                    height="21.5px"
                    viewBox="0 0 445.5 21.5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#d6f94d"
                      d="M409.9,2.6c-9.7-0.6-19.5-1-29.2-1.5c-3.2-0.2-6.4-0.2-9.7-0.3c-7-0.2-14-0.4-20.9-0.5 c-3.9-0.1-7.8-0.2-11.7-0.3c-1.1,0-2.3,0-3.4,0c-2.5,0-5.1,0-7.6,0c-11.5,0-23,0-34.5,0c-2.7,0-5.5,0.1-8.2,0.1 c-6.8,0.1-13.6,0.2-20.3,0.3c-7.7,0.1-15.3,0.1-23,0.3c-12.4,0.3-24.8,0.6-37.1,0.9c-7.2,0.2-14.3,0.3-21.5,0.6 c-12.3,0.5-24.7,1-37,1.5c-6.7,0.3-13.5,0.5-20.2,0.9C112.7,5.3,99.9,6,87.1,6.7C80.3,7.1,73.5,7.4,66.7,8C54,9.1,41.3,10.1,28.5,11.2 c-2.7,0.2-5.5,0.5-8.2,0.7c-5.5,0.5-11,1.2-16.4,1.8c-0.3,0-0.7,0.1-1,0.1c-0.7,0.2-1.2,0.5-1.7,1 C0.4,15.6,0,16.6,0,17.6c0,1,0.4,2,1.1,2.7c0.7,0.7,1.8,1.2,2.7,1.1c6.6-0.7,13.2-1.5,19.8-2.1c6.1-0.5,12.3-1,18.4-1.6 c6.7-0.6,13.4-1.1,20.1-1.7c2.7-0.2,5.4-0.5,8.1-0.7c10.4-0.6,20.9-1.1,31.3-1.7c6.5-0.4,13-0.7,19.5-1.1c2.7-0.1,5.4-0.3,8.1-0.4 c10.3-0.4,20.7-0.8,31-1.2c6.3-0.2,12.5-0.5,18.8-0.7c2.1-0.1,4.2-0.2,6.3-0.2c11.2-0.3,22.3-0.5,33.5-0.8 c6.2-0.1,12.5-0.3,18.7-0.4c2.2-0.1,4.4-0.1,6.7-0.1c11.5-0.1,23-0.2,34.6-0.4c7.2-0.1,14.4-0.1,21.6-0.1c12.2,0,24.5,0.1,36.7,0.1 c2.4,0,4.8,0.1,7.2,0.2c6.8,0.2,13.5,0.4,20.3,0.6c5.1,0.2,10.1,0.3,15.2,0.4c3.6,0.1,7.2,0.4,10.8,0.6c10.6,0.6,21.1,1.2,31.7,1.8 c2.7,0.2,5.4,0.4,8,0.6c2.9,0.2,5.8,0.4,8.6,0.7c0.4,0.1,0.9,0.2,1.3,0.3c1.1,0.2,2.2,0.2,3.2-0.4c0.9-0.5,1.6-1.5,1.9-2.5 c0.6-2.2-0.7-4.5-2.9-5.2c-1.9-0.5-3.9-0.7-5.9-0.9c-1.4-0.1-2.7-0.3-4.1-0.4c-2.6-0.3-5.2-0.4-7.9-0.6 C419.7,3.1,414.8,2.9,409.9,2.6z"
                    ></path>
                  </svg>
                </div>
                <p>Developed by kun</p>
              </div>
              <div>
                <div className=" d-flex rounded-pill py-3 px-5 buttonCity">
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
            </div>
            <div className="text-white d-flex justify-content-center mt-5 ">
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
            <div className="rounded-3 nextHour px-4">Next Hours</div>
          </article>
          <section id="previsioni">
            <Row className="mt-5">
              {previsioniData.map((previsione, index) => (
                <Col key={index}>
                  <Card className="cardStyle rounded-pill">
                    <CardBody>
                      <CardText>
                        <div className="opacity-50">
                          {new Date(previsione.dt * 1000).toLocaleDateString()}
                        </div>
                        <h1 className="fs-3">
                          {new Date(previsione.dt * 1000).getHours()}:00
                        </h1>
                        <div className="opacity-50">
                          {previsione.weather[0].main}
                        </div>
                        <div className="fs-2">
                          {Math.round(previsione.main.temp)}°C
                        </div>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </div>
      )}

      {/* <Row id="homeCard">
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
      </Row> */}
    </Container>
  );
};

export default Homepage;
