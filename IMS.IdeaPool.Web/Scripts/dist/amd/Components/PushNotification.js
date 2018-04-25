define(['exports', 'jquery', 'notify'], function (exports, _jquery) {
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

    var PushNotification = {};
    PushNotification.Show = function (channelname, userid, username, callback) {
        _jquery2.default.notify({
            icon: 'glyphicon',
            message: 'You have received a new message from ' + username + ' '
        }, {
            element: 'body',
            type: "info",
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: "bottom",
                align: "left"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            timer: 1000,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            icon_type: 'class',
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' + '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' + '<span data-notify="icon"></span> ' + '<span data-notify="message">{2}</span>' + '<a href="#" class="startchat" channelname="' + channelname + '">Click here</a> to start chat.' + '</div>'
        });

        (0, _jquery2.default)('.startchat').unbind().click(function () {
            if (callback) {
                var channelname = (0, _jquery2.default)(this).attr('channelname');
                callback(channelname);
            }
        });
    };

    exports.default = PushNotification;
});