define(['exports', 'react', 'component/ErrorHandler'], function (exports, _react, _ErrorHandler2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

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

    var ToggleButton = function (_ErrorHandler) {
        _inherits(ToggleButton, _ErrorHandler);

        function ToggleButton() {
            _classCallCheck(this, ToggleButton);

            return _possibleConstructorReturn(this, (ToggleButton.__proto__ || Object.getPrototypeOf(ToggleButton)).apply(this, arguments));
        }

        _createClass(ToggleButton, [{
            key: 'onClick',
            value: function onClick() {
                if (!this.props.onconfig.isselected && this.props.onClick) {
                    this.props.onClick();
                }
            }
        }, {
            key: 'offClick',
            value: function offClick() {
                if (!this.props.offconfig.isselected && this.props.offClick) {
                    this.props.offClick();
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    { className: 'btn-group', 'data-toggle': 'buttons' },
                    _react2.default.createElement(
                        'label',
                        { className: 'btn btn-primary ' + (this.props.onconfig.isselected ? 'active' : null), onClick: this.onClick.bind(this) },
                        _react2.default.createElement('input', { type: 'radio', name: 'options', id: 'on' }),
                        ' ',
                        this.props.onconfig.text
                    ),
                    _react2.default.createElement(
                        'label',
                        { className: 'btn btn-primary ' + (this.props.offconfig.isselected ? 'active' : null), onClick: this.offClick.bind(this) },
                        _react2.default.createElement('input', { type: 'radio', name: 'options', id: 'off' }),
                        ' ',
                        this.props.offconfig.text
                    )
                );
            }
        }]);

        return ToggleButton;
    }(_ErrorHandler3.default);

    exports.default = ToggleButton;
});