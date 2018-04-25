import React from 'react'
import BaseComponent from 'component/BaseComponent'
import { Link } from 'react-router-dom'
import UserHelper from 'component/User'
import FeatureKeys from 'component/FeatureKeys'

class Menu extends BaseComponent {
    constructor() {
        super();
        this.state = {
            home: { isactive: true },
            users: { isactive: false },
            settings: { isactive: false },
            resetpassword: { isactive: false },
            editprofile: { isactive: false }
        }
    }

    onMenuClick(menuName) {
        for (var menuItem in this.state) {
            this.state[menuItem].isactive = menuItem == menuName;
        }
    }

    onLogOut() {
        if (this.props.onLogOut) {
            this.props.onLogOut();
        }
    }

    render() {
        return (
            <div>
                <ul className="nav navbar-nav">
                    <li className={this.state.home.isactive ? 'active' : ''}><Link to="/Home/Index" onClick={this.onMenuClick.bind(this, 'home')}>Home</Link></li>
                    {
                        UserHelper.HasAccess(FeatureKeys.USER_SEARCH) && UserHelper.HasAccess(FeatureKeys.USER_EDIT)?
                            <li className={this.state.users.isactive ? 'active' : ''}><Link to="/Users/Index" onClick={this.onMenuClick.bind(this, 'users')}>Users</Link></li>
                            : null
                    }
                    {
                        UserHelper.HasAccess(FeatureKeys.SETTINGS_EDIT) ?
                            <li className={this.state.settings.isactive ? 'active' : ''}><Link to="/Settings/Index" onClick={this.onMenuClick.bind(this, 'settings')}>Settings</Link></li>
                            : null
                    }                    
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className={this.state.editprofile.isactive ? 'active' : ''}><Link to="/User/EditProfile" onClick={this.onMenuClick.bind(this, 'editprofile')}><span className="glyphicon glyphicon-user"></span> Edit Profile</Link></li>
                    <li className={this.state.resetpassword.isactive ? 'active' : ''}><Link to="/User/ResetPassword" onClick={this.onMenuClick.bind(this, 'resetpassword')}><span className="glyphicon glyphicon-refresh"></span> Reset Password</Link></li>
                    <li><a onClick={this.onLogOut.bind(this)} href="/Logout/Index"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                </ul>
            </div>
        );
    }
}

export default Menu