import $ from 'jquery'
import React from 'react'
import 'signalr'
import ChatBox from 'component/ChatBox'
import UserHelper from 'component/User'
import _ from 'lodash'
import PushNotification from 'component/PushNotification'
import ErrorHandler from 'component/ErrorHandler'

class ChatContainer extends ErrorHandler {
    constructor() {
        super();
        this.state = {
            newmessage: {
                channelname: 0
            }
        };
        this.startConnection();
    }

    startConnection() {
        this.connection = $.hubConnection();
        this.discussion = this.connection.createHubProxy('discussionHub');
        this.discussion.on('receiveMessage', this.receiveMessage.bind(this));
        this.discussion.on('receiveFile', this.receiveFile.bind(this));
        this.discussion.on('notifyOwners', this.notifyOwners.bind(this));
        this.discussion.on('joinGroup', this.joinGroup.bind(this));
        this.connection.start();        
    }

    notifyOwners(channelname, userid, username, message) {
        let index = _.findIndex(this.props.channels, function (channelName) {
            return channelname == channelName;
        });
        if (index === -1) {
            PushNotification.Show(channelname, userid, username, this.startChat.bind(this));
        }
    }

    joinGroup(channelname) {
        this.discussion.invoke('AddToGroup', channelname);
    }

    startChat(channelId) {
        if (this.props.startChat) {
            this.props.startChat(channelId);
        }
    }

    receiveMessage(channelname, userid, username, message) {
        let index = _.findIndex(this.props.channels, function (channelName) {
            return channelname == channelName;
        });
        if (index === -1) {            
            PushNotification.Show(channelname, userid, username, this.startChat.bind(this));
        }
        else {
            var currentDatetime = new Date();
            this.state.newmessage = {
                channelname: channelname,
                userid: userid,
                username: username,
                message: message,
                datetime: currentDatetime.toLocaleDateString('en-GB') + ' ' + currentDatetime.toLocaleTimeString()
            };
            this.setState(this.state);
            this.state.newmessage = { channelname: 0 };
        }
    }

    receiveFile(channelname, userid, username, fileid, name, thumbnail, contenttype, isimage) {
        let index = _.findIndex(this.props.channels, function (channelName) {
            return channelname == channelName;
        });
        if (index === -1) {
            PushNotification.Show(channelname, userid, username, this.startChat.bind(this));
        }
        else {
            var currentDatetime = new Date();
            this.state.newmessage = {
                channelname: channelname,
                userid: userid,
                username: username,
                fileid: fileid,
                filename: name,
                datetime: currentDatetime.toLocaleDateString('en-GB') + ' ' + currentDatetime.toLocaleTimeString(),
                contenttype: contenttype,
                thumbnail: thumbnail,
                isimage: isimage,
                isfile: true
            };
            this.setState(this.state);
            this.state.newmessage = { channelname: 0 };
        }
    }

    closeChat(channelId) {        
        if (this.props.closeChat) {
            this.props.closeChat(channelId);
        }
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.close) {
            this.connection.stop();
        }
    }

    render() {
        return (
            <div className="msg_container">
                {
                    this.props.channels.map(
                        channelId => (
                            <ChatBox
                                key={channelId}
                                channelid={channelId}
                                closeChat={this.closeChat.bind(this)}
                                discussionProxy={this.discussion}
                                userid={UserHelper.GetId()}
                                username={UserHelper.GetUserName()}
                                newmessage={parseInt(this.state.newmessage.channelname) == channelId ? this.state.newmessage : null}
                            />
                        )
                    )
                }
            </div>
        );
    }
}

export default ChatContainer