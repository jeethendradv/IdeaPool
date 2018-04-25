define(['exports', 'jquery'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    //TODO: rename the class to MessageHelper
    var ErrorHelper = {}; /*
                          Author: Jeethendra
                          
                          Description: 
                              Global class to fetch the error message from errorcode. Has two helper methods:
                              GetErrorMessage(errorcode)
                              GetErrorMessageFromTemplate(errorcode, errordata)
                          */

    ErrorHelper.ErrorCodes = [];
    ErrorHelper._load = function () {
        _jquery2.default.ajax({
            context: this,
            type: 'GET',
            url: '/Error/Load',
            success: function success(response) {
                ErrorHelper.ErrorCodes = response;
            }
        });
    };

    /*
        Gets the errormessage from errorcode.
    */
    //TODO: Rename the method to GetMessage
    ErrorHelper.GetErrorMessage = function (errorCode) {
        var errorMessage = '';
        var result = _jquery2.default.grep(ErrorHelper.ErrorCodes, function (e) {
            return e.Code == errorCode;
        });

        if (result.length == 1) {
            errorMessage = result[0].Message;
        }
        return errorMessage;
    };

    /*
        This method is called when the error message is a template and is built by substituting the data.
    
        For Example:
            errormessage: {field} should be less than {length} characters in length.
            errordata: {
                field: 'Title',
                length: 25
            }
    */
    ErrorHelper.GetErrorMessageFromTemplate = function (errorTemplateCode, errordata) {
        var errorMessage = ErrorHelper.GetErrorMessage(errorTemplateCode);
        for (var property in errordata) {
            errorMessage = _.replace(errorMessage, '{' + property + '}', errordata[property]);
        }
        return errorMessage;
    };

    (0, _jquery2.default)(document).ready(function () {
        ErrorHelper._load();
    });

    exports.default = ErrorHelper;
});