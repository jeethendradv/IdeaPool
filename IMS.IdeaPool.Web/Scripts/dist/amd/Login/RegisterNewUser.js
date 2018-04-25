define(['exports', 'react', 'component/BaseComponent', 'component/FormInput', 'component/FormCheckbox', 'react-router-dom', 'react-router', 'notification', 'component/ErrorHelper'], function (exports, _react, _BaseComponent2, _FormInput, _FormCheckbox, _reactRouterDom, _reactRouter, _notification, _ErrorHelper) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _FormInput2 = _interopRequireDefault(_FormInput);

    var _FormCheckbox2 = _interopRequireDefault(_FormCheckbox);

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

    var RegisterNewUser = function (_BaseComponent) {
        _inherits(RegisterNewUser, _BaseComponent);

        function RegisterNewUser() {
            _classCallCheck(this, RegisterNewUser);

            var _this = _possibleConstructorReturn(this, (RegisterNewUser.__proto__ || Object.getPrototypeOf(RegisterNewUser)).call(this));

            _this.config = _this.getConfig();
            _this.state = _this.getDefaultState();
            _this.registerUser = _this.registerUser.bind(_this);
            return _this;
        }

        _createClass(RegisterNewUser, [{
            key: 'getConfig',
            value: function getConfig() {
                return {
                    firstname: {
                        name: 'firstname',
                        type: 'text',
                        label: 'First Name',
                        validation: [{
                            isrequired: true,
                            errorcode: 105
                        }]
                    },
                    lastname: {
                        name: 'lastname',
                        type: 'text',
                        label: 'Last Name',
                        validation: [{
                            isrequired: true,
                            errorcode: 106
                        }]
                    },
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
                    },
                    company: {
                        name: 'company',
                        type: 'text',
                        label: 'Company',
                        validation: [{
                            isrequired: true,
                            errorcode: 110
                        }]
                    },
                    email: {
                        name: 'email',
                        type: 'text',
                        label: 'Email',
                        validation: [{
                            isrequired: true,
                            errorcode: 111
                        }, {
                            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            errorcode: 114
                        }, {
                            errorcode: 113
                        }]
                    },
                    phone: {
                        name: 'phone',
                        type: 'text',
                        label: 'Phone',
                        validation: [{
                            isrequired: true,
                            errorcode: 112
                        }, {
                            regex: /^[ ()+]*([0-9][ ()+]*){10,}$/,
                            errorcode: 117
                        }]
                    },
                    isSubscriptionEnabled: {
                        name: 'isSubscriptionEnabled',
                        label: 'Accept subscription to newletter and updates on the ideas',
                        value: false
                    }
                };
            }
        }, {
            key: 'registerUser',
            value: function registerUser() {
                var data = {
                    FirstName: this.state.firstname.value,
                    LastName: this.state.lastname.value,
                    Company: this.state.company.value,
                    Email: this.state.email.value,
                    Phone: this.state.phone.value,
                    IsSubscriptionEnabled: this.state.isSubscriptionEnabled.value,
                    Password: this.state.password.value,
                    RePassword: this.state.repassword.value
                };
                this.makeCall("/Registration/Register", "POST", data, this.onRegisterUserSuccess.bind(this));
            }
        }, {
            key: 'onRegisterUserSuccess',
            value: function onRegisterUserSuccess(data) {
                if (data > 0) {
                    var userRegistered = true;
                    this.state.redirectToLogin = true;
                    this.setState(this.state);
                    _notification.NotificationManager.success(_ErrorHelper2.default.GetErrorMessage(126));
                }
            }
        }, {
            key: 'matchPassword',
            value: function matchPassword() {
                return this.state.password.value == this.state.repassword.value;
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
                                'Register'
                            ),
                            _react2.default.createElement('hr', null),
                            _react2.default.createElement(_FormInput2.default, { config: this.config.firstname, state: this.state.firstname, valuebind: this.valuebind.bind(this, this.config.firstname.name) }),
                            _react2.default.createElement(_FormInput2.default, { config: this.config.lastname, state: this.state.lastname, valuebind: this.valuebind.bind(this, this.config.lastname.name) }),
                            _react2.default.createElement(_FormInput2.default, { config: this.config.password, state: this.state.password, valuebind: this.valuebind.bind(this, this.config.password.name) }),
                            _react2.default.createElement(_FormInput2.default, { config: this.config.repassword, state: this.state.repassword, valuebind: this.valuebind.bind(this, this.config.repassword.name) }),
                            _react2.default.createElement(_FormInput2.default, { config: this.config.company, state: this.state.company, valuebind: this.valuebind.bind(this, this.config.company.name) }),
                            _react2.default.createElement(_FormInput2.default, { config: this.config.email, state: this.state.email, valuebind: this.valuebind.bind(this, this.config.email.name) }),
                            _react2.default.createElement(_FormInput2.default, { config: this.config.phone, state: this.state.phone, valuebind: this.valuebind.bind(this, this.config.phone.name) }),
                            _react2.default.createElement(_FormCheckbox2.default, { config: this.config.isSubscriptionEnabled, state: this.state.isSubscriptionEnabled, checkboxvaluebind: this.checkboxvaluebind.bind(this, this.config.isSubscriptionEnabled.name) }),
                            _react2.default.createElement('hr', null),
                            _react2.default.createElement(
                                'div',
                                { className: 'form-group' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary btn-IMS', onClick: this.validate.bind(this, this.registerUser) },
                                    'Register'
                                ),
                                _react2.default.createElement(
                                    'label',
                                    { className: 'right' },
                                    'Already have an account? ',
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

        return RegisterNewUser;
    }(_BaseComponent3.default);

    exports.default = RegisterNewUser;
});