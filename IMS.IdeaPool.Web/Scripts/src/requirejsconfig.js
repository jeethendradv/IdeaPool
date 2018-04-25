requirejs.config({
    baseUrl: '/Scripts/dist/',
    paths: {
        'jquery': 'libraries/jquery.min'
        , 'bootstrap': 'libraries/bootstrap/js/bootstrap.min'
        , 'respond': 'libraries/respond.min'
        , 'summernote': 'libraries/summernote/summernote.min'
        , 'react': 'libraries/react.development'
        , 'react-router': 'libraries/react-router'
        , 'react-router-dom': 'libraries/react-router-dom'
        , 'react-dom': 'libraries/react-dom.development'
        , 'react-art': 'libraries/react-art.production.min'
        , 'lodash': 'libraries/lodash.min'
        , 'login': 'amd/Login/'
        , 'component': 'amd/Components'
        , 'idea': 'amd/IdeaPool'
        , 'users': 'amd/Users'
        , 'settings': 'amd/Settings'
        , 'notification': 'libraries/react-notifications/react-notification'
        , 'prop-types': 'libraries/prop-types.min'
        , 'react-transition-group': 'libraries/react-transition-group.min'
        , 'colorbox': 'libraries/jquery-colorbox/jquery.colorbox-min'
        , 'jquery-ui': 'libraries/jquery-ui/jquery-ui.min'
        , 'signalr': 'libraries/jquery.signalR-2.2.2'
        , 'hubs': 'libraries/signalrHubs'
        , 'notify': 'libraries/bootstrap-notify.min'
        , 'pubsub': 'libraries/pubsub'
        , 'ploading': 'libraries/p-loading/p-loading.min'
        , 'spectrum': 'libraries/spectrum-colorpicker/spectrum'
        , 'classnames': 'libraries/classnames/index'
    },
    urlArgs: "bust=" + (new Date()).getTime() // Remove this line while deploying. This was just to prevent caching.
});