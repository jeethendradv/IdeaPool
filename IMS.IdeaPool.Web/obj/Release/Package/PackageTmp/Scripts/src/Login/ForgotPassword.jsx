import React from 'react'
import BaseComponent from 'component/BaseComponent'
import FormInput from 'component/FormInput'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { NotificationManager } from 'notification';
import ErrorHelper from 'component/ErrorHelper'

class ForgotPassword extends BaseComponent {
    constructor() {
        super();
        this.config = this.getConfig();
        this.state = this.getDefaultState();
        this.sendPasswordResetLink = this.sendPasswordResetLink.bind(this);
    }

    getConfig() {
        return {
            email: {
                name: 'email',
                type: 'text',
                label: 'Enter your email address',
                validation: [{
                    isrequired: true,
                    errorcode: 111
                }, {
                    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    errorcode: 114
                }]
            }
        };
    }

    isRegisteredEmailAddress() {
        var data = {
            email: this.state.email.value
        };
        var response = this.makeSyncCall("Registration/IsRegisteredEmailAddress", "POST", data);
        return this.isTrue(response);
    }

    sendPasswordResetLink() {
        var data = {
            email: this.state.email.value
        };
        this.makeCall("/Login/ForgotPassword", "POST", data, this.onSendPasswordResetLinkComplete.bind(this));
    }

    onSendPasswordResetLinkComplete() {
        NotificationManager.success(ErrorHelper.GetErrorMessage(127));
        this.state.redirectToLogin = true;
        this.setState(this.state);
    }

    componentDidMount() {
        this.$loading = $(this.el);
    }

    render() {
        if (this.state.redirectToLogin) {
            return (
                <Redirect to="/" />
            );
        } else {
            return (
                <div className="row" ref={el => this.el = el}>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 border page-background">
                        <h2>Forgot Password</h2>
                        <hr />
                        <FormInput placeholder="Email" config={this.config.email} state={this.state.email} valuebind={this.valuebind.bind(this, this.config.email.name)} />
                        <div className="form-group">
                            <button className="btn btn-primary btn-hynds" onClick={this.validate.bind(this, this.sendPasswordResetLink)}>Submit</button>
                            <label className="right">Remember your credentails? <Link to="/">Login here</Link></label>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            );
        }
    }
}

export default ForgotPassword