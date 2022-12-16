import React, {useEffect,useState} from "react";
import { Button} from 'antd';
import { Select } from 'antd';

type Props = {
  saveWeatherData: (weatherData: IWeather| any) => void;
  getWeatherByLocation: (lat:number,lon:number) => void;
  getCountryGeocode: (city:string)=>Promise<IGeocode[]>
};

type ICountryValue  ={
  value: string,
  label: string
}

export const AddWeatherCard: React.FC<Props> = ({ saveWeatherData,getWeatherByLocation,getCountryGeocode }) => {
  const [location, setLocation] = useState<string[]>([]);
  const [loading,setLoading] = useState<boolean>(false)
  const [searchData,setSearchData] = useState<Array<ICountryValue>>()

  const addNewWeatherData = async() => {
    if( location.length) {
      setLoading(true)
      await getWeatherByLocation(Number(location[0]),Number(location[1]));
      setLocation([])
      setLoading(false)
    }
  };

  const onChange = async (value: string) => {
    setLocation(value.split(','))
  };

  const onSearch = async(value: string) => {
    const response = await getCountryGeocode(value)
    const result = response.map((i:any)=>{
      return {label:`${i.state || i.name} ${i.country}`,  value:`${i.lat},${i.lon}`}
    })
    setSearchData(result)
  };

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