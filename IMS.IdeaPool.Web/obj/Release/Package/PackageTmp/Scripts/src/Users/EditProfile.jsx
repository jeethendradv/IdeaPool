import React from 'react'
import UserHelper from 'component/User'
import FormInput from 'component/FormInput'
import FormCheckbox from 'component/FormCheckbox'
import { NotificationManager } from 'notification';
import BaseComponent from 'component/BaseComponent'

class EditProfile extends BaseComponent {
    constructor() {
        super();
        this.config = this.getConfig();
        this.state = this.getDefaultState();
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
            company: {
                name: 'company',
                type: 'text',
                label: 'Company',
                validation: [{
                    isrequired: true,
                    errorcode: 110
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

    componentDidMount() {
        this.$loading = $(this.el);
        this.makeCall('/User/GetUser', 'GET', null, this.onFetchUserDetails.bind(this));
    }

    onFetchUserDetails(userInfo) {
        this.state.firstname.value = userInfo.FirstName;
        this.state.lastname.value = userInfo.LastName;
        this.state.company.value = userInfo.Company;
        this.state.phone.value = userInfo.Phone;
        this.state.isSubscriptionEnabled.value = userInfo.IsSubscriptionEnabled;
        this.state.userId = userInfo.Id;
        this.setState(this.state);
    }

    updateUser() {
        const data = {
            FirstName: this.state.firstname.value,
            LastName: this.state.lastname.value,
            Company: this.state.company.value,
            Phone: this.state.phone.value,
            IsSubscriptionEnabled: this.state.isSubscriptionEnabled.value,
            Id: this.state.userId
        };
        this.makeCall('/User/Update', 'POST', data, this.onUserUpdateSuccess.bind(this));
    }

    onUserUpdateSuccess() {
        UserHelper.Refresh();
        NotificationManager.success('User updated successfully.');
    }

    render() {
        return (
            <div className="row" ref={el => this.el = el}>
                <div className="col-lg-3"></div>
                <div className="col-lg-6 border page-background">
                    <h2>Edit Profile</h2>
                    <hr />
                    <FormInput config={this.config.firstname} state={this.state.firstname} valuebind={this.valuebind.bind(this, this.config.firstname.name)} />
                    <FormInput config={this.config.lastname} state={this.state.lastname} valuebind={this.valuebind.bind(this, this.config.lastname.name)} />
                    <FormInput config={this.config.company} state={this.state.company} valuebind={this.valuebind.bind(this, this.config.company.name)} />
                    <FormInput config={this.config.phone} state={this.state.phone} valuebind={this.valuebind.bind(this, this.config.phone.name)} />
                    <FormCheckbox config={this.config.isSubscriptionEnabled} state={this.state.isSubscriptionEnabled} checkboxvaluebind={this.checkboxvaluebind.bind(this, this.config.isSubscriptionEnabled.name)} />
                    <hr />
                    <div className="form-group">
                        <button className="btn btn-primary btn-hynds" onClick={this.validate.bind(this, this.updateUser.bind(this))}>Update</button>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        );
    }
}

export default EditProfile