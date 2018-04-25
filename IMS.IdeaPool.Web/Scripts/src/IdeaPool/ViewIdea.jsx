import React from 'react'
import BaseComponent from 'component/BaseComponent'
import { Link } from 'react-router-dom'
import IdeaStatusUpdate from 'component/IdeaStatusUpdate'
import Thumbnail from 'component/Thumbnail'
import PubSub from 'pubsub'
import UserHelper from 'component/User'
import FeatureKeys from 'component/FeatureKeys'

class ViewIdea extends BaseComponent {
    constructor(props) {
        super();
        this.state.idea = {
            FieldOfWater: [],
            Files: [],
            Status: {},
            User: {}
        };
        this.state.canprint = UserHelper.HasAccess(FeatureKeys.PRINT_IDEA);
        this.fetchIdeaDetails(props.id);
    }

    fetchIdeaDetails(id) {
        this.makeCall("/Idea/FetchIdeaDetails", "POST", { Id: id }, this.onFetchSuccess.bind(this));
    }

    onFetchSuccess(response) {
        this.state.idea = response;
        this.setState(this.state);
    }

    onChatClick(ideaId) {
        if (this.props.onChatClick) {
            this.props.onChatClick(ideaId);
        }
    }

    componentDidMount() {
        this.$el = $(this.el);
    }

    componentDidUpdate() {
        this.$el.tooltip();
    }

    showUserDetails(userId) {
        PubSub.publish('showUserDetails', userId);
    }

    printIdea() {
        window.print();
        this.makeCall('/Audit/AuditPrint', 'POST', { ideaId: this.props.id });
    }

    render() {
        return (
            <div ref={el => this.el = el} className="section-to-print">
                <h2>{this.state.idea.Title}</h2>
                <div>
                    By: <span className="idea-creator"><a onClick={this.showUserDetails.bind(this, this.state.idea.User.Id)}>{this.state.idea.User.FirstName}, {this.state.idea.User.LastName}</a></span>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        {
                            this.state.idea.FieldOfWater.map(
                                fieldofwater => (
                                    <span className="border rounded viewIdea-label-2" key={fieldofwater.Id}>
                                        {
                                            fieldofwater.Id == -1 ? fieldofwater.Description : fieldofwater.Name
                                        }
                                    </span>
                                )
                            )
                        }
                    </div>
                    <div className="col-xs-6">
                        {
                            this.state.canprint ?
                                <button className="border print-button btn right hide-section-when-print" onClick={this.printIdea.bind(this)}><span className="glyphicon glyphicon-print"></span> Print</button>
                                : null
                        }
                        <IdeaStatusUpdate status={this.state.idea.Status} ideaId={this.state.idea.Id} />
                        {
                            !this.state.idea.IsDraft ?
                                <a className="right hide-section-when-print" style={{ marginRight: 6 + '%' }} onClick={this.onChatClick.bind(this, this.state.idea.Id)} data-toggle="tooltip" title="Discuss this Idea.">
                                    <span className="glyphicon glyphicon-comment"></span>
                                </a>
                                : null
                        }
                    </div>
                </div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: this.state.idea.DescriptionHtml }} />
                <Thumbnail files={this.state.idea.Files} ideaId={this.state.idea.Id} />
                <hr />
                <div className="form-group hide-section-when-print">
                    <div className="row">
                        <Link className="btn btn-info btn-IMS left" to="/Home/Index"><span className="glyphicon glyphicon-arrow-left"></span> Back</Link>
                    </div>
                </div>
            </div >
        );
    }
}

export default ViewIdea