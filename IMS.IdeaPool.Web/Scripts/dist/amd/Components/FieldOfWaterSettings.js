define(['exports', 'react', 'component/ErrorMessage', 'component/ErrorHelper', 'component/ToggleButton', 'component/BaseComponent', 'notification'], function (exports, _react, _ErrorMessage, _ErrorHelper, _ToggleButton, _BaseComponent2, _notification) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

    var _ErrorHelper2 = _interopRequireDefault(_ErrorHelper);

    var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

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

    var FieldOfWaterSettings = function (_BaseComponent) {
        _inherits(FieldOfWaterSettings, _BaseComponent);

        function FieldOfWaterSettings() {
            _classCallCheck(this, FieldOfWaterSettings);

            var _this = _possibleConstructorReturn(this, (FieldOfWaterSettings.__proto__ || Object.getPrototypeOf(FieldOfWaterSettings)).call(this));

            _this.config = _this.getConfig();
            _this.state = _this.getDefaultState();
            _this.state.rows = [];
            return _this;
        }

        _createClass(FieldOfWaterSettings, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.fetchAllFieldOfWaters();
            }
        }, {
            key: 'fetchAllFieldOfWaters',
            value: function fetchAllFieldOfWaters() {
                this.makeCall('/Settings/FetchAllFieldOfWaters', 'POST', null, this.onFieldOfWaterDataFetch.bind(this));
            }
        }, {
            key: 'getConfig',
            value: function getConfig() {
                return {
                    name: {
                        name: 'name',
                        placeholder: 'Enter name',
                        errordata: {
                            field: 'Name',
                            length: 50
                        },
                        validation: [{
                            isrequired: true,
                            errorcode: 134
                        }, {
                            length: 50,
                            errorcode: 120
                        }]
                    },
                    description: {
                        name: 'description',
                        placeholder: 'Enter field of water description',
                        errordata: {
                            field: 'Description',
                            length: 500
                        },
                        validation: [{
                            isrequired: true,
                            errorcode: 134
                        }, {
                            length: 500,
                            errorcode: 120
                        }]
                    }
                };
            }
        }, {
            key: 'onFieldOfWaterDataFetch',
            value: function onFieldOfWaterDataFetch(data) {
                this.state.rows = data;
                this.setState(this.state.rows);
            }
        }, {
            key: 'activateFieldOfWater',
            value: function activateFieldOfWater(id) {
                this.makeCall('/Settings/ActivateFieldOfWater', 'POST', { fieldOfWaterId: id }, this.onActivatedOrDeactivated.bind(this, true));
            }
        }, {
            key: 'deactivateFieldOfWater',
            value: function deactivateFieldOfWater(id) {
                this.makeCall('/Settings/DeactivateFieldOfWater', 'POST', { fieldOfWaterId: id }, this.onActivatedOrDeactivated.bind(this, false));
            }
        }, {
            key: 'addNewFieldOfWater',
            value: function addNewFieldOfWater() {
                var data = {
                    Name: this.state.name.value,
                    Description: this.state.description.value
                };
                this.makeCall('/Settings/AddFieldOfWater', 'POST', data, this.onAddFieldOfWaterSuccess.bind(this));
            }
        }, {
            key: 'onActivatedOrDeactivated',
            value: function onActivatedOrDeactivated(isActivated) {
                this.fetchAllFieldOfWaters();
                var message = isActivated ? "Field of water activated successfully" : "Field of water deactivated successfully";
                _notification.NotificationManager.success(message);
            }
        }, {
            key: 'onAddFieldOfWaterSuccess',
            value: function onAddFieldOfWaterSuccess() {
                this.state.name.value = '';
                this.state.description.value = '';
                _notification.NotificationManager.success("Field of water added successfully.");
                this.fetchAllFieldOfWaters();
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
                                'Field of water'
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
                            _react2.default.createElement(
                                'tr',
                                { style: { backgroundColor: "#e8e9ea" } },
                                _react2.default.createElement('td', { className: 'col-lg-3' }),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-2' },
                                    _react2.default.createElement('input', { className: 'form-control',
                                        type: 'text',
                                        name: this.config.name.name,
                                        value: this.state.name.value,
                                        placeholder: this.config.name.placeholder,
                                        onChange: this.valuebind.bind(this, this.config.name.name)
                                    }),
                                    this.state.name.isvalid ? '' : _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessageFromTemplate(this.state.name.errorcode, this.config.name.errordata) })
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-3' },
                                    _react2.default.createElement('textarea', { className: 'form-control',
                                        name: this.config.description.name,
                                        value: this.state.description.value,
                                        placeholder: this.config.description.placeholder,
                                        onChange: this.valuebind.bind(this, this.config.description.name)
                                    }),
                                    this.state.description.isvalid ? '' : _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessageFromTemplate(this.state.description.errorcode, this.config.description.errordata) })
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-4' },
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'btn btn-primary btn-IMS', onClick: this.validate.bind(this, this.addNewFieldOfWater.bind(this)) },
                                        'Add Field of water'
                                    )
                                )
                            ),
                            this.state.rows.map(function (fieldofwater) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: fieldofwater.Id },
                                    _react2.default.createElement('td', { className: 'col-lg-3' }),
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'col-lg-2' },
                                        fieldofwater.Name
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'col-lg-3' },
                                        fieldofwater.Description
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'col-lg-4' },
                                        _react2.default.createElement(_ToggleButton2.default, {
                                            onClick: _this2.activateFieldOfWater.bind(_this2, fieldofwater.Id),
                                            offClick: _this2.deactivateFieldOfWater.bind(_this2, fieldofwater.Id),
                                            onconfig: { text: 'Active', isselected: fieldofwater.IsActive },
                                            offconfig: { text: 'Deactive', isselected: !fieldofwater.IsActive }
                                        })
                                    )
                                );
                            })
                        )
                    )
                );
            }
        }]);

        return FieldOfWaterSettings;
    }(_BaseComponent3.default);

    exports.default = FieldOfWaterSettings;
});