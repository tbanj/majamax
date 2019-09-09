import React from "react";
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import TestingA from "./template/TestingA";
import Landing from "./template/Landing";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Navbar from "./template/Navbar";
import NotFound from "./template/NotFound.jsx"
// import Sidebar from "./sidebar";
// import Users from "./users";
// import Posts from "./posts";
const OnboardRoute = ({ match }) => {
    return (
        <div className="content" style={{ backgroundColor: '#FFFFFF', height: '100%' }}>
            <Navbar />
            {/* <Landing /> */}
            {/* <TestingA /> */}
            <Switch>

                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
                <Route exact path="/" component={Landing} />
                <Route path="/not-found" component={NotFound} />
                <Redirect to="/not-found" />

                {/* <Route path="/la" component={Landing} /> */}
            </Switch>
            {/* <Sidebar /> */}
            {/* to create multiple tag at a time 
    ul>(li>Link[to=''])*2*/}
            {/* <Route path="/admin/users" component={Users} />
      <Route path="/admin/posts" component={Posts} /> */}
        </div>
    );
};

export default OnboardRoute;
