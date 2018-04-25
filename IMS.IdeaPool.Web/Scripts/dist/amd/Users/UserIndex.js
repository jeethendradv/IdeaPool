define(['exports', 'react', 'component/BaseComponent', 'component/UsersAutocomplete', 'users/UserDetails', 'users/UsersGrid', 'react-router-dom'], function (exports, _react, _BaseComponent2, _UsersAutocomplete, _UserDetails, _UsersGrid, _reactRouterDom) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _UsersAutocomplete2 = _interopRequireDefault(_UsersAutocomplete);

    var _UserDetails2 = _interopRequireDefault(_UserDetails);

    var _UsersGrid2 = _interopRequireDefault(_UsersGrid);

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

    var UserIndex = function (_BaseComponent) {
        _inherits(UserIndex, _BaseComponent);

        function UserIndex() {
            _classCallCheck(this, UserIndex);

            return _possibleConstructorReturn(this, (UserIndex.__proto__ || Object.getPrototypeOf(UserIndex)).call(this));
        }

        _createClass(UserIndex, [{
            key: 'onUserSelect',
            value: function onUserSelect(userId) {
                this.resetState();
                this.state = {
                    showuserdetails: true,
                    showusergrid: false,
                    userid: userId
                };
                this.setState(this.state);
            }
        }, {
            key: 'resetState',
            value: function resetState() {
                this.state = {};
            }
        }, {
            key: 'searchUsers',
            value: function searchUsers(searchterm) {
                this.resetState();
                this.state = {
                    showusergrid: true,
                    searchname: searchterm
                };
                this.setState(this.state);
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_UsersAutocomplete2.default, {
                        onSelect: this.onUserSelect.bind(this),
                        onSearch: this.searchUsers.bind(this)
                    }),
                    this.state.showusergrid ? _react2.default.createElement(_UsersGrid2.default, { searchname: this.state.searchname, onUserClick: this.onUserSelect.bind(this) }) : this.state.showuserdetails ? _react2.default.createElement(_UserDetails2.default, { id: this.state.userid }) : null
                );
            }
        }]);

        return UserIndex;
    }(_BaseComponent3.default);

    exports.default = UserIndex;
});