define(['exports', 'react', 'component/User', 'component/FormInput', 'component/FormCheckbox', 'notification', 'component/BaseComponent'], function (exports, _react, _User, _FormInput, _FormCheckbox, _notification, _BaseComponent2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _User2 = _interopRequireDefault(_User);

    var _FormInput2 = _interopRequireDefault(_FormInput);

    var _FormCheckbox2 = _interopRequireDefault(_FormCheckbox);

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

    var EditProfile = function (_BaseComponent) {
        _inherits(EditProfile, _BaseComponent);

        function EditProfile() {
            _classCallCheck(this, EditProfile);

            var _this = _possibleConstructorReturn(this, (EditProfile.__proto__ || Object.getPrototypeOf(EditProfile)).call(this));

            _this.config = _this.getConfig();
            _this.state = _this.getDefaultState();
            return _this;
        }

        _createClass(EditProfile, [{
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
                    company: {
                        name: 'company',
                        type: 'text',
                        label: 'Company',
                        validation: [{
                            isrequired: true,
                            errorcode: 110
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
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.$loading = $(this.el);
                this.makeCall('/User/GetUser', 'GET', null, this.onFetchUserDetails.bind(this));
            }
        }, {
            key: 'onFetchUserDetails',
            value: function onFetchUserDetails(userInfo) {
                this.state.firstname.value = userInfo.FirstName;
                this.state.lastname.value = userInfo.LastName;
                this.state.company.value = userInfo.Company;
                this.state.phone.value = userInfo.Phone;
                this.state.isSubscriptionEnabled.value = userInfo.IsSubscriptionEnabled;
                this.state.userId = userInfo.Id;
                this.setState(this.state);
            }
        }, {
            key: 'updateUser',
            value: function updateUser() {
                var data = {
                    FirstName: this.state.firstname.value,
                    LastName: this.state.lastname.value,
                    Company: this.state.company.value,
                    Phone: this.state.phone.value,
                    IsSubscriptionEnabled: this.state.isSubscriptionEnabled.value,
                    Id: this.state.userId
                };
                this.makeCall('/User/Update', 'POST', data, this.onUserUpdateSuccess.bind(this));
            }
        }, {
            key: 'onUserUpdateSuccess',
            value: function onUserUpdateSuccess() {
                _User2.default.Refresh();
                _notification.NotificationManager.success('User updated successfully.');
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

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
                            'Edit Profile'
                        ),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(_FormInput2.default, { config: this.config.firstname, state: this.state.firstname, valuebind: this.valuebind.bind(this, this.config.firstname.name) }),
                        _react2.default.createElement(_FormInput2.default, { config: this.config.lastname, state: this.state.lastname, valuebind: this.valuebind.bind(this, this.config.lastname.name) }),
                        _react2.default.createElement(_FormInput2.default, { config: this.config.company, state: this.state.company, valuebind: this.valuebind.bind(this, this.config.company.name) }),
                        _react2.default.createElement(_FormInput2.default, { config: this.config.phone, state: this.state.phone, valuebind: this.valuebind.bind(this, this.config.phone.name) }),
                        _react2.default.createElement(_FormCheckbox2.default, { config: this.config.isSubscriptionEnabled, state: this.state.isSubscriptionEnabled, checkboxvaluebind: this.checkboxvaluebind.bind(this, this.config.isSubscriptionEnabled.name) }),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-primary btn-IMS', onClick: this.validate.bind(this, this.updateUser.bind(this)) },
                                'Update'
                            )
                        )
                    ),
                    _react2.default.createElement('div', { className: 'col-lg-3' })
                );
            }
        }]);

        return EditProfile;
    }(_BaseComponent3.default);

    exports.default = EditProfile;
});