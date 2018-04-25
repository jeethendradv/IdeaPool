import _ from 'lodash'
import 'ploading'
import { NotificationManager } from 'notification';
import ErrorHandler from 'component/ErrorHandler'

class BaseComponent extends ErrorHandler {
    constructor(props) {
        super(props);
        this.config = {};
        this.state = {};
        this.activeAjaxCount = 0;
        this.$loading = null;
    }

    valuebind(name, event) {
        var componentState = this.state[name];
        componentState.value = event.target.value;
        this.setState({ [name]: componentState });
    }

    checkboxvaluebind(name, event) {
        var componentState = this.state[name];
        componentState.value = event.target.checked;
        this.setState({ [name]: componentState });
    }

    redirect(url) {
        window.location.href = url;
    }

    redirectToLogin() {
        const returnUrl = window.location.pathname;
        this.redirect('/Login/Index' + '?ReturnUrl=' + returnUrl);
    }

    isTrue(value) {
        return value
            && value.trim().toLowerCase() == "true";
    }

    isEmpty(value) {
        return value.trim() == "";
    }

    getDefaultState() {
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

    // Makes async ajax call
    makeCall(url, method, data, successCallBack) {
        this._makeAsyncCall(url, method, data, successCallBack);
    }

    // Makes sync ajax call
    makeSyncCall(url, method, data) {
        return this._makeSyncCall(url, method, data);
    }

    // post the form data with files
    postFormWithFileData(url, data, successCallBack) {
        this.increaseAjaxCount();
        $.ajax({
            context: this,
            type: 'POST',
            url: url,
            data: data,
            processData: false,
            contentType: false,
            success: function (response) {
                this.decreaseAjaxCount();
                if (successCallBack) {
                    successCallBack(response);
                }
            },
            error: function (error) {
                this.decreaseAjaxCount();
                if (error.status == 401) {
                    this.redirectToLogin();
                }
                else {
                    this.showResponseError(error);
                }
            },
        });
    }

    _makeSyncCall(url, method, data) {
        var response;
        this.increaseAjaxCount();
        $.ajax({
            url: url,
            method: method,
            context: this,
            data: data,
            success: function (serverresponse) {
                this.decreaseAjaxCount();
                response = serverresponse;
            },
            error: function (xhr, status, error) {
                this.decreaseAjaxCount();
                if (status == 401) {
                    this.redirectToLogin();
                }
                else if (error.errorcodes && error.errorcodes.length > 0) {
                    try {
                        this.markvalid();
                        this.markInvalidForErrorCodes(error.errorcodes);
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

    _makeAsyncCall(url, method, data, successCallBack) {
        this.increaseAjaxCount()
        $.ajax({
            url: url,
            method: method,
            context: this,
            data: data
        })
            .done(function (response) {
                this.decreaseAjaxCount();
                if (successCallBack) {
                    successCallBack(response);
                }
            })
            .fail(function (error) {
                this.decreaseAjaxCount();
                if (error.status == 401) {
                    this.redirectToLogin();
                }
                else {
                    this.showResponseError(error);
                }
            });
    }

    increaseAjaxCount() {
        if (this.activeAjaxCount == 0) {
            this.applyMask();
        }
        this.activeAjaxCount = this.activeAjaxCount + 1;
    }

    decreaseAjaxCount() {
        if (this.activeAjaxCount > 0) {
            this.activeAjaxCount = this.activeAjaxCount - 1;
            if (this.activeAjaxCount == 0) {
                this.removeMask();
            }
        }
    }

    applyMask() {
        if (this.$loading) {
            this.$loading.ploading({
                action: 'show',
                spinner: 'wave'
            });
        }
    }

    removeMask() {
        if (this.$loading) {
            this.$loading.ploading({ action: 'hide' });
        }
    }

    markInvalidForErrorCodes(errorcodes) {
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

    validate(callback) {
        this.clearErrors();
        for (var control in this.config) {
            var isvalid = true;
            var errorcode;
            if (this.config[control].validation && this.config[control].validation.length > 0) {
                for (var i = 0; i < this.config[control].validation.length; i++) {
                    if (this.config[control].validation[i].isrequired) {
                        if (_.isEmpty(this.state[control].value)) {
                            isvalid = false;
                        }
                    }
                    else if (this.config[control].validation[i].hasOwnProperty('regex')) {
                        if (!this.config[control].validation[i].regex.test(this.state[control].value)) {
                            isvalid = false;
                        }
                    }
                    else if (this.config[control].validation[i].hasOwnProperty('length')) {
                        if (this.state[control].value.length > this.config[control].validation[i].length) {
                            isvalid = false;
                        }
                    }
                    else if (this.config[control].validation[i].hasOwnProperty('max')) {
                        if (this.state[control].value > this.config[control].validation[i].max) {
                            isvalid = false;
                        }
                    }
                    else if (this.config[control].validation[i].isvalid && !this.config[control].validation[i].isvalid()) {
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
        }
        else {
            this.refreshview();
        }
    }

    showResponseError(error) {
        try {
            if (error.responseJSON.errorcodes && error.responseJSON.errorcodes.length > 0) {
                this.markvalid();
                this.markInvalidForErrorCodes(error.responseJSON.errorcodes);
                this.refreshview();
            }
            else if (error.responseJSON.errormessage) {
                this.showPageError(error.responseJSON.errormessage);
            }
        } catch (ex) {
            this.showPageError("Something went wrong while processing your request.");
        }
    }

    /*
        Sets isvalid property on each control to true and binds the state object to the view.
        TODO: need to reset isvalid property for customvalidation
    */
    clearErrors() {
        var hasErrors = this.markvalid();
        // if control has errors refresh the view.
        if (hasErrors) {
            this.refreshview();
        }
    }

    markvalid() {
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

    hasErrors() {
        var hasErrors = false;
        // check to see if any of the controls has errors.
        for (var control in this.state) {
            if (this.state[control].hasOwnProperty('isvalid') && !this.state[control].isvalid) {
                hasErrors = true;
            }
        }
        return hasErrors;
    }

    // bind the state object to the view
    refreshview() {
        this.setState(this.state);
    }

    showPageError(message) {
        NotificationManager.error(message);
    }

    displayHtml(string) {
        return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    getParameterByName(name) {
        const url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}

export default BaseComponent