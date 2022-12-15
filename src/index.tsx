import * as React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import 'antd/dist/reset.css';
import thunk from "redux-thunk";

import App from "./App";
import reducer from "./store/reducer";

const store: Store<WeatherDataState, WeatherAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
