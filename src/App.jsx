/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";

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
          setWeather({ ...weather, data: {}, error: true });
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
    </div>
  );
}

export default App;
