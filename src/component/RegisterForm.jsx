import React, { Component } from 'react';
class RegisterForm extends Component {
    username = React.createRef();

    componentDidMount() {
        this.username.current.focus();
    }

    handleSubmit = (e) => {

        // is use to prevent the form from sending detail to server
        e.preventDefault();

        const username = this.username.current.value;
        console.log(`${username} SUBMITTED`);

    }
    render() {
        return (
            <div> <h1>
                Login Form
            </h1>
                <form onSubmit={this.handleSubmit} className="container-fluid col-md-4">
                    <div className="form-group">
                        <label htmlFor="username">Email address</label>
                        <input ref={this.username} type="email" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
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

export default RegisterForm;