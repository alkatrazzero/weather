import * as actionTypes from "./actionTypes";

const initialState: WeatherDataState = {
  weatherData: []
};

const reducer = (
  state: WeatherDataState = initialState,
  action: WeatherAction
): WeatherDataState => {
  switch (action.type) {
    case actionTypes.ADD_WEATHER_DATA:
      const newWeatherData: IWeather = {
        id: Math.random(),
        ...action.weatherData
      };
      return {
        ...state,
        weatherData: state.weatherData.concat(newWeatherData)
      };
  }
  return state;
};

export default reducer;
