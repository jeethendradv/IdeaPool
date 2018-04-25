define(['exports', 'react', 'component/ErrorMessage', 'component/ErrorHelper', 'component/ToggleButton', 'jquery', 'notification', 'component/BaseComponent', 'spectrum'], function (exports, _react, _ErrorMessage, _ErrorHelper, _ToggleButton, _jquery, _notification, _BaseComponent2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

    var _ErrorHelper2 = _interopRequireDefault(_ErrorHelper);

    var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

    var _jquery2 = _interopRequireDefault(_jquery);

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

    var IdeaStatusSettings = function (_BaseComponent) {
        _inherits(IdeaStatusSettings, _BaseComponent);

        function IdeaStatusSettings() {
            _classCallCheck(this, IdeaStatusSettings);

            var _this = _possibleConstructorReturn(this, (IdeaStatusSettings.__proto__ || Object.getPrototypeOf(IdeaStatusSettings)).call(this));

            _this.config = _this.getConfig();
            _this.state = _this.getDefaultState();
            _this.state.rows = [];
            return _this;
        }

        _createClass(IdeaStatusSettings, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.fetchAllIdeaStatus();
                this.initColorPicker();
            }
        }, {
            key: 'fetchAllIdeaStatus',
            value: function fetchAllIdeaStatus() {
                this.makeCall('/Settings/FetchAllIdeaStatuses', 'POST', null, this.onIdeaStatusFetch.bind(this));
            }
        }, {
            key: 'initColorPicker',
            value: function initColorPicker() {
                this.$colorpicker = (0, _jquery2.default)(this.el);
                this.$colorpicker.spectrum({
                    color: this.config.color.value,
                    change: this.onColorChange.bind(this)
                });
            }
        }, {
            key: 'onColorChange',
            value: function onColorChange(color) {
                this.state.color.value = color.toHexString();
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
                        placeholder: 'Enter status description',
                        errordata: {
                            field: 'Description',
                            length: 250
                        },
                        validation: [{
                            isrequired: true,
                            errorcode: 134
                        }, {
                            length: 250,
                            errorcode: 120
                        }]
                    },
                    color: {
                        name: 'color',
                        value: '#7195ce'
                    }
                };
            }
        }, {
            key: 'onIdeaStatusFetch',
            value: function onIdeaStatusFetch(data) {
                this.state.rows = data;
                this.setState(this.state.rows);
            }
        }, {
            key: 'activateIdeaStatus',
            value: function activateIdeaStatus(id) {
                this.makeCall('/Settings/ActivateIdeaStatus', 'POST', { statusId: id }, this.onActivatedOrDeactivated.bind(this, true));
            }
        }, {
            key: 'deactivateIdeaStatus',
            value: function deactivateIdeaStatus(id) {
                this.makeCall('/Settings/DeactivateIdeaStatus', 'POST', { statusId: id }, this.onActivatedOrDeactivated.bind(this, false));
            }
        }, {
            key: 'onActivatedOrDeactivated',
            value: function onActivatedOrDeactivated(isActivated) {
                this.fetchAllIdeaStatus();
                var message = isActivated ? "Idea status activated successfully" : "Idea status deactivated successfully";
                _notification.NotificationManager.success(message);
            }
        }, {
            key: 'addIdeaStatus',
            value: function addIdeaStatus() {
                var data = {
                    Name: this.state.name.value,
                    Description: this.state.description.value,
                    Color: this.state.color.value
                };
                this.makeCall('/Settings/AddIdeaStatus', 'POST', data, this.onAddIdeaStatusSuccess.bind(this));
            }
        }, {
            key: 'onAddIdeaStatusSuccess',
            value: function onAddIdeaStatusSuccess() {
                this.state.name.value = '';
                this.state.description.value = '';
                _notification.NotificationManager.success('Idea status added successfully');
                this.fetchAllIdeaStatus();
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
                        _react2.default.createElement('div', { className: 'col-lg-2' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-lg-6' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Idea Statuses'
                            )
                        ),
                        _react2.default.createElement('div', { className: 'col-lg-4' })
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
                                _react2.default.createElement('td', { className: 'col-lg-2' }),
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
                                    { className: 'col-lg-2' },
                                    _react2.default.createElement('input', {
                                        type: 'text',
                                        ref: function ref(el) {
                                            return _this2.el = el;
                                        }
                                    })
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'col-lg-2' },
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'btn btn-primary btn-IMS', onClick: this.validate.bind(this, this.addIdeaStatus.bind(this)) },
                                        'Add Idea Status'
                                    )
                                ),
                                _react2.default.createElement('td', { className: 'col-lg-1' })
                            ),
                            this.state.rows.map(function (status) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: status.Id },
                                    _react2.default.createElement('td', { className: 'col-lg-2' }),
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'col-lg-2' },
                                        status.Name
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'col-lg-3' },
                                        status.Description
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'col-lg-2' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'border rounded fieldofwater-label', style: { backgroundColor: status.Color } },
                                            'Status Color'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'col-lg-2' },
                                        _react2.default.createElement(_ToggleButton2.default, {
                                            onClick: _this2.activateIdeaStatus.bind(_this2, status.Id),
                                            offClick: _this2.deactivateIdeaStatus.bind(_this2, status.Id),
                                            onconfig: { text: 'Active', isselected: status.IsActive },
                                            offconfig: { text: 'Deactive', isselected: !status.IsActive }
                                        })
                                    ),
                                    _react2.default.createElement('td', { className: 'col-lg-1' })
                                );
                            })
                        )
                    )
                );
            }
        }]);

        return IdeaStatusSettings;
    }(_BaseComponent3.default);

    exports.default = IdeaStatusSettings;
});