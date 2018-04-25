define(['exports', 'react', 'component/BaseComponent', 'react-router', 'notification', 'component/ErrorHelper'], function (exports, _react, _BaseComponent2, _reactRouter, _notification, _ErrorHelper) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _ErrorHelper2 = _interopRequireDefault(_ErrorHelper);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ActivateUser = function (_BaseComponent) {
        _inherits(ActivateUser, _BaseComponent);

        function ActivateUser(props) {
            _classCallCheck(this, ActivateUser);

            var _this = _possibleConstructorReturn(this, (ActivateUser.__proto__ || Object.getPrototypeOf(ActivateUser)).call(this));

            _this.showMessage(_this.activate(_this.getParameterByName('code')));
            return _this;
        }

        _createClass(ActivateUser, [{
            key: 'showMessage',
            value: function showMessage(activated) {
                if (activated) {
                    _notification.NotificationManager.success(_ErrorHelper2.default.GetErrorMessage(128));
                } else {
                    _notification.NotificationManager.error(_ErrorHelper2.default.GetErrorMessage(129));
                }
            }
        }, {
            key: 'activate',
            value: function activate(code) {
                var data = {
                    code: code
                };
                var response = this.makeSyncCall("/Login/Activate", "POST", data);
                return this.isTrue(response);
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(_reactRouter.Redirect, { to: '/' });
            }
        }]);

        return ActivateUser;
    }(_BaseComponent3.default);

    exports.default = ActivateUser;
});