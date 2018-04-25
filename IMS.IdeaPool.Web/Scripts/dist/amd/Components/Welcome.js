define(['exports', 'react', 'component/BaseComponent', 'react-router-dom'], function (exports, _react, _BaseComponent2, _reactRouterDom) {
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

    var Welcome = function (_BaseComponent) {
        _inherits(Welcome, _BaseComponent);

        function Welcome() {
            _classCallCheck(this, Welcome);

            return _possibleConstructorReturn(this, (Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call(this));
        }

        _createClass(Welcome, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-lg-6' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'Welcome ',
                                this.props.firstname
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-lg-6' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                this.props.cansubmitidea ? _react2.default.createElement(
                                    _reactRouterDom.Link,
                                    { className: 'btn btn-primary btn-IMS right', to: '/Idea/New' },
                                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' }),
                                    ' Submit Idea'
                                ) : ''
                            )
                        )
                    ),
                    _react2.default.createElement('hr', null)
                );
            }
        }]);

        return Welcome;
    }(_BaseComponent3.default);

    exports.default = Welcome;
});