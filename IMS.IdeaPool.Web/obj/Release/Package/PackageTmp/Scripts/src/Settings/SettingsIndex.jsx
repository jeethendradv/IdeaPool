import React from 'react'
import GroupSettings from 'component/GroupSettings'
import FieldOfWaterSettings from 'component/FieldOfWaterSettings'
import IdeaStatusSettings from 'component/IdeaStatusSettings'
import BaseComponent from 'component/BaseComponent'

class SettingsIndex extends BaseComponent {
    constructor() {
        super();
        this.state.groups = [];
    }

    componentDidMount() {
        this.makeCall('/Settings/Get', 'GET', null, this.onSettingsDataFetch.bind(this));
    }

    onSettingsDataFetch(groups) {
        this.state.groups = groups;
        this.setState(this.state);
    }

    render() {
        return (
            <div>
                {
                    this.state.groups.map(
                        group => (
                            <GroupSettings
                                key={group.Key}
                                group={group}
                            />
                        )
                    )
                }
                <FieldOfWaterSettings />
                <IdeaStatusSettings />
            </div>
        );
    }
}

export default SettingsIndex