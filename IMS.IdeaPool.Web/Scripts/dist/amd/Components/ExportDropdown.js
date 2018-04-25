define(['exports', 'react', 'lodash', 'component/ErrorHandler'], function (exports, _react, _lodash, _ErrorHandler2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _lodash2 = _interopRequireDefault(_lodash);

    var _ErrorHandler3 = _interopRequireDefault(_ErrorHandler2);

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

    var ExportDropdown = function (_ErrorHandler) {
        _inherits(ExportDropdown, _ErrorHandler);

        function ExportDropdown() {
            _classCallCheck(this, ExportDropdown);

            var _this = _possibleConstructorReturn(this, (ExportDropdown.__proto__ || Object.getPrototypeOf(ExportDropdown)).call(this));

            _this.state = {};
            _this.state.exportTypes = [{
                type: 'none',
                label: '-Export-'
            }, {
                type: 'pdf',
                label: 'PDF'
            }, {
                type: 'excel',
                label: 'Excel'
            }];
            _this.state.selectedName = '-Export-';
            _this.state.selected = 'none';
            return _this;
        }

        _createClass(ExportDropdown, [{
            key: 'onChange',
            value: function onChange(type) {
                var exportType = _lodash2.default.find(this.state.exportTypes, { type: type });
                this.state.selected = exportType.type;
                this.state.selectedName = exportType.label;
                if (type != 'none') {
                    if (this.props.onChange) {
                        this.props.onChange(type);
                    }
                }
                this.setState(this.state);
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
                        { className: 'btn btn-secondary dropdown-toggle updatestatus-dropdown', type: 'button', id: 'dropdownexport', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                        this.state.selectedName,
                        ' ',
                        _react2.default.createElement('span', { className: 'caret' })
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'dropdown-menu', 'aria-labelledby': 'dropdownexport', role: 'menu' },
                        this.state.exportTypes.map(function (exportType) {
                            return _react2.default.createElement(
                                'li',
                                { key: exportType.type, className: _this2.state.selected == exportType.type ? 'active' : null },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dropdown-item', onClick: _this2.onChange.bind(_this2, exportType.type) },
                                    exportType.label
                                )
                            );
                        })
                    )
                );
            }
        }]);

        return ExportDropdown;
    }(_ErrorHandler3.default);

    exports.default = ExportDropdown;
});