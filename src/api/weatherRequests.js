import axios from "axios";

const API_KEY ="f87819490f0dc68a22755a6d616ea13e"

class WeatherRequests {
  getWeatherByLocation = async data => {
    let concatData ={}
    const metricResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${44.34}&lon=${10.99}&appid=${API_KEY}&units=metric`)
    const imperialResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${44.34}&lon=${10.99}&appid=${API_KEY}&units=imperial`)
    concatData.metric = {... metricResponse.data}
    concatData.imperial = {... imperialResponse.data}
    return concatData
  }
}

export default new WeatherRequests()
