import axios from "axios";

const API_KEY ="e5a5e7114604f28c9bfa27c1f62597ea"
const BASE_URL = 'https://api.openweathermap.org'

class WeatherRequests {
  getWeatherByLocation = async (data: ILocation): Promise<IWeather> => {
    let concatData: IWeather
    const metricResponse = await axios.get(`${BASE_URL}/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=metric`)
    const imperialResponse = await axios.get(`${BASE_URL}/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=imperial`)
    concatData = {
      savedType: data.type || 'metric',
      metric: {...metricResponse.data},
      imperial: {...imperialResponse.data}
    }
    if( concatData && !data.initialUpdate){
      const savedData = JSON.parse(localStorage.getItem('savedCountriesData') || '{}')
      if(Object.keys(savedData).length)localStorage.setItem('savedCountriesData', JSON.stringify({...savedData,[concatData.metric.name]:{lon:data.lon,lat:data.lat}}))
      else localStorage.setItem('savedCountriesData',JSON.stringify({[concatData.metric.name]:{lon:data.lon,lat:data.lat}}))
    }
    return concatData
  }

  getCountryGeocode = async (data:string): Promise<IGeocode[]> => {
    const response = await axios.get(`${BASE_URL}/geo/1.0/direct?q=${data}&limit=${11}&appid=${API_KEY}`)
    return response.data
  }
}

export default new WeatherRequests()
