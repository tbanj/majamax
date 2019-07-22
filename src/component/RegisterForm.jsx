import React from 'react';

import { register } from '../services/userService';
import Form from './template/Form';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
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
            localStorage.setItem("vidly-token", res.headers["x-auth-token"]);
            this.props.history.replace('/');
            toast.success(` Register form SUBMITTED ${data.fullname}`);
            console.log(res);
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
        return (
            <div>
                <h1>
                    Register
            </h1>
                <form onSubmit={this.handleSubmit} className="container-fluid col-md-4">
                    {this.renderInput('username', 'Username', 'email', true)}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('fullname', 'Name', 'text')}

                    {/* submit button is implemented in Form.jsx */}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;