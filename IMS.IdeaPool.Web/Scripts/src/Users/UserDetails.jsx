import React from 'react'
import BaseComponent from 'component/BaseComponent'
import ToggleButton from 'component/ToggleButton'
import Roles from 'component/Roles'
import { NotificationManager } from 'notification';

class UserDetails extends BaseComponent {
    constructor(props) {
        super();
        this.state = {
            Id: props.id,
            Roles: []
        };        
    }

    componentDidMount() {
        this.fetchUserDetails();
    }

    componentWillReceiveProps(props) {
        this.state.Id = props.id;
        this.fetchUserDetails();
    }

    fetchUserDetails() {
        var data = {
            userid: this.state.Id
        };
        this.makeCall('/User/FetchUserInfo', 'POST', data, this.onFetchUserDetails.bind(this));
    }

    onFetchUserDetails(userdetails) {
        this.state = userdetails;
        this.setState(this.state);
    }

    activateUser() {
        this.makeCall('/User/Activate', 'POST', { userId: this.state.Id }, this.onActivate.bind(this));
    }

    onActivate(isUpdated) {
        if (this.isTrue(isUpdated)) {
            NotificationManager.success('User account activated successfully.');
            this.state.IsActive = true;
        }
        else {
            NotificationManager.error('Error: User account could not be activated.');
            this.state.IsActive = false;
        }
        this.setState(this.state);
    }

    deactivateUser() {
        this.makeCall('/User/Deactivate', 'POST', { userId: this.state.Id }, this.onDeactivate.bind(this));
    }

    onDeactivate(isUpdated) {
        if (this.isTrue(isUpdated)) {
            NotificationManager.success('User account deactivated successfully.');
            this.state.IsActive = false;
        }
        else {
            NotificationManager.error('Error: User account could not be deactivated.');
            this.state.IsActive = true;
        }
        this.setState(this.state);
    }

    activateLogin() {
        this.makeCall('/User/ActivateLogin', 'POST', { userId: this.state.Id }, this.onActivateLogin.bind(this));
    }

    onActivateLogin(isUpdated) {
        if (this.isTrue(isUpdated)) {
            NotificationManager.success('User login account activated successfully.');
            this.state.IsAccountActivated = true;
        }
        else {
            NotificationManager.error('Error: User login account could not be activated.');
            this.state.IsAccountActivated = false;
        }
        this.setState(this.state);
    }

    deactivateLogin() {
        this.makeCall('/User/DeactivateLogin', 'POST', { userId: this.state.Id }, this.onDeactivateLogin.bind(this));
    }

    onDeactivateLogin(isUpdated) {
        if (this.isTrue(isUpdated)) {
            NotificationManager.success('User login account deactivated successfully.');
            this.state.IsAccountActivated = false;
        }
        else {
            NotificationManager.error('Error: User login account could not be deactivated.');
            this.state.IsAccountActivated = true;
        }
        this.setState(this.state);
    }

    addRole(key) {
        this.makeCall('/User/AddRole', 'POST', { userId: this.state.Id, key: key }, this.onRoleAdded.bind(this));
    }

    onRoleAdded(roles) {
        if (roles.length > this.state.Roles.length) {
            NotificationManager.success("Role added successfully.");
            this.state.Roles = roles;
            this.setState(this.state);
        }
        else {
            NotificationManager.error("Error: Role could not be added.");
        }
    }

    removeRole(key) {
        this.makeCall('/User/RemoveRole', 'POST', { userId: this.state.Id, key: key }, this.onRoleRemoved.bind(this));
    }

    onRoleRemoved(roles) {
        if (this.state.Roles.length > roles.length) {
            NotificationManager.success("Role removed successfully.");
            this.state.Roles = roles;
            this.setState(this.state);
        }
        else {
            NotificationManager.error("Error: Role could not be removed.");
        }
    }

    render() {
        return (
            <div>
                <hr />
                <table className="table userdetails">
                    <tbody>
                        <tr>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3">First Name</td>
                            <td className="col-lg-3">{this.state.FirstName}</td>
                            <td className="col-lg-3"></td>
                        </tr>
                        <tr>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3">Last Name</td>
                            <td className="col-lg-3">{this.state.LastName}</td>
                            <td className="col-lg-3"></td>
                        </tr>
                        <tr>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3">Company</td>
                            <td className="col-lg-3">{this.state.Company}</td>
                            <td className="col-lg-3"></td>
                        </tr>
                        <tr>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3">Email</td>
                            <td className="col-lg-3">{this.state.Email}</td>
                            <td className="col-lg-3"></td>
                        </tr>
                        <tr>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3">Phone</td>
                            <td className="col-lg-3">{this.state.Phone}</td>
                            <td className="col-lg-3"></td>
                        </tr>
                        <tr>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3">Subscription Enabled</td>
                            <td className="col-lg-3">{this.state.IsSubscriptionEnabled ? 'Yes' : 'No'}</td>
                            <td className="col-lg-3"></td>
                        </tr>
                        <tr>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3">Roles</td>
                            <td className="col-lg-6">
                                <Roles
                                    onAddRole={this.addRole.bind(this)}
                                />
                                {
                                    this.state.Roles.map(
                                        role => (
                                            <span className="tag label label-info inline" key={role.Key}>
                                                <span>{role.Value}</span>
                                                <a onClick={this.removeRole.bind(this, role.Key)}><i className="remove glyphicon glyphicon-remove-sign glyphicon-white"></i></a>
                                            </span>
                                        )
                                    )
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3">User Status</td>
                            <td className="col-lg-3">
                                <ToggleButton
                                    onClick={this.activateUser.bind(this)}
                                    offClick={this.deactivateUser.bind(this)}
                                    onconfig={{ text: 'Active', isselected: this.state.IsActive }}
                                    offconfig={{ text: 'Deactive', isselected: !this.state.IsActive }}
                                />
                            </td>
                            <td className="col-lg-3"></td>
                        </tr>
                        <tr>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3">Login Status</td>
                            <td className="col-lg-3">
                                <ToggleButton
                                    onClick={this.activateLogin.bind(this)}
                                    offClick={this.deactivateLogin.bind(this)}
                                    onconfig={{ text: 'Active', isselected: this.state.IsAccountActivated }}
                                    offconfig={{ text: 'Deactive', isselected: !this.state.IsAccountActivated }}
                                />
                            </td>
                            <td className="col-lg-3"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserDetails