define(['exports', 'react', 'lodash', 'component/BaseComponent'], function (exports, _react, _lodash, _BaseComponent2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _lodash2 = _interopRequireDefault(_lodash);

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

    var Roles = function (_BaseComponent) {
        _inherits(Roles, _BaseComponent);

        function Roles() {
            _classCallCheck(this, Roles);

            var _this = _possibleConstructorReturn(this, (Roles.__proto__ || Object.getPrototypeOf(Roles)).call(this));

            _this.state = {
                roles: [],
                key: '',
                value: 'Select role to add'
            };
            return _this;
        }

        _createClass(Roles, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.makeCall('/User/FetchAllRoles', 'POST', null, this.onFetchSuccess.bind(this));
            }
        }, {
            key: 'onFetchSuccess',
            value: function onFetchSuccess(roles) {
                this.state.roles = roles;
                this.setState(this.state);
            }
        }, {
            key: 'onSelect',
            value: function onSelect(key, value) {
                this.state.key = key;
                this.state.value = value;
                this.setState(this.state);
            }
        }, {
            key: 'addRole',
            value: function addRole() {
                if (!_lodash2.default.isEmpty(this.state.key)) {
                    this.props.onAddRole(this.state.key);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    { className: 'dropdown' },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-secondary dropdown-toggle updatestatus-dropdown user-role', type: 'button', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                        this.state.value,
                        '  ',
                        _react2.default.createElement('span', { className: 'caret' })
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'dropdown-menu', 'aria-labelledby': 'dropdownMenu2', role: 'menu' },
                        this.state.roles.map(function (role) {
                            return _react2.default.createElement(
                                'li',
                                { className: _this2.state.key == role.Key ? 'active' : null, key: role.Key },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dropdown-item', onClick: _this2.onSelect.bind(_this2, role.Key, role.Value) },
                                    role.Value
                                )
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-primary btn-IMS', onClick: this.addRole.bind(this) },
                        _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' })
                    )
                );
            }
        }]);

        return Roles;
    }(_BaseComponent3.default);

    exports.default = Roles;
});