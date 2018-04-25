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

    var FormInput = function (_BaseComponent) {
        _inherits(FormInput, _BaseComponent);

        function FormInput() {
            _classCallCheck(this, FormInput);

            return _possibleConstructorReturn(this, (FormInput.__proto__ || Object.getPrototypeOf(FormInput)).call(this));
        }

        _createClass(FormInput, [{
            key: 'onvaluechange',
            value: function onvaluechange(event) {
                this.props.valuebind(event);
            }
        }, {
            key: 'displayCharacterCount',
            value: function displayCharacterCount() {
                return this.props.config.charactercount && this.props.config.charactercount.display;
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    { className: this.props.state.isvalid ? 'form-group' : 'form-group has-error' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: this.props.config.name },
                        this.props.config.label
                    ),
                    this.displayCharacterCount() ? _react2.default.createElement(
                        'label',
                        { htmlFor: this.props.config.name,
                            className: 'right' },
                        this.props.state.value.length,
                        ' of ',
                        this.props.config.charactercount.maxlength
                    ) : '',
                    _react2.default.createElement('input', { className: 'form-control',
                        type: this.props.config.type,
                        name: this.props.config.name,
                        placeholder: this.props.config.placeholder,
                        value: this.props.state.value,
                        onChange: this.onvaluechange.bind(this) }),
                    this.props.state.isvalid ? '' : _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessageFromTemplate(this.props.state.errorcode, this.props.config.errordata) })
                );
            }
        }]);

        return FormInput;
    }(_BaseComponent3.default);

    exports.default = FormInput;
});