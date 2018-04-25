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

    var FileUpload = function (_BaseComponent) {
        _inherits(FileUpload, _BaseComponent);

        function FileUpload() {
            _classCallCheck(this, FileUpload);

            var _this = _possibleConstructorReturn(this, (FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call(this));

            _this.onFileSelected = _this.onFileSelected.bind(_this);
            return _this;
        }

        _createClass(FileUpload, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.$el = $(this.el);
                this.$el.tooltip();
                this.$multiFileSelect = $(this.multiFileSelect);
            }
        }, {
            key: 'onFileSelected',
            value: function onFileSelected(input) {
                if (input.target.files) {
                    var fileCount = input.target.files.length;
                    for (var i = 0; i < fileCount; i++) {
                        var fileInfo = {};
                        var file = input.target.files[i];

                        if (!this.fileExists(file.name)) {
                            fileInfo.id = 0;
                            fileInfo.name = file.name;
                            fileInfo.sizebytes = file.size;
                            fileInfo.size = this.getFilesize(file.size);
                            fileInfo.type = file.type;
                            fileInfo.file = file;
                            fileInfo.isuploadedviadiscussions = false;

                            var reader = new FileReader();
                            reader.onload = function (fileInfo, event) {
                                fileInfo.result = event.target.result;
                                this.props.onFileSelected(fileInfo);
                                this.setState(this.state);
                            }.bind(this, fileInfo);
                            reader.readAsDataURL(file);
                        }
                    }
                    this.$multiFileSelect.val('');
                }
            }
        }, {
            key: 'fileExists',
            value: function fileExists(name) {
                return _.find(this.props.state.files, { name: name });
            }
        }, {
            key: 'getFilesize',
            value: function getFilesize(_size) {
                var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
                    i = 0;
                while (_size > 900) {
                    _size /= 1024;i++;
                }
                var exactSize = Math.round(_size * 100) / 100 + ' ' + fSExt[i];
                return exactSize;
            }
        }, {
            key: 'onBrowseClick',
            value: function onBrowseClick() {
                this.$multiFileSelect.click();
            }
        }, {
            key: 'onFileDelete',
            value: function onFileDelete(name) {
                this.props.onFileDeleted(name);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    { ref: function ref(el) {
                            return _this2.el = el;
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement('input', { type: 'file', accept: this.props.config.fileFilter, ref: function ref(el) {
                                return _this2.multiFileSelect = el;
                            }, multiple: true, onChange: this.onFileSelected, className: 'hidden' }),
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-primary btn-IMS', onClick: this.onBrowseClick.bind(this), 'data-toggle': 'tooltip', title: 'Attach files.' },
                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-paperclip' }),
                            ' ',
                            this.props.config.label
                        )
                    ),
                    !this.props.state.isvalid ? _react2.default.createElement(_ErrorMessage2.default, { message: _ErrorHelper2.default.GetErrorMessageFromTemplate(this.props.state.errorcode) }) : '',
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row display-flex' },
                            this.props.state.files.map(function (file, index) {
                                return _react2.default.createElement(
                                    'div',
                                    { className: 'col-sm-6 col-sm-3', key: index },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'thumbnail' },
                                        file.type.match('image/*') ? _react2.default.createElement('img', { className: 'img-thumbnail', src: file.result }) : file.type.match('application/pdf') ? _react2.default.createElement('img', { className: 'img-thumbnail', src: '/Content/Images/pdf.png' }) : _react2.default.createElement('img', { className: 'img-thumbnail', src: '/Content/Images/file.png' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'caption' },
                                        _react2.default.createElement(
                                            'h4',
                                            null,
                                            file.name
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Size: ',
                                            file.size
                                        ),
                                        !file.isuploadedviadiscussions ? _react2.default.createElement(
                                            'button',
                                            { type: 'button', className: 'btn btn-primary btn-sm btn-IMS', onClick: _this2.onFileDelete.bind(_this2, file.name) },
                                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-remove-sign' }),
                                            ' Remove'
                                        ) : null
                                    )
                                );
                            })
                        )
                    )
                );
            }
        }]);

        return FileUpload;
    }(_BaseComponent3.default);

    exports.default = FileUpload;
});