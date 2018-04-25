define(['exports', 'react', 'component/BaseComponent', 'component/UsersAutocomplete', 'component/FieldOfWaterDropdown', 'component/IdeaStatusDropdown', 'component/ExportDropdown', 'component/User', 'component/FeatureKeys'], function (exports, _react, _BaseComponent2, _UsersAutocomplete, _FieldOfWaterDropdown, _IdeaStatusDropdown, _ExportDropdown, _User, _FeatureKeys) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

    var _UsersAutocomplete2 = _interopRequireDefault(_UsersAutocomplete);

    var _FieldOfWaterDropdown2 = _interopRequireDefault(_FieldOfWaterDropdown);

    var _IdeaStatusDropdown2 = _interopRequireDefault(_IdeaStatusDropdown);

    var _ExportDropdown2 = _interopRequireDefault(_ExportDropdown);

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

    var IdeaAdvancedSearch = function (_BaseComponent) {
        _inherits(IdeaAdvancedSearch, _BaseComponent);

        function IdeaAdvancedSearch() {
            _classCallCheck(this, IdeaAdvancedSearch);

            var _this = _possibleConstructorReturn(this, (IdeaAdvancedSearch.__proto__ || Object.getPrototypeOf(IdeaAdvancedSearch)).call(this));

            _this.state.canexport = _User2.default.HasAccess(_FeatureKeys2.default.EXPORT_IDEAS);
            return _this;
        }

        _createClass(IdeaAdvancedSearch, [{
            key: 'onIdeaStatusChange',
            value: function onIdeaStatusChange(statusId) {
                this.state.IdeaStatusId = statusId;
            }
        }, {
            key: 'onFieldOfWaterChange',
            value: function onFieldOfWaterChange(fieldOfWaterId) {
                this.state.FieldOfWaterId = fieldOfWaterId;
            }
        }, {
            key: 'onUserChange',
            value: function onUserChange(userId) {
                this.state.UserId = userId;
            }
        }, {
            key: 'advancedSearch',
            value: function advancedSearch() {
                if (this.props.onSearch) {
                    var params = {
                        StatusId: this.state.IdeaStatusId,
                        FieldOfWaterId: this.state.FieldOfWaterId,
                        UserId: this.state.UserId,
                        SearchText: this.state.searchText
                    };
                    this.props.onSearch(params);
                }
            }
        }, {
            key: 'onSearchTextChange',
            value: function onSearchTextChange(event) {
                this.state.searchText = event.target.value;
            }
        }, {
            key: 'onExportChange',
            value: function onExportChange(type) {
                if (this.props.onExport) {
                    var params = {
                        StatusId: this.state.IdeaStatusId ? this.state.IdeaStatusId : 0,
                        FieldOfWaterId: this.state.FieldOfWaterId ? this.state.FieldOfWaterId : 0,
                        UserId: this.state.UserId ? this.state.UserId : 0,
                        SearchText: this.state.searchText ? this.state.searchText : '',
                        ExportType: type
                    };
                    this.props.onExport(params);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'tr',
                    { className: 'idea-advancedsearch' },
                    _react2.default.createElement(
                        'th',
                        { scope: 'col' },
                        this.state.canexport ? _react2.default.createElement(_ExportDropdown2.default, {
                            onChange: this.onExportChange.bind(this)
                        }) : null
                    ),
                    _react2.default.createElement(
                        'th',
                        { scope: 'col' },
                        _react2.default.createElement(_UsersAutocomplete2.default, {
                            hidesearch: true,
                            onChange: this.onUserChange.bind(this)
                        })
                    ),
                    _react2.default.createElement(
                        'th',
                        { scope: 'col' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row form-inline idea-advancedsearch-textsearch' },
                            _react2.default.createElement('input', { className: 'form-control',
                                type: 'text',
                                placeholder: 'Enter the search term',
                                onChange: this.onSearchTextChange.bind(this)
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'th',
                        { scope: 'col' },
                        _react2.default.createElement(_FieldOfWaterDropdown2.default, {
                            onChange: this.onFieldOfWaterChange.bind(this)
                        })
                    ),
                    _react2.default.createElement(
                        'th',
                        { scope: 'col' },
                        _react2.default.createElement(_IdeaStatusDropdown2.default, {
                            onChange: this.onIdeaStatusChange.bind(this)
                        })
                    ),
                    _react2.default.createElement(
                        'th',
                        { scope: 'col' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-primary btn-IMS', onClick: this.advancedSearch.bind(this) },
                            'Search'
                        )
                    ),
                    _react2.default.createElement('th', { scope: 'col' })
                );
            }
        }]);

        return IdeaAdvancedSearch;
    }(_BaseComponent3.default);

    exports.default = IdeaAdvancedSearch;
});