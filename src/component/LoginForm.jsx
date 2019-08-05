import React from 'react';
import { Redirect } from "react-router-dom";

import { login, getCurrentUser } from '../services/authService.js';
import Form from './template/Form.jsx';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';

class Loginform extends Form {
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
            window.location = state ? state.from.pathname : '/';

            // below will login the user & prevent the user from coming vack to this url
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
        if (getCurrentUser()) return <Redirect to="/" />

        return (
            <div>
                <h1>
                    Login Form
            </h1>
                <form onSubmit={this.handleSubmit} className="container-fluid col-md-4">
                    {this.renderInput('username', 'Username', 'email', true)}
                    {this.renderInput('password', 'Password', 'password')}

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>

                    {/* submit button is implemented in Form.jsx */}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default Loginform;