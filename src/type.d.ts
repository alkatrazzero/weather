interface IWeather {
  [key: string]: any
}

type WeatherDataState = {
  weatherData: IWeather[];
};

type WeatherAction = {
  type: string;
  weatherData: IWeather;
};

type DispatchType = (args: WeatherAction) => WeatherAction;
