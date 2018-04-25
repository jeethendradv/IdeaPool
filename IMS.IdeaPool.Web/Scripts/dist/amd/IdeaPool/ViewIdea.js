define(['exports', 'react', 'component/BaseComponent', 'react-router-dom', 'component/IdeaStatusUpdate', 'component/Thumbnail', 'pubsub', 'component/User', 'component/FeatureKeys'], function (exports, _react, _BaseComponent2, _reactRouterDom, _IdeaStatusUpdate, _Thumbnail, _pubsub, _User, _FeatureKeys) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _IdeaStatusUpdate2 = _interopRequireDefault(_IdeaStatusUpdate);

    var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

    var _pubsub2 = _interopRequireDefault(_pubsub);

    var _User2 = _interopRequireDefault(_User);

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

    var ViewIdea = function (_BaseComponent) {
        _inherits(ViewIdea, _BaseComponent);

        function ViewIdea(props) {
            _classCallCheck(this, ViewIdea);

            var _this = _possibleConstructorReturn(this, (ViewIdea.__proto__ || Object.getPrototypeOf(ViewIdea)).call(this));

            _this.state.idea = {
                FieldOfWater: [],
                Files: [],
                Status: {},
                User: {}
            };
            _this.state.canprint = _User2.default.HasAccess(_FeatureKeys2.default.PRINT_IDEA);
            _this.fetchIdeaDetails(props.id);
            return _this;
        }

        _createClass(ViewIdea, [{
            key: 'fetchIdeaDetails',
            value: function fetchIdeaDetails(id) {
                this.makeCall("/Idea/FetchIdeaDetails", "POST", { Id: id }, this.onFetchSuccess.bind(this));
            }
        }, {
            key: 'onFetchSuccess',
            value: function onFetchSuccess(response) {
                this.state.idea = response;
                this.setState(this.state);
            }
        }, {
            key: 'onChatClick',
            value: function onChatClick(ideaId) {
                if (this.props.onChatClick) {
                    this.props.onChatClick(ideaId);
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.$el = $(this.el);
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                this.$el.tooltip();
            }
        }, {
            key: 'showUserDetails',
            value: function showUserDetails(userId) {
                _pubsub2.default.publish('showUserDetails', userId);
            }
        }, {
            key: 'printIdea',
            value: function printIdea() {
                window.print();
                this.makeCall('/Audit/AuditPrint', 'POST', { ideaId: this.props.id });
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    { ref: function ref(el) {
                            return _this2.el = el;
                        }, className: 'section-to-print' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        this.state.idea.Title
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        'By: ',
                        _react2.default.createElement(
                            'span',
                            { className: 'idea-creator' },
                            _react2.default.createElement(
                                'a',
                                { onClick: this.showUserDetails.bind(this, this.state.idea.User.Id) },
                                this.state.idea.User.FirstName,
                                ', ',
                                this.state.idea.User.LastName
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-6' },
                            this.state.idea.FieldOfWater.map(function (fieldofwater) {
                                return _react2.default.createElement(
                                    'span',
                                    { className: 'border rounded viewIdea-label-2', key: fieldofwater.Id },
                                    fieldofwater.Id == -1 ? fieldofwater.Description : fieldofwater.Name
                                );
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-6' },
                            this.state.canprint ? _react2.default.createElement(
                                'button',
                                { className: 'border print-button btn right hide-section-when-print', onClick: this.printIdea.bind(this) },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-print' }),
                                ' Print'
                            ) : null,
                            _react2.default.createElement(_IdeaStatusUpdate2.default, { status: this.state.idea.Status, ideaId: this.state.idea.Id }),
                            !this.state.idea.IsDraft ? _react2.default.createElement(
                                'a',
                                { className: 'right hide-section-when-print', style: { marginRight: 6 + '%' }, onClick: this.onChatClick.bind(this, this.state.idea.Id), 'data-toggle': 'tooltip', title: 'Discuss this Idea.' },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-comment' })
                            ) : null
                        )
                    ),
                    _react2.default.createElement('hr', null),
                    _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.idea.DescriptionHtml } }),
                    _react2.default.createElement(_Thumbnail2.default, { files: this.state.idea.Files, ideaId: this.state.idea.Id }),
                    _react2.default.createElement('hr', null),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group hide-section-when-print' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { className: 'btn btn-info btn-IMS left', to: '/Home/Index' },
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-arrow-left' }),
                                ' Back'
                            )
                        )
                    )
                );
            }
        }]);

        return ViewIdea;
    }(_BaseComponent3.default);

    exports.default = ViewIdea;
});