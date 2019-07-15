import React, { Component } from 'react';
import Input from './template/Input';
class Loginform extends Component {
    state = {
        account: { username: '', password: '' },
    errors: {}
    };

    validateProperty =({ name, value})  => {
        if(name ==='username') {
            if(value.trim() === '') return 'username is required!';
        }

        if(name ==='password') {
            if(value.trim() === '') return 'password is required!';
        }
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors}
        const errorMessage =this.validateProperty(input);
        if( errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];


        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors })
    };

    validate = ()=> {
        const errors = {};

        const { account} = this.state;
        if( account.username.trim() === '')
            errors.username = 'Username is required.';
        if( account.password.trim() === '')
            errors.password= 'Password is required.';

        return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = (e) => {

        // is use to prevent the form from sending detail to server
        e.preventDefault();
        const errors = this.validate();
        console.log(errors);
        this.setState({errors});
        if(errors) return;

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
                    onChange={this.handleChange}  error={errors.password} />
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Loginform;