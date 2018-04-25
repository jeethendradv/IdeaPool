define(['exports', 'react', 'component/BaseComponent', 'react-router-dom', 'component/User', 'component/FeatureKeys'], function (exports, _react, _BaseComponent2, _reactRouterDom, _User, _FeatureKeys) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _User2 = _interopRequireDefault(_User);

    var _FeatureKeys2 = _interopRequireDefault(_FeatureKeys);

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

    var Menu = function (_BaseComponent) {
        _inherits(Menu, _BaseComponent);

        function Menu() {
            _classCallCheck(this, Menu);

            var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

            _this.state = {
                home: { isactive: true },
                users: { isactive: false },
                settings: { isactive: false },
                resetpassword: { isactive: false },
                editprofile: { isactive: false }
            };
            return _this;
        }

        _createClass(Menu, [{
            key: 'onMenuClick',
            value: function onMenuClick(menuName) {
                for (var menuItem in this.state) {
                    this.state[menuItem].isactive = menuItem == menuName;
                }
            }
        }, {
            key: 'onLogOut',
            value: function onLogOut() {
                if (this.props.onLogOut) {
                    this.props.onLogOut();
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'ul',
                        { className: 'nav navbar-nav' },
                        _react2.default.createElement(
                            'li',
                            { className: this.state.home.isactive ? 'active' : '' },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/Home/Index', onClick: this.onMenuClick.bind(this, 'home') },
                                'Home'
                            )
                        ),
                        _User2.default.HasAccess(_FeatureKeys2.default.USER_SEARCH) && _User2.default.HasAccess(_FeatureKeys2.default.USER_EDIT) ? _react2.default.createElement(
                            'li',
                            { className: this.state.users.isactive ? 'active' : '' },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/Users/Index', onClick: this.onMenuClick.bind(this, 'users') },
                                'Users'
                            )
                        ) : null,
                        _User2.default.HasAccess(_FeatureKeys2.default.SETTINGS_EDIT) ? _react2.default.createElement(
                            'li',
                            { className: this.state.settings.isactive ? 'active' : '' },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/Settings/Index', onClick: this.onMenuClick.bind(this, 'settings') },
                                'Settings'
                            )
                        ) : null
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'nav navbar-nav navbar-right' },
                        _react2.default.createElement(
                            'li',
                            { className: this.state.editprofile.isactive ? 'active' : '' },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/User/EditProfile', onClick: this.onMenuClick.bind(this, 'editprofile') },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-user' }),
                                ' Edit Profile'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: this.state.resetpassword.isactive ? 'active' : '' },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/User/ResetPassword', onClick: this.onMenuClick.bind(this, 'resetpassword') },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-refresh' }),
                                ' Reset Password'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { onClick: this.onLogOut.bind(this), href: '/Logout/Index' },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-log-out' }),
                                ' Logout'
                            )
                        )
                    )
                );
            }
        }]);

        return Menu;
    }(_BaseComponent3.default);

    exports.default = Menu;
});