define(['exports', 'react', 'idea/IdeaFormBase', 'component/FormInput', 'component/FieldOfWaterCheckBox', 'component/TextEditor', 'component/FileUpload', 'react-router-dom', 'notification', 'component/ErrorHelper', 'react-router', 'lodash'], function (exports, _react, _IdeaFormBase2, _FormInput, _FieldOfWaterCheckBox, _TextEditor, _FileUpload, _reactRouterDom, _notification, _ErrorHelper, _reactRouter, _lodash) {
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

    var _lodash2 = _interopRequireDefault(_lodash);

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

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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

    var EditIdea = function (_IdeaFormBase) {
        _inherits(EditIdea, _IdeaFormBase);

        function EditIdea(props) {
            _classCallCheck(this, EditIdea);

            var _this = _possibleConstructorReturn(this, (EditIdea.__proto__ || Object.getPrototypeOf(EditIdea)).call(this));

            _this.ideaId = props.match.params.id;
            return _this;
        }

        _createClass(EditIdea, [{
            key: 'getConfig',
            value: function getConfig() {
                var config = _get(EditIdea.prototype.__proto__ || Object.getPrototypeOf(EditIdea.prototype), 'getConfig', this).call(this);
                config.reason = {
                    name: 'reason',
                    type: 'text',
                    label: 'Reason for update',
                    charactercount: {
                        display: true,
                        maxlength: 100
                    },
                    errordata: {
                        field: 'Reason',
                        length: 100
                    },
                    validation: [{
                        isrequired: true,
                        errorcode: 132
                    }, {
                        length: 100,
                        errorcode: 120
                    }],
                    setRequired: function setRequired(isrequired) {
                        for (var i = 0; i < this.validation.length; i++) {
                            if (this.validation[i].hasOwnProperty('isrequired')) {
                                this.validation[i].isrequired = isrequired;
                                break;
                            }
                        }
                    }
                };
                return config;
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.fetchFieldOfWaterData(this.onFetchfieldofwater.bind(this));
                this.$loading = $(this.el);
            }
        }, {
            key: 'onFetchfieldofwater',
            value: function onFetchfieldofwater(data) {
                this.setFieldOfWater(data);
                this.makeCall("/Idea/FetchIdeaDetails", "POST", { Id: this.ideaId }, this.onIdeaDetailsFetchSuccess.bind(this));
            }
        }, {
            key: 'onIdeaDetailsFetchSuccess',
            value: function onIdeaDetailsFetchSuccess(idea) {
                //set the state object.
                this.state.ideaId = idea.Id;
                this.state.ideaname.value = idea.Title;
                this.state.ideacontent.htmlContent = idea.DescriptionHtml;
                this.state.isdraft = idea.IsDraft;
                var files = _lodash2.default.map(idea.Files, function (file) {
                    return {
                        name: file.Name,
                        id: file.Id,
                        type: file.ContentType,
                        result: 'data:' + file.ContentType + ';base64,' + file.ThumbnailBase64,
                        size: file.Size,
                        sizebytes: file.SizeInKb * 1024,
                        isuploadedviadiscussions: file.IsUploadedViaDiscussions
                    };
                });
                _lodash2.default.forEach(idea.FieldOfWater, function (fow) {
                    var fieldOfWater = _lodash2.default.find(this.state.fieldofwater.items, function (item) {
                        return fow.Id == item.key;
                    });
                    if (fieldOfWater) {
                        fieldOfWater.ischecked = true;
                        if (fieldOfWater.key == -1) {
                            fieldOfWater.name = fow.Description;
                        }
                    }
                }.bind(this));
                this.state.uploadfiles.files = files;
                this.setState(this.state);
            }
        }, {
            key: 'getData',
            value: function getData() {
                var data = new FormData();
                data.append("Id", this.state.ideaId);
                data.append("Title", this.state.ideaname.value);
                var fieldofwaterIndex = 0;
                _lodash2.default.forEach(this.state.fieldofwater.items, function (fieldOfWater) {
                    if (fieldOfWater.ischecked) {
                        data.append("FieldOfWater[" + fieldofwaterIndex + "].Id", fieldOfWater.key);
                        if (fieldOfWater.key == -1) {
                            data.append("FieldOfWater[" + fieldofwaterIndex + "].Description", fieldOfWater.name);
                        }
                        fieldofwaterIndex = fieldofwaterIndex + 1;
                    }
                });
                data.append("Description", this.state.ideacontent.value);
                data.append("DescriptionHtml", this.state.ideacontent.htmlValue);
                data.append("Reason", this.state.reason.value);
                var filesIndex = 0;
                _lodash2.default.forEach(this.state.uploadfiles.files, function (file) {
                    if (file.id == 0) {
                        data.append(file.name, file.file);
                    } else {
                        data.append("Files[" + filesIndex + "].Id", file.id);
                        data.append("Files[" + filesIndex + "].IsUploadedViaDiscussions", file.isuploadedviadiscussions);
                        filesIndex += 1;
                    }
                });
                return data;
            }
        }, {
            key: 'update',
            value: function update() {
                var data = this.getData();
                // if the idea was in draft state and is submitted now then idea is considered new
                data.append("IsNew", this.state.isdraft);
                this.postFormWithFileData("/Idea/Update", data, this.onIdeaUpdate.bind(this, false));
            }
        }, {
            key: 'saveAsDraft',
            value: function saveAsDraft() {
                var data = this.getData();
                data.append("IsDraft", true);
                this.postFormWithFileData("/Idea/Update", data, this.onIdeaUpdate.bind(this, true));
            }
        }, {
            key: 'onIdeaUpdate',
            value: function onIdeaUpdate(isSavedAsDraft) {
                var messagecode = 133; // idea updated message code
                if (isSavedAsDraft) {
                    messagecode = 137; // if the idea was saved as draft.
                } else if (this.state.isdraft) {
                    messagecode = 130; // if idea was in draft mode and has been submitted now
                }
                _notification.NotificationManager.success(_ErrorHelper2.default.GetErrorMessage(messagecode));
                this.state.redirectToHome = true;
                this.setState(this.state);
            }
        }, {
            key: 'validateAndUpdate',
            value: function validateAndUpdate() {
                this.config.reason.setRequired(!this.state.isdraft);
                this.validate(this.update.bind(this));
            }
        }, {
            key: 'validateAndSaveAsDraft',
            value: function validateAndSaveAsDraft() {
                this.config.reason.setRequired(false);
                this.validate(this.saveAsDraft.bind(this));
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
                            'Update Idea'
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
                        !this.state.isdraft ? _react2.default.createElement(_FormInput2.default, {
                            config: this.config.reason,
                            state: this.state.reason,
                            valuebind: this.valuebind.bind(this, this.config.reason.name)
                        }) : null,
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
                                    { className: 'btn btn-primary btn-IMS right', style: { marginLeft: 1 + '%' }, onClick: this.validateAndUpdate.bind(this) },
                                    'Submit'
                                ),
                                this.state.isdraft ? _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary btn-IMS right', onClick: this.validateAndSaveAsDraft.bind(this) },
                                    'Save as Draft'
                                ) : null
                            )
                        )
                    ),
                    _react2.default.createElement('div', { className: 'col-lg-1' })
                );
            }
        }]);

        return EditIdea;
    }(_IdeaFormBase3.default);

    exports.default = EditIdea;
});