import $ from 'jquery'
import 'notify'

var PushNotification = {};
PushNotification.Show = function (channelname, userid, username, callback) {
    $.notify({
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
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="message">{2}</span>' +
            '<a href="#" class="startchat" channelname="' + channelname + '">Click here</a> to start chat.' +
            '</div>'
        });

    $('.startchat').unbind().click(function () {
        if (callback) {
            var channelname = $(this).attr('channelname');
            callback(channelname);
        }
    });
}

export default PushNotification