import React from 'react'
import _ from 'lodash'
import BaseComponent from 'component/BaseComponent'

class Roles extends BaseComponent {
    constructor() {
        super();
        this.state = {
            roles: [],
            key: '',
            value: 'Select role to add'
        };
    }

    componentDidMount() {
        this.makeCall('/User/FetchAllRoles', 'POST', null, this.onFetchSuccess.bind(this));
    }

    onFetchSuccess(roles) {
        this.state.roles = roles;
        this.setState(this.state);
    }

    onSelect(key, value) {
        this.state.key = key;
        this.state.value = value;
        this.setState(this.state);
    }

    addRole() {
        if (!_.isEmpty(this.state.key)) {
            this.props.onAddRole(this.state.key);
        }
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle updatestatus-dropdown user-role" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.value}  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2" role="menu">
                    {
                        this.state.roles.map(
                            role => (
                                <li className={this.state.key == role.Key ? 'active' : null} key={role.Key}>
                                    <a className="dropdown-item" onClick={this.onSelect.bind(this, role.Key, role.Value)}>{role.Value}</a>
                                </li>
                            )
                        )
                    }
                </ul>
                <button className="btn btn-primary btn-hynds" onClick={this.addRole.bind(this)}><span className="glyphicon glyphicon-plus"></span></button>
            </div>
        );
    }
}

export default Roles