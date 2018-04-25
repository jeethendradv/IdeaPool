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

    var Pager = function (_BaseComponent) {
        _inherits(Pager, _BaseComponent);

        function Pager(props) {
            _classCallCheck(this, Pager);

            var _this = _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).call(this, props));

            _this.state = {
                rows: [],
                currentpage: props.currentpage ? parseInt(props.currentpage) : 1,
                pagelength: props.pagelength ? parseInt(props.pagelength) : 10,
                totalpages: 0
            };
            return _this;
        }

        _createClass(Pager, [{
            key: 'onNext',
            value: function onNext() {
                if (this.state.currentpage < this.state.totalpages) {
                    this.state.currentpage += 1;
                    this.fetchRows();
                }
            }
        }, {
            key: 'onPrevious',
            value: function onPrevious() {
                if (this.state.currentpage - 1 >= 1) {
                    this.state.currentpage = this.state.currentpage - 1;
                    this.fetchRows();
                }
            }
        }, {
            key: 'onPageLengthChange',
            value: function onPageLengthChange(pagelength) {
                if (this.state.pagelength >= this.state.numberofrows && pagelength > this.state.numberofrows) return;
                this.state.currentpage = 1;
                this.state.pagelength = parseInt(pagelength);
                this.fetchRows();
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.fetchRows();
            }
        }, {
            key: 'fetchRows',
            value: function fetchRows() {
                if (this.props.url) {
                    this.makeCall(this.props.url, 'POST', this.getUrlParams(), this.onFetchRows.bind(this));
                }
            }
        }, {
            key: 'fetchRowsWithData',
            value: function fetchRowsWithData(data) {
                data.CurrentPage = this.state.currentpage;
                data.PageLength = this.state.pagelength;
                this.state.data = data;
                this.makeCall(this.props.url, 'POST', data, this.onFetchRows.bind(this));
            }
        }, {
            key: 'onFetchRows',
            value: function onFetchRows(result) {
                this.state.rows = result.Rows;
                this.state.numberofrows = parseInt(result.TotalCount);
                this.state.totalpages = parseInt(result.TotalPages);
                this.setState(this.state);
            }
        }, {
            key: 'getUrlParams',
            value: function getUrlParams() {
                var data = this.state.data ? this.state.data : this.props.data ? this.props.data : {};
                data.CurrentPage = this.state.currentpage;
                data.PageLength = this.state.pagelength;
                return data;
            }
        }]);

        return Pager;
    }(_BaseComponent3.default);

    exports.default = Pager;
});