define(['react-router-dom', 'login/Container', 'react', 'react-dom'], function (_reactRouterDom, _Container, _react, _reactDom) {
    'use strict';

    var _Container2 = _interopRequireDefault(_Container);

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    (0, _reactDom.render)(_react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(_Container2.default, null)
    ), document.getElementById('root'));
});