import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService.js';
class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }


    }






    render() {
        // const { user } = this.props;
        console.log(getCurrentUser(), 'Alabi Wahab');
        return (
            <React.Fragment>



                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/">Majamax</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarNavDropdown" className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto">

                            {getCurrentUser() && (
                                <React.Fragment>
                                    <li className="nav-item active">
                                        <NavLink className="nav-link" to="/dashboard/movies">Movies <span className="sr-only">(current)</span></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/dashboard/customers">Customers</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/dashboard/rentals">Rentals</NavLink>
                                    </li>
                                </React.Fragment>
                            )

                            }
                            {!getCurrentUser() && (
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                </React.Fragment>
                            )
                            }

                            {getCurrentUser() && (
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/dashboard/profile">{getCurrentUser().name}</NavLink>
                                    </li>
                                </React.Fragment>
                            )
                            }


                        </ul>
                        <ul className="navbar-nav">

                            {getCurrentUser() && (
                                <React.Fragment>
                                    <li className={this.state.showLogout}>
                                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                    </li>
                                </React.Fragment>
                            )}

                        </ul>
                    </div>
                </nav>

            </React.Fragment>
        );
    }
}

export default Navbar;