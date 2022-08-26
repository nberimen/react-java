import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap-override.scss";
import App from "./App";
import configureStore from "./redux/configureStore"
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore();

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
