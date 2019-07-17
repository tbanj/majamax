import React from 'react';
import Form from './template/Form.jsx';
import Joi from 'joi-browser';
class Loginform extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    };


    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    };

    doSubmit = () => {
        // const username = this.username.current.value;

        console.log(` Login form SUBMITTED`);
    }

    render() {

        return (
            <div> <h1>
                Login Form
            </h1>
                <form onSubmit={this.handleSubmit} className="container-fluid col-md-4">
                    {this.renderInput('username', 'Username', 'text', true)}
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