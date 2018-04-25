! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("prop-types"), require("react"), require("react-transition-group")) : "function" == typeof define && define.amd ? define(["prop-types", "react", "react-transition-group"], t) : "object" == typeof exports ? exports.ReactNotifications = t(require("prop-types"), require("react"), require("react-transition-group")) : e.ReactNotifications = t(e.PropTypes, e.React, e.ReactTransitionGroup)
}(this, function(e, t, n) {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.i = function(e) {
            return e
        }, t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 7)
    }([function(t, n) {
        t.exports = e
    }, function(e, n) {
        e.exports = t
    }, function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function i(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            u = n(8),
            a = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                    var t = 16 * Math.random() | 0;
                    return ("x" === e ? t : 3 & t | 8).toString(16)
                })
            },
            l = {
                CHANGE: "change",
                INFO: "info",
                SUCCESS: "success",
                WARNING: "warning",
                ERROR: "error"
            },
			_extends = Object.assign || function (target) {
				for (var i = 1; i < arguments.length; i++) {
				  var source = arguments[i];

				  for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
					  target[key] = source[key];
					}
				  }
				}
				return target;
			},
            f = function(e) {
                function t() {
                    r(this, t);
                    var e = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    return e.listNotify = [], e
                }
                return o(t, e), s(t, [{
                    key: "create",
                    value: function(e) {
                        var t = {
                            id: a(),
                            type: "info",
                            title: null,
                            message: null,
                            timeOut: 5e3
                        };
                        e.priority ? this.listNotify.unshift(_extends(t, e)) : this.listNotify.push(_extends(t, e)), this.emitChange()
                    }
                }, {
                    key: "info",
                    value: function(e, t, n, r, i) {
                        this.create({
                            type: l.INFO,
                            message: e,
                            title: t,
                            timeOut: n,
                            onClick: r,
                            priority: i
                        })
                    }
                }, {
                    key: "success",
                    value: function(e, t, n, r, i) {
                        this.create({
                            type: l.SUCCESS,
                            message: e,
                            title: t,
                            timeOut: n,
                            onClick: r,
                            priority: i
                        })
                    }
                }, {
                    key: "warning",
                    value: function(e, t, n, r, i) {
                        this.create({
                            type: l.WARNING,
                            message: e,
                            title: t,
                            timeOut: n,
                            onClick: r,
                            priority: i
                        })
                    }
                }, {
                    key: "error",
                    value: function(e, t, n, r, i) {
                        this.create({
                            type: l.ERROR,
                            message: e,
                            title: t,
                            timeOut: n,
                            onClick: r,
                            priority: i
                        })
                    }
                }, {
                    key: "remove",
                    value: function(e) {
                        this.listNotify = this.listNotify.filter(function(t) {
                            return e.id !== t.id
                        }), this.emitChange()
                    }
                }, {
                    key: "emitChange",
                    value: function() {
                        this.emit(l.CHANGE, this.listNotify)
                    }
                }, {
                    key: "addChangeListener",
                    value: function(e) {
                        this.addListener(l.CHANGE, e)
                    }
                }, {
                    key: "removeChangeListener",
                    value: function(e) {
                        this.removeListener(l.CHANGE, e)
                    }
                }]), t
            }(u.EventEmitter);
        t.default = new f, e.exports = t.default
    }, function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function s(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            a = n(1),
            l = r(a),
            f = n(0),
            c = r(f),
            p = n(9),
            h = n(4),
            d = r(h),
            v = n(6),
            y = r(v),
            m = function(e) {
                function t() {
                    var e, n, r, s;
                    i(this, t);
                    for (var u = arguments.length, a = Array(u), l = 0; l < u; l++) a[l] = arguments[l];
                    return n = r = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), r.handleRequestHide = function(e) {
                        return function() {
                            var t = r.props.onRequestHide;
                            t && t(e)
                        }
                    }, s = n, o(r, s)
                }
                return s(t, e), u(t, [{
                    key: "render",
                    value: function() {
                        var e = this,
                            t = this.props,
                            n = t.notifications,
                            r = t.enterTimeout,
                            i = t.leaveTimeout,
                            o = (0, d.default)("notification-container", {
                                "notification-container-empty": 0 === n.length
                            });
                        return l.default.createElement("div", {
                            className: o
                        }, l.default.createElement(p.CSSTransitionGroup, {
                            transitionName: "notification",
                            transitionEnterTimeout: r,
                            transitionLeaveTimeout: i
                        }, n.map(function(t) {
                            var n = t.id || (new Date).getTime();
                            return l.default.createElement(y.default, {
                                key: n,
                                type: t.type,
                                title: t.title,
                                message: t.message,
                                timeOut: t.timeOut,
                                onClick: t.onClick,
                                onRequestHide: e.handleRequestHide(t)
                            })
                        })))
                    }
                }]), t
            }(l.default.Component);
        m.propTypes = {
            notifications: c.default.array.isRequired,
            onRequestHide: c.default.func,
            enterTimeout: c.default.number,
            leaveTimeout: c.default.number
        }, m.defaultProps = {
            notifications: [],
            onRequestHide: function() {},
            enterTimeout: 400,
            leaveTimeout: 400
        }, t.default = m, e.exports = t.default
    }, function(e, t, n) {
        var r, i;
        ! function() {
            "use strict";

            function n() {
                for (var e = [], t = 0; t < arguments.length; t++) {
                    var r = arguments[t];
                    if (r) {
                        var i = typeof r;
                        if ("string" === i || "number" === i) e.push(r);
                        else if (Array.isArray(r)) e.push(n.apply(null, r));
                        else if ("object" === i)
                            for (var s in r) o.call(r, s) && r[s] && e.push(s)
                    }
                }
                return e.join(" ")
            }
            var o = {}.hasOwnProperty;
            void 0 !== e && e.exports ? e.exports = n : (r = [], void 0 !== (i = function() {
                return n
            }.apply(t, r)) && (e.exports = i))
        }()
    }, function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function s(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            a = n(1),
            l = r(a),
            f = n(0),
            c = r(f),
            p = n(2),
            h = r(p),
            d = n(3),
            v = r(d),
            y = function(e) {
                function t() {
                    var e, n, r, s;
                    i(this, t);
                    for (var u = arguments.length, a = Array(u), l = 0; l < u; l++) a[l] = arguments[l];
                    return n = r = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), r.state = {
                        notifications: []
                    }, r.componentWillMount = function() {
                        h.default.addChangeListener(r.handleStoreChange)
                    }, r.componentWillUnmount = function() {
                        h.default.removeChangeListener(r.handleStoreChange)
                    }, r.handleStoreChange = function(e) {
                        r.setState({
                            notifications: e
                        })
                    }, r.handleRequestHide = function(e) {
                        h.default.remove(e)
                    }, s = n, o(r, s)
                }
                return s(t, e), u(t, [{
                    key: "render",
                    value: function() {
                        var e = this.state.notifications,
                            t = this.props,
                            n = t.enterTimeout,
                            r = t.leaveTimeout;
                        return l.default.createElement(v.default, {
                            enterTimeout: n,
                            leaveTimeout: r,
                            notifications: e,
                            onRequestHide: this.handleRequestHide
                        })
                    }
                }]), t
            }(l.default.Component);
        y.propTypes = {
            enterTimeout: c.default.number,
            leaveTimeout: c.default.number
        }, y.defaultProps = {
            enterTimeout: 400,
            leaveTimeout: 400
        }, t.default = y, e.exports = t.default
    }, function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function s(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            a = n(1),
            l = r(a),
            f = n(0),
            c = r(f),
            p = n(4),
            h = r(p),
            d = function(e) {
                function t() {
                    var e, n, r, s;
                    i(this, t);
                    for (var u = arguments.length, a = Array(u), l = 0; l < u; l++) a[l] = arguments[l];
                    return n = r = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), r.componentDidMount = function() {
                        var e = r.props.timeOut;
                        0 !== e && (r.timer = setTimeout(r.requestHide, e))
                    }, r.componentWillUnmount = function() {
                        r.timer && clearTimeout(r.timer)
                    }, r.handleClick = function() {
                        var e = r.props.onClick;
                        e && e(), r.requestHide()
                    }, r.requestHide = function() {
                        var e = r.props.onRequestHide;
                        e && e()
                    }, s = n, o(r, s)
                }
                return s(t, e), u(t, [{
                    key: "render",
                    value: function() {
                        var e = this.props,
                            t = e.type,
                            n = e.message,
                            r = this.props.title,
                            i = (0, h.default)(["notification", "notification-" + t]);
                        return r = r ? l.default.createElement("h4", {
                            className: "title"
                        }, r) : null, l.default.createElement("div", {
                            className: i,
                            onClick: this.handleClick
                        }, l.default.createElement("div", {
                            className: "notification-message",
                            role: "alert"
                        }, r, l.default.createElement("div", {
                            className: "message"
                        }, n)))
                    }
                }]), t
            }(l.default.Component);
        d.propTypes = {
            type: c.default.oneOf(["info", "success", "warning", "error"]),
            title: c.default.node,
            message: c.default.node.isRequired,
            timeOut: c.default.number,
            onClick: c.default.func,
            onRequestHide: c.default.func
        }, d.defaultProps = {
            type: "info",
            title: null,
            message: null,
            timeOut: 5e3,
            onClick: function() {},
            onRequestHide: function() {}
        }, t.default = d, e.exports = t.default
    }, function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.NotificationManager = t.NotificationContainer = t.Notifications = void 0;
        var i = n(3),
            o = r(i),
            s = n(5),
            u = r(s),
            a = n(2),
            l = r(a);
        t.Notifications = o.default, t.NotificationContainer = u.default, t.NotificationManager = l.default, t.default = o.default
    }, function(e, t) {
        function n() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function r(e) {
            return "function" == typeof e
        }

        function i(e) {
            return "number" == typeof e
        }

        function o(e) {
            return "object" == typeof e && null !== e
        }

        function s(e) {
            return void 0 === e
        }
        e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e) {
            if (!i(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, n.prototype.emit = function(e) {
            var t, n, i, u, a, l;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                if ((t = arguments[1]) instanceof Error) throw t;
                var f = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                throw f.context = t, f
            }
            if (n = this._events[e], s(n)) return !1;
            if (r(n)) switch (arguments.length) {
                case 1:
                    n.call(this);
                    break;
                case 2:
                    n.call(this, arguments[1]);
                    break;
                case 3:
                    n.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    u = Array.prototype.slice.call(arguments, 1), n.apply(this, u)
            } else if (o(n))
                for (u = Array.prototype.slice.call(arguments, 1), l = n.slice(), i = l.length, a = 0; a < i; a++) l[a].apply(this, u);
            return !0
        }, n.prototype.addListener = function(e, t) {
            var i;
            if (!r(t)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, o(this._events[e]) && !this._events[e].warned && (i = s(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && i > 0 && this._events[e].length > i && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
        }, n.prototype.on = n.prototype.addListener, n.prototype.once = function(e, t) {
            function n() {
                this.removeListener(e, n), i || (i = !0, t.apply(this, arguments))
            }
            if (!r(t)) throw TypeError("listener must be a function");
            var i = !1;
            return n.listener = t, this.on(e, n), this
        }, n.prototype.removeListener = function(e, t) {
            var n, i, s, u;
            if (!r(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (n = this._events[e], s = n.length, i = -1, n === t || r(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
            else if (o(n)) {
                for (u = s; u-- > 0;)
                    if (n[u] === t || n[u].listener && n[u].listener === t) {
                        i = u;
                        break
                    }
                if (i < 0) return this;
                1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(i, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, n.prototype.removeAllListeners = function(e) {
            var t, n;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (n = this._events[e], r(n)) this.removeListener(e, n);
            else if (n)
                for (; n.length;) this.removeListener(e, n[n.length - 1]);
            return delete this._events[e], this
        }, n.prototype.listeners = function(e) {
            return this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, n.prototype.listenerCount = function(e) {
            if (this._events) {
                var t = this._events[e];
                if (r(t)) return 1;
                if (t) return t.length
            }
            return 0
        }, n.listenerCount = function(e, t) {
            return e.listenerCount(t)
        }
    }, function(e, t) {
        e.exports = n
    }])
});