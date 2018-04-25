import React from 'react'
import ErrorMessage from 'component/ErrorMessage'
import ErrorHelper from 'component/ErrorHelper'
import ToggleButton from 'component/ToggleButton'
import $ from 'jquery'
import 'spectrum'
import { NotificationManager } from 'notification';
import BaseComponent from 'component/BaseComponent'

class IdeaStatusSettings extends BaseComponent {
    constructor() {
        super();
        this.config = this.getConfig();
        this.state = this.getDefaultState();
        this.state.rows = [];
    }

    componentDidMount() {
        this.fetchAllIdeaStatus();
        this.initColorPicker();
    }

    fetchAllIdeaStatus() {
        this.makeCall('/Settings/FetchAllIdeaStatuses', 'POST', null, this.onIdeaStatusFetch.bind(this));
    }

    initColorPicker() {
        this.$colorpicker = $(this.el);
        this.$colorpicker.spectrum({
            color: this.config.color.value,
            change: this.onColorChange.bind(this)
        });
    }

    onColorChange(color) {
        this.state.color.value = color.toHexString();
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
                placeholder: 'Enter status description',
                errordata: {
                    field: 'Description',
                    length: 250
                },
                validation: [{
                    isrequired: true,
                    errorcode: 134
                }, {
                    length: 250,
                    errorcode: 120
                }]
            }, 
            color: {
                name: 'color',
                value: '#7195ce'
            }
        };
    }

    onIdeaStatusFetch(data) {
        this.state.rows = data;
        this.setState(this.state.rows);
    }

    activateIdeaStatus(id) {
        this.makeCall('/Settings/ActivateIdeaStatus', 'POST', { statusId: id }, this.onActivatedOrDeactivated.bind(this, true));
    }

    deactivateIdeaStatus(id) {
        this.makeCall('/Settings/DeactivateIdeaStatus', 'POST', { statusId: id }, this.onActivatedOrDeactivated.bind(this, false));
    }

    onActivatedOrDeactivated(isActivated) {
        this.fetchAllIdeaStatus();
        let message = isActivated ? "Idea status activated successfully" : "Idea status deactivated successfully";
        NotificationManager.success(message);
    }

    addIdeaStatus() {
        let data = {
            Name: this.state.name.value,
            Description: this.state.description.value,
            Color: this.state.color.value
        };
        this.makeCall('/Settings/AddIdeaStatus', 'POST', data, this.onAddIdeaStatusSuccess.bind(this));
    }

    onAddIdeaStatusSuccess() {
        this.state.name.value = '';
        this.state.description.value = '';
        NotificationManager.success('Idea status added successfully');
        this.fetchAllIdeaStatus();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-6">
                        <h2>Idea Statuses</h2>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
                <hr />
                <table className="table userdetails">
                    <tbody>
                        <tr style={{ backgroundColor: "#e8e9ea" }}>
                            <td className="col-lg-2"></td>
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
                            <td className="col-lg-2">
                                <input
                                    type="text"
                                    ref={el => this.el = el}
                                />
                            </td>
                            <td className="col-lg-2">
                                <button className="btn btn-primary btn-hynds" onClick={this.validate.bind(this, this.addIdeaStatus.bind(this))}>
                                    Add Idea Status
                                </button>
                            </td>
                            <td className="col-lg-1"></td>
                        </tr>
                        {
                            this.state.rows.map(
                                status => (
                                    <tr key={status.Id}>
                                        <td className="col-lg-2"></td>
                                        <td className="col-lg-2">{status.Name}</td>
                                        <td className="col-lg-3">{status.Description}</td>
                                        <td className="col-lg-2">
                                            <div className="border rounded fieldofwater-label" style={{ backgroundColor: status.Color }}>Status Color</div>
                                        </td>
                                        <td className="col-lg-2">
                                            <ToggleButton
                                                onClick={this.activateIdeaStatus.bind(this, status.Id)}
                                                offClick={this.deactivateIdeaStatus.bind(this, status.Id)}
                                                onconfig={{ text: 'Active', isselected: status.IsActive }}
                                                offconfig={{ text: 'Deactive', isselected: !status.IsActive }}
                                            />
                                        </td>
                                        <td className="col-lg-1"></td>
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

export default IdeaStatusSettings