import React from 'react'
import ErrorMessage from 'component/ErrorMessage'
import ErrorHelper from 'component/ErrorHelper'
import ToggleButton from 'component/ToggleButton'
import BaseComponent from 'component/BaseComponent'
import { NotificationManager } from 'notification';

class FieldOfWaterSettings extends BaseComponent {
    constructor() {
        super();
        this.config = this.getConfig();
        this.state = this.getDefaultState();
        this.state.rows = [];
    }

    componentDidMount() {
        this.fetchAllFieldOfWaters();
    }

    fetchAllFieldOfWaters() {
        this.makeCall('/Settings/FetchAllFieldOfWaters', 'POST', null, this.onFieldOfWaterDataFetch.bind(this));
    }

    getConfig() {
        return {
            name: {
                name: 'name',
                placeholder: 'Enter name',
                errordata: {
                    field: 'Name',
                    length: 50
                },
                validation: [{
                    isrequired: true,
                    errorcode: 134
                }, {
                    length: 50,
                    errorcode: 120
                }]
            },
            description: {
                name: 'description',
                placeholder: 'Enter field of water description',
                errordata: {
                    field: 'Description',
                    length: 500
                },
                validation: [{
                    isrequired: true,
                    errorcode: 134
                }, {
                    length: 500,
                    errorcode: 120
                }]
            }
        };
    }

    onFieldOfWaterDataFetch(data) {
        this.state.rows = data;
        this.setState(this.state.rows);
    }

    activateFieldOfWater(id) {
        this.makeCall('/Settings/ActivateFieldOfWater', 'POST', { fieldOfWaterId: id }, this.onActivatedOrDeactivated.bind(this, true));
    }

    deactivateFieldOfWater(id) {
        this.makeCall('/Settings/DeactivateFieldOfWater', 'POST', { fieldOfWaterId: id }, this.onActivatedOrDeactivated.bind(this, false));
    }

    addNewFieldOfWater() {
        let data = {
            Name: this.state.name.value,
            Description: this.state.description.value
        };
        this.makeCall('/Settings/AddFieldOfWater', 'POST', data, this.onAddFieldOfWaterSuccess.bind(this));
    }

    onActivatedOrDeactivated(isActivated) {
        this.fetchAllFieldOfWaters();
        let message = isActivated ? "Field of water activated successfully" : "Field of water deactivated successfully";
        NotificationManager.success(message);
    }

    onAddFieldOfWaterSuccess() {
        this.state.name.value = '';
        this.state.description.value = '';
        NotificationManager.success("Field of water added successfully.");
        this.fetchAllFieldOfWaters();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <h2>Field of water</h2>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
                <hr />
                <table className="table userdetails">
                    <tbody>
                        <tr style={{ backgroundColor: "#e8e9ea" }}>
                            <td className="col-lg-3"></td>
                            <td className="col-lg-2">
                                <input className="form-control"
                                    type="text"
                                    name={this.config.name.name}
                                    value={this.state.name.value}
                                    placeholder={this.config.name.placeholder}
                                    onChange={this.valuebind.bind(this, this.config.name.name)}
                                />
                                {this.state.name.isvalid ? '' : <ErrorMessage message={ErrorHelper.GetErrorMessageFromTemplate(this.state.name.errorcode, this.config.name.errordata)} />}
                            </td>
                            <td className="col-lg-3">
                                <textarea className="form-control"
                                    name={this.config.description.name}
                                    value={this.state.description.value}
                                    placeholder={this.config.description.placeholder}
                                    onChange={this.valuebind.bind(this, this.config.description.name)}
                                />
                                {this.state.description.isvalid ? '' : <ErrorMessage message={ErrorHelper.GetErrorMessageFromTemplate(this.state.description.errorcode, this.config.description.errordata)} />}
                            </td>
                            <td className="col-lg-4">
                                <button className="btn btn-primary btn-hynds" onClick={this.validate.bind(this, this.addNewFieldOfWater.bind(this))}>
                                    Add Field of water
                                </button>
                            </td>
                        </tr>
                        {
                            this.state.rows.map(
                                fieldofwater => (
                                    <tr key={fieldofwater.Id}>
                                        <td className="col-lg-3"></td>
                                        <td className="col-lg-2">{fieldofwater.Name}</td>
                                        <td className="col-lg-3">{fieldofwater.Description}</td>
                                        <td className="col-lg-4">
                                            <ToggleButton
                                                onClick={this.activateFieldOfWater.bind(this, fieldofwater.Id)}
                                                offClick={this.deactivateFieldOfWater.bind(this, fieldofwater.Id)}
                                                onconfig={{ text: 'Active', isselected: fieldofwater.IsActive }}
                                                offconfig={{ text: 'Deactive', isselected: !fieldofwater.IsActive }}
                                            />
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div >
        );
    }
}

export default FieldOfWaterSettings