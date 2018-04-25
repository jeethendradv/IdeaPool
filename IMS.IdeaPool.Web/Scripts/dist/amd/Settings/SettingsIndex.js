define(['exports', 'react', 'component/GroupSettings', 'component/FieldOfWaterSettings', 'component/IdeaStatusSettings', 'component/BaseComponent'], function (exports, _react, _GroupSettings, _FieldOfWaterSettings, _IdeaStatusSettings, _BaseComponent2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _GroupSettings2 = _interopRequireDefault(_GroupSettings);

    var _FieldOfWaterSettings2 = _interopRequireDefault(_FieldOfWaterSettings);

    var _IdeaStatusSettings2 = _interopRequireDefault(_IdeaStatusSettings);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

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

    var SettingsIndex = function (_BaseComponent) {
        _inherits(SettingsIndex, _BaseComponent);

        function SettingsIndex() {
            _classCallCheck(this, SettingsIndex);

            var _this = _possibleConstructorReturn(this, (SettingsIndex.__proto__ || Object.getPrototypeOf(SettingsIndex)).call(this));

            _this.state.groups = [];
            return _this;
        }

        _createClass(SettingsIndex, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.makeCall('/Settings/Get', 'GET', null, this.onSettingsDataFetch.bind(this));
            }
        }, {
            key: 'onSettingsDataFetch',
            value: function onSettingsDataFetch(groups) {
                this.state.groups = groups;
                this.setState(this.state);
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    this.state.groups.map(function (group) {
                        return _react2.default.createElement(_GroupSettings2.default, {
                            key: group.Key,
                            group: group
                        });
                    }),
                    _react2.default.createElement(_FieldOfWaterSettings2.default, null),
                    _react2.default.createElement(_IdeaStatusSettings2.default, null)
                );
            }
        }]);

        return SettingsIndex;
    }(_BaseComponent3.default);

    exports.default = SettingsIndex;
});