import $ from 'jquery'

var SystemSettings = {};
SystemSettings._settings = {};
SystemSettings._load = function () {
    $.ajax({
        context: this,
        type: 'POST',
        url: '/Idea/GetSettings',
        success: function (response) {
            SystemSettings._settings = response;
        }
    });
}

SystemSettings.GetSettings = function () {
    return SystemSettings._settings;
}

SystemSettings.GetMaxFileSize = function () {
    return SystemSettings._settings.IDEA_FILE_MAX_SIZE;
}

SystemSettings.GetFileLimit = function () {
    return SystemSettings._settings.IDEA_FILE_LIMIT;
}

SystemSettings.Refresh = function () {
    SystemSettings._load();
}

$(document).ready(function () {
    SystemSettings._load();
});

export default SystemSettings