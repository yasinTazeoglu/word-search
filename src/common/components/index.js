import React from "react";
import { Provider } from "react-redux";
import App from "./app";
import store from "../redux/store";
const app = () => (
  <Provider store={store}>
  <App/>
  </Provider>
);
export default app