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
        ...action.weatherData
      };
			const duplicate = state.weatherData.filter(i=>i.metric.name === action.weatherData.metric.name )
			if(duplicate.length) return { ...state}
      return {
        ...state,
        weatherData: state.weatherData.concat(newWeatherData)
      };
		case actionTypes.DELETE_WEATHER_DATA:
			let targetIndex = state.weatherData.indexOf(action.weatherData);
			const copiedData = [...state.weatherData]
			copiedData.splice(targetIndex, 1)
      return {
				...state,
        weatherData: copiedData
      };
  }
  return state;
};

export default reducer;
