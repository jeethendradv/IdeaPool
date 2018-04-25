define(['exports', 'react', 'component/BaseComponent', 'component/ErrorMessage', 'component/ErrorHelper'], function (exports, _react, _BaseComponent2, _ErrorMessage, _ErrorHelper) {
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

    var FieldOfWaterCheckBox = function (_BaseComponent) {
        _inherits(FieldOfWaterCheckBox, _BaseComponent);

        function FieldOfWaterCheckBox() {
            _classCallCheck(this, FieldOfWaterCheckBox);

            var _this = _possibleConstructorReturn(this, (FieldOfWaterCheckBox.__proto__ || Object.getPrototypeOf(FieldOfWaterCheckBox)).call(this));

            _this.onChange = _this.onChange.bind(_this);
            return _this;
        }

        _createClass(FieldOfWaterCheckBox, [{
            key: 'onChange',
            value: function onChange(event) {
                var fieldofwater = {
                    key: parseInt(event.target.value),
                    ischecked: event.target.checked
                };
                this.props.fieldOfWaterChangeCallback(fieldofwater);
            }
        }, {
            key: 'onOtherTextChange',
            value: function onOtherTextChange(event) {
                var fieldofwater = {
                    key: -1,
                    ischecked: true,
                    name: event.target.value
                };
                this.props.fieldOfWaterChangeCallback(fieldofwater);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    { className: 'form-group form-checkbox' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'fieldOfWater' },
                        'Field of water'
                    ),
                    _react2.default.createElement(
                        'div',
                        { name: 'fieldOfWater' },
                        this.props.state.items.map(function (item) {
                            return _react2.default.createElement(
                                'div',
                                { className: 'inline', key: item.key },
                                _react2.default.createElement('input', { checked: item.ischecked, className: 'form-control', type: 'checkbox', name: item.key + "fancy-checkbox-default", id: item.key + "fancy-checkbox-default", value: item.key, onChange: _this2.onChange }),
                                _react2.default.createElement(
                                    'div',
                                    { className: '[ btn-group ]' },
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: item.key + "fancy-checkbox-default", className: 'btn btn-default' },
                                        _react2.default.createElement('span', { className: '[ glyphicon glyphicon-ok ]' }),
                                        _react2.default.createElement('span', null)
                                    ),
                                    item.key == -1 ?
                                    // if key is -1 then it is to display Other option
                                    _react2.default.createElement('input', { type: 'text', className: '[ fieldofwater-other active btn-fieldofwater]', disabled: !item.ischecked, value: item.name, onChange: _this2.onOtherTextChange.bind(_this2), placeholder: 'other' }) : _react2.default.createElement(
                                        'label',
                                        { htmlFor: item.key + "fancy-checkbox-default", className: '[ btn btn-fieldofwater ]' },
                                        item.name
                                    )
                                )
                            );
                        })
                    ),
                    !this.props.state.isvalid ? _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessageFromTemplate(this.props.state.errorcode) }) : ''
                );
            }
        }]);

        return FieldOfWaterCheckBox;
    }(_BaseComponent3.default);

    exports.default = FieldOfWaterCheckBox;
});