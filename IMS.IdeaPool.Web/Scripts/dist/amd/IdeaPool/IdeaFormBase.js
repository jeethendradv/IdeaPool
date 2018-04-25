define(['exports', 'react', 'component/SystemSettings', 'component/BaseComponent'], function (exports, _react, _SystemSettings, _BaseComponent2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _SystemSettings2 = _interopRequireDefault(_SystemSettings);

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

    var IdeaFormBase = function (_BaseComponent) {
        _inherits(IdeaFormBase, _BaseComponent);

        function IdeaFormBase() {
            _classCallCheck(this, IdeaFormBase);

            var _this = _possibleConstructorReturn(this, (IdeaFormBase.__proto__ || Object.getPrototypeOf(IdeaFormBase)).call(this));

            _this.settings = _SystemSettings2.default.GetSettings();
            _this.config = _this.getConfig();
            _this.state = _this.getDefaultState();
            _this.state.fieldofwater.items = [];
            _this.state.uploadfiles.files = [];
            _this.updateFieldOfWater = _this.updateFieldOfWater.bind(_this);
            return _this;
        }

        _createClass(IdeaFormBase, [{
            key: 'getConfig',
            value: function getConfig() {
                return {
                    ideaname: {
                        name: 'ideaname',
                        type: 'text',
                        label: 'Title',
                        charactercount: {
                            display: true,
                            maxlength: this.settings.IDEA_TITLE_LENGTH || 25
                        },
                        errordata: {
                            field: 'Title',
                            length: this.settings.IDEA_TITLE_LENGTH || 25
                        },
                        validation: [{
                            isrequired: true,
                            errorcode: 119
                        }, {
                            length: this.settings.IDEA_TITLE_LENGTH || 25,
                            errorcode: 120
                        }, {
                            isvalid: this.checkIfTitleExists.bind(this),
                            errorcode: 138
                        }]
                    },
                    fieldofwater: {
                        name: 'fieldofwater',
                        showotheroption: true,
                        validation: [{
                            isvalid: this.isFieldOfWaterSelected.bind(this),
                            errorcode: 115
                        }, {
                            isvalid: this.checkOtherFieldOfWaterisEntered.bind(this),
                            errorcode: 123
                        }]
                    },
                    ideacontent: {
                        name: 'ideacontent',
                        label: 'Idea Description',
                        disabletoolbar: false,
                        placeholder: 'Description',
                        height: 235,
                        charactercount: {
                            display: true,
                            maxlength: this.settings.IDEA_CONTENT_LENGTH || 1000
                        },
                        errordata: {
                            field: 'Idea description',
                            length: this.settings.IDEA_CONTENT_LENGTH || 1000
                        },
                        validation: [{
                            isrequired: true,
                            errorcode: 121
                        }, {
                            length: this.settings.IDEA_CONTENT_LENGTH || 1000,
                            errorcode: 120
                        }, {
                            isvalid: this.checkIfDescriptionExists.bind(this),
                            errorcode: 139
                        }]
                    },
                    uploadfiles: {
                        name: 'uploadfiles',
                        fileFilter: 'image/*,.pdf',
                        validation: [{
                            isvalid: function () {
                                var maxfilesize = this.settings.IDEA_FILE_MAX_SIZE || 2;
                                var maxnumberoffiles = this.settings.IDEA_FILE_LIMIT || 5;
                                var file = _.find(this.state.uploadfiles.files, function (file) {
                                    return (file.sizebytes / (1024 * 1024)).toFixed(2) > maxfilesize;
                                });

                                var files = _.filter(this.state.uploadfiles.files, ['isuploadedviadiscussions', false]);
                                return !file && files.length <= maxnumberoffiles;
                            }.bind(this),
                            errorcode: 122
                        }]
                    }
                };
            }
        }, {
            key: 'checkIfTitleExists',
            value: function checkIfTitleExists() {
                var exists = this.makeSyncCall('/Idea/TitleExists', 'POST', { id: _.isNil(this.state.ideaId) ? 0 : this.state.ideaId, ideaName: this.state.ideaname.value });
                return !this.isTrue(exists);
            }
        }, {
            key: 'checkIfDescriptionExists',
            value: function checkIfDescriptionExists() {
                var exists = this.makeSyncCall('/Idea/DescriptionExists', 'POST', { id: _.isNil(this.state.ideaId) ? 0 : this.state.ideaId, description: this.state.ideacontent.value });
                return !this.isTrue(exists);
            }
        }, {
            key: 'checkOtherFieldOfWaterisEntered',
            value: function checkOtherFieldOfWaterisEntered() {
                var isvalid = true;
                var other = _.find(this.state.fieldofwater.items, { key: -1, ischecked: true });
                if (other && _.isEmpty(other.name)) {
                    // other option is checked and user has not entered the text
                    isvalid = false;
                }
                return isvalid;
            }
        }, {
            key: 'isFieldOfWaterSelected',
            value: function isFieldOfWaterSelected() {
                var index = _.findIndex(this.state.fieldofwater.items, ['ischecked', true]);
                return index != -1;
            }
        }, {
            key: 'fetchFieldOfWaterData',
            value: function fetchFieldOfWaterData(callback) {
                var successcallback = callback || this.onFetchFieldofWaterCallback.bind(this);
                this.makeCall("/Idea/GetFieldOfWater", "POST", null, successcallback);
            }
        }, {
            key: 'onFetchFieldofWaterCallback',
            value: function onFetchFieldofWaterCallback(data) {
                this.setFieldOfWater(data);
            }
        }, {
            key: 'setFieldOfWater',
            value: function setFieldOfWater(data) {
                var fieldofwater = _.map(data, function (item) {
                    return {
                        key: item.Key,
                        name: item.Key != -1 ? item.Value : '',
                        ischecked: false
                    };
                });
                this.state.fieldofwater.items = fieldofwater;
                this.setState(this.state);
            }
        }, {
            key: 'updateFieldOfWater',
            value: function updateFieldOfWater(fieldofwater) {
                for (var index in this.state.fieldofwater.items) {
                    if (this.state.fieldofwater.items[index].key == fieldofwater.key) {
                        this.state.fieldofwater.items[index].ischecked = fieldofwater.ischecked;
                        if (fieldofwater.key == -1) {
                            this.state.fieldofwater.items[index].name = fieldofwater.ischecked ? fieldofwater.name : '';
                        }
                        break;
                    }
                }
                this.setState(this.state);
            }
        }, {
            key: 'onIdeaDescriptionChange',
            value: function onIdeaDescriptionChange(content, htmlContent) {
                this.state.ideacontent.value = content;
                this.state.ideacontent.htmlValue = htmlContent;
            }
        }, {
            key: 'onFileChange',
            value: function onFileChange(file) {
                this.state.uploadfiles.files.push(file);
                this.setState(this.state);
            }
        }, {
            key: 'onFileDelete',
            value: function onFileDelete(name) {
                _.remove(this.state.uploadfiles.files, function (file) {
                    return file.name === name;
                });
                this.setState(this.state);
            }
        }]);

        return IdeaFormBase;
    }(_BaseComponent3.default);

    exports.default = IdeaFormBase;
});