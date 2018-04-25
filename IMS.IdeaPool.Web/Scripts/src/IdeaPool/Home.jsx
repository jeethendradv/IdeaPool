import React from 'react'
import BaseComponent from 'component/BaseComponent'
import Welcome from 'component/Welcome'
import UserHelper from 'component/User'
import IdeasGrid from 'component/IdeasGrid'
import FeatureKeys from 'component/FeatureKeys'

class Home extends BaseComponent {
    constructor(props) {
        super(props);
        this.firstname = UserHelper.GetFirstName();
        this.cansubmitidea = UserHelper.HasAccess(FeatureKeys.SUBMIT_IDEA);
        this.hasaccesstootherideas = UserHelper.HasAccess(FeatureKeys.VIEW_IDEAS_OF_OTHERS);
    }

    onChatClick(ideaId) {
        if (this.props.onChatClick) {
            this.props.onChatClick(ideaId);
        }
    }

    render() {
        return (
            <div>
                <Welcome
                    firstname={this.firstname}
                    cansubmitidea={this.cansubmitidea}
                />
                <IdeasGrid
                    shownamecolumn={this.hasaccesstootherideas}
                    showAdvancedSearch={this.hasaccesstootherideas}
                    onChatClick={this.onChatClick.bind(this)}
                    url='/Idea/FetchAll'
                />
            </div>
        );
    }
}

export default Home