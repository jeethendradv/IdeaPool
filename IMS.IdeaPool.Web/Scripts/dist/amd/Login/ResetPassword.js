define(['exports', 'react', 'component/BaseComponent', 'component/FormInput', 'react-router', 'component/User', 'notification', 'component/ErrorHelper'], function (exports, _react, _BaseComponent2, _FormInput, _reactRouter, _User, _notification, _ErrorHelper) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _FormInput2 = _interopRequireDefault(_FormInput);

    var _User2 = _interopRequireDefault(_User);

    var _ErrorHelper2 = _interopRequireDefault(_ErrorHelper);

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

    var ResetPassword = function (_BaseComponent) {
        _inherits(ResetPassword, _BaseComponent);

        function ResetPassword(props) {
            _classCallCheck(this, ResetPassword);

            var _this = _possibleConstructorReturn(this, (ResetPassword.__proto__ || Object.getPrototypeOf(ResetPassword)).call(this));

            _this.config = _this.getConfig();
            _this.state = _this.getDefaultState();
            _this.resetpassword = _this.resetpassword.bind(_this);

            if (_this.hasToken(props)) {
                if (!_this.isValidToken(_this.getParameterByName('token'))) {
                    _notification.NotificationManager.error(_ErrorHelper2.default.GetErrorMessage(124));
                    _this.state.navigateToForgotPassword = true;
                }
            } else if (_User2.default.GetId() < 1) {
                _this.state.navigateToLogin = true;
            }
            return _this;
        }

        _createClass(ResetPassword, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.$loading = $(this.el);
            }
        }, {
            key: 'hasToken',
            value: function hasToken(props) {
                return this.getParameterByName('token') ? true : false;
            }
        }, {
            key: 'isValidToken',
            value: function isValidToken(token) {
                var data = {
                    token: token
                };
                var response = this.makeSyncCall("/Login/IsValidToken", "POST", data);
                return this.isTrue(response);
            }
        }, {
            key: 'getToken',
            value: function getToken() {
                return this.getParameterByName('token');
            }
        }, {
            key: 'getConfig',
            value: function getConfig() {
                return {
                    password: {
                        name: 'password',
                        type: 'password',
                        label: 'Password',
                        validation: [{
                            isrequired: true,
                            errorcode: 107
                        }, {
                            isvalid: this.matchPassword.bind(this),
                            errorcode: 109
                        }, {
                            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2})[a-zA-Z\d]{6,10}$/,
                            errorcode: 116
                        }]
                    },
                    repassword: {
                        name: 'repassword',
                        type: 'password',
                        label: 'Retype Password',
                        validation: [{
                            isrequired: true,
                            errorcode: 108
                        }, {
                            isvalid: this.matchPassword.bind(this),
                            errorcode: 109
                        }]
                    }
                };
            }
        }, {
            key: 'matchPassword',
            value: function matchPassword() {
                return this.state.password.value == this.state.repassword.value;
            }
        }, {
            key: 'resetpassword',
            value: function resetpassword() {
                var url = "/Login/ResetPassword";
                var data = {
                    password: this.state.password.value,
                    repassword: this.state.repassword.value
                };
                if (this.hasToken(this.props)) {
                    data.token = this.getToken();
                    url = "/Login/ResetPasswordWithToken";
                }
                this.makeCall(url, "POST", data, this.onresetpasswordSuccess.bind(this));
            }
        }, {
            key: 'onresetpasswordSuccess',
            value: function onresetpasswordSuccess() {
                if (this.hasToken(this.props)) {
                    this.state.navigateToLogin = true;
                } else {
                    this.state.navigateHome = true;
                }
                this.setState(this.state);
                _notification.NotificationManager.success(_ErrorHelper2.default.GetErrorMessage(125));
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                if (this.state.navigateToLogin) {
                    return _react2.default.createElement(_reactRouter.Redirect, { to: '/' });
                } else if (this.state.navigateToForgotPassword) {
                    return _react2.default.createElement(_reactRouter.Redirect, { to: '/forgotpassword' });
                } else if (this.state.navigateHome) {
                    return _react2.default.createElement(_reactRouter.Redirect, { to: '/Home/Index' });
                } else {
                    return _react2.default.createElement(
                        'div',
                        { className: 'row', ref: function ref(el) {
                                return _this2.el = el;
                            } },
                        _react2.default.createElement('div', { className: 'col-lg-3' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-lg-6 border page-background' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Reset Password'
                            ),
                            _react2.default.createElement('hr', null),
                            _react2.default.createElement(_FormInput2.default, { placeholder: 'Password', config: this.config.password, state: this.state.password, valuebind: this.valuebind.bind(this, this.config.password.name) }),
                            _react2.default.createElement(_FormInput2.default, { placeholder: 'Re-type password', config: this.config.repassword, state: this.state.repassword, valuebind: this.valuebind.bind(this, this.config.repassword.name) }),
                            _react2.default.createElement(
                                'div',
                                { className: 'form-group' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary btn-IMS', onClick: this.validate.bind(this, this.resetpassword) },
                                    'Submit'
                                )
                            )
                        ),
                        _react2.default.createElement('div', { className: 'col-lg-3' })
                    );
                }
            }
        }]);

        return ResetPassword;
    }(_BaseComponent3.default);

    exports.default = ResetPassword;
});