define(['exports', 'react', 'component/BaseComponent', 'component/ErrorMessage', 'component/ErrorHelper', 'react-router-dom', 'notification'], function (exports, _react, _BaseComponent2, _ErrorMessage, _ErrorHelper, _reactRouterDom, _notification) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

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

    var Login = function (_BaseComponent) {
        _inherits(Login, _BaseComponent);

        function Login() {
            _classCallCheck(this, Login);

            var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this));

            _this.config = _this.getConfig();
            _this.state = _this.getDefaultState();
            _this.login = _this.login.bind(_this);
            return _this;
        }

        _createClass(Login, [{
            key: 'getConfig',
            value: function getConfig() {
                return {
                    email: {
                        name: 'email',
                        validation: [{
                            isrequired: true,
                            errorcode: 102
                        }]
                    },
                    password: {
                        name: 'password',
                        validation: [{
                            isrequired: true,
                            errorcode: 103
                        }]
                    },
                    rememberMe: {
                        name: 'rememberMe',
                        value: false
                    },
                    credentials: {
                        validation: [{
                            // invalid credentials error code
                            errorcode: 104
                        }, {
                            // account not activated
                            errorcode: 118
                        }]
                    }
                };
            }
        }, {
            key: 'login',
            value: function login() {
                var data = {
                    email: this.state.email.value,
                    password: this.state.password.value,
                    remember: this.state.rememberMe.value
                };
                this.makeCall("/Login/Authenticate", "POST", data, this.onLoginSuccess.bind(this));
            }
        }, {
            key: 'onLoginSuccess',
            value: function onLoginSuccess(data) {
                this.applyMask();
                var url = '/Home/Index';
                var returnurl = this.getParameterByName('ReturnUrl');
                if (returnurl) {
                    url = returnurl;
                }
                this.redirect(url);
            }
        }, {
            key: 'onKeyPress',
            value: function onKeyPress(event) {
                if (event.which == 13) {
                    this.validate(this.login);
                }
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

                return _react2.default.createElement(
                    'div',
                    { className: 'wrapper', ref: function ref(el) {
                            return _this2.el = el;
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'form-signin page-background' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'form-signin-heading' },
                            'I-Gen login'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: this.state.email.isvalid ? '' : 'has-error' },
                            _react2.default.createElement('input', { type: 'text', className: 'form-control', name: 'email', placeholder: 'Email', autoFocus: '', value: this.state.email.value, onChange: this.valuebind.bind(this, this.config.email.name) })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: this.state.password.isvalid ? '' : 'has-error' },
                            _react2.default.createElement('input', { type: 'password', className: 'form-control', name: 'password', onKeyPress: this.onKeyPress.bind(this), placeholder: 'Password', value: this.state.password.value, onChange: this.valuebind.bind(this, this.config.password.name) })
                        ),
                        !this.state.email.isvalid && !this.state.password.isvalid ? _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessage(101) }) : !this.state.email.isvalid ? _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessage(this.state.email.errorcode) }) : !this.state.password.isvalid ? _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessage(this.state.password.errorcode) }) : !this.state.credentials.isvalid ? _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessage(this.state.credentials.errorcode) }) : '',
                        _react2.default.createElement(
                            'label',
                            null,
                            _react2.default.createElement('input', { type: 'checkbox', checked: this.state.rememberMe.value, name: 'rememberMe', onChange: this.checkboxvaluebind.bind(this, this.config.rememberMe.name) }),
                            ' Remember me on this computer.'
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-lg btn-primary btn-block btn-IMS', type: 'submit', onClick: this.validate.bind(this, this.login) },
                            'Login'
                        ),
                        _react2.default.createElement(
                            'label',
                            { className: 'checkbox text-center' },
                            'Need an Account? ',
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/register' },
                                'Register here'
                            )
                        ),
                        _react2.default.createElement(
                            'label',
                            { className: 'checkbox text-center' },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/forgotpassword' },
                                'Forgot your password?'
                            )
                        )
                    )
                );
            }
        }]);

        return Login;
    }(_BaseComponent3.default);

    exports.default = Login;
});