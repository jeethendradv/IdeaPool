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

    var SystemSettings = {};
    SystemSettings._settings = {};
    SystemSettings._load = function () {
        _jquery2.default.ajax({
            context: this,
            type: 'POST',
            url: '/Idea/GetSettings',
            success: function success(response) {
                SystemSettings._settings = response;
            }
        });
    };

    SystemSettings.GetSettings = function () {
        return SystemSettings._settings;
    };

    SystemSettings.GetMaxFileSize = function () {
        return SystemSettings._settings.IDEA_FILE_MAX_SIZE;
    };

    SystemSettings.GetFileLimit = function () {
        return SystemSettings._settings.IDEA_FILE_LIMIT;
    };

    SystemSettings.Refresh = function () {
        SystemSettings._load();
    };

    (0, _jquery2.default)(document).ready(function () {
        SystemSettings._load();
    });

    exports.default = SystemSettings;
});