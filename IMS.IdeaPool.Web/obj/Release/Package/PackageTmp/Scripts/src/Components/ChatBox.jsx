import React from 'react'
import BaseComponent from 'component/BaseComponent'
import SystemSettings from 'component/SystemSettings'
import { Link } from 'react-router-dom'
import 'colorbox';
import $ from 'jquery'
import _ from 'lodash'
import PubSub from 'pubsub'

class ChatBox extends BaseComponent {
    constructor(props) {
        super(props);
        this.config = this.getConfig();
        this.state = this.getDefaultState();
        this.state.messages = [];
        this.state.title = '';
        this.state.isValid = true;
        this.page = 0;
        this.pagelength = 10;
        this.hasFetchedAllMessages = false;
        this.discussion = this.props.discussionProxy;
        this.addToGroup(props.channelid);
    }

    addToGroup(channelid) {
        this.discussion.invoke('AddToGroup', channelid);
    }

    getConfig() {
        return {
            message: {
                name: 'message'
            }
        };
    }

    closeChat(channelId) {
        if (this.props.closeChat) {
            this.props.closeChat(channelId);
        }
    }

    onKeyPress(event) {
        if (event.which == 13) {
            event.preventDefault();
            if (this.state.message.value !== '') {
                this.discussion.invoke('SendToGroup', {
                    ChannelName: this.props.channelid,
                    UserId: this.props.userid,
                    UserName: this.props.username,
                    Message: this.state.message.value
                });
                this.state.message.value = '';
                this.setState(this.state);
            }
        }
    }

    onFileSelected(input) {
        if (input.target.files) {
            var fileCount = input.target.files.length;
            for (var i = 0; i < fileCount; i++) {
                var fileInfo = {};
                var file = input.target.files[i];

                if ((file.size / (1024 * 1024)).toFixed(2) > SystemSettings.GetMaxFileSize()) {
                    this.state.isValid = false;
                    this.setState(this.state);
                    break;
                }
                if (!this.state.isValid) {
                    this.state.isValid = true;
                    this.setState(this.state);
                }
                var data = new FormData();
                data.append(file.name, file);
                data.append("ideaId", this.props.channelid);
                this.postFormWithFileData("/Idea/UploadFile", data, this.onFileUploadSuccess.bind(this));
            }
            this.$multiFileSelect.val('');
        }
    }

    onFileUploadSuccess(fileId) {
        if (fileId) {
            this.discussion.invoke('SendFile', {
                ChannelName: this.props.channelid,
                UserId: this.props.userid,
                UserName: this.props.username,
                FileId: fileId
            });
        }
    }

    renderPreview() {
        $('a.gallery' + this.props.channelid).colorbox({
            photo: true,
            rel: this.props.channelid,
            width: '100%',
            height: '100%'
        });
    }

    componentDidMount() {
        this.$multiFileSelect = $(this.multiFileSelect);
        this.fetchDiscussions();
        this.addScrollEvent();
    }

    fetchDiscussions() {
        if (!this.hasFetchedAllMessages) {
            this.page = this.page + 1;
            this.makeCall('/Idea/FetchDiscussions', 'POST', { ideaId: this.props.channelid, page: this.page, pagelength: this.pagelength }, this.onFetchSuccess.bind(this));
        }
    }

    onFetchSuccess(discussionInfo) {
        this.hasFetchedAllMessages = discussionInfo.Discussions.length < this.pagelength;
        this.state.title = discussionInfo.Title;
        var messages = [];
        _.forEach(discussionInfo.Discussions, function (discussion) {
            messages.push({
                userid: discussion.UserId,
                message: discussion.Message,
                username: discussion.UserName,
                datetime: discussion.CreatedDateTimeString,
                fileid: discussion.FileId,
                filename: discussion.FileName,
                contenttype: discussion.FileContentType,
                thumbnail: discussion.FileThumbnail,
                isimage: discussion.IsImage,
                isfile: discussion.IsFile
            });
        }.bind(this));
        this.state.messages = _.concat(messages, this.state.messages);
        this.setState(this.state);
        this.$loader.hide();
        this.renderPreview();
        this.markRead();
    }

