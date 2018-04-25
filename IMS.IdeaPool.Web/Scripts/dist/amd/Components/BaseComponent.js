define(['exports', 'lodash', 'notification', 'component/ErrorHandler', 'ploading'], function (exports, _lodash, _notification, _ErrorHandler2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    var _ErrorHandler3 = _interopRequireDefault(_ErrorHandler2);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
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

    var BaseComponent = function (_ErrorHandler) {
        _inherits(BaseComponent, _ErrorHandler);

        function BaseComponent(props) {
            _classCallCheck(this, BaseComponent);

            var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this, props));

            _this.config = {};
            _this.state = {};
            _this.activeAjaxCount = 0;
            _this.$loading = null;
            return _this;
        }

        _createClass(BaseComponent, [{
            key: 'valuebind',
            value: function valuebind(name, event) {
                var componentState = this.state[name];
                componentState.value = event.target.value;
                this.setState(_defineProperty({}, name, componentState));
            }
        }, {
            key: 'checkboxvaluebind',
            value: function checkboxvaluebind(name, event) {
                var componentState = this.state[name];
                componentState.value = event.target.checked;
                this.setState(_defineProperty({}, name, componentState));
            }
        }, {
            key: 'redirect',
            value: function redirect(url) {
                window.location.href = url;
            }
        }, {
            key: 'redirectToLogin',
            value: function redirectToLogin() {
                var returnUrl = window.location.pathname;
                this.redirect('/Login/Index' + '?ReturnUrl=' + returnUrl);
            }
        }, {
            key: 'isTrue',
            value: function isTrue(value) {
                return value && value.trim().toLowerCase() == "true";
            }
        }, {
            key: 'isEmpty',
            value: function isEmpty(value) {
                return value.trim() == "";
            }
        }, {
            key: 'getDefaultState',
            value: function getDefaultState() {
                var state = {};
                for (var control in this.config) {
                    state[control] = {
                        value: '',
                        isvalid: true,
                        errorcode: 0
                    };
                    if (this.config[control].hasOwnProperty('value')) {
                        state[control].value = this.config[control].value;
                    }
                }
                return state;
            }
        }, {
            key: 'makeCall',
            value: function makeCall(url, method, data, successCallBack) {
                this._makeAsyncCall(url, method, data, successCallBack);
            }
        }, {
            key: 'makeSyncCall',
            value: function makeSyncCall(url, method, data) {
                return this._makeSyncCall(url, method, data);
            }
        }, {
            key: 'postFormWithFileData',
            value: function postFormWithFileData(url, data, successCallBack) {
                this.increaseAjaxCount();
                $.ajax({
                    context: this,
                    type: 'POST',
                    url: url,
                    data: data,
                    processData: false,
                    contentType: false,
                    success: function success(response) {
                        this.decreaseAjaxCount();
                        if (successCallBack) {
                            successCallBack(response);
                        }
                    },
                    error: function error(_error) {
                        this.decreaseAjaxCount();
                        if (_error.status == 401) {
                            this.redirectToLogin();
                        } else {
                            this.showResponseError(_error);
                        }
                    }
                });
            }
        }, {
            key: '_makeSyncCall',
            value: function _makeSyncCall(url, method, data) {
                var response;
                this.increaseAjaxCount();
                $.ajax({
                    url: url,
                    method: method,
                    context: this,
                    data: data,
                    success: function success(serverresponse) {
                        this.decreaseAjaxCount();
                        response = serverresponse;
                    },
                    error: function error(xhr, status, _error2) {
                        this.decreaseAjaxCount();
                        if (status == 401) {
                            this.redirectToLogin();
                        } else if (_error2.errorcodes && _error2.errorcodes.length > 0) {
                            try {
                                this.markvalid();
                                this.markInvalidForErrorCodes(_error2.errorcodes);
                                this.refreshview();
                            } catch (ex) {
                                this.showPageError("Something went wrong while processing your request.");
                            }
                        }
                    },
                    async: false
                });
                return response;
            }
        }, {
            key: '_makeAsyncCall',
            value: function _makeAsyncCall(url, method, data, successCallBack) {
                this.increaseAjaxCount();
                $.ajax({
                    url: url,
                    method: method,
                    context: this,
                    data: data
                }).done(function (response) {
                    this.decreaseAjaxCount();
                    if (successCallBack) {
                        successCallBack(response);
                    }
                }).fail(function (error) {
                    this.decreaseAjaxCount();
                    if (error.status == 401) {
                        this.redirectToLogin();
                    } else {
                        this.showResponseError(error);
                    }
                });
            }
        }, {
            key: 'increaseAjaxCount',
            value: function increaseAjaxCount() {
                if (this.activeAjaxCount == 0) {
                    this.applyMask();
                }
                this.activeAjaxCount = this.activeAjaxCount + 1;
            }
        }, {
            key: 'decreaseAjaxCount',
            value: function decreaseAjaxCount() {
                if (this.activeAjaxCount > 0) {
                    this.activeAjaxCount = this.activeAjaxCount - 1;
                    if (this.activeAjaxCount == 0) {
                        this.removeMask();
                    }
                }
            }
        }, {
            key: 'applyMask',
            value: function applyMask() {
                if (this.$loading) {
                    this.$loading.ploading({
                        action: 'show',
                        spinner: 'wave'
                    });
                }
            }
        }, {
            key: 'removeMask',
            value: function removeMask() {
                if (this.$loading) {
                    this.$loading.ploading({ action: 'hide' });
                }
            }
        }, {
            key: 'markInvalidForErrorCodes',
            value: function markInvalidForErrorCodes(errorcodes) {
                for (var control in this.state) {
                    if (this.config[control] && this.config[control].validation) {
                        for (var i = 0; i < this.config[control].validation.length; i++) {
                            if ($.inArray(this.config[control].validation[i].errorcode, errorcodes) !== -1) {
                                this.state[control].isvalid = false;
                                this.state[control].errorcode = this.config[control].validation[i].errorcode;
                                break;
                            }
                        }
                    }
                }
            }
        }, {
            key: 'validate',
            value: function validate(callback) {
                this.clearErrors();
                for (var control in this.config) {
                    var isvalid = true;
                    var errorcode;
                    if (this.config[control].validation && this.config[control].validation.length > 0) {
                        for (var i = 0; i < this.config[control].validation.length; i++) {
                            if (this.config[control].validation[i].isrequired) {
                                if (_lodash2.default.isEmpty(this.state[control].value)) {
                                    isvalid = false;
                                }
                            } else if (this.config[control].validation[i].hasOwnProperty('regex')) {
                                if (!this.config[control].validation[i].regex.test(this.state[control].value)) {
                                    isvalid = false;
                                }
                            } else if (this.config[control].validation[i].hasOwnProperty('length')) {
                                if (this.state[control].value.length > this.config[control].validation[i].length) {
                                    isvalid = false;
                                }
                            } else if (this.config[control].validation[i].hasOwnProperty('max')) {
                                if (this.state[control].value > this.config[control].validation[i].max) {
                                    isvalid = false;
                                }
                            } else if (this.config[control].validation[i].isvalid && !this.config[control].validation[i].isvalid()) {
                                isvalid = false;
                            }

                            if (!isvalid) {
                                errorcode = this.config[control].validation[i].errorcode;
                                break;
                            }
                        }
                    }
                    this.state[control].isvalid = isvalid;
                    this.state[control].errorcode = errorcode;
                }
                if (!this.hasErrors()) {
                    if (callback) {
                        callback();
                    }
                } else {
                    this.refreshview();
                }
            }
        }, {
            key: 'showResponseError',
            value: function showResponseError(error) {
                try {
                    if (error.responseJSON.errorcodes && error.responseJSON.errorcodes.length > 0) {
                        this.markvalid();
                        this.markInvalidForErrorCodes(error.responseJSON.errorcodes);
                        this.refreshview();
                    } else if (error.responseJSON.errormessage) {
                        this.showPageError(error.responseJSON.errormessage);
                    }
                } catch (ex) {
                    this.showPageError("Something went wrong while processing your request.");
                }
            }
        }, {
            key: 'clearErrors',
            value: function clearErrors() {
                var hasErrors = this.markvalid();
                // if control has errors refresh the view.
                if (hasErrors) {
                    this.refreshview();
                }
            }
        }, {
            key: 'markvalid',
            value: function markvalid() {
                var hasErrors = false;
                // check to see if any of the controls has errors and reset the isvalid property to true.
                for (var control in this.state) {
                    if (this.state[control].hasOwnProperty('isvalid') && !this.state[control].isvalid) {
                        this.state[control].isvalid = true;
                        hasErrors = true;
                    }
                }
                return hasErrors;
            }
        }, {
            key: 'hasErrors',
            value: function hasErrors() {
                var hasErrors = false;
                // check to see if any of the controls has errors.
                for (var control in this.state) {
                    if (this.state[control].hasOwnProperty('isvalid') && !this.state[control].isvalid) {
                        hasErrors = true;
                    }
                }
                return hasErrors;
            }
        }, {
            key: 'refreshview',
            value: function refreshview() {
                this.setState(this.state);
            }
        }, {
            key: 'showPageError',
            value: function showPageError(message) {
                _notification.NotificationManager.error(message);
            }
        }, {
            key: 'displayHtml',
            value: function displayHtml(string) {
                return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            }
        }, {
            key: 'getParameterByName',
            value: function getParameterByName(name) {
                var url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
                var results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }
        }]);

        return BaseComponent;
    }(_ErrorHandler3.default);

    exports.default = BaseComponent;
});