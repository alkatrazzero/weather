import * as actionTypes from "./actionTypes";

export function addWeatherData(weatherData: IWeather ) {
  const action: WeatherAction = {
    type: actionTypes.ADD_WEATHER_DATA,
    weatherData
  };
  return dispatchWeatherData(action);
}

export function deleteWeatherData(weatherData: IWeather) {
  const action: WeatherAction = {
    type: actionTypes.DELETE_WEATHER_DATA,
    weatherData
  };
  return dispatchWeatherData(action);
}

export function dispatchWeatherData(action: WeatherAction) {
  return (dispatch: DispatchType) => dispatch(action);
}
