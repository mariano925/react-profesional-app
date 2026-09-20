import React from "react";
import "./WeatherCard.css";
import Forecast from "./Forecast";
import HourlyForecast from "./HourlyForecast";
import CurrentWeather from "./CurrentWeather";
import WeatherMap from "./WeatherMap";
import TemperatureChart from "./TemperatureChart";

function WeatherCard({ weather }) {
  const {
    city,
    temperature,
    apparentTemperature,
    description,
    wind,
    windDirection,
    humidity,
    pressure,
    uvIndex,
    max,
    min,
    sunrise,
    sunset,
    forecast,
    hourly,
    latitude,
    longitude,
    timezone,
  } = weather;

  return (
    <div className="weather-card">
      <CurrentWeather
        city={city}
        temperature={temperature}
        apparentTemperature={apparentTemperature}
        description={description}
        wind={wind}
        windDirection={windDirection}
        humidity={humidity}
        pressure={pressure}
        uvIndex={uvIndex}
        max={max}
        min={min}
        sunrise={sunrise}
        sunset={sunset}
        timezone={timezone}
      />

      <HourlyForecast
        hourly={hourly}
        timezone={timezone}
      />

      <TemperatureChart
        hourly={hourly}
        timezone={timezone}
      />

      <Forecast forecast={forecast} />

      <WeatherMap
        latitude={latitude}
        longitude={longitude}
        city={city}
      />
    </div>
  );
}

export default WeatherCard;