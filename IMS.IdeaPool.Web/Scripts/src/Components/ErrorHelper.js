/*
Author: Jeethendra

Description: 
    Global class to fetch the error message from errorcode. Has two helper methods:
    GetErrorMessage(errorcode)
    GetErrorMessageFromTemplate(errorcode, errordata)
*/
import $ from 'jquery'

//TODO: rename the class to MessageHelper
var ErrorHelper = {};
ErrorHelper.ErrorCodes = [];
ErrorHelper._load = function () {
    $.ajax({
        context: this,
        type: 'GET',
        url: '/Error/Load',
        success: function (response) {
            ErrorHelper.ErrorCodes = response;
        }
    });
}

/*
    Gets the errormessage from errorcode.
*/
//TODO: Rename the method to GetMessage
ErrorHelper.GetErrorMessage = function (errorCode) {
    var errorMessage = '';
    var result = $.grep(ErrorHelper.ErrorCodes, function (e) {
        return e.Code == errorCode;
    });

    if (result.length == 1) {
        errorMessage = result[0].Message;
    }
    return errorMessage;
}

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
}

$(document).ready(function () {
    ErrorHelper._load();
});

export default ErrorHelper