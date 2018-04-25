define(['exports', 'react', 'component/BaseComponent', 'jquery', 'jquery-ui'], function (exports, _react, _BaseComponent2, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _jquery2 = _interopRequireDefault(_jquery);

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

    var UsersAutocomplete = function (_BaseComponent) {
        _inherits(UsersAutocomplete, _BaseComponent);

        function UsersAutocomplete() {
            _classCallCheck(this, UsersAutocomplete);

            return _possibleConstructorReturn(this, (UsersAutocomplete.__proto__ || Object.getPrototypeOf(UsersAutocomplete)).call(this));
        }

        _createClass(UsersAutocomplete, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.$autocomplete = (0, _jquery2.default)(this.el);
                this.$autocomplete.autocomplete({
                    minLength: 2,
                    source: function (request, response) {
                        this.makeCall('/User/Autocomplete', 'POST', request, response);
                    }.bind(this),
                    select: this.onUserSelect.bind(this),
                    change: this.onUserChange.bind(this)
                }).autocomplete('instance')._renderItem = function (ul, item) {
                    return (0, _jquery2.default)("<li>").append("<div>" + item.FirstName + ", " + item.LastName + "</div>").appendTo(ul);
                };
            }
        }, {
            key: 'onUserSelect',
            value: function onUserSelect(event, ui) {
                this.$autocomplete.val(ui.item.FirstName + ", " + ui.item.LastName);
                if (this.props.onSelect) {
                    this.props.onSelect(ui.item.Id);
                }
                return false;
            }
        }, {
            key: 'onUserChange',
            value: function onUserChange(event, ui) {
                if (this.props.onChange) {
                    var id = ui.item ? ui.item.Id : 0;
                    this.props.onChange(id);
                }
            }
        }, {
            key: 'searchClick',
            value: function searchClick() {
                if (this.props.onSearch) {
                    this.props.onSearch(this.$autocomplete.val());
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return this.props.hidesearch ? _react2.default.createElement(
                    'div',
                    { className: 'row form-inline' },
                    _react2.default.createElement('input', { className: 'form-control width100', ref: function ref(el) {
                            return _this2.el = el;
                        },
                        type: 'text',
                        name: 'user',
                        placeholder: 'Type first name or last name'
                    })
                ) : _react2.default.createElement(
                    'div',
                    { className: 'row form-inline' },
                    _react2.default.createElement('div', { className: 'col-lg-3' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-lg-5' },
                        _react2.default.createElement('input', { className: 'form-control width100', ref: function ref(el) {
                                return _this2.el = el;
                            },
                            type: 'text',
                            name: 'user',
                            placeholder: 'Type first name or last name'
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-lg-1' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-primary btn-IMS', onClick: this.searchClick.bind(this) },
                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-search' }),
                            ' Search'
                        )
                    ),
                    _react2.default.createElement('div', { className: 'col-3' })
                );
            }
        }]);

        return UsersAutocomplete;
    }(_BaseComponent3.default);

    exports.default = UsersAutocomplete;
});