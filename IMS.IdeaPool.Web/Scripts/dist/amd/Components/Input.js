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

    var Input = function (_ErrorHandler) {
        _inherits(Input, _ErrorHandler);

        function Input() {
            _classCallCheck(this, Input);

            return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
        }

        _createClass(Input, [{
            key: 'onChange',
            value: function onChange(event) {
                if (this.props.onChange) {
                    this.props.onChange(event);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement('input', { className: 'form-control',
                    type: this.props.config.type,
                    name: this.props.config.name,
                    placeholder: this.props.config.placeholder,
                    value: this.props.value,
                    onChange: this.onChange.bind(this) });
            }
        }]);

        return Input;
    }(_ErrorHandler3.default);

    exports.default = Input;
});