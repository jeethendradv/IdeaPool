import React from 'react'
import BaseComponent from 'component/BaseComponent'
import UsersAutocomplete from 'component/UsersAutocomplete'
import FieldOfWaterDropdown from 'component/FieldOfWaterDropdown'
import IdeaStatusDropdown from 'component/IdeaStatusDropdown'
import ExportDropdown from 'component/ExportDropdown'
import UserHelper from 'component/User'
import FeatureKeys from 'component/FeatureKeys'

class IdeaAdvancedSearch extends BaseComponent {
    constructor() {
        super();
        this.state.canexport = UserHelper.HasAccess(FeatureKeys.EXPORT_IDEAS);
    }

    onIdeaStatusChange(statusId) {
        this.state.IdeaStatusId = statusId;
    }

    onFieldOfWaterChange(fieldOfWaterId) {
        this.state.FieldOfWaterId = fieldOfWaterId;
    }

    onUserChange(userId) {
        this.state.UserId = userId;
    }

    advancedSearch() {
        if (this.props.onSearch) {
            const params = {
                StatusId: this.state.IdeaStatusId,
                FieldOfWaterId: this.state.FieldOfWaterId,
                UserId: this.state.UserId,
                SearchText: this.state.searchText
            };
            this.props.onSearch(params);
        }
    }

    onSearchTextChange(event) {
        this.state.searchText = event.target.value;
    }

    onExportChange(type) {
        if (this.props.onExport) {
            const params = {
                StatusId: this.state.IdeaStatusId ? this.state.IdeaStatusId : 0,
                FieldOfWaterId: this.state.FieldOfWaterId ? this.state.FieldOfWaterId : 0,
                UserId: this.state.UserId ? this.state.UserId : 0,
                SearchText: this.state.searchText ? this.state.searchText : '',
                ExportType: type
            };
            this.props.onExport(params);
        }
    }

    render() {
        return (
            <tr className="idea-advancedsearch">
                <th scope="col">
                    {
                        this.state.canexport ? 
                            <ExportDropdown
                                onChange={this.onExportChange.bind(this)}
                            />
                            : null
                    }                    
                </th>
                <th scope="col">
                    <UsersAutocomplete
                        hidesearch={true}
                        onChange={this.onUserChange.bind(this)}
                    />
                </th>
                <th scope="col">
                    <div className="row form-inline idea-advancedsearch-textsearch">
                        <input className="form-control"
                            type="text"
                            placeholder="Enter the search term"
                            onChange={this.onSearchTextChange.bind(this)}
                        />
                    </div>
                </th>
                <th scope="col">
                    <FieldOfWaterDropdown
                        onChange={this.onFieldOfWaterChange.bind(this)}
                    />
                </th>
                <th scope="col">
                    <IdeaStatusDropdown
                        onChange={this.onIdeaStatusChange.bind(this)}
                    />
                </th>
                <th scope="col">
                    <button className="btn btn-primary btn-IMS" onClick={this.advancedSearch.bind(this)}>Search</button>
                </th>
                <th scope="col"></th>
            </tr>
        );
    }
}

export default IdeaAdvancedSearch