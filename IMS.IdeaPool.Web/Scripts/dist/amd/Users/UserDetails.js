define(['exports', 'react', 'component/BaseComponent', 'component/ToggleButton', 'component/Roles', 'notification'], function (exports, _react, _BaseComponent2, _ToggleButton, _Roles, _notification) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

    var _Roles2 = _interopRequireDefault(_Roles);

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

    var UserDetails = function (_BaseComponent) {
        _inherits(UserDetails, _BaseComponent);

        function UserDetails(props) {
            _classCallCheck(this, UserDetails);

            var _this = _possibleConstructorReturn(this, (UserDetails.__proto__ || Object.getPrototypeOf(UserDetails)).call(this));

            _this.state = {
                Id: props.id,
                Roles: []
            };
            return _this;
        }

        _createClass(UserDetails, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.fetchUserDetails();
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(props) {
                this.state.Id = props.id;
                this.fetchUserDetails();
            }
        }, {
            key: 'fetchUserDetails',
            value: function fetchUserDetails() {
                var data = {
                    userid: this.state.Id
                };
                this.makeCall('/User/FetchUserInfo', 'POST', data, this.onFetchUserDetails.bind(this));
            }
        }, {
            key: 'onFetchUserDetails',
            value: function onFetchUserDetails(userdetails) {
                this.state = userdetails;
                this.setState(this.state);
            }
        }, {
            key: 'activateUser',
            value: function activateUser() {
                this.makeCall('/User/Activate', 'POST', { userId: this.state.Id }, this.onActivate.bind(this));
            }
        }, {
            key: 'onActivate',
            value: function onActivate(isUpdated) {
                if (this.isTrue(isUpdated)) {
                    _notification.NotificationManager.success('User account activated successfully.');
                    this.state.IsActive = true;
                } else {
                    _notification.NotificationManager.error('Error: User account could not be activated.');
                    this.state.IsActive = false;
                }
                this.setState(this.state);
            }
        }, {
            key: 'deactivateUser',
            value: function deactivateUser() {
                this.makeCall('/User/Deactivate', 'POST', { userId: this.state.Id }, this.onDeactivate.bind(this));
            }
        }, {
            key: 'onDeactivate',
            value: function onDeactivate(isUpdated) {
                if (this.isTrue(isUpdated)) {
                    _notification.NotificationManager.success('User account deactivated successfully.');
                    this.state.IsActive = false;
                } else {
                    _notification.NotificationManager.error('Error: User account could not be deactivated.');
                    this.state.IsActive = true;
                }
                this.setState(this.state);
            }
        }, {
            key: 'activateLogin',
            value: function activateLogin() {
                this.makeCall('/User/ActivateLogin', 'POST', { userId: this.state.Id }, this.onActivateLogin.bind(this));
            }
        }, {
            key: 'onActivateLogin',
            value: function onActivateLogin(isUpdated) {
                if (this.isTrue(isUpdated)) {
                    _notification.NotificationManager.success('User login account activated successfully.');
                    this.state.IsAccountActivated = true;
                } else {
                    _notification.NotificationManager.error('Error: User login account could not be activated.');
                    this.state.IsAccountActivated = false;
                }
                this.setState(this.state);
            }
        }, {
            key: 'deactivateLogin',
            value: function deactivateLogin() {
                this.makeCall('/User/DeactivateLogin', 'POST', { userId: this.state.Id }, this.onDeactivateLogin.bind(this));
            }
        }, {
            key: 'onDeactivateLogin',
            value: function onDeactivateLogin(isUpdated) {
                if (this.isTrue(isUpdated)) {
                    _notification.NotificationManager.success('User login account deactivated successfully.');
                    this.state.IsAccountActivated = false;
                } else {
                    _notification.NotificationManager.error('Error: User login account could not be deactivated.');
                    this.state.IsAccountActivated = true;
                }
                this.setState(this.state);
            }
        }, {
            key: 'addRole',
            value: function addRole(key) {
                this.makeCall('/User/AddRole', 'POST', { userId: this.state.Id, key: key }, this.onRoleAdded.bind(this));
            }
        }, {
            key: 'onRoleAdded',
            value: function onRoleAdded(roles) {
                if (roles.length > this.state.Roles.length) {
                    _notification.NotificationManager.success("Role added successfully.");
                    this.state.Roles = roles;
                    this.setState(this.state);
                } else {
                    _notification.NotificationManager.error("Error: Role could not be added.");
                }
            }
        }, {
            key: 'removeRole',
            value: function removeRole(key) {
                this.makeCall('/User/RemoveRole', 'POST', { userId: this.state.Id, key: key }, this.onRoleRemoved.bind(this));
            }
        }, {
            key: 'onRoleRemoved',
            value: function onRoleRemoved(roles) {
                if (this.state.Roles.length > roles.length) {
                    _notification.NotificationManager.success("Role removed successfully.");
                    this.state.Roles = roles;
                    this.setState(this.state);
                } else {
                    _notification.NotificationManager.error("Error: Role could not be removed.");
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('hr', null),
                    _react2.default.createElement(
                        'table',
                        { className: 'table userdetails' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    'First Name'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    this.state.FirstName
                                ),
                                _react2.default.createElement('td', { className: 'col-lg-3' })
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    'Last Name'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    this.state.LastName
                                ),
                                _react2.default.createElement('td', { className: 'col-lg-3' })
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    'Company'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    this.state.Company
                                ),
                                _react2.default.createElement('td', { className: 'col-lg-3' })
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    'Email'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    this.state.Email
                                ),
                                _react2.default.createElement('td', { className: 'col-lg-3' })
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    'Phone'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    this.state.Phone
                                ),
                                _react2.default.createElement('td', { className: 'col-lg-3' })
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    'Subscription Enabled'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    this.state.IsSubscriptionEnabled ? 'Yes' : 'No'
                                ),
                                _react2.default.createElement('td', { className: 'col-lg-3' })
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    'Roles'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-6' },
                                    _react2.default.createElement(_Roles2.default, {
                                        onAddRole: this.addRole.bind(this)
                                    }),
                                    this.state.Roles.map(function (role) {
                                        return _react2.default.createElement(
                                            'span',
                                            { className: 'tag label label-info inline', key: role.Key },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                role.Value
                                            ),
                                            _react2.default.createElement(
                                                'a',
                                                { onClick: _this2.removeRole.bind(_this2, role.Key) },
                                                _react2.default.createElement('i', { className: 'remove glyphicon glyphicon-remove-sign glyphicon-white' })
                                            )
                                        );
                                    })
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    'User Status'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    _react2.default.createElement(_ToggleButton2.default, {
                                        onClick: this.activateUser.bind(this),
                                        offClick: this.deactivateUser.bind(this),
                                        onconfig: { text: 'Active', isselected: this.state.IsActive },
                                        offconfig: { text: 'Deactive', isselected: !this.state.IsActive }
                                    })
                                ),
                                _react2.default.createElement('td', { className: 'col-lg-3' })
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    'Login Status'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    _react2.default.createElement(_ToggleButton2.default, {
                                        onClick: this.activateLogin.bind(this),
                                        offClick: this.deactivateLogin.bind(this),
                                        onconfig: { text: 'Active', isselected: this.state.IsAccountActivated },
                                        offconfig: { text: 'Deactive', isselected: !this.state.IsAccountActivated }
                                    })
                                ),
                                _react2.default.createElement('td', { className: 'col-lg-3' })
                            )
                        )
                    )
                );
            }
        }]);

        return UserDetails;
    }(_BaseComponent3.default);

    exports.default = UserDetails;
});