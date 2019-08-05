import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import logService from './services/logService.js';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";


import "./../node_modules/bootstrap/dist/css/bootstrap.css";
import "./../node_modules/font-awesome/css/font-awesome.css";

console.log('App name ', process.env.REACT_APP_NAME)
logService.init();

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
