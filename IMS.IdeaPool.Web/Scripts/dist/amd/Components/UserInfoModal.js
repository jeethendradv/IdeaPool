define(['exports', 'react', 'component/BaseComponent'], function (exports, _react, _BaseComponent2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

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

    var UserInfoModal = function (_BaseComponent) {
        _inherits(UserInfoModal, _BaseComponent);

        function UserInfoModal() {
            _classCallCheck(this, UserInfoModal);

            var _this = _possibleConstructorReturn(this, (UserInfoModal.__proto__ || Object.getPrototypeOf(UserInfoModal)).call(this));

            _this.state = {
                FirstName: '',
                LastName: '',
                Email: '',
                Phone: '',
                Company: ''
            };
            return _this;
        }

        _createClass(UserInfoModal, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (this.props.userid) {
                    this.fetchUserDetails(this.props.userid);
                }
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps.userid) {
                    this.fetchUserDetails(nextProps.userid);
                }
            }
        }, {
            key: 'fetchUserDetails',
            value: function fetchUserDetails(userId) {
                this.makeCall('/User/FetchUserDetails', 'post', { userid: userId }, this.onFetchUserDetailsComplete.bind(this));
            }
        }, {
            key: 'onFetchUserDetailsComplete',
            value: function onFetchUserDetailsComplete(user) {
                this.state = user;
                this.setState(this.state);
            }
        }, {
            key: 'render',
            value: function render() {
                if (!this.props.show) {
                    return null;
                }

                var backdropStyle = {
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: 50
                };

                var modalStyle = {
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    maxWidth: "40%",
                    minHeight: '25%',
                    margin: '0 auto',
                    padding: 30,
                    height: '37%'
                };

                return _react2.default.createElement(
                    'div',
                    { className: 'backdrop', style: backdropStyle },
                    _react2.default.createElement(
                        'div',
                        { style: modalStyle },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement('div', { className: 'col-lg-1' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-4' },
                                'First Name: '
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-3' },
                                this.state.FirstName
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement('div', { className: 'col-lg-1' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-4' },
                                'Last Name: '
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-3' },
                                this.state.LastName
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement('div', { className: 'col-lg-1' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-4' },
                                'Company: '
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-3' },
                                this.state.Company
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement('div', { className: 'col-lg-1' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-4' },
                                'Email: '
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-3' },
                                this.state.Email
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement('div', { className: 'col-lg-1' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-4' },
                                'Phone: '
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-3' },
                                this.state.Phone
                            )
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'row footer' },
                            _react2.default.createElement('div', { className: 'col-lg-10' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-lg-2' },
                                _react2.default.createElement(
                                    'button',
                                    { onClick: this.props.onClose },
                                    'Close'
                                )
                            )
                        )
                    )
                );
            }
        }]);

        return UserInfoModal;
    }(_BaseComponent3.default);

    exports.default = UserInfoModal;
});