    markRead() {
        this.makeCall('/Idea/MarkRead', 'POST', { ideaId: this.props.channelid }, this.onMarkRead.bind(this));
    }

    onMarkRead() {
        PubSub.publish('markread', this.props.channelid);
    }

    addScrollEvent() {
        this.$loader = $(this.loader);
        this.$loader.hide();
        this.$messagebody = $(this.el);
        this.$messagebody.scroll(this.onScroll.bind(this));
    }

    onScroll() {
        var position = this.$messagebody.prop("scrollTop");
        if (position === 0 && !this.hasFetchedAllMessages) {
            this.fetchDiscussions();
            this.$loader.show();
        }
    }

    scrollToBottom() {
        this.$messagebody = $(this.el);
        this.$messagebody.scrollTop(this.$messagebody.prop("scrollHeight"));
    }

    componentWillUnmount() {
        this.discussion.invoke('RemoveFromGroup', this.props.channelid);
    }

    componentDidUpdate() {
        this.scrollToBottom();
        this.renderPreview();
        this.$messagebody.tooltip();
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.newmessage) {
            this.state.messages.push(nextprops.newmessage);
            this.setState(this.state);
        }
    }

    onBrowseClick() {
        this.$multiFileSelect.click();
    }

    showUserDetails(userId) {
        PubSub.publish('showUserDetails', userId);
    }

    render() {
        return (
            <div className="msg_box">
                <div className="msg_head">
                    <Link className="msg_head" to={`/Idea/View/${this.props.channelid}`}>{this.state.title}</Link>
                    <div className="close" onClick={this.closeChat.bind(this, this.props.channelid)}>x</div>
                    <br />
                    {
                        !this.state.isValid ?
                            <small className="error-message">File should not exceed {SystemSettings.GetMaxFileSize()} MB in size.</small>
                            : null
                    }
                </div>
                <div className="msg_wrap">
                    <div className="msg_body" ref={el => this.el = el}>
                        <div><div className="loader" ref={el => this.loader = el}></div></div>
                        {
                            this.state.messages.map(
                                (message, index) => (
                                    <div key={index} className={this.props.userid == message.userid ? 'msg_b' : 'msg_a'}>
                                        {
                                            message.isfile ?
                                                <div>
                                                    <div className='thumbnail'>
                                                        {
                                                            message.isimage ?
                                                                <a className={`gallery${this.props.channelid}`} href={`/Idea/DisplayImage?ideaId=${this.props.channelid}&imageId=${message.fileid}`}>
                                                                    <img className='img-thumbnail' src={`data:${message.contenttype};base64,${message.thumbnail}`} />
                                                                </a>
                                                                :
                                                                <img className='img-thumbnail' src={`data:${message.contenttype};base64,${message.thumbnail}`} />
                                                        }
                                                    </div>
                                                    <div className="caption">
                                                        <h6>{message.filename}</h6>
                                                        <a data-toggle="tooltip" title="Download this file." className="btn btn-info btn-circle btn-hynds" href={`/Idea/Download?ideaId=${this.props.channelid}&fileId=${message.fileid}`}>
                                                            <i className="glyphicon glyphicon-download"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                :
                                                <div className="chatmessage">{message.message}</div>
                                        }
                                        <div className="messagedby-time"><a onClick={this.showUserDetails.bind(this, message.userid)}>{message.username}</a> - {message.datetime}</div>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div className="msg_footer">
                        <input type="file" accept="image/*,.pdf" ref={el => this.multiFileSelect = el} onChange={this.onFileSelected.bind(this)} className="hidden"></input>
                        <button className="chat-file-upload" onClick={this.onBrowseClick.bind(this)} >
                            <span className="glyphicon glyphicon-paperclip"></span>
                        </button>
                        <textarea className="msg_input" value={this.state.message.value} onChange={this.valuebind.bind(this, this.config.message.name)} rows="2" onKeyPress={this.onKeyPress.bind(this)} placeholder="Type your message"></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatBox