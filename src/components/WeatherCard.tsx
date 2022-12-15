import React,{useState} from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { Card } from 'antd';
import moment from 'moment'
import './index.css'

type Props = {
  weatherData: IWeather;
};

export const WeatherCard: React.FC<Props> = ({ weatherData }) => {
  const [viewVariant,setViewVariant] = useState<string>('metric')
  const dispatch: Dispatch<any> = useDispatch();
  const cardTemp = Math.round(weatherData[viewVariant].main.temp)
  const feelsLikeTemp = Math.round(weatherData[viewVariant].main.feels_like)
  const isTempPositive = Math.sign(cardTemp)
  const backgroundColor = !!isTempPositive ? 'rgb(255,250,241)' :'rgb(241,242,255)'

  const otherData = [
    {
      id: Math.random(),
      title:'Wind',
      value:weatherData[viewVariant].wind.speed
    },
    {
      id: Math.random(),
      title:'Humidity',
      value:weatherData[viewVariant].main.humidity
    },
    {
      id: Math.random(),
      title:'Pressure',
      value:weatherData[viewVariant].main.pressure
    },
  ]
  return (
    <Card
      className="weather-card"
      style={{'backgroundColor':backgroundColor}}
    >
      <div className='header-row'>
        <div className='weather-location'>
          <span>{`${weatherData[viewVariant].name}, ${weatherData[viewVariant].sys.country}`}</span>
          <span>{moment(weatherData[viewVariant].dt).format("ddd DD MMMM, h:mm")}</span>
        </div>
        <div className='weather-status'>
          <span>{weatherData[viewVariant].weather[0].main}</span>
        </div>
      </div>
      <div className='weather-graph'>
        <span>GRAPH</span>
      </div>
      <div className='footer-statistic'>
        <div className='temp-wrapper'>
          <div className='change-units'>
            <span onClick={()=>{console.log("click")}} style={{'fontSize':'25px'}}>
            {!!isTempPositive&& '+'}{cardTemp}
            </span>
            <div>
              <span
                onClick={()=>{setViewVariant('metric')}}
                className={viewVariant === 'metric' ? viewVariant : 'default'}
                style={{'marginLeft': '15px'}}>
                {'C'}
              </span>
                <span className='split-slash'>|</span>
              <span onClick={()=>{setViewVariant('imperial')}} className={viewVariant === 'imperial' ? viewVariant : 'default'} >
                {'F'}
              </span>
            </div>
          </div>
          <span style= {{color: 'gray'}}>
            Feels like: {!!isTempPositive&& '+'}{feelsLikeTemp}
          </span>
        </div>
        <div style={{
          display:'flex',
          'flexDirection': 'column',
          'alignItems': 'flex-end'
        }}>
          {otherData.map((data=><span style={{
            color: !!isTempPositive ? 'orange' : 'blue'
            }} key={data.id}>{data.title}: {data.value}</span>))}
        </div>
      </div>
    </Card>
  );
};