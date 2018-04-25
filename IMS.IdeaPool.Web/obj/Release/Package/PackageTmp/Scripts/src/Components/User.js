import $ from 'jquery'

var UserHelper = {};
UserHelper._user = {};
UserHelper._load = function () {
    $.ajax({
        context: this,
        type: 'GET',
        url: '/User/GetUser',
        success: function (response) {
            UserHelper._user = response;
        }
    });
}

UserHelper.Refresh = function () {
    UserHelper._load();
}

UserHelper.GetFirstName = function () {
    return UserHelper.GetUser().FirstName;
}

UserHelper.GetUserName = function () {
    return UserHelper.GetUser().FirstName + ', ' + UserHelper.GetUser().LastName;
}

UserHelper.GetUser = function () {
    return UserHelper._user;
}

UserHelper.GetId = function () {
    var user = UserHelper.GetUser();
    return user.Id;
}


UserHelper.HasAccess = function (featureKey) {
    var user = UserHelper.GetUser();
    var index = _.findIndex(user.FeatureAccess, function (key) {
        return key === featureKey;
    });
    return index != -1;
}

$(document).ready(function () {
    UserHelper._load();
});

export default UserHelper