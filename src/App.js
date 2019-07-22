import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";


import Movies from "./component/Movies";
import Dashboard from "./component/Dashboard";
import Product from "./component/Product";
import Customers from "./component/Customers";
import Rentals from "./component/Rentals";
import Navbar from "./component/template/Navbar";
import NotFound from "./component/template/NotFound";
import MoviesForm from "./component/MoviesForm";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import NewMovie from "./component/NewMovie";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
class App extends Component {
  state = {}

  componentDidMount() {
    const jwt = localStorage.getItem('vidly-token');
    try {
      const user = jwtDecode(jwt);
      this.setState({ user })
    } catch (error) {

    }
  }
  render() {
    return (
      <div>
        <div className="content">
          {/* to pass props into a component that dont have route
            e.g <Magi sortBy="" /> */}
          <ToastContainer />
          <Navbar user={this.state.user} />
          <Switch>
            <Route path="/login" component={LoginForm} />


            <Route path="/product" component={Product} />
            {/* to pass props into a component that have a route
                will make use of render instead of route /> */}
            <Route path="/dashboard" render={(props) => <Dashboard sortBy="newest" {...props} />} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:page/:id" render={(props) => <MoviesForm sortBy="newest" {...props} />} />
            <Route path="/movies/new" component={NewMovie} />
            <Route path="/movies" component={Movies} />

            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );

  }
}



export default App;
