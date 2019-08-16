import React from "react";
import { Route, Link, Switch } from 'react-router-dom';
import TestingA from "./template/TestingA";
import Landing from "./template/Landing";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Navbar from "./template/Navbar";


// import Sidebar from "./sidebar";
// import Users from "./users";
// import Posts from "./posts";
const OnboardRoute = ({ match }) => {
    return (
        <div className="content" style={{ backgroundColor: '#FFFFFF' }}>
            <Navbar />
            {/* <Landing /> */}
            {/* <TestingA /> */}
            <Switch>

                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/" component={Landing} />
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
