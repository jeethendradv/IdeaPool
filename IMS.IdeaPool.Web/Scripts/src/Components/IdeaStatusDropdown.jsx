import React from 'react'
import BaseComponent from 'component/BaseComponent'

class IdeaStatusDropdown extends BaseComponent {
    constructor() {
        super();
        this.state.statuses = [];
    }

    componentDidMount() {
        this.makeCall('/Idea/FetchIdeaStatus', 'GET', null, this.onStatusFetch.bind(this));
    }

    onStatusFetch(response) {
        const empty = [{ Id: 0, Name: '-Select Status-' }];
        this.state.selectedStatusId = empty[0].Id;
        this.state.selectedStatusName = empty[0].Name;
        this.state.statuses = empty.concat(response);
        this.setState(this.state);
    }

    onStatusChange(id) {
        var status = _.find(this.state.statuses, { Id: id });
        this.state.selectedStatusId = status.Id;
        this.state.selectedStatusName = status.Name;
        this.setState(this.state);
        if (this.props.onChange) {
            this.props.onChange(id);
        }
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle updatestatus-dropdown" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.selectedStatusName} <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2" role="menu">                    
                    {
                        this.state.statuses.map(
                            status => (
                                <li key={status.Id} className={this.state.selectedStatusId == status.Id ? 'active' : null}>
                                    <a className="dropdown-item" onClick={this.onStatusChange.bind(this, status.Id)}>{status.Name}</a>
                                </li>
                            )
                        )
                    }
                </ul>                
            </div>
        );
    }
}

export default IdeaStatusDropdown