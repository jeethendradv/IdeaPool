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

    var FieldOfWaterDropdown = function (_BaseComponent) {
        _inherits(FieldOfWaterDropdown, _BaseComponent);

        function FieldOfWaterDropdown() {
            _classCallCheck(this, FieldOfWaterDropdown);

            var _this = _possibleConstructorReturn(this, (FieldOfWaterDropdown.__proto__ || Object.getPrototypeOf(FieldOfWaterDropdown)).call(this));

            _this.state.fieldofwater = [];
            return _this;
        }

        _createClass(FieldOfWaterDropdown, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.makeCall("/Idea/GetFieldOfWater", "POST", null, this.onFetchFieldofWaterCallback.bind(this));
            }
        }, {
            key: 'onFetchFieldofWaterCallback',
            value: function onFetchFieldofWaterCallback(data) {
                var empty = [{ Key: 0, Value: '-Select FOW-' }];
                this.state.selectedId = empty[0].Key;
                this.state.selectedName = empty[0].Value;
                this.state.fieldofwater = empty.concat(data);
                this.setState(this.state);
            }
        }, {
            key: 'onChange',
            value: function onChange(key) {
                var fieldofwater = _.find(this.state.fieldofwater, { Key: key });
                this.state.selectedId = fieldofwater.Key;
                this.state.selectedName = fieldofwater.Value;
                this.setState(this.state);
                if (this.props.onChange) {
                    this.props.onChange(key);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    { className: 'dropdown' },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-secondary dropdown-toggle updatestatus-dropdown', type: 'button', id: 'dropdownMenu2', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                        this.state.selectedName,
                        ' ',
                        _react2.default.createElement('span', { className: 'caret' })
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'dropdown-menu', 'aria-labelledby': 'dropdownMenu2', role: 'menu' },
                        this.state.fieldofwater.map(function (fieldofwater) {
                            return _react2.default.createElement(
                                'li',
                                { key: fieldofwater.Key, className: _this2.state.selectedId == fieldofwater.Key ? 'active' : null },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dropdown-item', onClick: _this2.onChange.bind(_this2, fieldofwater.Key) },
                                    fieldofwater.Value
                                )
                            );
                        })
                    )
                );
            }
        }]);

        return FieldOfWaterDropdown;
    }(_BaseComponent3.default);

    exports.default = FieldOfWaterDropdown;
});