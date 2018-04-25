define(['exports', 'component/BaseComponent', 'react', 'react-router-dom', 'login/Login', 'login/RegisterNewUser', 'login/ForgotPassword', 'component/HeaderLogo', 'login/ResetPassword', 'login/ActivateUser', 'notification', 'component/Footer', 'bootstrap', 'respond'], function (exports, _BaseComponent2, _react, _reactRouterDom, _Login, _RegisterNewUser, _ForgotPassword, _HeaderLogo, _ResetPassword, _ActivateUser, _notification, _Footer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _react2 = _interopRequireDefault(_react);

    var _Login2 = _interopRequireDefault(_Login);

    var _RegisterNewUser2 = _interopRequireDefault(_RegisterNewUser);

    var _ForgotPassword2 = _interopRequireDefault(_ForgotPassword);

    var _HeaderLogo2 = _interopRequireDefault(_HeaderLogo);

    var _ResetPassword2 = _interopRequireDefault(_ResetPassword);

    var _ActivateUser2 = _interopRequireDefault(_ActivateUser);

    var _Footer2 = _interopRequireDefault(_Footer);

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

    var Container = function (_BaseComponent) {
        _inherits(Container, _BaseComponent);

        function Container() {
            _classCallCheck(this, Container);

            return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
        }

        _createClass(Container, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'nav',
                        { className: 'navbar navbar-inverse' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container' },
                            _react2.default.createElement(_HeaderLogo2.default, null)
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
                                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Login2.default }),
                                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/Login/Index', component: _Login2.default }),
                                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/register', component: _RegisterNewUser2.default }),
                                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/Resetpassword', component: _ResetPassword2.default }),
                                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/forgotpassword', component: _ForgotPassword2.default }),
                                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/Activate', component: _ActivateUser2.default })
                            )
                        ),
                        _react2.default.createElement(_Footer2.default, null)
                    )
                );
            }
        }]);

        return Container;
    }(_BaseComponent3.default);

    exports.default = Container;
});