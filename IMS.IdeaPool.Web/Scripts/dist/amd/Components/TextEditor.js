define(['exports', 'react', 'jquery', 'component/ErrorMessage', 'component/BaseComponent', 'component/ErrorHelper', 'bootstrap', 'summernote'], function (exports, _react, _jquery, _ErrorMessage, _BaseComponent2, _ErrorHelper) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

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

    var TextEditor = function (_BaseComponent) {
        _inherits(TextEditor, _BaseComponent);

        function TextEditor() {
            _classCallCheck(this, TextEditor);

            var _this = _possibleConstructorReturn(this, (TextEditor.__proto__ || Object.getPrototypeOf(TextEditor)).call(this));

            _this.state = {
                content: '',
                isInit: true
            };
            return _this;
        }

        _createClass(TextEditor, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.$el = (0, _jquery2.default)(this.el);
                this.$el.summernote({
                    height: this.props.config.height,
                    placeholder: this.props.config.placeholder,
                    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
                    toolbar: [['style', ['bold', 'italic', 'underline', 'clear']], ['fontsize', ['fontsize']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['height', ['height']]],
                    callbacks: {
                        onChange: this.oncontentchange.bind(this)
                    }
                });
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextprops) {
                if (nextprops.state.htmlContent && this.state.isInit) {
                    this.setText(nextprops.state.htmlContent);
                }
            }
        }, {
            key: 'oncontentchange',
            value: function oncontentchange(contents, $editable) {
                this.state.content = (0, _jquery2.default)(".note-editable").text();
                this.state.htmlContent = contents;
                if (this.displayCharacterCount()) {
                    this.setState(this.state);
                }
                this.props.onChange(this.state.content, this.state.htmlContent);
            }
        }, {
            key: 'displayCharacterCount',
            value: function displayCharacterCount() {
                return this.props.config.charactercount && this.props.config.charactercount.display;
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.$el.summernote('destroy');
            }
        }, {
            key: 'setText',
            value: function setText(text) {
                this.$el.summernote('code', text);
                this.state.isInit = false;
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    { className: this.props.state.isvalid ? 'form-group' : 'form-group has-error' },
                    _react2.default.createElement(
                        'label',
                        { className: 'texteditor-label' },
                        this.props.config.label
                    ),
                    this.displayCharacterCount() ? _react2.default.createElement(
                        'label',
                        {
                            className: 'texteditor-label right' },
                        this.state.content.length,
                        ' of ',
                        this.props.config.charactercount.maxlength
                    ) : '',
                    _react2.default.createElement('div', { className: 'form-control', ref: function ref(el) {
                            return _this2.el = el;
                        } }),
                    this.props.state.isvalid ? '' : _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessageFromTemplate(this.props.state.errorcode, this.props.config.errordata) })
                );
            }
        }]);

        return TextEditor;
    }(_BaseComponent3.default);

    exports.default = TextEditor;
});