import React from 'react'
import BaseComponent from 'component/BaseComponent'
import UserHelper from 'component/User'
import FeatureKeys from 'component/FeatureKeys'
import _ from 'lodash'
import { NotificationManager } from 'notification';
import ErrorHelper from 'component/ErrorHelper'

class IdeaStatusUpdate extends BaseComponent {
    constructor(props) {
        super();
        this.state.canupdatestatus = UserHelper.HasAccess(FeatureKeys.UPDATE_IDEA_STATUS);
        this.state.statuses = [];
    }

    componentDidMount() {
        if (this.state.canupdatestatus) {
            this.makeCall('/Idea/FetchIdeaStatus', 'GET', null, this.onStatusFetch.bind(this));
        }
    }

    onStatusFetch(response) {
        this.state.statuses = response;
        this.setState(this.state);
    }

    onStatusChange(id) {
        var status = _.find(this.state.statuses, { Id: id });
        this.state.selectedStatusId = status.Id;
        this.state.selectedStatusName = status.Name;
        this.setState(this.state);
    }

    updateStatus() {
        var data = {
            ideaId: this.state.ideaId,
            statusId: this.state.selectedStatusId
        };
        this.makeCall('/Idea/UpdateStatus', 'POST', data, this.statusUpdateSuccess.bind(this));
    }

    statusUpdateSuccess() {
        NotificationManager.success(ErrorHelper.GetErrorMessage(131));
    }

    render() {
        if (this.state.canupdatestatus) {
            this.state.selectedStatusName = this.state.selectedStatusName || this.props.status.Name;
            this.state.selectedStatusId = this.state.selectedStatusId || this.props.status.Id;
            this.state.ideaId = this.props.ideaId;

            return (
                <div className="right">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle updatestatus-dropdown" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.selectedStatusName} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu hide-section-when-print" aria-labelledby="dropdownMenu2" role="menu">
                            {
                                this.state.statuses.map(
                                    status => (
                                        <li key={status.Id} className={this.state.selectedStatusId == status.Id ? 'active' : null}>
                                            <a className="dropdown-item" href="#" onClick={this.onStatusChange.bind(this, status.Id)}>{status.Name}</a>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                        <button className="btn btn-primary btn-hynds hide-section-when-print" onClick={this.updateStatus.bind(this)}>Update Status</button>
                    </div>
                </div>
            );
        } else {
            return (
                <span
                    className="border rounded viewIdea-label-2 right"
                    style={{ backgroundColor: this.props.status.Color }}
                >
                    {this.props.status.Name}
                </span>
            );
        }
    }
}

export default IdeaStatusUpdate