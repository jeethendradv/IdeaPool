define(['exports', 'react', 'component/BaseComponent', 'component/SystemSettings', 'react-router-dom', 'jquery', 'lodash', 'pubsub', 'colorbox'], function (exports, _react, _BaseComponent2, _SystemSettings, _reactRouterDom, _jquery, _lodash, _pubsub) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _SystemSettings2 = _interopRequireDefault(_SystemSettings);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _lodash2 = _interopRequireDefault(_lodash);

    var _pubsub2 = _interopRequireDefault(_pubsub);

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

    var ChatBox = function (_BaseComponent) {
        _inherits(ChatBox, _BaseComponent);

        function ChatBox(props) {
            _classCallCheck(this, ChatBox);

            var _this = _possibleConstructorReturn(this, (ChatBox.__proto__ || Object.getPrototypeOf(ChatBox)).call(this, props));

            _this.config = _this.getConfig();
            _this.state = _this.getDefaultState();
            _this.state.messages = [];
            _this.state.title = '';
            _this.state.isValid = true;
            _this.page = 0;
            _this.pagelength = 10;
            _this.hasFetchedAllMessages = false;
            _this.discussion = _this.props.discussionProxy;
            _this.addToGroup(props.channelid);
            return _this;
        }

        _createClass(ChatBox, [{
            key: 'addToGroup',
            value: function addToGroup(channelid) {
                this.discussion.invoke('AddToGroup', channelid);
            }
        }, {
            key: 'getConfig',
            value: function getConfig() {
                return {
                    message: {
                        name: 'message'
                    }
                };
            }
        }, {
            key: 'closeChat',
            value: function closeChat(channelId) {
                if (this.props.closeChat) {
                    this.props.closeChat(channelId);
                }
            }
        }, {
            key: 'onKeyPress',
            value: function onKeyPress(event) {
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
        }, {
            key: 'onFileSelected',
            value: function onFileSelected(input) {
                if (input.target.files) {
                    var fileCount = input.target.files.length;
                    for (var i = 0; i < fileCount; i++) {
                        var fileInfo = {};
                        var file = input.target.files[i];

                        if ((file.size / (1024 * 1024)).toFixed(2) > _SystemSettings2.default.GetMaxFileSize()) {
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
        }, {
            key: 'onFileUploadSuccess',
            value: function onFileUploadSuccess(fileId) {
                if (fileId) {
                    this.discussion.invoke('SendFile', {
                        ChannelName: this.props.channelid,
                        UserId: this.props.userid,
                        UserName: this.props.username,
                        FileId: fileId
                    });
                }
            }
        }, {
            key: 'renderPreview',
            value: function renderPreview() {
                (0, _jquery2.default)('a.gallery' + this.props.channelid).colorbox({
                    photo: true,
                    rel: this.props.channelid,
                    width: '100%',
                    height: '100%'
                });
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.$multiFileSelect = (0, _jquery2.default)(this.multiFileSelect);
                this.fetchDiscussions();
                this.addScrollEvent();
            }
        }, {
            key: 'fetchDiscussions',
            value: function fetchDiscussions() {
                if (!this.hasFetchedAllMessages) {
                    this.page = this.page + 1;
                    this.makeCall('/Idea/FetchDiscussions', 'POST', { ideaId: this.props.channelid, page: this.page, pagelength: this.pagelength }, this.onFetchSuccess.bind(this));
                }
            }
        }, {
            key: 'onFetchSuccess',
            value: function onFetchSuccess(discussionInfo) {
                this.hasFetchedAllMessages = discussionInfo.Discussions.length < this.pagelength;
                this.state.title = discussionInfo.Title;
                var messages = [];
                _lodash2.default.forEach(discussionInfo.Discussions, function (discussion) {
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
                this.state.messages = _lodash2.default.concat(messages, this.state.messages);
                this.setState(this.state);
                this.$loader.hide();
                this.renderPreview();
                this.markRead();
            }
        }, {
            key: 'markRead',
            value: function markRead() {
                this.makeCall('/Idea/MarkRead', 'POST', { ideaId: this.props.channelid }, this.onMarkRead.bind(this));
            }
        }, {
            key: 'onMarkRead',
            value: function onMarkRead() {
                _pubsub2.default.publish('markread', this.props.channelid);
            }
        }, {
            key: 'addScrollEvent',
            value: function addScrollEvent() {
                this.$loader = (0, _jquery2.default)(this.loader);
                this.$loader.hide();
                this.$messagebody = (0, _jquery2.default)(this.el);
                this.$messagebody.scroll(this.onScroll.bind(this));
            }
        }, {
            key: 'onScroll',
            value: function onScroll() {
                var position = this.$messagebody.prop("scrollTop");
                if (position === 0 && !this.hasFetchedAllMessages) {
                    this.fetchDiscussions();
                    this.$loader.show();
                }
            }
        }, {
            key: 'scrollToBottom',
            value: function scrollToBottom() {
                this.$messagebody = (0, _jquery2.default)(this.el);
                this.$messagebody.scrollTop(this.$messagebody.prop("scrollHeight"));
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.discussion.invoke('RemoveFromGroup', this.props.channelid);
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                this.scrollToBottom();
                this.renderPreview();
                this.$messagebody.tooltip();
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextprops) {
                if (nextprops.newmessage) {
                    this.state.messages.push(nextprops.newmessage);
                    this.setState(this.state);
                }
            }
        }, {
            key: 'onBrowseClick',
            value: function onBrowseClick() {
                this.$multiFileSelect.click();
            }
        }, {
            key: 'showUserDetails',
            value: function showUserDetails(userId) {
                _pubsub2.default.publish('showUserDetails', userId);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    { className: 'msg_box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'msg_head' },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { className: 'msg_head', to: '/Idea/View/' + this.props.channelid },
                            this.state.title
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'close', onClick: this.closeChat.bind(this, this.props.channelid) },
                            'x'
                        ),
                        _react2.default.createElement('br', null),
                        !this.state.isValid ? _react2.default.createElement(
                            'small',
                            { className: 'error-message' },
                            'File should not exceed ',
                            _SystemSettings2.default.GetMaxFileSize(),
                            ' MB in size.'
                        ) : null
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'msg_wrap' },
                        _react2.default.createElement(
                            'div',
                            { className: 'msg_body', ref: function ref(el) {
                                    return _this2.el = el;
                                } },
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement('div', { className: 'loader', ref: function ref(el) {
                                        return _this2.loader = el;
                                    } })
                            ),
                            this.state.messages.map(function (message, index) {
                                return _react2.default.createElement(
                                    'div',
                                    { key: index, className: _this2.props.userid == message.userid ? 'msg_b' : 'msg_a' },
                                    message.isfile ? _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'thumbnail' },
                                            message.isimage ? _react2.default.createElement(
                                                'a',
                                                { className: 'gallery' + _this2.props.channelid, href: '/Idea/DisplayImage?ideaId=' + _this2.props.channelid + '&imageId=' + message.fileid },
                                                _react2.default.createElement('img', { className: 'img-thumbnail', src: 'data:' + message.contenttype + ';base64,' + message.thumbnail })
                                            ) : _react2.default.createElement('img', { className: 'img-thumbnail', src: 'data:' + message.contenttype + ';base64,' + message.thumbnail })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'caption' },
                                            _react2.default.createElement(
                                                'h6',
                                                null,
                                                message.filename
                                            ),
                                            _react2.default.createElement(
                                                'a',
                                                { 'data-toggle': 'tooltip', title: 'Download this file.', className: 'btn btn-info btn-circle btn-IMS', href: '/Idea/Download?ideaId=' + _this2.props.channelid + '&fileId=' + message.fileid },
                                                _react2.default.createElement('i', { className: 'glyphicon glyphicon-download' })
                                            )
                                        )
                                    ) : _react2.default.createElement(
                                        'div',
                                        { className: 'chatmessage' },
                                        message.message
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'messagedby-time' },
                                        _react2.default.createElement(
                                            'a',
                                            { onClick: _this2.showUserDetails.bind(_this2, message.userid) },
                                            message.username
                                        ),
                                        ' - ',
                                        message.datetime
                                    )
                                );
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'msg_footer' },
                            _react2.default.createElement('input', { type: 'file', accept: 'image/*,.pdf', ref: function ref(el) {
                                    return _this2.multiFileSelect = el;
                                }, onChange: this.onFileSelected.bind(this), className: 'hidden' }),
                            _react2.default.createElement(
                                'button',
                                { className: 'chat-file-upload', onClick: this.onBrowseClick.bind(this) },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-paperclip' })
                            ),
                            _react2.default.createElement('textarea', { className: 'msg_input', value: this.state.message.value, onChange: this.valuebind.bind(this, this.config.message.name), rows: '2', onKeyPress: this.onKeyPress.bind(this), placeholder: 'Type your message' })
                        )
                    )
                );
            }
        }]);

        return ChatBox;
    }(_BaseComponent3.default);

    exports.default = ChatBox;
});