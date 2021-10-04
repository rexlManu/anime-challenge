import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Store } from "./element/Element";

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);
