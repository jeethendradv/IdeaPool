define(['exports', 'react', 'component/BaseComponent', 'component/FormInput', 'react-router-dom', 'react-router', 'notification', 'component/ErrorHelper'], function (exports, _react, _BaseComponent2, _FormInput, _reactRouterDom, _reactRouter, _notification, _ErrorHelper) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _FormInput2 = _interopRequireDefault(_FormInput);

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

    var ForgotPassword = function (_BaseComponent) {
        _inherits(ForgotPassword, _BaseComponent);

        function ForgotPassword() {
            _classCallCheck(this, ForgotPassword);

            var _this = _possibleConstructorReturn(this, (ForgotPassword.__proto__ || Object.getPrototypeOf(ForgotPassword)).call(this));

            _this.config = _this.getConfig();
            _this.state = _this.getDefaultState();
            _this.sendPasswordResetLink = _this.sendPasswordResetLink.bind(_this);
            return _this;
        }

        _createClass(ForgotPassword, [{
            key: 'getConfig',
            value: function getConfig() {
                return {
                    email: {
                        name: 'email',
                        type: 'text',
                        label: 'Enter your email address',
                        validation: [{
                            isrequired: true,
                            errorcode: 111
                        }, {
                            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            errorcode: 114
                        }]
                    }
                };
            }
        }, {
            key: 'isRegisteredEmailAddress',
            value: function isRegisteredEmailAddress() {
                var data = {
                    email: this.state.email.value
                };
                var response = this.makeSyncCall("Registration/IsRegisteredEmailAddress", "POST", data);
                return this.isTrue(response);
            }
        }, {
            key: 'sendPasswordResetLink',
            value: function sendPasswordResetLink() {
                var data = {
                    email: this.state.email.value
                };
                this.makeCall("/Login/ForgotPassword", "POST", data, this.onSendPasswordResetLinkComplete.bind(this));
            }
        }, {
            key: 'onSendPasswordResetLinkComplete',
            value: function onSendPasswordResetLinkComplete() {
                _notification.NotificationManager.success(_ErrorHelper2.default.GetErrorMessage(127));
                this.state.redirectToLogin = true;
                this.setState(this.state);
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.$loading = $(this.el);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                if (this.state.redirectToLogin) {
                    return _react2.default.createElement(_reactRouter.Redirect, { to: '/' });
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
                                'Forgot Password'
                            ),
                            _react2.default.createElement('hr', null),
                            _react2.default.createElement(_FormInput2.default, { placeholder: 'Email', config: this.config.email, state: this.state.email, valuebind: this.valuebind.bind(this, this.config.email.name) }),
                            _react2.default.createElement(
                                'div',
                                { className: 'form-group' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary btn-IMS', onClick: this.validate.bind(this, this.sendPasswordResetLink) },
                                    'Submit'
                                ),
                                _react2.default.createElement(
                                    'label',
                                    { className: 'right' },
                                    'Remember your credentails? ',
                                    _react2.default.createElement(
                                        _reactRouterDom.Link,
                                        { to: '/' },
                                        'Login here'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement('div', { className: 'col-lg-3' })
                    );
                }
            }
        }]);

        return ForgotPassword;
    }(_BaseComponent3.default);

    exports.default = ForgotPassword;
});