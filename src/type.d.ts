interface IMetric {
  [key:string]: any
}

interface IWeather {
  savedType: string
  metric: IMetric
  imperial: IMetric
}

interface ILocation {
  type?:string;
  initialUpdate?:boolean;
  lat: number;
  lon: number;
};

type WeatherDataState = {
  weatherData: IWeather[];
};

type WeatherAction = {
  type: string;
  weatherData: IWeather;
};

interface ILocalNames {
  de: string;
}

interface IError {
  message:string
}

interface IGeocode {
  type?: string
  country: string;
  lat: number;
  local_names: ILocalNames;
  name: string;
  state:string;
  lon: string
}

type DispatchType = (args: WeatherAction) => WeatherAction;
