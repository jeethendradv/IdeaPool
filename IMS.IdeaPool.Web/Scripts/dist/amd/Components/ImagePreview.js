define(['exports', 'react', 'component/BaseComponent', 'jquery', 'colorbox'], function (exports, _react, _BaseComponent2, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _jquery2 = _interopRequireDefault(_jquery);

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

    var ImagePreview = function (_BaseComponent) {
        _inherits(ImagePreview, _BaseComponent);

        function ImagePreview() {
            _classCallCheck(this, ImagePreview);

            return _possibleConstructorReturn(this, (ImagePreview.__proto__ || Object.getPrototypeOf(ImagePreview)).call(this));
        }

        _createClass(ImagePreview, [{
            key: 'init',
            value: function init() {
                (0, _jquery2.default)('a.gallery').colorbox({
                    photo: true,
                    rel: 'group',
                    width: '100%',
                    height: '100%'
                });
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.init();
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement('div', null);
            }
        }]);

        return ImagePreview;
    }(_BaseComponent3.default);

    exports.default = ImagePreview;
});