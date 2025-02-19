/*!
  * Stickyfill – `position: sticky` polyfill
  * v. 2.0.5 | https://github.com/wilddeer/stickyfill
  * MIT License
  */

!function(a, b) {
    "use strict";
    function c(a, b) {
        if (!(a instanceof b))
            throw new TypeError("Cannot call a class as a function")
    }
    function d(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && (a[c] = b[c])
    }
    function e(a) {
        return parseFloat(a) || 0
    }
    function f(a) {
        for (var b = 0; a;)
            b += a.offsetTop, a = a.offsetParent;
        return b
    }
    var g = function() {
            function a(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                }
            }
            return function(b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b
            }
        }(),
        h = !1;
    if (a.getComputedStyle) {
        var i = b.createElement("div");
        ["", "-webkit-", "-moz-", "-ms-"].some(function(a) {
            try {
                i.style.position = a + "sticky"
            } catch (a) {}
            return "" != i.style.position
        }) && (h = !0)
    } else
        h = !0;
    var j = "undefined" != typeof ShadowRoot,
        k = {
            top: null,
            left: null
        },
        l = [],
        m = function() {
            function i(a) {
                if (c(this, i), !(a instanceof HTMLElement))
                    throw new Error("First argument must be HTMLElement");
                if (l.some(function(b) {
                    return b._node === a
                }))
                    throw new Error("Stickyfill is already applied to this node");
                this._node = a, this._stickyMode = null, this._active = !1, l.push(this), this.refresh()
            }
            return g(i, [{
                key: "refresh",
                value: function() {
                    if (!h && !this._removed) {
                        this._active && this._deactivate();
                        var c = this._node,
                            g = getComputedStyle(c),
                            i = {
                                top: g.top,
                                display: g.display,
                                marginTop: g.marginTop,
                                marginBottom: g.marginBottom,
                                marginLeft: g.marginLeft,
                                marginRight: g.marginRight,
                                cssFloat: g.cssFloat
                            };
                        if (!isNaN(parseFloat(i.top)) && "table-cell" != i.display && "none" != i.display) {
                            this._active = !0;
                            var k = c.parentNode,
                                l = j && k instanceof ShadowRoot ? k.host : k,
                                m = c.getBoundingClientRect(),
                                n = l.getBoundingClientRect(),
                                o = getComputedStyle(l);
                            this._parent = {
                                node: l,
                                styles: {
                                    position: l.style.position
                                },
                                offsetHeight: l.offsetHeight
                            }, this._offsetToWindow = {
                                left: m.left,
                                right: b.documentElement.clientWidth - m.right
                            }, this._offsetToParent = {
                                top: m.top - n.top - e(o.borderTopWidth),
                                left: m.left - n.left - e(o.borderLeftWidth),
                                right: -m.right + n.right - e(o.borderRightWidth)
                            }, this._styles = {
                                position: c.style.position,
                                top: c.style.top,
                                bottom: c.style.bottom,
                                left: c.style.left,
                                right: c.style.right,
                                width: c.style.width,
                                marginTop: c.style.marginTop,
                                marginLeft: c.style.marginLeft,
                                marginRight: c.style.marginRight
                            };
                            var p = e(i.top);
                            this._limits = {
                                start: m.top + a.pageYOffset - p,
                                end: n.top + a.pageYOffset + l.offsetHeight - e(o.borderBottomWidth) - c.offsetHeight - p - e(i.marginBottom)
                            };
                            var q = o.position;
                            "absolute" != q && "relative" != q && (l.style.position = "relative"), this._recalcPosition();
                            var r = this._clone = {};
                            r.node = b.createElement("div"), d(r.node.style, {
                                width: m.right - m.left + "px",
                                height: m.bottom - m.top + "px",
                                marginTop: i.marginTop,
                                marginBottom: i.marginBottom,
                                marginLeft: i.marginLeft,
                                marginRight: i.marginRight,
                                cssFloat: i.cssFloat,
                                padding: 0,
                                border: 0,
                                borderSpacing: 0,
                                fontSize: "1em",
                                position: "static"
                            }), k.insertBefore(r.node, c), r.docOffsetTop = f(r.node)
                        }
                    }
                }
            }, {
                key: "_recalcPosition",
                value: function() {
                    if (this._active && !this._removed) {
                        var a = k.top <= this._limits.start ? "start" : k.top >= this._limits.end ? "end" : "middle";
                        if (this._stickyMode != a) {
                            switch (a) {
                            case "start":
                                d(this._node.style, {
                                    position: "absolute",
                                    left: this._offsetToParent.left + "px",
                                    right: this._offsetToParent.right + "px",
                                    top: this._offsetToParent.top + "px",
                                    bottom: "auto",
                                    width: "auto",
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: 0
                                });
                                break;
                            case "middle":
                                d(this._node.style, {
                                    position: "fixed",
                                    left: this._offsetToWindow.left + "px",
                                    right: this._offsetToWindow.right + "px",
                                    top: this._styles.top,
                                    bottom: "auto",
                                    width: "auto",
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginTop: 0
                                });
                                break;
                            case "end":
                                d(this._node.style, {
                                    position: "absolute",
                                    left: this._offsetToParent.left + "px",
                                    right: this._offsetToParent.right + "px",
                                    top: "auto",
                                    bottom: 0,
                                    width: "auto",
                                    marginLeft: 0,
                                    marginRight: 0
                                })
                            }
                            this._stickyMode = a
                        }
                    }
                }
            }, {
                key: "_fastCheck",
                value: function() {
                    this._active && !this._removed && (Math.abs(f(this._clone.node) - this._clone.docOffsetTop) > 1 || Math.abs(this._parent.node.offsetHeight - this._parent.offsetHeight) > 1) && this.refresh()
                }
            }, {
                key: "_deactivate",
                value: function() {
                    var a = this;
                    this._active && !this._removed && (this._clone.node.parentNode.removeChild(this._clone.node), delete this._clone, d(this._node.style, this._styles), delete this._styles, l.some(function(b) {
                        return b !== a && b._parent && b._parent.node === a._parent.node
                    }) || d(this._parent.node.style, this._parent.styles), delete this._parent, this._stickyMode = null, this._active = !1, delete this._offsetToWindow, delete this._offsetToParent, delete this._limits)
                }
            }, {
                key: "remove",
                value: function() {
                    var a = this;
                    this._deactivate(), l.some(function(b, c) {
                        if (b._node === a._node)
                            return l.splice(c, 1), !0
                    }), this._removed = !0
                }
            }]), i
        }(),
        n = {
            stickies: l,
            Sticky: m,
            addOne: function(a) {
                if (!(a instanceof HTMLElement)) {
                    if (!a.length || !a[0])
                        return;
                    a = a[0]
                }
                for (var b = 0; b < l.length; b++)
                    if (l[b]._node === a)
                        return l[b];
                return new m(a)
            },
            add: function(a) {
                if (a instanceof HTMLElement && (a = [a]), a.length) {
                    for (var b = [], c = 0; c < a.length; c++) {
                        (function(c) {
                            var d = a[c];
                            d instanceof HTMLElement ? l.some(function(a) {
                                if (a._node === d)
                                    return b.push(a), !0
                            }) || b.push(new m(d)) : b.push(void 0)
                        })(c)
                    }
                    return b
                }
            },
            refreshAll: function() {
                l.forEach(function(a) {
                    return a.refresh()
                })
            },
            removeOne: function(a) {
                if (!(a instanceof HTMLElement)) {
                    if (!a.length || !a[0])
                        return;
                    a = a[0]
                }
                l.some(function(b) {
                    if (b._node === a)
                        return b.remove(), !0
                })
            },
            remove: function(a) {
                if (a instanceof HTMLElement && (a = [a]), a.length)
                    for (var b = 0; b < a.length; b++)
                        !function(b) {
                            var c = a[b];
                            l.some(function(a) {
                                if (a._node === c)
                                    return a.remove(), !0
                            })
                        }(b)
            },
            removeAll: function() {
                for (; l.length;)
                    l[0].remove()
            }
        };
    h || function() {
        function c() {
            a.pageXOffset != k.left ? (k.top = a.pageYOffset, k.left = a.pageXOffset, n.refreshAll()) : a.pageYOffset != k.top && (k.top = a.pageYOffset, k.left = a.pageXOffset, l.forEach(function(a) {
                return a._recalcPosition()
            }))
        }
        function d() {
            f = setInterval(function() {
                l.forEach(function(a) {
                    return a._fastCheck()
                })
            }, 500)
        }
        function e() {
            clearInterval(f)
        }
        c(), a.addEventListener("scroll", c), a.addEventListener("resize", n.refreshAll), a.addEventListener("orientationchange", n.refreshAll);
        var f = void 0,
            g = void 0,
            h = void 0;
        "hidden" in b ? (g = "hidden", h = "visibilitychange") : "webkitHidden" in b && (g = "webkitHidden", h = "webkitvisibilitychange"), h ? (b[g] || d(), b.addEventListener(h, function() {
            b[g] ? e() : d()
        })) : d()
    }(), "undefined" != typeof module && module.exports ? module.exports = n : a.Stickyfill = n
}(window, document);
