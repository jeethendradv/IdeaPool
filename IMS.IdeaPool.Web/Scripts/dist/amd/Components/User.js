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

    var UserHelper = {};
    UserHelper._user = {};
    UserHelper._load = function () {
        _jquery2.default.ajax({
            context: this,
            type: 'GET',
            url: '/User/GetUser',
            success: function success(response) {
                UserHelper._user = response;
            }
        });
    };

    UserHelper.Refresh = function () {
        UserHelper._load();
    };

    UserHelper.GetFirstName = function () {
        return UserHelper.GetUser().FirstName;
    };

    UserHelper.GetUserName = function () {
        return UserHelper.GetUser().FirstName + ', ' + UserHelper.GetUser().LastName;
    };

    UserHelper.GetUser = function () {
        return UserHelper._user;
    };

    UserHelper.GetId = function () {
        var user = UserHelper.GetUser();
        return user.Id;
    };

    UserHelper.HasAccess = function (featureKey) {
        var user = UserHelper.GetUser();
        var index = _.findIndex(user.FeatureAccess, function (key) {
            return key === featureKey;
        });
        return index != -1;
    };

    (0, _jquery2.default)(document).ready(function () {
        UserHelper._load();
    });

    exports.default = UserHelper;
});