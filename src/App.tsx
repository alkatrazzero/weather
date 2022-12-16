import  React,{useEffect,useState} from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./styles.css";
import { Audio } from 'react-loader-spinner'
import weatherRequests from './api/weatherRequests'
import { WeatherCard } from "./components/WeatherCard";
import { AddWeatherCard } from "./components/AddWeatherCard";
import { addWeatherData } from "./store/actionCreators";
import { Dispatch } from "redux";

const App: React.FC = () => {
  const weatherData: readonly IWeather[] = useSelector((state: WeatherDataState) => state.weatherData)
  const dispatch: Dispatch<any> = useDispatch();
  const [loading,setLoading] = useState<boolean>(false)

  const saveWeatherData = (weatherData: IWeather) => dispatch(addWeatherData(weatherData))

  const getWeatherByLocation = async(lat:number,lon:number,initialUpdate?:boolean,type?:string) => {
    const response = await weatherRequests.getWeatherByLocation({lat,lon,initialUpdate,type})
    dispatch(addWeatherData(response))

  }

  const getCountryGeocode =async(city:string) => {
    return await weatherRequests.getCountryGeocode(city)
  }

  function showPosition(position: any) {
    console.log(position)
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('emty')
    }
  }

  useEffect(()=>{
    getLocation()
    async function asyncGetData() {
      const savedData = JSON.parse(localStorage.getItem('savedCountriesData')|| '{}')
      if(Object.keys(savedData).length){
        setLoading(true)
        for (let location in savedData) {
          const object: IGeocode = savedData[location]
          await getWeatherByLocation(Number(object.lat),Number(object.lon),true,object.type)
        }
        setLoading(false)
      }
    }
    asyncGetData()
  },[])

  if (loading){
    return (
      <div className='loader-wrapper'>
        <Audio/>
      </div>
    )
  }
  return (
    <div className="app-wrapper">
      <h1>weather</h1>
      <AddWeatherCard
        saveWeatherData={saveWeatherData}
        getWeatherByLocation={getWeatherByLocation}
        getCountryGeocode={getCountryGeocode}
      />
      <div className="weather-cards-wrapper">
        {weatherData.map((w: IWeather) => (
          <WeatherCard
            weatherData={w}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
