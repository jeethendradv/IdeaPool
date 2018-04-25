define(['exports', 'jquery', 'react', 'component/ChatBox', 'component/User', 'lodash', 'component/PushNotification', 'component/ErrorHandler', 'signalr'], function (exports, _jquery, _react, _ChatBox, _User, _lodash, _PushNotification, _ErrorHandler2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _react2 = _interopRequireDefault(_react);

    var _ChatBox2 = _interopRequireDefault(_ChatBox);

    var _User2 = _interopRequireDefault(_User);

    var _lodash2 = _interopRequireDefault(_lodash);

    var _PushNotification2 = _interopRequireDefault(_PushNotification);

    var _ErrorHandler3 = _interopRequireDefault(_ErrorHandler2);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ChatContainer = function (_ErrorHandler) {
        _inherits(ChatContainer, _ErrorHandler);

        function ChatContainer() {
            _classCallCheck(this, ChatContainer);

            var _this = _possibleConstructorReturn(this, (ChatContainer.__proto__ || Object.getPrototypeOf(ChatContainer)).call(this));

            _this.state = {
                newmessage: {
                    channelname: 0
                }
            };
            _this.startConnection();
            return _this;
        }

        _createClass(ChatContainer, [{
            key: 'startConnection',
            value: function startConnection() {
                this.connection = _jquery2.default.hubConnection();
                this.discussion = this.connection.createHubProxy('discussionHub');
                this.discussion.on('receiveMessage', this.receiveMessage.bind(this));
                this.discussion.on('receiveFile', this.receiveFile.bind(this));
                this.discussion.on('notifyOwners', this.notifyOwners.bind(this));
                this.discussion.on('joinGroup', this.joinGroup.bind(this));
                this.connection.start();
            }
        }, {
            key: 'notifyOwners',
            value: function notifyOwners(channelname, userid, username, message) {
                var index = _lodash2.default.findIndex(this.props.channels, function (channelName) {
                    return channelname == channelName;
                });
                if (index === -1) {
                    _PushNotification2.default.Show(channelname, userid, username, this.startChat.bind(this));
                }
            }
        }, {
            key: 'joinGroup',
            value: function joinGroup(channelname) {
                this.discussion.invoke('AddToGroup', channelname);
            }
        }, {
            key: 'startChat',
            value: function startChat(channelId) {
                if (this.props.startChat) {
                    this.props.startChat(channelId);
                }
            }
        }, {
            key: 'receiveMessage',
            value: function receiveMessage(channelname, userid, username, message) {
                var index = _lodash2.default.findIndex(this.props.channels, function (channelName) {
                    return channelname == channelName;
                });
                if (index === -1) {
                    _PushNotification2.default.Show(channelname, userid, username, this.startChat.bind(this));
                } else {
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
        }, {
            key: 'receiveFile',
            value: function receiveFile(channelname, userid, username, fileid, name, thumbnail, contenttype, isimage) {
                var index = _lodash2.default.findIndex(this.props.channels, function (channelName) {
                    return channelname == channelName;
                });
                if (index === -1) {
                    _PushNotification2.default.Show(channelname, userid, username, this.startChat.bind(this));
                } else {
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
        }, {
            key: 'closeChat',
            value: function closeChat(channelId) {
                if (this.props.closeChat) {
                    this.props.closeChat(channelId);
                }
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextprops) {
                if (nextprops.close) {
                    this.connection.stop();
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    { className: 'msg_container' },
                    this.props.channels.map(function (channelId) {
                        return _react2.default.createElement(_ChatBox2.default, {
                            key: channelId,
                            channelid: channelId,
                            closeChat: _this2.closeChat.bind(_this2),
                            discussionProxy: _this2.discussion,
                            userid: _User2.default.GetId(),
                            username: _User2.default.GetUserName(),
                            newmessage: parseInt(_this2.state.newmessage.channelname) == channelId ? _this2.state.newmessage : null
                        });
                    })
                );
            }
        }]);

        return ChatContainer;
    }(_ErrorHandler3.default);

    exports.default = ChatContainer;
});