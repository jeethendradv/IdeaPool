define(['exports', 'react', 'component/BaseComponent', 'component/ImagePreview'], function (exports, _react, _BaseComponent2, _ImagePreview) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _ImagePreview2 = _interopRequireDefault(_ImagePreview);

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

    var Thumbnail = function (_BaseComponent) {
        _inherits(Thumbnail, _BaseComponent);

        function Thumbnail() {
            _classCallCheck(this, Thumbnail);

            return _possibleConstructorReturn(this, (Thumbnail.__proto__ || Object.getPrototypeOf(Thumbnail)).call(this));
        }

        _createClass(Thumbnail, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.$el = $(this.el);
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                this.$el.tooltip();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    { className: 'row hide-section-when-print' },
                    this.props.files && this.props.files.length > 0 ? _react2.default.createElement(
                        'div',
                        { className: 'col-lg-10' },
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row display-flex', ref: function ref(el) {
                                        return _this2.el = el;
                                    } },
                                this.props.files.map(function (file, index) {
                                    return _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-6 col-sm-3', key: index },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'thumbnail' },
                                            file.IsImage ? _react2.default.createElement(
                                                'a',
                                                { className: 'gallery', href: '/Idea/DisplayImage?ideaId=' + _this2.props.ideaId + '&imageId=' + file.Id },
                                                _react2.default.createElement('img', { className: 'img-thumbnail', src: 'data:' + file.ContentType + ';base64,' + file.ThumbnailBase64 })
                                            ) : _react2.default.createElement('img', { className: 'img-thumbnail', src: 'data:' + file.ContentType + ';base64,' + file.ThumbnailBase64 })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'caption' },
                                            _react2.default.createElement(
                                                'h6',
                                                null,
                                                file.Name
                                            ),
                                            _react2.default.createElement(
                                                'a',
                                                { className: 'btn btn-info btn-circle btn-IMS', href: '/Idea/Download?ideaId=' + _this2.props.ideaId + '&fileId=' + file.Id, 'data-toggle': 'tooltip', title: 'Download this file.' },
                                                _react2.default.createElement('i', { className: 'glyphicon glyphicon-download' })
                                            )
                                        )
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(_ImagePreview2.default, null)
                    ) : null
                );
            }
        }]);

        return Thumbnail;
    }(_BaseComponent3.default);

    exports.default = Thumbnail;
});