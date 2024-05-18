/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";

const toDateFunction = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const WeekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  }`;
  return date;
};

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: false,
    error: false,
  });

  const search = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = "e3ac65eb7cc6f07bbcb9f5cb77b77c66";

      await axios
        .get(url, {
          params: { q: input, units: "metric", appid: api_key },
        })
        .then((res) => {
          console.log("res", res);
          setWeather({
            ...weather,
            data: res.data,
            loading: false,
            error: false,
          });
        })
        .catch((err) => {
          setWeather({ ...weather, loading: false, data: {}, error: true });
          setInput("");
          console.log("error", err);
        });
    }
  };

  return (
    <div className="App">
      <h1 className="app-name">Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter city Name.."
          name="query"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={search}
        />
      </div>
      {weather.loading && (
        <Fragment>
          <br />
          <br />
          <Oval type="oval" color="green" height={80} width={80} />
        </Fragment>
      )}
      {weather.error && (
        <Fragment>
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: "20px" }}>City not found</span>
          </span>
        </Fragment>
      )}
      {weather && weather.data && weather.data.main && (
        <div>
          {" "}
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
