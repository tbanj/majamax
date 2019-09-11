import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { getCurrentUser } from './services/authService.js';

import Internia from "./component/dashboard/Internia.jsx";

// import Movies from "./component/Movies";
// import Dashboard from "./component/Dashboard";
// import Product from "./component/Product";
// import Customers from "./component/Customers";
// import Rentals from "./component/Rentals";
// import Navbar from "./component/template/Navbar";
import NotFound from "./component/template/NotFound";
// import MoviesForm from "./component/MoviesForm";
// import LoginForm from "./component/LoginForm";
// import NewMovie from "./component/NewMovie";
// import RegisterForm from "./component/RegisterForm";
import Logout from "./component/Logout";
import ProtectedRoute from "./component/template/ProtectedRoute";
import OnboardRoute from "./component/OnboardRoute.jsx";

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
        <ToastContainer />
        <Switch>

          <Route path="/not-found" component={NotFound} />
          <ProtectedRoute path="/dashboard" render={(props) => <Internia {...props} user={user} />} />
          <Route path="/logout" component={Logout} />
          <Route path="/" render={(props) => <OnboardRoute {...props} user={this.state.user} />} />

          <Redirect to="/not-found" />
        </Switch>


      </div>
    );

  }
}



export default App;
