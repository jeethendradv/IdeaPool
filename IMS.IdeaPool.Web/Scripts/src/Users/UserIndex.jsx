import React from 'react'
import BaseComponent from 'component/BaseComponent'
import UsersAutocomplete from 'component/UsersAutocomplete'
import UserDetails from 'users/UserDetails'
import UsersGrid from 'users/UsersGrid'
import { Switch, Route } from 'react-router-dom'

class UserIndex extends BaseComponent {
    constructor() {
        super();
    }

    onUserSelect(userId) {
        this.resetState();
        this.state = {
            showuserdetails: true,
            showusergrid: false,
            userid: userId
        };
        this.setState(this.state);
    }

    resetState() {
        this.state = {};
    }

    searchUsers(searchterm) {
        this.resetState();
        this.state = {
            showusergrid: true,            
            searchname: searchterm
        };
        this.setState(this.state);
    }

    render() {
        return (
            <div>
                <UsersAutocomplete
                    onSelect={this.onUserSelect.bind(this)}
                    onSearch={this.searchUsers.bind(this)}
                />                
                {
                    this.state.showusergrid ?
                        <UsersGrid searchname={this.state.searchname} onUserClick={this.onUserSelect.bind(this)} />
                        : this.state.showuserdetails ?
                            <UserDetails id={this.state.userid} />
                            : null
                }
            </div>
        );
    }
}

export default UserIndex