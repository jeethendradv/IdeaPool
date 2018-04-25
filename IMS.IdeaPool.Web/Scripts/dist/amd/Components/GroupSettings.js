define(['exports', 'react', 'component/ErrorMessage', 'component/ErrorHelper', 'notification', 'component/SystemSettings', 'component/BaseComponent'], function (exports, _react, _ErrorMessage, _ErrorHelper, _notification, _SystemSettings, _BaseComponent2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

    var _ErrorHelper2 = _interopRequireDefault(_ErrorHelper);

    var _SystemSettings2 = _interopRequireDefault(_SystemSettings);

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

    var GroupSettings = function (_BaseComponent) {
        _inherits(GroupSettings, _BaseComponent);

        function GroupSettings(props) {
            _classCallCheck(this, GroupSettings);

            var _this = _possibleConstructorReturn(this, (GroupSettings.__proto__ || Object.getPrototypeOf(GroupSettings)).call(this, props));

            _this.init(props);
            return _this;
        }

        _createClass(GroupSettings, [{
            key: 'init',
            value: function init(props) {
                this.config = this.getConfig(props.group);
                this.state = this.getDefaultState();
                this.state.Key = props.group.Key;
                this.state.groupname = props.group.Name;
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(props) {
                this.init(props);
            }
        }, {
            key: 'getConfig',
            value: function getConfig(group) {
                var config = {};
                if (group && group.Settings && group.Settings.length > 0) {
                    for (var i = 0; i < group.Settings.length; i++) {
                        var setting = group.Settings[i];
                        if (setting.Key) {
                            config[setting.Key] = this.getConfigItem(setting);
                        }
                    }
                }
                return config;
            }
        }, {
            key: 'getConfigItem',
            value: function getConfigItem(setting) {
                var configItem = {
                    validation: [{
                        isrequired: true,
                        errorcode: 134
                    }]
                };
                if (setting.Key) {
                    configItem.name = setting.Key;
                }
                if (setting.Type) {
                    configItem.type = setting.Type;
                }
                if (setting.Description) {
                    configItem.label = setting.Description;
                }
                if (setting.Value) {
                    configItem.value = setting.Value;
                }
                if (setting.Limit && setting.Type === 'number') {
                    configItem.errordata = {
                        field: 'Field',
                        limit: parseInt(setting.Limit)
                    };
                    configItem.validation.push({
                        max: parseInt(setting.Limit),
                        errorcode: 135
                    });
                }
                if (setting.Type && setting.Type === 'number') {
                    configItem.validation.push({
                        isnumeric: true,
                        errorcode: 136
                    });
                }
                return configItem;
            }
        }, {
            key: 'update',
            value: function update() {
                var settingsIndex = 0;
                var settings = [];
                var data = new FormData();
                data.append("Key", this.state.Key);
                data.append("Name", this.state.groupname);
                if (this.props.group && this.props.group.Settings && this.props.group.Settings.length > 0) {
                    for (var i = 0; i < this.props.group.Settings.length; i++) {
                        var setting = this.props.group.Settings[i];
                        if (setting.Key) {
                            data.append("Settings[" + settingsIndex + "].Key", setting.Key);
                            data.append("Settings[" + settingsIndex + "].Value", this.state[setting.Key].value);
                            settingsIndex = settingsIndex + 1;
                        }
                    }
                }
                this.postFormWithFileData('/Settings/UpdateSettings', data, this.onUpdateSuccess.bind(this));
            }
        }, {
            key: 'onUpdateSuccess',
            value: function onUpdateSuccess() {
                _SystemSettings2.default.Refresh();
                _notification.NotificationManager.success('Settings updated successfully.');
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement('div', { className: 'col-lg-3' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-lg-6' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                this.state.groupname
                            )
                        ),
                        _react2.default.createElement('div', { className: 'col-lg-3' })
                    ),
                    _react2.default.createElement('hr', null),
                    _react2.default.createElement(
                        'table',
                        { className: 'table userdetails' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            this.props.group.Settings.map(function (setting) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: setting.Key },
                                    _react2.default.createElement('td', { className: 'col-lg-3' }),
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'col-lg-3' },
                                        _this2.config[setting.Key].label
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'col-lg-3' },
                                        _this2.config[setting.Key].type === 'boolean' ? _react2.default.createElement('input', {
                                            type: 'checkbox',
                                            checked: _this2.state[setting.Key].value,
                                            name: _this2.config[setting.Key].name,
                                            onChange: _this2.checkboxvaluebind.bind(_this2, _this2.config[setting.Key].name) }) : _react2.default.createElement('input', { className: 'form-control',
                                            type: _this2.config[setting.Key].type,
                                            name: _this2.config[setting.Key].name,
                                            placeholder: _this2.config[setting.Key].placeholder,
                                            value: _this2.state[setting.Key].value,
                                            onChange: _this2.valuebind.bind(_this2, _this2.config[setting.Key].name)
                                        }),
                                        _this2.state[setting.Key].isvalid ? '' : _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessageFromTemplate(_this2.state[setting.Key].errorcode, _this2.config[setting.Key].errordata) })
                                    ),
                                    _react2.default.createElement('td', { className: 'col-lg-3' })
                                );
                            }),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    _react2.default.createElement(
                                        'button',
                                        { onClick: this.validate.bind(this, this.update.bind(this)), className: 'btn btn-primary btn-IMS' },
                                        'Update'
                                    )
                                ),
                                _react2.default.createElement('td', { className: 'col-lg-3' })
                            )
                        )
                    )
                );
            }
        }]);

        return GroupSettings;
    }(_BaseComponent3.default);

    exports.default = GroupSettings;
});