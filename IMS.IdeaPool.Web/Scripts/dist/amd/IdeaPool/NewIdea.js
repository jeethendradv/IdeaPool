define(['exports', 'react', 'idea/IdeaFormBase', 'component/FormInput', 'component/FieldOfWaterCheckBox', 'component/TextEditor', 'component/FileUpload', 'react-router-dom', 'notification', 'component/ErrorHelper', 'react-router'], function (exports, _react, _IdeaFormBase2, _FormInput, _FieldOfWaterCheckBox, _TextEditor, _FileUpload, _reactRouterDom, _notification, _ErrorHelper, _reactRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _IdeaFormBase3 = _interopRequireDefault(_IdeaFormBase2);

    var _FormInput2 = _interopRequireDefault(_FormInput);

    var _FieldOfWaterCheckBox2 = _interopRequireDefault(_FieldOfWaterCheckBox);

    var _TextEditor2 = _interopRequireDefault(_TextEditor);

    var _FileUpload2 = _interopRequireDefault(_FileUpload);

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

    var NewIdea = function (_IdeaFormBase) {
        _inherits(NewIdea, _IdeaFormBase);

        function NewIdea() {
            _classCallCheck(this, NewIdea);

            var _this = _possibleConstructorReturn(this, (NewIdea.__proto__ || Object.getPrototypeOf(NewIdea)).call(this));

            _this.saveIdea = _this.saveIdea.bind(_this);
            return _this;
        }

        _createClass(NewIdea, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.fetchFieldOfWaterData();
                this.$loading = $(this.el);
            }
        }, {
            key: 'getData',
            value: function getData() {
                var data = new FormData();
                data.append("Title", this.state.ideaname.value);
                var fieldofwaterIndex = 0;
                _.forEach(this.state.fieldofwater.items, function (fieldOfWater) {
                    if (fieldOfWater.ischecked && fieldOfWater.key != -1) {
                        data.append("FieldOfWater[" + fieldofwaterIndex + "].Id", fieldOfWater.key);
                        fieldofwaterIndex = fieldofwaterIndex + 1;
                    }
                });
                var otherObject = _.find(this.state.fieldofwater.items, { key: -1, ischecked: true });
                if (otherObject) {
                    data.append("FieldOfWater[" + fieldofwaterIndex + "].Id", otherObject.key);
                    data.append("FieldOfWater[" + fieldofwaterIndex + "].Description", otherObject.name);
                }
                data.append("Description", this.state.ideacontent.value);
                data.append("DescriptionHtml", this.state.ideacontent.htmlValue);
                _.forEach(this.state.uploadfiles.files, function (file) {
                    data.append(file.name, file.file);
                });
                return data;
            }
        }, {
            key: 'saveIdea',
            value: function saveIdea() {
                var data = this.getData();
                this.postFormWithFileData("/Idea/Save", data, this.onIdeaSaved.bind(this, false));
            }
        }, {
            key: 'saveAsDraft',
            value: function saveAsDraft() {
                var data = this.getData();
                data.append("IsDraft", true);
                this.postFormWithFileData("/Idea/Save", data, this.onIdeaSaved.bind(this, true));
            }
        }, {
            key: 'onIdeaSaved',
            value: function onIdeaSaved(isdraft) {
                _notification.NotificationManager.success(_ErrorHelper2.default.GetErrorMessage(isdraft ? 137 : 130));
                this.state.redirectToHome = true;
                this.setState(this.state);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                if (this.state.redirectToHome) {
                    return _react2.default.createElement(_reactRouter.Redirect, { to: '/Home/Index' });
                }

                return _react2.default.createElement(
                    'div',
                    { className: 'row', ref: function ref(el) {
                            return _this2.el = el;
                        } },
                    _react2.default.createElement('div', { className: 'col-lg-1' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-lg-10 border page-background' },
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Submit Idea'
                        ),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(_FormInput2.default, {
                            config: this.config.ideaname,
                            state: this.state.ideaname,
                            valuebind: this.valuebind.bind(this, this.config.ideaname.name)
                        }),
                        _react2.default.createElement(_FieldOfWaterCheckBox2.default, {
                            state: this.state.fieldofwater,
                            config: this.config.fieldofwater,
                            fieldOfWaterChangeCallback: this.updateFieldOfWater
                        }),
                        _react2.default.createElement(_TextEditor2.default, {
                            config: this.config.ideacontent,
                            state: this.state.ideacontent,
                            onChange: this.onIdeaDescriptionChange.bind(this)
                        }),
                        _react2.default.createElement(_FileUpload2.default, {
                            config: this.config.uploadfiles,
                            state: this.state.uploadfiles,
                            onFileSelected: this.onFileChange.bind(this),
                            onFileDeleted: this.onFileDelete.bind(this)
                        }),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    _reactRouterDom.Link,
                                    { className: 'btn btn-info btn-IMS left', to: '/Home/Index' },
                                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-arrow-left' }),
                                    ' Back'
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary btn-IMS right', style: { marginLeft: 1 + '%' }, onClick: this.validate.bind(this, this.saveIdea.bind(this)) },
                                    'Submit'
                                ),
                                '\xA0\xA0\xA0',
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary btn-IMS right', onClick: this.validate.bind(this, this.saveAsDraft.bind(this)) },
                                    'Save as Draft'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement('div', { className: 'col-lg-1' })
                );
            }
        }]);

        return NewIdea;
    }(_IdeaFormBase3.default);

    exports.default = NewIdea;
});