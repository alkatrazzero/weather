import axios from "axios";
import moment from 'moment'

const API_KEY ="e5a5e7114604f28c9bfa27c1f62597ea"
const BASE_URL = 'https://api.openweathermap.org'

class WeatherRequests {
  getWeatherByLocation = async (data: ILocation): Promise<IWeather> => {
    const metricResponse = await axios.get(`${BASE_URL}/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=metric`)
    const imperialResponse = await axios.get(`${BASE_URL}/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=imperial`)
    const tempGraphStatsMetric = await axios.get(`${BASE_URL}/data/2.5/forecast?q=${metricResponse.data.name}&cnt=${7}&appid=${API_KEY}&units=metric`)
    const tempGraphStatsImperial = await axios.get(`${BASE_URL}/data/2.5/forecast?q=${metricResponse.data.name}&cnt=${7}&appid=${API_KEY}&units=imperial`)
    let metricGraphData:IGraphValue[] = []
    let imperialGraphData:IGraphValue[] = []
    for( let i = 0; i < 7 ; i++ ) {
      metricGraphData.push({
        dt:Number(moment(tempGraphStatsMetric.data.list[i].dt).add(i,'days').format('x')),
        temp:Math.round(tempGraphStatsMetric.data.list[i].main.temp)
      })
      imperialGraphData.push({
        dt:Number(moment(tempGraphStatsImperial.data.list[i].dt).add(i,'days').format('x')),
        temp:Math.round(tempGraphStatsImperial.data.list[i].main.temp)
      })
    }
    const metric = metricResponse.data
    const imperial = imperialResponse.data

    let concatData:IWeather = {
      savedType: data.type || 'metric',
      metric: {
        coord: {
          lat: metric.coord.lan,
          lon: metric.coord.lon
        },
        main: {
          feels_like: metric.main.feels_like,
          humidity :metric.main.humidity,
          pressure : metric.main.pressure,
          temp: metric.main.temp,
        },
        dt:metric.dt,
        name:metric.name,
        weather: [
          {
            main:metric.weather[0].name,
            icon: metric.weather[0].icon
          }
        ],
        sys:{
          country:metric.sys.country
        },
        wind:{
          speed:metric.wind.speed
        }
      },
      imperial: {
        coord: {
          lat: imperial.coord.lan,
          lon: imperial.coord.lon
        },
        main: {
          feels_like: imperial.main.feels_like,
          humidity :imperial.main.humidity,
          pressure : imperial.main.pressure,
          temp: imperial.main.temp,
        },
        dt:imperial.dt,
        name:imperial.name,
        weather: [
          {
            main:imperial.weather[0].name,
            icon: imperial.weather[0].icon
          }
        ],
        sys:{
          country:imperial.sys.country
        },
        wind:{
          speed:imperial.wind.speed
        }
      },
      graphData:{
        metric:imperialGraphData,
        imperial:imperialGraphData
      }
    }
    if( concatData && !data.initialUpdate){
      const savedData = JSON.parse(localStorage.getItem('savedCountriesData') || '{}')
      if(Object.keys(savedData).length)localStorage.setItem('savedCountriesData', JSON.stringify({...savedData,[concatData.metric.name]:{...concatData}}))
      else localStorage.setItem('savedCountriesData',JSON.stringify({[concatData.metric.name]:{...concatData}}))
    }
    return concatData
  }

  getCountryGeocode = async (data:string): Promise<IGeocode[]> => {
    const response = await axios.get(`${BASE_URL}/geo/1.0/direct?q=${data}&limit=${11}&appid=${API_KEY}`)
    return response.data
  }
}

export default new WeatherRequests()
