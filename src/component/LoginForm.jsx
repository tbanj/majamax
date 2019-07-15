import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './template/Input';
class Loginform extends Component {
    state = {
        account: { username: '', password: '' },
        errors: {}
    };


    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    };


    validateProperty = ({ name, value }) => {
        // es6 computed property is use when name of data will picked from
        // a form that have multiple name fields
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];


        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors })
    };

    validate = () => {
        /* joi terminates errors as soon as it encounter 1, so other parts of the code is not being run
            either they contain error or not */
        const option = { abortEarly: false };
        const result = Joi.validate(this.state.account, this.schema, option);
        console.log(result)

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };

    handleSubmit = (e) => {

        // is use to prevent the form from sending detail to server
        e.preventDefault();
        const errors = this.validate();
        console.log(errors);
        this.setState({ errors });
        if (errors) return;

        // const username = this.username.current.value;
        console.log(` SUBMITTED`);

    };

    render() {
        const { account, errors } = this.state;
        return (
            <div> <h1>
                Login Form
            </h1>
                <form onSubmit={this.handleSubmit} className="container-fluid col-md-4">
                    <Input autoFocus type="text" name="username" value={account.username} label="Username"
                        onChange={this.handleChange}
                        error={errors.username} />
                    <Input type="password" name="password" value={account.password} label="Password"
                        onChange={this.handleChange} error={errors.password} />
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button
                        disabled={this.validate()}
                        className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Loginform;