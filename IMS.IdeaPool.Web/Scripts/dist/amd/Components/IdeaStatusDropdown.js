define(['exports', 'react', 'component/BaseComponent'], function (exports, _react, _BaseComponent2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

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

    var IdeaStatusDropdown = function (_BaseComponent) {
        _inherits(IdeaStatusDropdown, _BaseComponent);

        function IdeaStatusDropdown() {
            _classCallCheck(this, IdeaStatusDropdown);

            var _this = _possibleConstructorReturn(this, (IdeaStatusDropdown.__proto__ || Object.getPrototypeOf(IdeaStatusDropdown)).call(this));

            _this.state.statuses = [];
            return _this;
        }

        _createClass(IdeaStatusDropdown, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.makeCall('/Idea/FetchIdeaStatus', 'GET', null, this.onStatusFetch.bind(this));
            }
        }, {
            key: 'onStatusFetch',
            value: function onStatusFetch(response) {
                var empty = [{ Id: 0, Name: '-Select Status-' }];
                this.state.selectedStatusId = empty[0].Id;
                this.state.selectedStatusName = empty[0].Name;
                this.state.statuses = empty.concat(response);
                this.setState(this.state);
            }
        }, {
            key: 'onStatusChange',
            value: function onStatusChange(id) {
                var status = _.find(this.state.statuses, { Id: id });
                this.state.selectedStatusId = status.Id;
                this.state.selectedStatusName = status.Name;
                this.setState(this.state);
                if (this.props.onChange) {
                    this.props.onChange(id);
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
                        { className: 'btn btn-secondary dropdown-toggle updatestatus-dropdown', type: 'button', id: 'dropdownMenu2', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                        this.state.selectedStatusName,
                        ' ',
                        _react2.default.createElement('span', { className: 'caret' })
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'dropdown-menu', 'aria-labelledby': 'dropdownMenu2', role: 'menu' },
                        this.state.statuses.map(function (status) {
                            return _react2.default.createElement(
                                'li',
                                { key: status.Id, className: _this2.state.selectedStatusId == status.Id ? 'active' : null },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dropdown-item', onClick: _this2.onStatusChange.bind(_this2, status.Id) },
                                    status.Name
                                )
                            );
                        })
                    )
                );
            }
        }]);

        return IdeaStatusDropdown;
    }(_BaseComponent3.default);

    exports.default = IdeaStatusDropdown;
});