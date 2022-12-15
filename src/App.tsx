import  React,{useEffect} from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import "./styles.css";
import weatherRequests from './api/weatherRequests'
import { WeatherCard } from "./components/WeatherCard";
import { AddWeatherCard } from "./components/AddWeatherCard";
import { addWeatherData } from "./store/actionCreators";
import { Dispatch } from "redux";

const App: React.FC = () => {
  const weatherData: readonly IWeather[] = useSelector((state: WeatherDataState) => state.weatherData)
  const dispatch: Dispatch<any> = useDispatch();

  const saveWeatherData = (weatherData: IWeather) => dispatch(addWeatherData(weatherData))

  const getWeatherByLocation = async(location:string) => {
    return await weatherRequests.getWeatherByLocation(location)
  }
  useEffect(()=>{
    if(weatherData.length > 1) return
    async function asyncGetData() {
      const response = await getWeatherByLocation('')
      dispatch(addWeatherData(response))
    }
    asyncGetData()
  },[])

  return (
    <div className="app-wrapper">
      <h1>weather</h1>
      <AddWeatherCard
        saveWeatherData={saveWeatherData}
        getWeatherByLocation={getWeatherByLocation}
      />
      <div className="weather-cards-wrapper">
        {weatherData.map((w: IWeather) => (
          <WeatherCard
            key={w.id}
            weatherData={w}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
