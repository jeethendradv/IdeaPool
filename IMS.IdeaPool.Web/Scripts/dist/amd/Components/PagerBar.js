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

    var PagerBar = function (_ErrorHandler) {
        _inherits(PagerBar, _ErrorHandler);

        function PagerBar(props) {
            _classCallCheck(this, PagerBar);

            return _possibleConstructorReturn(this, (PagerBar.__proto__ || Object.getPrototypeOf(PagerBar)).call(this, props));
        }

        _createClass(PagerBar, [{
            key: 'onNext',
            value: function onNext() {
                if (this.props.onNext) {
                    this.props.onNext();
                }
            }
        }, {
            key: 'onPrevious',
            value: function onPrevious() {
                if (this.props.onPrevious) {
                    this.props.onPrevious();
                }
            }
        }, {
            key: 'onPageLengthChange',
            value: function onPageLengthChange(event) {
                var pagelength = event.target.value;
                if (this.props.onPageLengthChange) {
                    this.props.onPageLengthChange(pagelength);
                }
            }
        }, {
            key: 'getDisplayText',
            value: function getDisplayText() {
                var currentpage = parseInt(this.props.currentpage);
                var pagelength = parseInt(this.props.pagelength);
                var numberofrows = parseInt(this.props.numberofrows);

                var start = (currentpage - 1) * pagelength;
                var end = start + pagelength;
                if (end > numberofrows) {
                    end = numberofrows;
                }
                return start + 1 + ' to ' + end + ' of ' + this.props.numberofrows;
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'ul',
                    { className: 'pager' },
                    _react2.default.createElement(
                        'li',
                        { className: 'left' },
                        _react2.default.createElement(
                            'select',
                            { className: 'form-control', onChange: this.onPageLengthChange.bind(this) },
                            _react2.default.createElement(
                                'option',
                                { value: '10' },
                                '10'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '30' },
                                '30'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '40' },
                                '50'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '100' },
                                '100'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        this.getDisplayText()
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'right' },
                        _react2.default.createElement(
                            'a',
                            { onClick: this.onNext.bind(this) },
                            'Next'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'right' },
                        _react2.default.createElement(
                            'a',
                            { onClick: this.onPrevious.bind(this) },
                            'Previous'
                        )
                    )
                );
            }
        }]);

        return PagerBar;
    }(_ErrorHandler3.default);

    exports.default = PagerBar;
});