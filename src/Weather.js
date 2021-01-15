import React, { useState, useEffect } from 'react';
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
      // console.log(data);    
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
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=018c97d6cc253f65fa3f407c8e0fc518&units=metric`)
      .then(response => response.json())
      .then(setWeather);
  };
  const error = (err) => { console.log(err); }
  // navigator.geolocation.getCurrentPosition(success, console.log);

  useEffect(() => {
    // console.log("use EFFECT");  
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);



  var change = document.getElementsByTagName("body")[0];
  useEffect(() => {
    console.log(weather);
    // console.log(weather !== 'undefined' ? 'weather is null or undefined' : "LENGTH: " + weather.weather.length);

    if (Object.keys(weather).length === 0) {
      console.log("hello");
      return;
    }

    else {
      console.log("pooohh");
      // console.log("LENGTH: " + weather.weather.length)
      if (weather.weather[0].main === 'Clouds') {
        change.style.backgroundImage = "url('./Pics/snow.jpg')";
        document.getElementsByTagName('body')[0].style.background = "url('./Pics/snow.jpg')";
        // change.style.backgroundColor = "red";
      }
      /*  else if (weather.weather[0].main === 'Snow') {
         document.getElementsByTagName('body')[0].style.backgroundImage = "url('./Pics/haze.jpg')";
         // change.style.backgroundColor = "pink";
       } */
      else if (weather.weather[0].main === 'Clear') {
        // document.body.style.backgroundColor = "#f7797d";
        document.body.style.backgroundImage = "url('snow.jpg')";
        // document.querySelector('body').style.background = "url('./Pics/clear.jpg')";
      }
    }

  }, [weather]);








  return (
    <div >
      <div className="row justify-content-center">
        <div className="heading ">
          <h2> <img className="hat" src={Hat} alt="hi" />What's the Forecast ?? </h2>
        </div>

        <div className="app-main container">
          <div className="searchInputBox">
            <input type="text"
              className="input-box"
              placeholder="Enter city ...."
              value={val}
              onChange={(e) => /* console.log(e.target.value) */ setval(e.target.value)} onKeyPress={search} />
          </div>

          {/* if weather is true(means NOT NULL) tn only it will execute */}
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
                  {(weather.main.temp)}&deg;C          {/* Math.round*/}
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