import * as React from "react";

type Props = {
  saveWeatherData: (weatherData: IWeather| any) => void;
  getWeatherByLocation: (location:string) => any;
};

export const AddWeatherCard: React.FC<Props> = ({ saveWeatherData,getWeatherByLocation }) => {
  const [location, setLocation] = React.useState<string>('');

  const handleArticleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
  };

  const addNewWeatherData = async(e: React.FormEvent) => {
    const response = await getWeatherByLocation(location);
    e.preventDefault();
    // saveWeatherData(response.data);
  };

  return (
    <div>
      <input
        type="text"
        id="title"
        value={location}
        placeholder="Title"
        onChange={handleArticleData}
      />
      <button onClick={addNewWeatherData} >
        Add
      </button>
    </div>
  );
};