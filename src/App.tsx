import  React,{useEffect,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
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

  const getWeatherByLocation = async (lat:number,lon:number,initialUpdate?:boolean,type?:string) => {
    const response = await weatherRequests.getWeatherByLocation({lat,lon,initialUpdate,type})
    dispatch(addWeatherData(response))
  }

  const showPosition = async (position: any):Promise<void> => {
    await getWeatherByLocation(position.coords.latitude,position.coords.longitude)
  }

  const getLocation = ()=> {
    if (navigator.geolocation) {
      let isConfirmed = confirm('Are you sure you want to share your location?');
      if(isConfirmed)navigator.geolocation.getCurrentPosition(showPosition)
    }
  }

  useEffect(()=>{
    async function asyncGetData() {
      const savedData = JSON.parse(localStorage.getItem('savedCountriesData')|| '{}')
      if(Object.keys(savedData).length){
        setLoading(true)
        for (let location in savedData) {
          const object: IWeather = savedData[location]
          dispatch(addWeatherData(object))
        }
        setLoading(false)
      }
    }
    asyncGetData()
    getLocation()
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
        getWeatherByLocation={getWeatherByLocation}
      />
      <div className="weather-cards-wrapper">
        { weatherData.map((w: IWeather, index:number) => (
          <WeatherCard
            key={index}
            weatherData={w}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
