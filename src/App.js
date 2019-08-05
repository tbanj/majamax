import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { getCurrentUser } from './services/authService.js';

import Movies from "./component/Movies";
import Dashboard from "./component/Dashboard";
import Product from "./component/Product";
import Customers from "./component/Customers";
import Rentals from "./component/Rentals";
import Navbar from "./component/template/Navbar";
import NotFound from "./component/template/NotFound";
import MoviesForm from "./component/MoviesForm";
import LoginForm from "./component/LoginForm";
import NewMovie from "./component/NewMovie";
import RegisterForm from "./component/RegisterForm";
import Logout from "./component/Logout";
import ProtectedRoute from "./component/template/ProtectedRoute";

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
class App extends Component {
  state = {}

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user })
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="content">
          {/* to pass props into a component that dont have route
            e.g <Magi sortBy="" /> */}
          <ToastContainer />
          <Navbar user={user} />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/product" component={Product} />
            {/* to pass props into a component that have a route
                will make use of render instead of route /> */}
            <Route path="/dashboard" render={(props) => <Dashboard sortBy="newest" {...props} />} />
            <Route path="/logout" component={Logout} />

            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/register" component={RegisterForm} />
            {/* external user protected route */}


            <ProtectedRoute
              path="/movies/:page/:id"
              component={MoviesForm} />

            <ProtectedRoute
              path="/movies/new"
              component={NewMovie} />

            {/* inline user protected route 
              <Route
            render={props => {
                if (!getCurrentUser()) return <Redirect to='/login' />;
                return Component <NewMovie {...props} user={this.state.user}/> ;
            }} />
            */}

            {/* <Route path="/movies/:page/:id" render={(props) => <MoviesForm sortBy="newest" {...props} />} /> */}

            <Route path="/movies" render={(props) => <Movies {...props} user={user} />} />

            <Redirect from="/" exact to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );

  }
}



export default App;
