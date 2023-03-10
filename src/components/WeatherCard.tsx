import React,{useState,useEffect} from "react";
import { Dispatch } from "redux";
import { Card,Image } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import {  useDispatch } from "react-redux";
import { useTranslation,Trans } from "react-i18next"
import {deleteWeatherData} from '../store/actionCreators'
import{ Graph } from './Graph'
import { ReactComponent as DeleteIcon } from '../public/icons/xmark-solid.svg';
import moment from 'moment'
import './index.css'

type Props = {
  weatherData: IWeather;
};

interface IKeys {
  metric:string,
  imperial: string
}

export const WeatherCard: React.FC<Props> = ({ weatherData }) => {
  const [viewVariant,setViewVariant] = useState<string>(weatherData.savedType || 'metric')
  const selectedVariantWeatherData = weatherData[viewVariant as keyof IKeys]
  const dispatch: Dispatch<any> = useDispatch()
  const cardTemp = Math.round(selectedVariantWeatherData.main.temp)
  const feelsLikeTemp = Math.round(selectedVariantWeatherData.main.feels_like)
  const isTempPositive = Math.sign(cardTemp)
  const backgroundColor = isTempPositive === 1 ? 'rgb(255,250,241)' :'rgb(241,242,255)'
  const savedData = JSON.parse(localStorage.getItem('savedCountriesData') || '{}')
  const iconUrl=`http://openweathermap.org/img/wn/${selectedVariantWeatherData.weather[0].icon}@2x.png`

  const { t, i18n } = useTranslation()

  const isEqual = (data:ILocation)=>{
    const equalLat = Math.round(weatherData.metric.coord.lat) === Math.round(Number(data.lat))
    const equalLon = Math.round(weatherData.metric.coord.lon) === Math.round(Number(data.lon))
    if( equalLat && equalLon )setViewVariant(data.type || 'metric')
  }

  const handleChangeVariant = (type:string):void => {
    const object = weatherData.metric.name
    const savedData = JSON.parse(localStorage.getItem('savedCountriesData') || '{}')
    localStorage.setItem('savedCountriesData', JSON.stringify({...savedData,[object]:{...savedData[object],savedType:type}}))
    setViewVariant(type)
  }

  const handleDelete =():void => {
    const savedData = JSON.parse(localStorage.getItem('savedCountriesData') || '{}')
    delete savedData[weatherData.metric.name]
    localStorage.setItem('savedCountriesData', JSON.stringify({...savedData}))
    dispatch(deleteWeatherData(weatherData))
  }

  useEffect(()=>{
    if(savedData.length) savedData.forEach((data:ILocation)=>isEqual(data))
  },[])

  const otherData = [
    {
      id: Math.random(),
      title:'Wind',
      value:selectedVariantWeatherData.wind.speed
    },
    {
      id: Math.random(),
      title:'Humidity',
      value:selectedVariantWeatherData.main.humidity
    },
    {
      id: Math.random(),
      title:'Pressure',
      value:selectedVariantWeatherData.main.pressure
    },
  ]

  return (
    <Card
      className="weather-card"
      style={{'backgroundColor':backgroundColor}}
    >
      <div className='header-row' >
        <DeleteIcon
          onClick={handleDelete}
          className='deleteBtn'
        />
        <div className='weather-location'>
          <span className='country-title'>{`${selectedVariantWeatherData.name}, ${selectedVariantWeatherData.sys.country}`}</span>
          <span>
            {moment(selectedVariantWeatherData.dt).format("ddd DD MMMM, h:mm")}
          </span>
        </div>
        <div className='weather-status'>
          <Image
            width={30}
            preview={false}
            src={iconUrl}
          />
          <span style={{marginLeft:'8px',color:'gray'}}>{t(selectedVariantWeatherData.weather[0].main)}</span>
        </div>
      </div>
      <div className='weather-graph'>
        <Graph
          isPositive={isTempPositive === 1}
          graphData={weatherData.graphData[viewVariant as keyof IKeys]}
        />
      </div>
      <div className='footer-statistic'>
        <div className='temp-wrapper'>
          <div className='change-units'>
            <span style={{'fontSize':'25px'}}>
            {isTempPositive === 1 && '+'}{cardTemp}
            </span>
            <div>
              <span
                onClick={()=>handleChangeVariant('metric')}
                className={viewVariant === 'metric' ? viewVariant : 'default'}
                style={{'marginLeft': '15px'}}>
                {'??C'}
              </span>
                <span className='split-slash'>|</span>
              <span onClick={()=>handleChangeVariant('imperial')} className={viewVariant === 'imperial' ? viewVariant : 'default'} >
                {'???'}
              </span>
            </div>
          </div>
          <span style= {{color: 'gray'}}>
            {t('Feelslike')}{':'}
            <span>{isTempPositive === 1 && ' +'}{feelsLikeTemp} {viewVariant === 'metric' ? '??C' : '???'}</span>
          </span>
        </div>
        <div style={{
          display:'flex',
          'flexDirection': 'column',
          'alignItems': 'flex-end'
        }}>
          {otherData.map(((data,index)=><span key={index}>
            {t(data.title)}:
            <span  style={{ color: isTempPositive === 1 ? 'orange' : 'blue'}}> {data.value}</span>
            </span>))}
        </div>
      </div>
    </Card>
  );
};