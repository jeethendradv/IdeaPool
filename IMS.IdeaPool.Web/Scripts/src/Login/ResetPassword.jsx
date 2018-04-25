import React from 'react'
import BaseComponent from 'component/BaseComponent'
import FormInput from 'component/FormInput'
import { Redirect } from 'react-router'
import UserHelper from 'component/User'
import { NotificationManager } from 'notification';
import ErrorHelper from 'component/ErrorHelper'

class ResetPassword extends BaseComponent {
    constructor(props) {
        super();
        this.config = this.getConfig();
        this.state = this.getDefaultState();
        this.resetpassword = this.resetpassword.bind(this);

        if (this.hasToken(props)) {
            if (!this.isValidToken(this.getParameterByName('token'))) {
                NotificationManager.error(ErrorHelper.GetErrorMessage(124));
                this.state.navigateToForgotPassword = true;
            }
        }
        else if (UserHelper.GetId() < 1) {
            this.state.navigateToLogin = true;
        }
    }

    componentDidMount() {
        this.$loading = $(this.el);
    }

    hasToken(props) {
        return this.getParameterByName('token') ? true : false;
    }

    isValidToken(token) {
        var data = {
            token: token
        };
        var response = this.makeSyncCall("/Login/IsValidToken", "POST", data);
        return this.isTrue(response);
    }

    getToken() {
        return this.getParameterByName('token');
    }

    getConfig() {
        return {
            password: {
                name: 'password',
                type: 'password',
                label: 'Password',
                validation: [{
                    isrequired: true,
                    errorcode: 107
                }, {
                    isvalid: this.matchPassword.bind(this),
                    errorcode: 109
                }, {
                    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2})[a-zA-Z\d]{6,10}$/,
                    errorcode: 116
                }]
            },
            repassword: {
                name: 'repassword',
                type: 'password',
                label: 'Retype Password',
                validation: [{
                    isrequired: true,
                    errorcode: 108
                }, {
                    isvalid: this.matchPassword.bind(this),
                    errorcode: 109
                }]
            }
        };
    }

    matchPassword() {
        return this.state.password.value == this.state.repassword.value;
    }

    resetpassword() {
        var url = "/Login/ResetPassword";
        var data = {
            password: this.state.password.value,
            repassword: this.state.repassword.value
        }
        if (this.hasToken(this.props)) {
            data.token = this.getToken();
            url = "/Login/ResetPasswordWithToken"
        }
        this.makeCall(url, "POST", data, this.onresetpasswordSuccess.bind(this));
    }

    onresetpasswordSuccess() {
        if (this.hasToken(this.props)) {
            this.state.navigateToLogin = true;
        }
        else {
            this.state.navigateHome = true;
        }
        this.setState(this.state);
        NotificationManager.success(ErrorHelper.GetErrorMessage(125));
    }

    render() {
        if (this.state.navigateToLogin) {
            return <Redirect to="/" />
        }
        else if (this.state.navigateToForgotPassword) {
            return <Redirect to="/forgotpassword" />
        }
        else if (this.state.navigateHome) {
            return <Redirect to="/Home/Index" />
        }
        else {
            return (
                <div className="row" ref={el => this.el = el}>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 border page-background">
                        <h2>Reset Password</h2>
                        <hr />
                        <FormInput placeholder="Password" config={this.config.password} state={this.state.password} valuebind={this.valuebind.bind(this, this.config.password.name)} />
                        <FormInput placeholder="Re-type password" config={this.config.repassword} state={this.state.repassword} valuebind={this.valuebind.bind(this, this.config.repassword.name)} />
                        <div className="form-group">
                            <button className="btn btn-primary btn-IMS" onClick={this.validate.bind(this, this.resetpassword)}>Submit</button>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            );
        }
    }
}

export default ResetPassword