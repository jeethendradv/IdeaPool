import React from 'react'
import BaseComponent from 'component/BaseComponent'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import Pager from 'component/Pager'
import PagerBar from 'component/PagerBar'
import IdeaAdvancedSearch from 'component/IdeaAdvancedSearch'
import PubSub from 'pubsub'
import _ from 'lodash'

class IdeasGrid extends Pager {
    constructor(props) {
        super(props);
        this.markread = PubSub.subscribe('markread', this.markdiscussionasread.bind(this));
    }

    onAdvancedSearch(data) {
        this.state.currentpage = 1;
        this.fetchRowsWithData(data);
    }

    onChatClick(ideaId) {
        if (this.props.onChatClick) {
            this.props.onChatClick(ideaId);
        }
    }

    onExport(data) {
        let url = '/Idea/Export?fieldOfWaterId=' + data.FieldOfWaterId + '&statusId=' + data.StatusId + '&userId=' + data.UserId + '&searchText=' + data.SearchText + '&exportType=' + data.ExportType;
        window.location.href = url;
    }

    componentDidMount() {
        super.componentDidMount();
        this.$ideagrid = $(this.el);
    }

    componentDidUpdate() {
        this.$ideagrid.tooltip();
    }

    markdiscussionasread(event, ideaId) {
        var ideaObj = _.find(this.state.rows, function (idea) { return idea.Id == ideaId });
        if (ideaObj && ideaObj.HasUnreadDiscussions) {
            ideaObj.HasUnreadDiscussions = false;
            this.setState({ rows: this.state.rows });
        }
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.markread);
    }

    render() {
        return (
            <div>
                {
                    this.state.numberofrows > this.state.pagelength ?
                        <PagerBar
                            currentpage={this.state.currentpage}
                            pagelength={this.state.pagelength}
                            numberofrows={this.state.numberofrows}
                            onNext={this.onNext.bind(this)}
                            onPrevious={this.onPrevious.bind(this)}
                            onPageLengthChange={this.onPageLengthChange.bind(this)}
                        />
                        : null
                }
                <table className="table table-hover table-sm" ref={el => this.el = el}>
                    {
                        this.props.showAdvancedSearch ?
                            <thead>
                                <IdeaAdvancedSearch
                                    onSearch={this.onAdvancedSearch.bind(this)}
                                    onExport={this.onExport.bind(this)}
                                />
                            </thead>
                            : null
                    }
                    <thead className="thead-inverse">
                        <tr>
                            <th scope="col">Submit Date</th>
                            {
                                this.props.shownamecolumn ?
                                    <th scope="col">Name</th>
                                    : null
                            }
                            <th scope="col">Title</th>
                            <th scope="col">Field Of Water</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.rows.map(
                                idea =>
                                    (
                                        <tr key={idea.Id} className={idea.IsDraft ? 'idea-draft' : ''}>
                                            <td>{idea.SubmitDate}</td>
                                            {
                                                this.props.shownamecolumn ?
                                                    <td>{idea.CreatedBy}</td> : null
                                            }
                                            <td><Link to={`/Idea/View/${idea.Id}`}>{idea.Title}</Link></td>
                                            <td>
                                                {
                                                    idea.FieldOdWater.map(
                                                        fieldofwater => (
                                                            <div key={fieldofwater}>
                                                                <div className="border rounded fieldofwater-label">{fieldofwater}</div>
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </td>
                                            <td><div className="border rounded fieldofwater-label" style={{ backgroundColor: idea.Status.Color }}>{idea.Status.Name}</div></td>
                                            <td>
                                                {
                                                    idea.CanEdit ?
                                                        <Link to={`/Idea/Edit/${idea.Id}`}>
                                                            <span className="glyphicon glyphicon-pencil"> </span>
                                                        </Link>
                                                        : null
                                                }
                                                &nbsp;&nbsp;
                                                {
                                                    !idea.IsDraft ?
                                                        <a onClick={this.onChatClick.bind(this, idea.Id)} data-toggle="tooltip" title="Discuss this Idea.">
                                                            <span className="glyphicon glyphicon-comment"></span>
                                                        </a>
                                                        : null
                                                }
                                            </td>
                                            <td>
                                                {
                                                    idea.HasUnreadDiscussions ?
                                                        <span className="glyphicon glyphicon-one-fine-dot" data-toggle="tooltip" title="You have unread discussions."></span>
                                                        : null
                                                }
                                            </td>
                                        </tr>
                                    )
                            )
                        }
                    </tbody>
                </table>
                {
                    this.state.numberofrows > this.state.pagelength ?
                        <PagerBar
                            currentpage={this.state.currentpage}
                            pagelength={this.state.pagelength}
                            numberofrows={this.state.numberofrows}
                            onNext={this.onNext.bind(this)}
                            onPrevious={this.onPrevious.bind(this)}
                            onPageLengthChange={this.onPageLengthChange.bind(this)}
                        />
                        : null
                }
            </div>
        );
    }
}

export default IdeasGrid