import React from 'react'
import BaseComponent from 'component/BaseComponent'
import FormInput from 'component/FormInput'
import FormCheckbox from 'component/FormCheckbox'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { NotificationManager } from 'notification';
import ErrorHelper from 'component/ErrorHelper'

class RegisterNewUser extends BaseComponent {
    constructor() {
        super();
        this.config = this.getConfig();
        this.state = this.getDefaultState();
        this.registerUser = this.registerUser.bind(this);
    }

    getConfig() {
        return {
            firstname: {
                name: 'firstname',
                type: 'text',
                label: 'First Name',
                validation: [{
                    isrequired: true,
                    errorcode: 105
                }]
            },
            lastname: {
                name: 'lastname',
                type: 'text',
                label: 'Last Name',
                validation: [{
                    isrequired: true,
                    errorcode: 106
                }]
            },
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
            },
            company: {
                name: 'company',
                type: 'text',
                label: 'Company',
                validation: [{
                    isrequired: true,
                    errorcode: 110
                }]
            },
            email: {
                name: 'email',
                type: 'text',
                label: 'Email',
                validation: [{
                    isrequired: true,
                    errorcode: 111
                }, {
                    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    errorcode: 114
                }, {
                    errorcode: 113
                }]
            },
            phone: {
                name: 'phone',
                type: 'text',
                label: 'Phone',
                validation: [{
                    isrequired: true,
                    errorcode: 112
                }, {
                    regex: /^[ ()+]*([0-9][ ()+]*){10,}$/,
                    errorcode: 117
                }]
            },
            isSubscriptionEnabled: {
                name: 'isSubscriptionEnabled',
                label: 'Accept subscription to newletter and updates on the ideas',
                value: false
            }
        };
    }

    registerUser() {
        var data = {
            FirstName: this.state.firstname.value,
            LastName: this.state.lastname.value,
            Company: this.state.company.value,
            Email: this.state.email.value,
            Phone: this.state.phone.value,
            IsSubscriptionEnabled: this.state.isSubscriptionEnabled.value,
            Password: this.state.password.value,
            RePassword: this.state.repassword.value
        };
        this.makeCall("/Registration/Register", "POST", data, this.onRegisterUserSuccess.bind(this));
    }

    onRegisterUserSuccess(data) {
        if (data > 0) {
            var userRegistered = true;
            this.state.redirectToLogin = true;
            this.setState(this.state);
            NotificationManager.success(ErrorHelper.GetErrorMessage(126));
        }
    }

    matchPassword() {
        return this.state.password.value == this.state.repassword.value;
    }

    componentDidMount() {
        this.$loading = $(this.el);
    }

    render() {
        if (this.state.redirectToLogin) {
            return (<Redirect to="/" />);
        }
        else {
            return (
                <div className="row" ref={el => this.el = el}>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 border page-background">
                        <h2>Register</h2>
                        <hr/>
                        <FormInput config={this.config.firstname} state={this.state.firstname} valuebind={this.valuebind.bind(this, this.config.firstname.name)} />
                        <FormInput config={this.config.lastname} state={this.state.lastname} valuebind={this.valuebind.bind(this, this.config.lastname.name)} />
                        <FormInput config={this.config.password} state={this.state.password} valuebind={this.valuebind.bind(this, this.config.password.name)} />
                        <FormInput config={this.config.repassword} state={this.state.repassword} valuebind={this.valuebind.bind(this, this.config.repassword.name)} />
                        <FormInput config={this.config.company} state={this.state.company} valuebind={this.valuebind.bind(this, this.config.company.name)} />
                        <FormInput config={this.config.email} state={this.state.email} valuebind={this.valuebind.bind(this, this.config.email.name)} />
                        <FormInput config={this.config.phone} state={this.state.phone} valuebind={this.valuebind.bind(this, this.config.phone.name)} />
                        <FormCheckbox config={this.config.isSubscriptionEnabled} state={this.state.isSubscriptionEnabled} checkboxvaluebind={this.checkboxvaluebind.bind(this, this.config.isSubscriptionEnabled.name)} />
                        <hr/>
                        <div className="form-group">
                            <button className="btn btn-primary btn-IMS" onClick={this.validate.bind(this, this.registerUser)}>Register</button>
                            <label className="right">Already have an account? <Link to="/">Login here</Link></label>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            );
        }
    }
}

export default RegisterNewUser