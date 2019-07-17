import React from 'react';
import Form from './template/Form';
import Joi from 'joi-browser';
class RegisterForm extends Form {
    state = {
        data: { username: '', password: '', fullname: '' },
        errors: {}
    };


    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().min(6).max(50).label("Password"),
        fullname: Joi.string().required().min(4).label("Name")
    };




    doSubmit = () => {
        // const username = this.username.current.value;

        console.log(` Register form SUBMITTED`);
    }


    render() {
        return (
            <div> <h1>
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