import axios from 'axios';  // retrive data <---- http request

// api.openweathermap.org / data / 2.5 / weather ? q = { city name } & appid={ API key }
// https://api.openweathermap.org/data/2.5/weather?q=Denmark&appid=1ab3e8ddd070fc9458c66e71b0a3b222&units=metric

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '018c97d6cc253f65fa3f407c8e0fc518';

export const fetchWeather = async (val) => {
    const { data } = await axios.get(URL, {
        params: {
            q: val,
            units: 'metric',
            APPID: API_KEY,
        }
    });
    return data;
}