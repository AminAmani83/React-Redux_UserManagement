import React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom"; // Instead of BrowserRouter to avoid problems when deploying in subfolder
import App from "./components/App";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./bootstrap.min.css"; // Dark Mode Bootstrap
import configureStore from "./Redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
