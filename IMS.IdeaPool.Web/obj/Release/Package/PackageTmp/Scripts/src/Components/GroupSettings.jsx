import React from 'react'
import ErrorMessage from 'component/ErrorMessage'
import ErrorHelper from 'component/ErrorHelper'
import { NotificationManager } from 'notification';
import SystemSettings from 'component/SystemSettings'
import BaseComponent from 'component/BaseComponent'

class GroupSettings extends BaseComponent {
    constructor(props) {
        super(props);
        this.init(props);
    }

    init(props) {
        this.config = this.getConfig(props.group);
        this.state = this.getDefaultState();
        this.state.Key = props.group.Key;
        this.state.groupname = props.group.Name;
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    getConfig(group) {
        var config = {};
        if (group && group.Settings && group.Settings.length > 0) {
            for (var i = 0; i < group.Settings.length; i++) {
                var setting = group.Settings[i];
                if (setting.Key) {
                    config[setting.Key] = this.getConfigItem(setting);
                }
            }
        }
        return config;
    }

    getConfigItem(setting) {
        var configItem = {
            validation:
            [
                {
                    isrequired: true,
                    errorcode: 134
                }
            ]
        };
        if (setting.Key) {
            configItem.name = setting.Key;
        }
        if (setting.Type) {
            configItem.type = setting.Type;
        }
        if (setting.Description) {
            configItem.label = setting.Description;
        }
        if (setting.Value) {
            configItem.value = setting.Value;
        }
        if (setting.Limit && setting.Type === 'number') {
            configItem.errordata = {
                field: 'Field',
                limit: parseInt(setting.Limit)
            }
            configItem.validation.push({
                max: parseInt(setting.Limit),
                errorcode: 135
            });
        }
        if (setting.Type && setting.Type === 'number') {
            configItem.validation.push({
                isnumeric: true,
                errorcode: 136
            });
        }
        return configItem;
    }

    update() {
        var settingsIndex = 0;        
        var settings = [];
        var data = new FormData();
        data.append("Key", this.state.Key);
        data.append("Name", this.state.groupname);
        if (this.props.group && this.props.group.Settings && this.props.group.Settings.length > 0) {
            for (var i = 0; i < this.props.group.Settings.length; i++) {
                var setting = this.props.group.Settings[i];
                if (setting.Key) {
                    data.append("Settings[" + settingsIndex + "].Key", setting.Key);
                    data.append("Settings[" + settingsIndex + "].Value", this.state[setting.Key].value);                    
                    settingsIndex = settingsIndex + 1;
                }
            }
        }
        this.postFormWithFileData('/Settings/UpdateSettings', data, this.onUpdateSuccess.bind(this));
    }

    onUpdateSuccess() {
        SystemSettings.Refresh();
        NotificationManager.success('Settings updated successfully.');
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <h2>{this.state.groupname}</h2>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
                <hr />
                <table className="table userdetails">
                    <tbody>
                        {
                            this.props.group.Settings.map(
                                setting => (
                                    <tr key={setting.Key}>
                                        <td className="col-lg-3"></td>
                                        <td className="col-lg-3">{this.config[setting.Key].label}</td>
                                        <td className="col-lg-3">
                                            {
                                                this.config[setting.Key].type === 'boolean' ?
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state[setting.Key].value}
                                                        name={this.config[setting.Key].name}
                                                        onChange={this.checkboxvaluebind.bind(this, this.config[setting.Key].name)} />
                                                    :
                                                    <input className="form-control"
                                                        type={this.config[setting.Key].type}
                                                        name={this.config[setting.Key].name}
                                                        placeholder={this.config[setting.Key].placeholder}
                                                        value={this.state[setting.Key].value}
                                                        onChange={this.valuebind.bind(this, this.config[setting.Key].name)}
                                                    />
                                            }
                                            {this.state[setting.Key].isvalid ? '' : <ErrorMessage message={ErrorHelper.GetErrorMessageFromTemplate(this.state[setting.Key].errorcode, this.config[setting.Key].errordata)} />}
                                        </td>
                                        <td className="col-lg-3"></td>
                                    </tr>
                                )
                            )
                        }
                        <tr>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-3">
                                <button onClick={this.validate.bind(this, this.update.bind(this))} className="btn btn-primary btn-hynds">
                                    Update
                                </button>
                            </td>
                            <td className="col-lg-3"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GroupSettings