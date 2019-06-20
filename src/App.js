import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import "./App.css";

import Movies from "./component/Movies";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Movies} />

            {/* <Redirect to="/" /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
