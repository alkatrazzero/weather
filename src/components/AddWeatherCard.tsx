import React, {useEffect,useState} from "react";
import { Button} from 'antd';
import {useDispatch} from 'react-redux'
import { Dispatch } from "redux";
import weatherRequests from '../api/weatherRequests'
import { addWeatherData } from "../store/actionCreators";
import { Select } from 'antd';

type Props = {
  getWeatherByLocation: (lat:number,lon:number) => void;
};

type ICountryValue  ={
  value: string,
  label: string
}

export const AddWeatherCard: React.FC<Props> = ({ getWeatherByLocation }) => {
  const [location, setLocation] = useState<string[]>([]);
  const dispatch: Dispatch<any> = useDispatch();
  const [loading,setLoading] = useState<boolean>(false)
  const [searchData,setSearchData] = useState<Array<ICountryValue>>()

  const addNewWeatherData = async():Promise<void> => {
    if( location.length) {
      setLoading(true)
      await getWeatherByLocation(Number(location[0]),Number(location[1]));
      setLocation([])
      setLoading(false)
    }
  };

  const onChange = (value: string):void => setLocation(value.split(','))

  const onSearch = async(value: string) => {
    const response = await getCountryGeocode(value)
    const result = response.map((i:any)=>{
      return {label:`${i.state || i.name} ${i.country}`,  value:`${i.lat},${i.lon}`}
    })
    setSearchData(result)
  };

  const saveWeatherData = (weatherData: IWeather) => dispatch(addWeatherData(weatherData))

  const getCountryGeocode =async (city:string): Promise<IGeocode[]> => {
    return await weatherRequests.getCountryGeocode(city)
  }

  return (
    <div>
      <Select
        className='select'
        showSearch
        disabled={loading}
        allowClear={true}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={false}
        options={searchData}
      />
      <Button
        className='add-btn'
        type="primary"
        onClick={addNewWeatherData}
        disabled={!location.length}
      >
        Add
      </Button>
    </div>
  );
};