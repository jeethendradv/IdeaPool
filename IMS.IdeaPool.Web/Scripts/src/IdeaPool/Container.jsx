import 'bootstrap'
import 'respond'
import BaseComponent from 'component/BaseComponent'
import React from 'react'
import PubSub from 'pubsub'
import { Switch, Route } from 'react-router-dom'
import HeaderLogo from 'component/HeaderLogo'
import Home from 'idea/Home'
import Menu from 'component/Menu'
import NewIdea from 'idea/NewIdea'
import ViewIdea from 'idea/ViewIdea'
import EditIdea from 'idea/EditIdea'
import { NotificationContainer } from 'notification';
import UserIndex from 'users/UserIndex';
import SettingsIndex from 'settings/SettingsIndex';
import ResetPassword from 'login/ResetPassword'
import EditProfile from 'users/EditProfile'
import Footer from 'component/Footer'
import ChatContainer from 'component/ChatContainer'
import UserInfoModal from 'component/UserInfoModal'
import _ from 'lodash'

class Container extends BaseComponent {
    constructor() {
        super();
        this.state.channels = [];
        this.showuserSubscribe = PubSub.subscribe('showUserDetails', this.displayUserDetails.bind(this));
    }

    startChat(ideaId) {
        if (_.indexOf(this.state.channels, ideaId) === -1) {
            this.state.channels.push(ideaId);
            this.setState(this.state);
        }
    }

    closeChat(channelId) {
        this.state.channels = _.remove(this.state.channels, function (channelId, Id) { return channelId !== Id; }.bind(this, channelId));
        this.setState(this.state);
    }

    displayUserDetails(event, userId) {
        this.state.displayuserinfo = true;
        this.state.displayuserId = userId;
        this.setState(this.state);
    }

    onUserDialogClosed() {
        this.state.displayuserinfo = false;
        this.state.displayuserId = 0;
        this.setState(this.state);
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.showuserSubscribe);
    }

    onLogOut() {
        this.state.close = true;
        this.setState(this.state);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container">
                        <HeaderLogo />
                        <Menu
                            onLogOut={this.onLogOut.bind(this)}
                        />
                    </div>
                </nav>
                <div className="container body-content">
                    <div id="messagecontainer">
                        <NotificationContainer />
                    </div>
                    <div id="content" className="content">
                        <Switch>
                            <Route exact path='/Home/Index' render={() => <Home onChatClick={this.startChat.bind(this)} />} />
                            <Route path='/Idea/New' component={NewIdea} />
                            <Route path='/Idea/View/:id' render={(props) => <ViewIdea onChatClick={this.startChat.bind(this)} {...props.match.params} />} />
                            <Route path='/Idea/Edit/:id' component={EditIdea} />
                            <Route path='/Users/Index' component={UserIndex} />
                            <Route path='/Settings/Index' component={SettingsIndex} />
                            <Route path='/User/ResetPassword' component={ResetPassword} />
                            <Route path='/User/EditProfile' component={EditProfile} />
                        </Switch>
                    </div>
                    <ChatContainer
                        channels={this.state.channels}
                        closeChat={this.closeChat.bind(this)}
                        startChat={this.startChat.bind(this)}
                        close={this.state.close}
                    />
                    <UserInfoModal
                        show={this.state.displayuserinfo}
                        onClose={this.onUserDialogClosed.bind(this)}
                        userid={this.state.displayuserId}
                    />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Container