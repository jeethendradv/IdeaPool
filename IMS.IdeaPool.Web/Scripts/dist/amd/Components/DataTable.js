define(['exports', 'react', 'component/Pager', 'lodash', 'component/PagerBar'], function (exports, _react, _Pager2, _lodash, _PagerBar) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Pager3 = _interopRequireDefault(_Pager2);

    var _lodash2 = _interopRequireDefault(_lodash);

    var _PagerBar2 = _interopRequireDefault(_PagerBar);

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

    var DataTable = function (_Pager) {
        _inherits(DataTable, _Pager);

        function DataTable(props) {
            _classCallCheck(this, DataTable);

            var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props));

            _this.state.columns = [];
            return _this;
        }

        _createClass(DataTable, [{
            key: 'getLinkUrl',
            value: function getLinkUrl(columnConfig, rowData) {
                return _lodash2.default.replace(columnConfig.url, /{([^}]+)}/g, function (row, match) {
                    var prop = match.replace('{', '').replace('}', '');
                    return row[prop];
                }.bind(this, rowData));
            }
        }, {
            key: 'onEdit',
            value: function onEdit(columnconfig, rowdata) {
                if (columnconfig.onEditClick) {
                    columnconfig.onEditClick(rowdata);
                }
            }
        }, {
            key: 'onComment',
            value: function onComment(columnconfig, rowdata) {
                if (columnconfig.onCommentClick) {
                    columnconfig.onCommentClick(rowdata);
                }
            }
        }, {
            key: 'onCellClick',
            value: function onCellClick(columnconfig, rowdata) {
                if (columnconfig.onClick) {
                    columnconfig.onClick(rowdata);
                }
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextprops) {
                this.fetchRowsWithData(nextprops.data);
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
                        { className: 'table table-hover table-sm' },
                        _react2.default.createElement(
                            'thead',
                            { className: 'thead-inverse' },
                            _react2.default.createElement(
                                'tr',
                                null,
                                this.props.columns.map(function (column, index) {
                                    return _react2.default.createElement(
                                        'th',
                                        { scope: 'col', key: index },
                                        column.name
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            this.state.rows.map(function (row, i) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: i },
                                    _this2.props.columns.map(function (column, index) {
                                        return _react2.default.createElement(
                                            'td',
                                            { key: index },
                                            column.islink ? column.url ? _react2.default.createElement(
                                                Link,
                                                { to: _this2.getLinkUrl(column, row) },
                                                row[column.binding]
                                            ) : _react2.default.createElement(
                                                'a',
                                                { onClick: _this2.onCellClick.bind(_this2, column, row) },
                                                row[column.binding]
                                            ) : null,
                                            column.isicon && column.displayedit ? column.url ? _react2.default.createElement(
                                                Link,
                                                { to: _this2.getLinkUrl(column, row) },
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'glyphicon glyphicon-pencil' },
                                                    ' '
                                                )
                                            ) : _react2.default.createElement(
                                                'a',
                                                { onClick: _this2.onEdit.bind(_this2, column, row) },
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'glyphicon glyphicon-pencil' },
                                                    ' '
                                                )
                                            ) : null,
                                            column.isicon && column.displaycomment ? column.url ? _react2.default.createElement(
                                                Link,
                                                { to: _this2.getLinkUrl(column, row) },
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'glyphicon glyphicon-comment' },
                                                    ' '
                                                )
                                            ) : _react2.default.createElement(
                                                'a',
                                                { onClick: column.onClick },
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'glyphicon glyphicon-comment' },
                                                    ' '
                                                )
                                            ) : null,
                                            !(column.isicon || column.islink) ? row[column.binding] : null
                                        );
                                    })
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

        return DataTable;
    }(_Pager3.default);

    exports.default = DataTable;
});