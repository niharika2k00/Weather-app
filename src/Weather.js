import React, { useState } from 'react';
import { fetchWeather } from './Api/fetchWeather';
import './Weather.css';
import Hat from "./hatred.svg";

function Weather() {

  const [val, setval] = useState('');
  const [weather, setWeather] = useState({});
  const [date, setdate] = useState('');

  const search = async (e) => {

    if (e.key === 'Enter') {
      const data = await fetchWeather(val);
      // console.log(data.dt);
      console.log((new Date(data.dt * 1000 - (data.timezone * 1000))).toString());
      const k = ((new Date(data.dt * 1000 - (data.timezone * 1000))).toString());
      setdate(k);
      setWeather(data);
      setval('');
    }
  }

  // navigator.geolocation.getCurrentPosition() -----> method to get the position of the device
  // navigator.geolocation.getCurrentPosition(console.log, console.log);

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=018c97d6cc253f65fa3f407c8e0fc518`)
      .then(response => response.json())
      .then(console.log);
  };
  navigator.geolocation.getCurrentPosition(success, console.log);



  return (
    <div >
      <div className="row justify-content-center">
        <div className="heading ">
          <h2> <img className="hat" src={Hat} />What's the Forecast ?? </h2>
        </div>

        <div className="app-main container">
          <div className="searchInputBox">
            <input type="text"
              className="input-box"
              placeholder="Enter city ...."
              value={val}
              onChange={(e) => /* console.log(e.target.value) */ setval(e.target.value)} onKeyPress={search} />
          </div>

          {weather.main && (
            <div className="weather-body">
              <div className="location-details">
                <div className="city" >
                  <span>{weather.name}</span>
                  <sup>{weather.sys.country}</sup>
                </div>
                <div className="date">  {date}  </div>
              </div>

              <div className="weather-status">
                <div className="temp" >
                  {Math.round(weather.main.temp)}&deg;C
                </div>
                <div className="min-max" >
                  {Math.floor(weather.main.temp_min)}<sup>&deg;C</sup>(min)/
                  {Math.ceil(weather.main.temp_max)}<sup>&deg;C</sup> (max)
                </div>

                <div className="weather" >{weather.weather[0].description}</div>
                <div id="img">
                  <img
                    className="city-icon"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description} />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div >
  )
}

export default Weather;

/*
<div className="weather-body">
  <div className="location-details">
    <div className="city" id="city">KOLKATA, IN</div>
    <div className="date" id="date">10 June (Wednesday), 2020</div>
  </div>

  <div className="weather-status">
    <div className="temp" id="temp">34&deg;C</div>
    <div className="min-max" id="min-max">32&deg;C (min) / 34&deg;C (max)</div>
    <div className="weather" id="weather">Clear</div>
    <div id="img"></div>
  </div>
</div> */



/* if (weather.weather[0].description == 'Clear') {
  body.style.backgroundImage = "url('')";

} else if (weather.weather[0].description == 'Clouds') {


} else if (weather.weather[0].description == 'Haze') {


} else if (weather.weather[0].description == 'Rain') {


} else if (weather.weather[0].description == 'Snow') {


} else if (weather.weather[0].description == 'Thunderstorm') {

}  */