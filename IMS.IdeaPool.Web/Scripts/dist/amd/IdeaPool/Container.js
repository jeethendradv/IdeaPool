define(['exports', 'component/BaseComponent', 'react', 'pubsub', 'react-router-dom', 'component/HeaderLogo', 'idea/Home', 'component/Menu', 'idea/NewIdea', 'idea/ViewIdea', 'idea/EditIdea', 'notification', 'users/UserIndex', 'settings/SettingsIndex', 'login/ResetPassword', 'users/EditProfile', 'component/Footer', 'component/ChatContainer', 'component/UserInfoModal', 'lodash', 'bootstrap', 'respond'], function (exports, _BaseComponent2, _react, _pubsub, _reactRouterDom, _HeaderLogo, _Home, _Menu, _NewIdea, _ViewIdea, _EditIdea, _notification, _UserIndex, _SettingsIndex, _ResetPassword, _EditProfile, _Footer, _ChatContainer, _UserInfoModal, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _react2 = _interopRequireDefault(_react);

    var _pubsub2 = _interopRequireDefault(_pubsub);

    var _HeaderLogo2 = _interopRequireDefault(_HeaderLogo);

    var _Home2 = _interopRequireDefault(_Home);

    var _Menu2 = _interopRequireDefault(_Menu);

    var _NewIdea2 = _interopRequireDefault(_NewIdea);

    var _ViewIdea2 = _interopRequireDefault(_ViewIdea);

    var _EditIdea2 = _interopRequireDefault(_EditIdea);

    var _UserIndex2 = _interopRequireDefault(_UserIndex);

    var _SettingsIndex2 = _interopRequireDefault(_SettingsIndex);

    var _ResetPassword2 = _interopRequireDefault(_ResetPassword);

    var _EditProfile2 = _interopRequireDefault(_EditProfile);

    var _Footer2 = _interopRequireDefault(_Footer);

    var _ChatContainer2 = _interopRequireDefault(_ChatContainer);

    var _UserInfoModal2 = _interopRequireDefault(_UserInfoModal);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

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

    var Container = function (_BaseComponent) {
        _inherits(Container, _BaseComponent);

        function Container() {
            _classCallCheck(this, Container);

            var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this));

            _this.state.channels = [];
            _this.showuserSubscribe = _pubsub2.default.subscribe('showUserDetails', _this.displayUserDetails.bind(_this));
            return _this;
        }

        _createClass(Container, [{
            key: 'startChat',
            value: function startChat(ideaId) {
                if (_lodash2.default.indexOf(this.state.channels, ideaId) === -1) {
                    this.state.channels.push(ideaId);
                    this.setState(this.state);
                }
            }
        }, {
            key: 'closeChat',
            value: function closeChat(channelId) {
                this.state.channels = _lodash2.default.remove(this.state.channels, function (channelId, Id) {
                    return channelId !== Id;
                }.bind(this, channelId));
                this.setState(this.state);
            }
        }, {
            key: 'displayUserDetails',
            value: function displayUserDetails(event, userId) {
                this.state.displayuserinfo = true;
                this.state.displayuserId = userId;
                this.setState(this.state);
            }
        }, {
            key: 'onUserDialogClosed',
            value: function onUserDialogClosed() {
                this.state.displayuserinfo = false;
                this.state.displayuserId = 0;
                this.setState(this.state);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                _pubsub2.default.unsubscribe(this.showuserSubscribe);
            }
        }, {
            key: 'onLogOut',
            value: function onLogOut() {
                this.state.close = true;
                this.setState(this.state);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'nav',
                        { className: 'navbar navbar-inverse' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container' },
                            _react2.default.createElement(_HeaderLogo2.default, null),
                            _react2.default.createElement(_Menu2.default, {
                                onLogOut: this.onLogOut.bind(this)
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'container body-content' },
                        _react2.default.createElement(
                            'div',
                            { id: 'messagecontainer' },
                            _react2.default.createElement(_notification.NotificationContainer, null)
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'content', className: 'content' },
                            _react2.default.createElement(
                                _reactRouterDom.Switch,
                                null,
                                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/Home/Index', render: function render() {
                                        return _react2.default.createElement(_Home2.default, { onChatClick: _this2.startChat.bind(_this2) });
                                    } }),
                                _react2.default.createElement(_reactRouterDom.Route, { path: '/Idea/New', component: _NewIdea2.default }),
                                _react2.default.createElement(_reactRouterDom.Route, { path: '/Idea/View/:id', render: function render(props) {
                                        return _react2.default.createElement(_ViewIdea2.default, _extends({ onChatClick: _this2.startChat.bind(_this2) }, props.match.params));
                                    } }),
                                _react2.default.createElement(_reactRouterDom.Route, { path: '/Idea/Edit/:id', component: _EditIdea2.default }),
                                _react2.default.createElement(_reactRouterDom.Route, { path: '/Users/Index', component: _UserIndex2.default }),
                                _react2.default.createElement(_reactRouterDom.Route, { path: '/Settings/Index', component: _SettingsIndex2.default }),
                                _react2.default.createElement(_reactRouterDom.Route, { path: '/User/ResetPassword', component: _ResetPassword2.default }),
                                _react2.default.createElement(_reactRouterDom.Route, { path: '/User/EditProfile', component: _EditProfile2.default })
                            )
                        ),
                        _react2.default.createElement(_ChatContainer2.default, {
                            channels: this.state.channels,
                            closeChat: this.closeChat.bind(this),
                            startChat: this.startChat.bind(this),
                            close: this.state.close
                        }),
                        _react2.default.createElement(_UserInfoModal2.default, {
                            show: this.state.displayuserinfo,
                            onClose: this.onUserDialogClosed.bind(this),
                            userid: this.state.displayuserId
                        }),
                        _react2.default.createElement(_Footer2.default, null)
                    )
                );
            }
        }]);

        return Container;
    }(_BaseComponent3.default);

    exports.default = Container;
});