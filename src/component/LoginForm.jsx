import React from 'react';
import { Redirect } from "react-router-dom";

import { login, getCurrentUser } from '../services/authService.js';
import Form from './template/Form.jsx';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import './form.css';

class LoginForm extends Form {
    constructor(props) {
        super(props)
        this.state = {
            data: { username: '', password: '' },
            errors: {}
        };

        this._isMounted = false;

    }




    schema = {
        username: Joi.string().email().required().label("Username"),
        password: Joi.string().required().label("Password")
    };


    componentWillUnmount() {
        this._isMounted = false;
    }

    doSubmit = async () => {


        try {
            const { data } = this.state;
            await login(data.username, data.password);

            toast.success(`Welcome `);

            // below code will reload the application & direct user to url below
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/dashboard/movies';

            // below will login the user & prevent the user from coming back to this url
            // if the request is successful
            // this.props.history.replace('/movies');
            // console.log(` Login form SUBMITTED`);
        }
        catch (error) {
            this._isMounted = true;
            if (error.response && error.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = error.response.data;
                toast.error(error.response.data);
                this._isMounted && this.setState({ errors })

            }
        }
    }

    render() {
        if (getCurrentUser()) return <Redirect to="/dashboard/movies" />
        return (
            <div className="backgroundLogin">
                <div className="card col-md-6 offset-md-3 resizeCard" >
                    <form onSubmit={this.handleSubmit} className="container-fluid col-md-8"
                    >
                        <h3> Login </h3>
                        {this.renderInput('username', 'Username', 'email', true)}
                        {this.renderInput('password', 'Password', 'password')}

                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>

                        {/* submit button is implemented in Form.jsx */}
                        {this.renderButton('Login', `btn btn-block btn-lg btn-primary btn-rounded my-3`, { borderRadius: '60px' })}
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;