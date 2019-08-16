import React from 'react';
import { Redirect } from 'react-router-dom';
import { loginWithJwt } from "../services/authService.js";
import { register } from '../services/userService.js';
import { getCurrentUser } from '../services/authService.js';
import Form from './template/Form';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import './form.css';
class RegisterForm extends Form {
    state = {
        data: { username: '', password: '', fullname: '' },
        errors: {}
    };


    schema = {
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(6).max(50).label("Password"),
        fullname: Joi.string().required().min(4).label("Name")
    };




    doSubmit = async () => {
        const { data } = this.state;
        // const username = this.username.current.value;

        try {
            const res = await register(data);
            loginWithJwt(res.headers["x-auth-token"]);
            window.location = '/';
            // this.props.history.replace('/');
            toast.success(` Register form SUBMITTED ${data.fullname}`);
        } catch (error) {

            if (error.response && error.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = error.response.data;
                this.setState({ errors });
                toast.error(errors.username);
            }

        }

    }


    render() {
        // check if user is already login, if yes redirect back to dashboard
        // if (getCurrentUser()) return <Redirect to="/dashboard/movies" />
        return (
            <div className="backgroundRegister" >
                <div className="card col-md-6 offset-md-3 resizeCard">
                    <form onSubmit={this.handleSubmit} className="container-fluid col-md-8">
                        <h3> Register</h3>
                        {this.renderInput('username', 'Username', 'email', true)}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderInput('fullname', 'Name', 'text')}

                        {/* submit button is implemented in Form.jsx */}
                        {this.renderButton('Register', `btn btn-block btn-lg btn-primary btn-rounded my-3`, { borderRadius: '60px' })}
                    </form>
                </div>

            </div>
        );
    }
}

export default RegisterForm;