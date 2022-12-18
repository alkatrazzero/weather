interface ICoord {
  lat:number;
  lon: number
}

interface ITemp {
  feels_like: number
  humidity :number
  pressure : number
  temp: number
}

interface IWeatherStatus {
  main:'string',
  icon: number
}

interface ISys {
  country:string
}

interface IWind{
  speed: number
}
interface IMetric {
  coord: ICoord
  dt: number
  main:ITemp
  name: string
  weather: IWeatherStatus[]
  sys:ISys
  wind: IWind
}

interface IGraphValue {
  dt:number,
  temp:number
}

interface IGraph {
  imperial: IGraphValue[]
  metric: IGraphValue[]
}

interface IWeather {
  savedType: string
  metric: IMetric
  imperial: IMetric,
  graphData: IGraph
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
