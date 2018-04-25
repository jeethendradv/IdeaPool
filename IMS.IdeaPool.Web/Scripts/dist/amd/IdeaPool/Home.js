define(['exports', 'react', 'component/BaseComponent', 'component/Welcome', 'component/User', 'component/IdeasGrid', 'component/FeatureKeys'], function (exports, _react, _BaseComponent2, _Welcome, _User, _IdeasGrid, _FeatureKeys) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _Welcome2 = _interopRequireDefault(_Welcome);

    var _User2 = _interopRequireDefault(_User);

    var _IdeasGrid2 = _interopRequireDefault(_IdeasGrid);

    var _FeatureKeys2 = _interopRequireDefault(_FeatureKeys);

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

    var Home = function (_BaseComponent) {
        _inherits(Home, _BaseComponent);

        function Home(props) {
            _classCallCheck(this, Home);

            var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

            _this.firstname = _User2.default.GetFirstName();
            _this.cansubmitidea = _User2.default.HasAccess(_FeatureKeys2.default.SUBMIT_IDEA);
            _this.hasaccesstootherideas = _User2.default.HasAccess(_FeatureKeys2.default.VIEW_IDEAS_OF_OTHERS);
            return _this;
        }

        _createClass(Home, [{
            key: 'onChatClick',
            value: function onChatClick(ideaId) {
                if (this.props.onChatClick) {
                    this.props.onChatClick(ideaId);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_Welcome2.default, {
                        firstname: this.firstname,
                        cansubmitidea: this.cansubmitidea
                    }),
                    _react2.default.createElement(_IdeasGrid2.default, {
                        shownamecolumn: this.hasaccesstootherideas,
                        showAdvancedSearch: this.hasaccesstootherideas,
                        onChatClick: this.onChatClick.bind(this),
                        url: '/Idea/FetchAll'
                    })
                );
            }
        }]);

        return Home;
    }(_BaseComponent3.default);

    exports.default = Home;
});