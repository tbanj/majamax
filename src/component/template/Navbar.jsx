import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService.js';
import "./navbar.css";
class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }


    }






    render() {

        return (
            <React.Fragment>
                <div className="row navBackground fixed-top">
                    <nav className="navbar navbar-expand-lg navbar-light col-md-9 offset-md-1" style={{ fontSize: '25px' }}>
                        <Link className="nav-link parentChild setFontColor" to={"/"}>
                            <img className="w-25" src="/dashboard_assets/assets/images/prop/logoa.PNG" alt="name_logo" /> Majamax</Link>
                        <button style={{ border: '2px solid white' }} className="navbar-toggler mx-5" type="button" data-toggle="collapse"
                            data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
                                {getCurrentUser() && (
                                    <React.Fragment>
                                        <li className="nav-item active">
                                            <NavLink className="nav-link" to={"/dashboard/movies"}>Movies <span className="sr-only">(current)</span></NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to={"/dashboard/customers"}>Customers</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to={"/dashboard/rentals"}>Rentals</NavLink>
                                        </li>
                                    </React.Fragment>
                                )

                                }
                            </ul>
                            <form className="form-inline my-2 my-lg-0 col-md-4">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">

                                    {!getCurrentUser() && (
                                        <React.Fragment>
                                            <li className="nav-item py-1 mx-1">
                                                <Link id="signup" className="nav-link navChild setFontColor" to={"/register"}>Signup</Link>
                                            </li>

                                            <li className="nav-item ">
                                                <NavLink to={"/login"}>
                                                    <button className="btn btn-outline-success my-2 my-sm-0 setFontColor"
                                                        style={{
                                                            color: 'white',
                                                            fontWeight: '900'
                                                        }}>Sign in
                                                    </button>
                                                </NavLink>
                                            </li>
                                        </React.Fragment>
                                    )}
                                    {getCurrentUser() && (
                                        <React.Fragment>
                                            <li className={`nav-item py-1 ${this.state.showLogout}`}>
                                                <NavLink id="signup" className="nav-link navChild setFontColor" to={"/logout"}>Logout</NavLink>
                                            </li>
                                        </React.Fragment>
                                    )}
                                </ul>

                            </form>
                        </div>
                    </nav>
                </div>

            </React.Fragment>
        );
    }
}

export default Navbar;