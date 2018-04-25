define(['exports', 'react', 'component/BaseComponent', 'jquery', 'react-router-dom', 'component/Pager', 'component/PagerBar', 'component/IdeaAdvancedSearch', 'pubsub', 'lodash'], function (exports, _react, _BaseComponent, _jquery, _reactRouterDom, _Pager2, _PagerBar, _IdeaAdvancedSearch, _pubsub, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _Pager3 = _interopRequireDefault(_Pager2);

    var _PagerBar2 = _interopRequireDefault(_PagerBar);

    var _IdeaAdvancedSearch2 = _interopRequireDefault(_IdeaAdvancedSearch);

    var _pubsub2 = _interopRequireDefault(_pubsub);

    var _lodash2 = _interopRequireDefault(_lodash);

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

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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

    var IdeasGrid = function (_Pager) {
        _inherits(IdeasGrid, _Pager);

        function IdeasGrid(props) {
            _classCallCheck(this, IdeasGrid);

            var _this = _possibleConstructorReturn(this, (IdeasGrid.__proto__ || Object.getPrototypeOf(IdeasGrid)).call(this, props));

            _this.markread = _pubsub2.default.subscribe('markread', _this.markdiscussionasread.bind(_this));
            return _this;
        }

        _createClass(IdeasGrid, [{
            key: 'onAdvancedSearch',
            value: function onAdvancedSearch(data) {
                this.state.currentpage = 1;
                this.fetchRowsWithData(data);
            }
        }, {
            key: 'onChatClick',
            value: function onChatClick(ideaId) {
                if (this.props.onChatClick) {
                    this.props.onChatClick(ideaId);
                }
            }
        }, {
            key: 'onExport',
            value: function onExport(data) {
                var url = '/Idea/Export?fieldOfWaterId=' + data.FieldOfWaterId + '&statusId=' + data.StatusId + '&userId=' + data.UserId + '&searchText=' + data.SearchText + '&exportType=' + data.ExportType;
                window.location.href = url;
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                _get(IdeasGrid.prototype.__proto__ || Object.getPrototypeOf(IdeasGrid.prototype), 'componentDidMount', this).call(this);
                this.$ideagrid = (0, _jquery2.default)(this.el);
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                this.$ideagrid.tooltip();
            }
        }, {
            key: 'markdiscussionasread',
            value: function markdiscussionasread(event, ideaId) {
                var ideaObj = _lodash2.default.find(this.state.rows, function (idea) {
                    return idea.Id == ideaId;
                });
                if (ideaObj && ideaObj.HasUnreadDiscussions) {
                    ideaObj.HasUnreadDiscussions = false;
                    this.setState({ rows: this.state.rows });
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                _pubsub2.default.unsubscribe(this.markread);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    null,
                    this.state.numberofrows > this.state.pagelength ? _react2.default.createElement(_PagerBar2.default, {
                        currentpage: this.state.currentpage,
                        pagelength: this.state.pagelength,
                        numberofrows: this.state.numberofrows,
                        onNext: this.onNext.bind(this),
                        onPrevious: this.onPrevious.bind(this),
                        onPageLengthChange: this.onPageLengthChange.bind(this)
                    }) : null,
                    _react2.default.createElement(
                        'table',
                        { className: 'table table-hover table-sm', ref: function ref(el) {
                                return _this2.el = el;
                            } },
                        this.props.showAdvancedSearch ? _react2.default.createElement(
                            'thead',
                            null,
                            _react2.default.createElement(_IdeaAdvancedSearch2.default, {
                                onSearch: this.onAdvancedSearch.bind(this),
                                onExport: this.onExport.bind(this)
                            })
                        ) : null,
                        _react2.default.createElement(
                            'thead',
                            { className: 'thead-inverse' },
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Submit Date'
                                ),
                                this.props.shownamecolumn ? _react2.default.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Name'
                                ) : null,
                                _react2.default.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Title'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Field Of Water'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { scope: 'col' },
                                    'Status'
                                ),
                                _react2.default.createElement('th', { scope: 'col' }),
                                _react2.default.createElement('th', { scope: 'col' })
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            this.state.rows.map(function (idea) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: idea.Id, className: idea.IsDraft ? 'idea-draft' : '' },
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        idea.SubmitDate
                                    ),
                                    _this2.props.shownamecolumn ? _react2.default.createElement(
                                        'td',
                                        null,
                                        idea.CreatedBy
                                    ) : null,
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            _reactRouterDom.Link,
                                            { to: '/Idea/View/' + idea.Id },
                                            idea.Title
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        idea.FieldOdWater.map(function (fieldofwater) {
                                            return _react2.default.createElement(
                                                'div',
                                                { key: fieldofwater },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'border rounded fieldofwater-label' },
                                                    fieldofwater
                                                )
                                            );
                                        })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'border rounded fieldofwater-label', style: { backgroundColor: idea.Status.Color } },
                                            idea.Status.Name
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        idea.CanEdit ? _react2.default.createElement(
                                            _reactRouterDom.Link,
                                            { to: '/Idea/Edit/' + idea.Id },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'glyphicon glyphicon-pencil' },
                                                ' '
                                            )
                                        ) : null,
                                        '\xA0\xA0',
                                        !idea.IsDraft ? _react2.default.createElement(
                                            'a',
                                            { onClick: _this2.onChatClick.bind(_this2, idea.Id), 'data-toggle': 'tooltip', title: 'Discuss this Idea.' },
                                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-comment' })
                                        ) : null
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        idea.HasUnreadDiscussions ? _react2.default.createElement('span', { className: 'glyphicon glyphicon-one-fine-dot', 'data-toggle': 'tooltip', title: 'You have unread discussions.' }) : null
                                    )
                                );
                            })
                        )
                    ),
                    this.state.numberofrows > this.state.pagelength ? _react2.default.createElement(_PagerBar2.default, {
                        currentpage: this.state.currentpage,
                        pagelength: this.state.pagelength,
                        numberofrows: this.state.numberofrows,
                        onNext: this.onNext.bind(this),
                        onPrevious: this.onPrevious.bind(this),
                        onPageLengthChange: this.onPageLengthChange.bind(this)
                    }) : null
                );
            }
        }]);

        return IdeasGrid;
    }(_Pager3.default);

    exports.default = IdeasGrid;
});