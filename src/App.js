import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import Movies from "./component/Movies";
import Dashboard from "./component/Dashboard";
import Product from "./component/Product";
import ProductDetails from "./component/productdetail/ProductDetails";
import Customers from "./component/Customers";
import Rentals from "./component/Rentals";
import Navbar from "./component/template/Navbar";
import NotFound from "./component/template/NotFound";
import MoviesForm from "./component/MoviesForm";
import LoginForm from "./component/LoginForm";

function App() {
  return (
    <div>
      <div className="content">
        {/* to pass props into a component that dont have route
          e.g <Magi sortBy="" /> */}
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MoviesForm} />

          <Route path="/product" component={Product} />
          {/* to pass props into a component that have a route
              will make use of render instead of route /> */}
          <Route path="/dashboard" render={(props) => <Dashboard sortBy="newest" {...props} />} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />

          <Route path="/movies" component={Movies} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
