define(['exports', 'react', 'component/BaseComponent', 'component/User', 'component/FeatureKeys', 'lodash', 'notification', 'component/ErrorHelper'], function (exports, _react, _BaseComponent2, _User, _FeatureKeys, _lodash, _notification, _ErrorHelper) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _User2 = _interopRequireDefault(_User);

    var _FeatureKeys2 = _interopRequireDefault(_FeatureKeys);

    var _lodash2 = _interopRequireDefault(_lodash);

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

    var IdeaStatusUpdate = function (_BaseComponent) {
        _inherits(IdeaStatusUpdate, _BaseComponent);

        function IdeaStatusUpdate(props) {
            _classCallCheck(this, IdeaStatusUpdate);

            var _this = _possibleConstructorReturn(this, (IdeaStatusUpdate.__proto__ || Object.getPrototypeOf(IdeaStatusUpdate)).call(this));

            _this.state.canupdatestatus = _User2.default.HasAccess(_FeatureKeys2.default.UPDATE_IDEA_STATUS);
            _this.state.statuses = [];
            return _this;
        }

        _createClass(IdeaStatusUpdate, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (this.state.canupdatestatus) {
                    this.makeCall('/Idea/FetchIdeaStatus', 'GET', null, this.onStatusFetch.bind(this));
                }
            }
        }, {
            key: 'onStatusFetch',
            value: function onStatusFetch(response) {
                this.state.statuses = response;
                this.setState(this.state);
            }
        }, {
            key: 'onStatusChange',
            value: function onStatusChange(id) {
                var status = _lodash2.default.find(this.state.statuses, { Id: id });
                this.state.selectedStatusId = status.Id;
                this.state.selectedStatusName = status.Name;
                this.setState(this.state);
            }
        }, {
            key: 'updateStatus',
            value: function updateStatus() {
                var data = {
                    ideaId: this.state.ideaId,
                    statusId: this.state.selectedStatusId
                };
                this.makeCall('/Idea/UpdateStatus', 'POST', data, this.statusUpdateSuccess.bind(this));
            }
        }, {
            key: 'statusUpdateSuccess',
            value: function statusUpdateSuccess() {
                _notification.NotificationManager.success(_ErrorHelper2.default.GetErrorMessage(131));
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                if (this.state.canupdatestatus) {
                    this.state.selectedStatusName = this.state.selectedStatusName || this.props.status.Name;
                    this.state.selectedStatusId = this.state.selectedStatusId || this.props.status.Id;
                    this.state.ideaId = this.props.ideaId;

                    return _react2.default.createElement(
                        'div',
                        { className: 'right' },
                        _react2.default.createElement(
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
                                { className: 'dropdown-menu hide-section-when-print', 'aria-labelledby': 'dropdownMenu2', role: 'menu' },
                                this.state.statuses.map(function (status) {
                                    return _react2.default.createElement(
                                        'li',
                                        { key: status.Id, className: _this2.state.selectedStatusId == status.Id ? 'active' : null },
                                        _react2.default.createElement(
                                            'a',
                                            { className: 'dropdown-item', href: '#', onClick: _this2.onStatusChange.bind(_this2, status.Id) },
                                            status.Name
                                        )
                                    );
                                })
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-primary btn-IMS hide-section-when-print', onClick: this.updateStatus.bind(this) },
                                'Update Status'
                            )
                        )
                    );
                } else {
                    return _react2.default.createElement(
                        'span',
                        {
                            className: 'border rounded viewIdea-label-2 right',
                            style: { backgroundColor: this.props.status.Color }
                        },
                        this.props.status.Name
                    );
                }
            }
        }]);

        return IdeaStatusUpdate;
    }(_BaseComponent3.default);

    exports.default = IdeaStatusUpdate;
});