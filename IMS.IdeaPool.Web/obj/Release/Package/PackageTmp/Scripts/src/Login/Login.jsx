import React from 'react'
import BaseComponent from 'component/BaseComponent'
import ErrorMessage from 'component/ErrorMessage'
import ErrorHelper from 'component/ErrorHelper'
import { Link } from 'react-router-dom'
import { NotificationManager } from 'notification';

class Login extends BaseComponent {
    constructor() {
        super();
        this.config = this.getConfig();
        this.state = this.getDefaultState();
        this.login = this.login.bind(this);
    }

    getConfig() {
        return {
            email: {
                name: 'email',
                validation: [{
                    isrequired: true,
                    errorcode: 102
                }]
            },
            password: {
                name: 'password',
                validation: [{
                    isrequired: true,
                    errorcode: 103
                }]
            },
            rememberMe: {
                name: 'rememberMe',
                value: false
            },
            credentials: {
                validation: [{
                    // invalid credentials error code
                    errorcode: 104
                }, {
                    // account not activated
                    errorcode: 118
                }]
            }
        };
    }

    login() {
        var data = {
            email: this.state.email.value,
            password: this.state.password.value,
            remember: this.state.rememberMe.value
        };
        this.makeCall("/Login/Authenticate", "POST", data, this.onLoginSuccess.bind(this));
    }

    onLoginSuccess(data) {
        this.applyMask();
        var url = '/Home/Index';
        const returnurl = this.getParameterByName('ReturnUrl');
        if (returnurl) {
            url = returnurl;
        }
        this.redirect(url);
    }

    onKeyPress(event) {
        if (event.which == 13) {
            this.validate(this.login);
        }
    }

    componentDidMount() {
        this.$loading = $(this.el);
    }

    render() {
        return (
            <div className="wrapper" ref={el => this.el = el}>
                <div className="form-signin page-background">
                    <h2 className="form-signin-heading">i-Gen login</h2>
                    <div className={this.state.email.isvalid ? '' : 'has-error'}>
                        <input type="text" className="form-control" name="email" placeholder="Email" autoFocus="" value={this.state.email.value} onChange={this.valuebind.bind(this, this.config.email.name)} />
                    </div>
                    <div className={this.state.password.isvalid ? '' : 'has-error'}>
                        <input type="password" className="form-control" name="password" onKeyPress={this.onKeyPress.bind(this)} placeholder="Password" value={this.state.password.value} onChange={this.valuebind.bind(this, this.config.password.name)} />
                    </div>
                    {
                        !this.state.email.isvalid && !this.state.password.isvalid
                            ? <ErrorMessage message={ErrorHelper.GetErrorMessage(101)} />
                            : !this.state.email.isvalid
                                ? <ErrorMessage message={ErrorHelper.GetErrorMessage(this.state.email.errorcode)} />
                                : !this.state.password.isvalid
                                    ? <ErrorMessage message={ErrorHelper.GetErrorMessage(this.state.password.errorcode)} />
                                    : !this.state.credentials.isvalid
                                        ? <ErrorMessage message={ErrorHelper.GetErrorMessage(this.state.credentials.errorcode)} />
                                        : ''
                    }
                    <label>
                        <input type="checkbox" checked={this.state.rememberMe.value} name="rememberMe" onChange={this.checkboxvaluebind.bind(this, this.config.rememberMe.name)} /> Remember me on this computer.
                    </label>
                    <button className="btn btn-lg btn-primary btn-block btn-hynds" type="submit" onClick={this.validate.bind(this, this.login)}>Login</button>
                    <label className="checkbox text-center">
                        Need an Account? <Link to="/register">Register here</Link>
                    </label>
                    <label className="checkbox text-center">
                        <Link to="/forgotpassword">Forgot your password?</Link>
                    </label>
                </div>
            </div>
        );
    }
}

export default Login