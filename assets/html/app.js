!function(t, r) {
    if ("function" === typeof define && define.amd) define(r); else if ("object" === typeof exports) module.exports = r(); else t.returnExports = r();
}(this, function() {
    var t = Function.prototype.call;
    var r = Array.prototype;
    var e = Object.prototype;
    var n = r.slice;
    var i = Array.prototype.splice;
    var o = Array.prototype.push;
    var a = Array.prototype.unshift;
    var l = function(t) {
        return "[object Function]" === e.toString.call(t);
    };
    var u = function(t) {
        return "[object RegExp]" === e.toString.call(t);
    };
    function p() {}
    if (!Function.prototype.bind) Function.prototype.bind = function H(t) {
        var r = this;
        if (!l(r)) throw new TypeError("Function.prototype.bind called on incompatible " + r);
        var e = n.call(arguments, 1);
        var i = function() {
            if (this instanceof s) {
                var i = r.apply(this, e.concat(n.call(arguments)));
                if (Object(i) === i) return i;
                return this;
            } else return r.apply(t, e.concat(n.call(arguments)));
        };
        var o = Math.max(0, r.length - e.length);
        var a = [];
        for (var u = 0; u < o; u++) a.push("$" + u);
        var s = Function("binder", "return function(" + a.join(",") + "){return binder.apply(this,arguments)}")(i);
        if (r.prototype) {
            p.prototype = r.prototype;
            s.prototype = new p();
            p.prototype = null;
        }
        return s;
    };
    var s = t.bind(e.hasOwnProperty);
    var f = t.bind(e.toString);
    var c;
    var h;
    var y;
    var g;
    var v;
    if (v = s(e, "__defineGetter__")) {
        c = t.bind(e.__defineGetter__);
        h = t.bind(e.__defineSetter__);
        y = t.bind(e.__lookupGetter__);
        g = t.bind(e.__lookupSetter__);
    }
    if (2 !== [ 1, 2 ].splice(0).length) if (function() {
        function t(t) {
            var r = [];
            while (t--) r.unshift(t);
            return r;
        }
        var r = [];
        var e;
        r.splice.bind(r, 0, 0).apply(null, t(20));
        r.splice.bind(r, 0, 0).apply(null, t(26));
        e = r.length;
        r.splice(5, 0, "XXX");
        if (e + 1 === r.length) return true;
    }()) Array.prototype.splice = function(t, r) {
        if (!arguments.length) return []; else return i.apply(this, [ t === void 0 ? 0 : t, r === void 0 ? this.length - t : r ].concat(n.call(arguments, 2)));
    }; else Array.prototype.splice = function(t, r) {
        var e;
        var l = n.call(arguments, 2);
        var u = l.length;
        if (!arguments.length) return [];
        if (t === void 0) t = 0;
        if (r === void 0) r = this.length - t;
        if (u > 0) {
            if (r <= 0) {
                if (t === this.length) {
                    o.apply(this, l);
                    return [];
                }
                if (0 === t) {
                    a.apply(this, l);
                    return [];
                }
            }
            e = n.call(this, t, t + r);
            l.push.apply(l, n.call(this, t + r, this.length));
            l.unshift.apply(l, n.call(this, 0, t));
            l.unshift(0, this.length);
            i.apply(this, l);
            return e;
        }
        return i.call(this, t, r);
    };
    if (1 !== [].unshift(0)) Array.prototype.unshift = function() {
        a.apply(this, arguments);
        return this.length;
    };
    if (!Array.isArray) Array.isArray = function L(t) {
        return "[object Array]" === f(t);
    };
    var d = Object("a");
    var b = "a" !== d[0] || !(0 in d);
    var m = function Y(t) {
        var r = true;
        var e = true;
        if (t) {
            t.call("foo", function(t, e, n) {
                if ("object" !== typeof n) r = false;
            });
            t.call([ 1 ], function() {
                "use strict";
                e = "string" === typeof this;
            }, "x");
        }
        return !!t && r && e;
    };
    if (!Array.prototype.forEach || !m(Array.prototype.forEach)) Array.prototype.forEach = function q(t) {
        var r = B(this), e = b && "[object String]" === f(this) ? this.split("") : r, n = arguments[1], i = -1, o = e.length >>> 0;
        if (!l(t)) throw new TypeError();
        while (++i < o) if (i in e) t.call(n, e[i], i, r);
    };
    if (!Array.prototype.map || !m(Array.prototype.map)) Array.prototype.map = function z(t) {
        var r = B(this), e = b && "[object String]" === f(this) ? this.split("") : r, n = e.length >>> 0, i = Array(n), o = arguments[1];
        if (!l(t)) throw new TypeError(t + " is not a function");
        for (var a = 0; a < n; a++) if (a in e) i[a] = t.call(o, e[a], a, r);
        return i;
    };
    if (!Array.prototype.filter || !m(Array.prototype.filter)) Array.prototype.filter = function K(t) {
        var r = B(this), e = b && "[object String]" === f(this) ? this.split("") : r, n = e.length >>> 0, i = [], o, a = arguments[1];
        if (!l(t)) throw new TypeError(t + " is not a function");
        for (var u = 0; u < n; u++) if (u in e) {
            o = e[u];
            if (t.call(a, o, u, r)) i.push(o);
        }
        return i;
    };
    if (!Array.prototype.every || !m(Array.prototype.every)) Array.prototype.every = function Q(t) {
        var r = B(this), e = b && "[object String]" === f(this) ? this.split("") : r, n = e.length >>> 0, i = arguments[1];
        if (!l(t)) throw new TypeError(t + " is not a function");
        for (var o = 0; o < n; o++) if (o in e && !t.call(i, e[o], o, r)) return false;
        return true;
    };
    if (!Array.prototype.some || !m(Array.prototype.some)) Array.prototype.some = function V(t) {
        var r = B(this), e = b && "[object String]" === f(this) ? this.split("") : r, n = e.length >>> 0, i = arguments[1];
        if (!l(t)) throw new TypeError(t + " is not a function");
        for (var o = 0; o < n; o++) if (o in e && t.call(i, e[o], o, r)) return true;
        return false;
    };
    var w = false;
    if (Array.prototype.reduce) w = "object" === typeof Array.prototype.reduce.call("a", function(t, r, e, n) {
        return n;
    });
    if (!Array.prototype.reduce || !w) Array.prototype.reduce = function W(t) {
        var r = B(this), e = b && "[object String]" === f(this) ? this.split("") : r, n = e.length >>> 0;
        if (!l(t)) throw new TypeError(t + " is not a function");
        if (!n && 1 === arguments.length) throw new TypeError("reduce of empty array with no initial value");
        var i = 0;
        var o;
        if (arguments.length >= 2) o = arguments[1]; else do {
            if (i in e) {
                o = e[i++];
                break;
            }
            if (++i >= n) throw new TypeError("reduce of empty array with no initial value");
        } while (true);
        for (;i < n; i++) if (i in e) o = t.call(void 0, o, e[i], i, r);
        return o;
    };
    if (!Array.prototype.reduceRight) Array.prototype.reduceRight = function tr(t) {
        var r = B(this), e = b && "[object String]" === f(this) ? this.split("") : r, n = e.length >>> 0;
        if (!l(t)) throw new TypeError(t + " is not a function");
        if (!n && 1 === arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
        var i, o = n - 1;
        if (arguments.length >= 2) i = arguments[1]; else do {
            if (o in e) {
                i = e[o--];
                break;
            }
            if (--o < 0) throw new TypeError("reduceRight of empty array with no initial value");
        } while (true);
        if (o < 0) return i;
        do if (o in this) i = t.call(void 0, i, e[o], o, r); while (o--);
        return i;
    };
    if (!Array.prototype.indexOf || [ 0, 1 ].indexOf(1, 2) !== -1) Array.prototype.indexOf = function rr(t) {
        var r = b && "[object String]" === f(this) ? this.split("") : B(this), e = r.length >>> 0;
        if (!e) return -1;
        var n = 0;
        if (arguments.length > 1) n = $(arguments[1]);
        n = n >= 0 ? n : Math.max(0, e + n);
        for (;n < e; n++) if (n in r && r[n] === t) return n;
        return -1;
    };
    if (!Array.prototype.lastIndexOf || [ 0, 1 ].lastIndexOf(0, -3) !== -1) Array.prototype.lastIndexOf = function er(t) {
        var r = b && "[object String]" === f(this) ? this.split("") : B(this), e = r.length >>> 0;
        if (!e) return -1;
        var n = e - 1;
        if (arguments.length > 1) n = Math.min(n, $(arguments[1]));
        n = n >= 0 ? n : e - Math.abs(n);
        for (;n >= 0; n--) if (n in r && t === r[n]) return n;
        return -1;
    };
    if (!Object.keys) {
        var S = !{
            toString: null
        }.propertyIsEnumerable("toString"), x = function() {}.propertyIsEnumerable("prototype"), A = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], j = A.length, E = function nr(t) {
            var r = f(t);
            var e = "[object Arguments]" === r;
            if (!e) e = !Array.isArray(r) && null !== t && "object" === typeof t && "number" === typeof t.length && t.length >= 0 && l(t.callee);
            return e;
        };
        Object.keys = function ir(t) {
            var r = l(t), e = E(t), n = null !== t && "object" === typeof t, i = n && "[object String]" === f(t);
            if (!n && !r && !e) throw new TypeError("Object.keys called on a non-object");
            var o = [];
            var a = x && r;
            if (i || e) for (var u = 0; u < t.length; ++u) o.push(String(u)); else for (var p in t) if (!(a && "prototype" === p) && s(t, p)) o.push(String(p));
            if (S) {
                var c = t.constructor, h = c && c.prototype === t;
                for (var y = 0; y < j; y++) {
                    var g = A[y];
                    if (!(h && "constructor" === g) && s(t, g)) o.push(g);
                }
            }
            return o;
        };
    }
    var N = -621987552e5, O = "-000001";
    if (!Date.prototype.toISOString || new Date(N).toISOString().indexOf(O) === -1) Date.prototype.toISOString = function or() {
        var t, r, e, n, i;
        if (!isFinite(this)) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
        n = this.getUTCFullYear();
        i = this.getUTCMonth();
        n += Math.floor(i / 12);
        i = (i % 12 + 12) % 12;
        t = [ i + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds() ];
        n = (n < 0 ? "-" : n > 9999 ? "+" : "") + ("00000" + Math.abs(n)).slice(0 <= n && n <= 9999 ? -4 : -6);
        r = t.length;
        while (r--) {
            e = t[r];
            if (e < 10) t[r] = "0" + e;
        }
        return n + "-" + t.slice(0, 2).join("-") + "T" + t.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z";
    };
    var T = false;
    try {
        T = Date.prototype.toJSON && null === new Date(0/0).toJSON() && new Date(N).toJSON().indexOf(O) !== -1 && Date.prototype.toJSON.call({
            toISOString: function() {
                return true;
            }
        });
    } catch (I) {}
    if (!T) Date.prototype.toJSON = function ar(t) {
        var r = Object(this), e = P(r), n;
        if ("number" === typeof e && !isFinite(e)) return null;
        n = r.toISOString;
        if ("function" !== typeof n) throw new TypeError("toISOString property is not callable");
        return n.call(r);
    };
    var D = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z");
    var _ = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z"));
    var M = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
    if (!Date.parse || M || _ || !D) Date = function(t) {
        function r(e, n, i, o, a, l, u) {
            var p = arguments.length;
            if (this instanceof t) {
                var s = 1 === p && String(e) === e ? new t(r.parse(e)) : p >= 7 ? new t(e, n, i, o, a, l, u) : p >= 6 ? new t(e, n, i, o, a, l) : p >= 5 ? new t(e, n, i, o, a) : p >= 4 ? new t(e, n, i, o) : p >= 3 ? new t(e, n, i) : p >= 2 ? new t(e, n) : p >= 1 ? new t(e) : new t();
                s.constructor = r;
                return s;
            }
            return t.apply(this, arguments);
        }
        var e = new RegExp("^" + "(\\d{4}|[+-]\\d{6})" + "(?:-(\\d{2})" + "(?:-(\\d{2})" + "(?:" + "T(\\d{2})" + ":(\\d{2})" + "(?:" + ":(\\d{2})" + "(?:(\\.\\d{1,}))?" + ")?" + "(" + "Z|" + "(?:" + "([-+])" + "(\\d{2})" + ":(\\d{2})" + ")" + ")?)?)?)?" + "$");
        var n = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365 ];
        function i(t, r) {
            var e = r > 1 ? 1 : 0;
            return n[r] + Math.floor((t - 1969 + e) / 4) - Math.floor((t - 1901 + e) / 100) + Math.floor((t - 1601 + e) / 400) + 365 * (t - 1970);
        }
        function o(r) {
            return Number(new t(1970, 0, 1, 0, 0, 0, r));
        }
        for (var a in t) r[a] = t[a];
        r.now = t.now;
        r.UTC = t.UTC;
        r.prototype = t.prototype;
        r.prototype.constructor = r;
        r.parse = function l(r) {
            var n = e.exec(r);
            if (n) {
                var a = Number(n[1]), l = Number(n[2] || 1) - 1, u = Number(n[3] || 1) - 1, p = Number(n[4] || 0), s = Number(n[5] || 0), f = Number(n[6] || 0), c = Math.floor(1e3 * Number(n[7] || 0)), h = Boolean(n[4] && !n[8]), y = "-" === n[9] ? 1 : -1, g = Number(n[10] || 0), v = Number(n[11] || 0), d;
                if (p < (s > 0 || f > 0 || c > 0 ? 24 : 25) && s < 60 && f < 60 && c < 1e3 && l > -1 && l < 12 && g < 24 && v < 60 && u > -1 && u < i(a, l + 1) - i(a, l)) {
                    d = 60 * (24 * (i(a, l) + u) + p + g * y);
                    d = 1e3 * (60 * (d + s + v * y) + f) + c;
                    if (h) d = o(d);
                    if (-864e13 <= d && d <= 864e13) return d;
                }
                return 0/0;
            }
            return t.parse.apply(this, arguments);
        };
        return r;
    }(Date);
    if (!Date.now) Date.now = function lr() {
        return new Date().getTime();
    };
    if (!Number.prototype.toFixed || "0.000" !== 8e-5.toFixed(3) || "0" === .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)) !function() {
        var t, r, e, n;
        t = 1e7;
        r = 6;
        e = [ 0, 0, 0, 0, 0, 0 ];
        function i(n, i) {
            var o = -1;
            while (++o < r) {
                i += n * e[o];
                e[o] = i % t;
                i = Math.floor(i / t);
            }
        }
        function o(n) {
            var i = r, o = 0;
            while (--i >= 0) {
                o += e[i];
                e[i] = Math.floor(o / n);
                o = o % n * t;
            }
        }
        function a() {
            var t = r;
            var n = "";
            while (--t >= 0) if ("" !== n || 0 === t || 0 !== e[t]) {
                var i = String(e[t]);
                if ("" === n) n = i; else n += "0000000".slice(0, 7 - i.length) + i;
            }
            return n;
        }
        function l(t, r, e) {
            return 0 === r ? e : r % 2 === 1 ? l(t, r - 1, e * t) : l(t * t, r / 2, e);
        }
        function u(t) {
            var r = 0;
            while (t >= 4096) {
                r += 12;
                t /= 4096;
            }
            while (t >= 2) {
                r += 1;
                t /= 2;
            }
            return r;
        }
        Number.prototype.toFixed = function p(t) {
            var r, e, n, p, s, f, c, h;
            r = Number(t);
            r = r !== r ? 0 : Math.floor(r);
            if (r < 0 || r > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
            e = Number(this);
            if (e !== e) return "NaN";
            if (e <= -1e21 || e >= 1e21) return String(e);
            n = "";
            if (e < 0) {
                n = "-";
                e = -e;
            }
            p = "0";
            if (e > 1e-21) {
                s = u(e * l(2, 69, 1)) - 69;
                f = s < 0 ? e * l(2, -s, 1) : e / l(2, s, 1);
                f *= 4503599627370496;
                s = 52 - s;
                if (s > 0) {
                    i(0, f);
                    c = r;
                    while (c >= 7) {
                        i(1e7, 0);
                        c -= 7;
                    }
                    i(l(10, c, 1), 0);
                    c = s - 1;
                    while (c >= 23) {
                        o(1 << 23);
                        c -= 23;
                    }
                    o(1 << c);
                    i(1, 1);
                    o(2);
                    p = a();
                } else {
                    i(0, f);
                    i(1 << -s, 0);
                    p = a() + "0.00000000000000000000".slice(2, 2 + r);
                }
            }
            if (r > 0) {
                h = p.length;
                if (h <= r) p = n + "0.0000000000000000000".slice(0, r - h + 2) + p; else p = n + p.slice(0, h - r) + "." + p.slice(h - r);
            } else p = n + p;
            return p;
        };
    }();
    var F = String.prototype.split;
    if (2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || "".split(/.?/).length || ".".split(/()()/).length > 1) !function() {
        var t = /()??/.exec("")[1] === void 0;
        String.prototype.split = function(r, e) {
            var n = this;
            if (r === void 0 && 0 === e) return [];
            if ("[object RegExp]" !== f(r)) return F.apply(this, arguments);
            var i = [], o = (r.ignoreCase ? "i" : "") + (r.multiline ? "m" : "") + (r.extended ? "x" : "") + (r.sticky ? "y" : ""), a = 0, l, u, p, s;
            r = new RegExp(r.source, o + "g");
            n += "";
            if (!t) l = new RegExp("^" + r.source + "$(?!\\s)", o);
            e = e === void 0 ? -1 >>> 0 : e >>> 0;
            while (u = r.exec(n)) {
                p = u.index + u[0].length;
                if (p > a) {
                    i.push(n.slice(a, u.index));
                    if (!t && u.length > 1) u[0].replace(l, function() {
                        for (var t = 1; t < arguments.length - 2; t++) if (arguments[t] === void 0) u[t] = void 0;
                    });
                    if (u.length > 1 && u.index < n.length) Array.prototype.push.apply(i, u.slice(1));
                    s = u[0].length;
                    a = p;
                    if (i.length >= e) break;
                }
                if (r.lastIndex === u.index) r.lastIndex++;
            }
            if (a === n.length) {
                if (s || !r.test("")) i.push("");
            } else i.push(n.slice(a));
            return i.length > e ? i.slice(0, e) : i;
        };
    }(); else if ("0".split(void 0, 0).length) String.prototype.split = function ur(t, r) {
        if (t === void 0 && 0 === r) return [];
        return F.apply(this, arguments);
    };
    var R = String.prototype.replace;
    var C = function() {
        var t = [];
        "x".replace(/x(.)?/g, function(r, e) {
            t.push(e);
        });
        return 1 === t.length && "undefined" === typeof t[0];
    }();
    if (!C) String.prototype.replace = function pr(t, r) {
        var e = l(r);
        var n = u(t) && /\)[*?]/.test(t.source);
        if (!e || !n) return R.apply(this, arguments); else {
            var i = function(e) {
                var n = arguments.length;
                var i = t.lastIndex;
                t.lastIndex = 0;
                var o = t.exec(e);
                t.lastIndex = i;
                o.push(arguments[n - 2], arguments[n - 1]);
                return r.apply(this, o);
            };
            return R.call(this, t, i);
        }
    };
    if ("".substr && "b" !== "0b".substr(-1)) {
        var k = String.prototype.substr;
        String.prototype.substr = function sr(t, r) {
            return k.call(this, t < 0 ? (t = this.length + t) < 0 ? 0 : t : t, r);
        };
    }
    var U = "	\n\f\r   ᠎    " + "         　\u2028" + "\u2029﻿";
    var Z = "​";
    if (!String.prototype.trim || U.trim() || !Z.trim()) {
        U = "[" + U + "]";
        var J = new RegExp("^" + U + U + "*"), X = new RegExp(U + U + "*$");
        String.prototype.trim = function fr() {
            if (this === void 0 || null === this) throw new TypeError("can't convert " + this + " to object");
            return String(this).replace(J, "").replace(X, "");
        };
    }
    if (8 !== parseInt(U + "08") || 22 !== parseInt(U + "0x16")) parseInt = function(t) {
        var r = /^0[xX]/;
        return function e(n, i) {
            n = String(n).trim();
            if (!Number(i)) i = r.test(n) ? 16 : 10;
            return t(n, i);
        };
    }(parseInt);
    function $(t) {
        t = +t;
        if (t !== t) t = 0; else if (0 !== t && t !== 1 / 0 && t !== -(1 / 0)) t = (t > 0 || -1) * Math.floor(Math.abs(t));
        return t;
    }
    function G(t) {
        var r = typeof t;
        return null === t || "undefined" === r || "boolean" === r || "number" === r || "string" === r;
    }
    function P(t) {
        var r, e, n;
        if (G(t)) return t;
        e = t.valueOf;
        if (l(e)) {
            r = e.call(t);
            if (G(r)) return r;
        }
        n = t.toString;
        if (l(n)) {
            r = n.call(t);
            if (G(r)) return r;
        }
        throw new TypeError();
    }
    var B = function(t) {
        if (null == t) throw new TypeError("can't convert " + t + " to object");
        return Object(t);
    };
});

!function(P, W, t) {
    "use strict";
    function O(b) {
        return function() {
            var a = arguments[0], c, a = "[" + (b ? b + ":" : "") + a + "] http://errors.angularjs.org/1.3.0-build.2969+sha.92a10d8/" + (b ? b + "/" : "") + a;
            for (c = 1; c < arguments.length; c++) a = a + (1 == c ? "?" : "&") + "p" + (c - 1) + "=" + encodeURIComponent("function" == typeof arguments[c] ? arguments[c].toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof arguments[c] ? "undefined" : "string" != typeof arguments[c] ? JSON.stringify(arguments[c]) : arguments[c]);
            return Error(a);
        };
    }
    function bb(b) {
        if (null == b || La(b)) return !1;
        var a = b.length;
        return 1 === b.nodeType && a ? !0 : G(b) || M(b) || 0 === a || "number" === typeof a && 0 < a && a - 1 in b;
    }
    function q(b, a, c) {
        var d, e;
        if (b) if (A(b)) for (d in b) "prototype" == d || "length" == d || "name" == d || b.hasOwnProperty && !b.hasOwnProperty(d) || a.call(c, b[d], d); else if (M(b) || bb(b)) for (d = 0, 
        e = b.length; d < e; d++) a.call(c, b[d], d); else if (b.forEach && b.forEach !== q) b.forEach(a, c); else for (d in b) b.hasOwnProperty(d) && a.call(c, b[d], d);
        return b;
    }
    function $b(b) {
        var a = [], c;
        for (c in b) b.hasOwnProperty(c) && a.push(c);
        return a.sort();
    }
    function hd(b, a, c) {
        for (var d = $b(b), e = 0; e < d.length; e++) a.call(c, b[d[e]], d[e]);
        return d;
    }
    function ac(b) {
        return function(a, c) {
            b(c, a);
        };
    }
    function id() {
        return ++cb;
    }
    function bc(b, a) {
        a ? b.$$hashKey = a : delete b.$$hashKey;
    }
    function E(b) {
        var a = b.$$hashKey;
        q(arguments, function(a) {
            a !== b && q(a, function(a, c) {
                b[c] = a;
            });
        });
        bc(b, a);
        return b;
    }
    function U(b) {
        return parseInt(b, 10);
    }
    function cc(b, a) {
        return E(new (E(function() {}, {
            prototype: b
        }))(), a);
    }
    function B() {}
    function Ba(b) {
        return b;
    }
    function ba(b) {
        return function() {
            return b;
        };
    }
    function F(b) {
        return "undefined" === typeof b;
    }
    function v(b) {
        return "undefined" !== typeof b;
    }
    function Q(b) {
        return null != b && "object" === typeof b;
    }
    function G(b) {
        return "string" === typeof b;
    }
    function Ca(b) {
        return "number" === typeof b;
    }
    function da(b) {
        return "[object Date]" === ya.call(b);
    }
    function A(b) {
        return "function" === typeof b;
    }
    function db(b) {
        return "[object RegExp]" === ya.call(b);
    }
    function La(b) {
        return b && b.window === b;
    }
    function jd(b) {
        return !(!b || !(b.nodeName || b.prop && b.attr && b.find));
    }
    function kd(b) {
        var a = {};
        b = b.split(",");
        var c;
        for (c = 0; c < b.length; c++) a[b[c]] = !0;
        return a;
    }
    function ld(b, a, c) {
        var d = [];
        q(b, function(b, f, h) {
            d.push(a.call(c, b, f, h));
        });
        return d;
    }
    function Ma(b, a) {
        if (b.indexOf) return b.indexOf(a);
        for (var c = 0; c < b.length; c++) if (a === b[c]) return c;
        return -1;
    }
    function Da(b, a) {
        var c = Ma(b, a);
        0 <= c && b.splice(c, 1);
        return a;
    }
    function Ea(b, a, c, d) {
        if (La(b) || b && b.$evalAsync && b.$watch) throw Na("cpws");
        if (a) {
            if (b === a) throw Na("cpi");
            c = c || [];
            d = d || [];
            if (Q(b)) {
                var e = Ma(c, b);
                if (-1 !== e) return d[e];
                c.push(b);
                d.push(a);
            }
            if (M(b)) for (var f = a.length = 0; f < b.length; f++) e = Ea(b[f], null, c, d), 
            Q(b[f]) && (c.push(b[f]), d.push(e)), a.push(e); else {
                var h = a.$$hashKey;
                q(a, function(b, c) {
                    delete a[c];
                });
                for (f in b) b.hasOwnProperty(f) && (e = Ea(b[f], null, c, d), Q(b[f]) && (c.push(b[f]), 
                d.push(e)), a[f] = e);
                bc(a, h);
            }
        } else if (a = b) M(b) ? a = Ea(b, [], c, d) : da(b) ? a = new Date(b.getTime()) : db(b) ? a = RegExp(b.source) : Q(b) && (e = Object.create(Object.getPrototypeOf(b)), 
        a = Ea(b, e, c, d));
        return a;
    }
    function ja(b, a) {
        var c = 0;
        if (M(b)) for (a = a || []; c < b.length; c++) a[c] = b[c]; else if (Q(b)) {
            a = a || {};
            for (var d = Object.keys(b), e = d.length; c < e; c++) {
                var f = d[c];
                if ("$" !== f.charAt(0) || "$" !== f.charAt(1)) a[f] = b[f];
            }
        }
        return a || b;
    }
    function ra(b, a) {
        if (b === a) return !0;
        if (null === b || null === a) return !1;
        if (b !== b && a !== a) return !0;
        var c = typeof b, d;
        if (c == typeof a && "object" == c) if (M(b)) {
            if (!M(a)) return !1;
            if ((c = b.length) == a.length) {
                for (d = 0; d < c; d++) if (!ra(b[d], a[d])) return !1;
                return !0;
            }
        } else {
            if (da(b)) return da(a) && b.getTime() == a.getTime();
            if (db(b) && db(a)) return b.toString() == a.toString();
            if (b && b.$evalAsync && b.$watch || a && a.$evalAsync && a.$watch || La(b) || La(a) || M(a)) return !1;
            c = {};
            for (d in b) if ("$" !== d.charAt(0) && !A(b[d])) {
                if (!ra(b[d], a[d])) return !1;
                c[d] = !0;
            }
            for (d in a) if (!c.hasOwnProperty(d) && "$" !== d.charAt(0) && a[d] !== t && !A(a[d])) return !1;
            return !0;
        }
        return !1;
    }
    function Cb(b, a) {
        var c = 2 < arguments.length ? ka.call(arguments, 2) : [];
        return !A(a) || a instanceof RegExp ? a : c.length ? function() {
            return arguments.length ? a.apply(b, c.concat(ka.call(arguments, 0))) : a.apply(b, c);
        } : function() {
            return arguments.length ? a.apply(b, arguments) : a.call(b);
        };
    }
    function md(b, a) {
        var c = a;
        "string" === typeof b && "$" === b.charAt(0) && "$" === b.charAt(1) ? c = t : La(a) ? c = "$WINDOW" : a && W === a ? c = "$DOCUMENT" : a && a.$evalAsync && a.$watch && (c = "$SCOPE");
        return c;
    }
    function sa(b, a) {
        return "undefined" === typeof b ? t : JSON.stringify(b, md, a ? "  " : null);
    }
    function dc(b) {
        return G(b) ? JSON.parse(b) : b;
    }
    function ga(b) {
        b = z(b).clone();
        try {
            b.empty();
        } catch (a) {}
        var c = z("<div>").append(b).html();
        try {
            return 3 === b[0].nodeType ? J(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + J(b);
            });
        } catch (d) {
            return J(c);
        }
    }
    function ec(b) {
        try {
            return decodeURIComponent(b);
        } catch (a) {}
    }
    function fc(b) {
        var a = {}, c, d;
        q((b || "").split("&"), function(b) {
            b && (c = b.replace(/\+/g, "%20").split("="), d = ec(c[0]), v(d) && (b = v(c[1]) ? ec(c[1]) : !0, 
            Db.call(a, d) ? M(a[d]) ? a[d].push(b) : a[d] = [ a[d], b ] : a[d] = b));
        });
        return a;
    }
    function Eb(b) {
        var a = [];
        q(b, function(b, d) {
            M(b) ? q(b, function(b) {
                a.push(za(d, !0) + (!0 === b ? "" : "=" + za(b, !0)));
            }) : a.push(za(d, !0) + (!0 === b ? "" : "=" + za(b, !0)));
        });
        return a.length ? a.join("&") : "";
    }
    function eb(b) {
        return za(b, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function za(b, a) {
        return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, a ? "%20" : "+");
    }
    function nd(b, a) {
        var c, d, e = fb.length;
        b = z(b);
        for (d = 0; d < e; ++d) if (c = fb[d] + a, G(c = b.attr(c))) return c;
        return null;
    }
    function od(b, a) {
        var c, d, e = {};
        q(fb, function(a) {
            a += "app";
            !c && b.hasAttribute && b.hasAttribute(a) && (c = b, d = b.getAttribute(a));
        });
        q(fb, function(a) {
            a += "app";
            var e;
            !c && (e = b.querySelector("[" + a.replace(":", "\\:") + "]")) && (c = e, d = e.getAttribute(a));
        });
        c && (e.strictDi = null !== nd(c, "strict-di"), a(c, d ? [ d ] : [], e));
    }
    function gc(b, a, c) {
        Q(c) || (c = {});
        c = E({
            strictDi: !1
        }, c);
        var d = function() {
            b = z(b);
            if (b.injector()) {
                var d = b[0] === W ? "document" : ga(b);
                throw Na("btstrpd", d);
            }
            a = a || [];
            a.unshift([ "$provide", function(a) {
                a.value("$rootElement", b);
            } ]);
            a.unshift("ng");
            d = Fb(a, c.strictDi);
            d.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function(a, b, c, d) {
                a.$apply(function() {
                    b.data("$injector", d);
                    c(b)(a);
                });
            } ]);
            return d;
        }, e = /^NG_DEFER_BOOTSTRAP!/;
        if (P && !e.test(P.name)) return d();
        P.name = P.name.replace(e, "");
        Oa.resumeBootstrap = function(b) {
            q(b, function(b) {
                a.push(b);
            });
            d();
        };
    }
    function gb(b, a) {
        a = a || "_";
        return b.replace(pd, function(b, d) {
            return (d ? a : "") + b.toLowerCase();
        });
    }
    function qd() {
        var b;
        (ta = P.jQuery) && ta.fn.on ? (z = ta, E(ta.fn, {
            scope: Fa.scope,
            isolateScope: Fa.isolateScope,
            controller: Fa.controller,
            injector: Fa.injector,
            inheritedData: Fa.inheritedData
        }), b = ta.cleanData, b = b.$$original || b, ta.cleanData = function(a) {
            for (var c = 0, d; null != (d = a[c]); c++) ta(d).triggerHandler("$destroy");
            b(a);
        }, ta.cleanData.$$original = b) : z = V;
        Oa.element = z;
    }
    function Gb(b, a, c) {
        if (!b) throw Na("areq", a || "?", c || "required");
        return b;
    }
    function Pa(b, a, c) {
        c && M(b) && (b = b[b.length - 1]);
        Gb(A(b), a, "not a function, got " + (b && "object" === typeof b ? b.constructor.name || "Object" : typeof b));
        return b;
    }
    function Aa(b, a) {
        if ("hasOwnProperty" === b) throw Na("badname", a);
    }
    function hc(b, a, c) {
        if (!a) return b;
        a = a.split(".");
        for (var d, e = b, f = a.length, h = 0; h < f; h++) d = a[h], b && (b = (e = b)[d]);
        return !c && A(b) ? Cb(e, b) : b;
    }
    function hb(b) {
        var a = b[0];
        b = b[b.length - 1];
        if (a === b) return z(a);
        var c = [ a ];
        do {
            a = a.nextSibling;
            if (!a) break;
            c.push(a);
        } while (a !== b);
        return z(c);
    }
    function rd(b) {
        var a = O("$injector"), c = O("ng");
        b = b.angular || (b.angular = {});
        b.$$minErr = b.$$minErr || O;
        return b.module || (b.module = function() {
            var b = {};
            return function(e, f, h) {
                if ("hasOwnProperty" === e) throw c("badname", "module");
                f && b.hasOwnProperty(e) && (b[e] = null);
                return b[e] || (b[e] = function() {
                    function b(a, d, e, f) {
                        f || (f = c);
                        return function() {
                            f[e || "push"]([ a, d, arguments ]);
                            return k;
                        };
                    }
                    if (!f) throw a("nomod", e);
                    var c = [], d = [], m = [], p = b("$injector", "invoke", "push", d), k = {
                        _invokeQueue: c,
                        _configBlocks: d,
                        _runBlocks: m,
                        requires: f,
                        name: e,
                        provider: b("$provide", "provider"),
                        factory: b("$provide", "factory"),
                        service: b("$provide", "service"),
                        value: b("$provide", "value"),
                        constant: b("$provide", "constant", "unshift"),
                        animation: b("$animateProvider", "register"),
                        filter: b("$filterProvider", "register"),
                        controller: b("$controllerProvider", "register"),
                        directive: b("$compileProvider", "directive"),
                        config: p,
                        run: function(a) {
                            m.push(a);
                            return this;
                        }
                    };
                    h && p(h);
                    return k;
                }());
            };
        }());
    }
    function sd(b) {
        E(b, {
            bootstrap: gc,
            copy: Ea,
            extend: E,
            equals: ra,
            element: z,
            forEach: q,
            injector: Fb,
            noop: B,
            bind: Cb,
            toJson: sa,
            fromJson: dc,
            identity: Ba,
            isUndefined: F,
            isDefined: v,
            isString: G,
            isFunction: A,
            isObject: Q,
            isNumber: Ca,
            isElement: jd,
            isArray: M,
            version: td,
            isDate: da,
            lowercase: J,
            uppercase: ib,
            callbacks: {
                counter: 0
            },
            $$minErr: O,
            $$csp: Qa
        });
        Ra = rd(P);
        try {
            Ra("ngLocale");
        } catch (a) {
            Ra("ngLocale", []).provider("$locale", ud);
        }
        Ra("ng", [ "ngLocale" ], [ "$provide", function(a) {
            a.provider({
                $$sanitizeUri: vd
            });
            a.provider("$compile", ic).directive({
                a: wd,
                input: jc,
                textarea: jc,
                form: xd,
                script: yd,
                select: zd,
                style: Ad,
                option: Bd,
                ngBind: Cd,
                ngBindHtml: Dd,
                ngBindTemplate: Ed,
                ngClass: Fd,
                ngClassEven: Gd,
                ngClassOdd: Hd,
                ngCloak: Id,
                ngController: Jd,
                ngForm: Kd,
                ngHide: Ld,
                ngIf: Md,
                ngInclude: Nd,
                ngInit: Od,
                ngNonBindable: Pd,
                ngPluralize: Qd,
                ngRepeat: Rd,
                ngShow: Sd,
                ngStyle: Td,
                ngSwitch: Ud,
                ngSwitchWhen: Vd,
                ngSwitchDefault: Wd,
                ngOptions: Xd,
                ngTransclude: Yd,
                ngModel: Zd,
                ngList: $d,
                ngChange: ae,
                pattern: kc,
                ngPattern: kc,
                required: lc,
                ngRequired: lc,
                minlength: mc,
                ngMinlength: mc,
                maxlength: nc,
                ngMaxlength: nc,
                ngValue: be,
                ngModelOptions: ce
            }).directive({
                ngInclude: de
            }).directive(jb).directive(oc);
            a.provider({
                $anchorScroll: ee,
                $animate: fe,
                $browser: ge,
                $cacheFactory: he,
                $controller: ie,
                $document: je,
                $exceptionHandler: ke,
                $filter: pc,
                $interpolate: le,
                $interval: me,
                $http: ne,
                $httpBackend: oe,
                $location: pe,
                $log: qe,
                $parse: re,
                $rootScope: se,
                $q: te,
                $$q: ue,
                $sce: ve,
                $sceDelegate: we,
                $sniffer: xe,
                $templateCache: ye,
                $timeout: ze,
                $window: Ae,
                $$rAF: Be,
                $$asyncCallback: Ce
            });
        } ]);
    }
    function Sa(b) {
        return b.replace(De, function(a, b, d, e) {
            return e ? d.toUpperCase() : d;
        }).replace(Ee, "Moz$1");
    }
    function Fe(b, a) {
        var c, d, e = a.createDocumentFragment(), f = [];
        if (Hb.test(b)) {
            c = c || e.appendChild(a.createElement("div"));
            d = (Ge.exec(b) || [ "", "" ])[1].toLowerCase();
            d = ea[d] || ea._default;
            c.innerHTML = d[1] + b.replace(He, "<$1></$2>") + d[2];
            for (d = d[0]; d--; ) c = c.lastChild;
            f = f.concat(ka.call(c.childNodes, void 0));
            c = e.firstChild;
            c.textContent = "";
        } else f.push(a.createTextNode(b));
        e.textContent = "";
        e.innerHTML = "";
        q(f, function(a) {
            e.appendChild(a);
        });
        return e;
    }
    function V(b) {
        if (b instanceof V) return b;
        G(b) && (b = Z(b));
        if (!(this instanceof V)) {
            if (G(b) && "<" != b.charAt(0)) throw Ib("nosel");
            return new V(b);
        }
        if (G(b)) {
            var a;
            a = W;
            var c;
            b = (c = Ie.exec(b)) ? [ a.createElement(c[1]) ] : (c = Fe(b, a)) ? c.childNodes : [];
        }
        qc(this, b);
    }
    function Jb(b) {
        return b.cloneNode(!0);
    }
    function kb(b, a) {
        a || lb(b);
        if (b.childNodes && b.childNodes.length) for (var c = b.getElementsByTagName ? b.getElementsByTagName("*") : b.querySelectorAll ? b.querySelectorAll("*") : [], d = 0, e = c.length; d < e; d++) lb(c[d]);
    }
    function rc(b, a, c, d) {
        if (v(d)) throw Ib("offargs");
        var e = la(b, "events");
        la(b, "handle") && (F(a) ? q(e, function(a, c) {
            Ta(b, c, a);
            delete e[c];
        }) : q(a.split(" "), function(a) {
            F(c) ? (Ta(b, a, e[a]), delete e[a]) : Da(e[a] || [], c);
        }));
    }
    function lb(b, a) {
        var c = b.ng339, d = Ua[c];
        d && (a ? delete Ua[c].data[a] : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), 
        rc(b)), delete Ua[c], b.ng339 = t));
    }
    function la(b, a, c) {
        var d = b.ng339, d = Ua[d || -1];
        if (v(c)) d || (b.ng339 = d = ++Je, d = Ua[d] = {}), d[a] = c; else return d && d[a];
    }
    function Kb(b, a, c) {
        if (!b.nodeType || 1 === b.nodeType || 9 === b.nodeType) {
            var d = la(b, "data"), e = v(c), f = !e && v(a), h = f && !Q(a);
            d || h || la(b, "data", d = {});
            if (e) d[a] = c; else if (f) {
                if (h) return d && d[a];
                E(d, a);
            } else return d;
        }
    }
    function Lb(b, a) {
        return b.getAttribute ? -1 < (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ") : !1;
    }
    function mb(b, a) {
        a && b.setAttribute && q(a.split(" "), function(a) {
            b.setAttribute("class", Z((" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Z(a) + " ", " ")));
        });
    }
    function nb(b, a) {
        if (a && b.setAttribute) {
            var c = (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            q(a.split(" "), function(a) {
                a = Z(a);
                -1 === c.indexOf(" " + a + " ") && (c += a + " ");
            });
            b.setAttribute("class", Z(c));
        }
    }
    function qc(b, a) {
        if (a) if (a.nodeType) b[b.length++] = a; else {
            var c = a.length;
            "number" === typeof c && a.window !== a ? c && (a.item && (a = ka.call(a)), sc.apply(b, a)) : b[b.length++] = a;
        }
    }
    function tc(b, a) {
        return ob(b, "$" + (a || "ngController") + "Controller");
    }
    function ob(b, a, c) {
        9 == b.nodeType && (b = b.documentElement);
        for (a = M(a) ? a : [ a ]; b; ) {
            for (var d = 0, e = a.length; d < e; d++) if ((c = z.data(b, a[d])) !== t) return c;
            b = b.parentNode || 11 === b.nodeType && b.host;
        }
    }
    function uc(b) {
        for (kb(b, !0); b.firstChild; ) b.removeChild(b.firstChild);
    }
    function vc(b, a) {
        var c = pb[a.toLowerCase()];
        return c && wc[ma(b)] && c;
    }
    function Ke(b, a) {
        var c = b.nodeName;
        return ("INPUT" === c || "TEXTAREA" === c) && xc[a];
    }
    function Le(b, a) {
        var c = function(c, e) {
            c.preventDefault || (c.preventDefault = function() {
                c.returnValue = !1;
            });
            c.stopPropagation || (c.stopPropagation = function() {
                c.cancelBubble = !0;
            });
            c.target || (c.target = c.srcElement || W);
            if (F(c.defaultPrevented)) {
                var f = c.preventDefault;
                c.preventDefault = function() {
                    c.defaultPrevented = !0;
                    f.call(c);
                };
                c.defaultPrevented = !1;
            }
            c.isDefaultPrevented = function() {
                return c.defaultPrevented || !1 === c.returnValue;
            };
            var h = ja(a[e || c.type] || []);
            q(h, function(a) {
                a.call(b, c);
            });
            8 >= T ? (c.preventDefault = null, c.stopPropagation = null, c.isDefaultPrevented = null) : (delete c.preventDefault, 
            delete c.stopPropagation, delete c.isDefaultPrevented);
        };
        c.elem = b;
        return c;
    }
    function Ga(b, a) {
        var c = typeof b, d;
        "function" == c || "object" == c && null !== b ? "function" == typeof (d = b.$$hashKey) ? d = b.$$hashKey() : d === t && (d = b.$$hashKey = (a || id)()) : d = b;
        return c + ":" + d;
    }
    function Va(b, a) {
        if (a) {
            var c = 0;
            this.nextUid = function() {
                return ++c;
            };
        }
        q(b, this.put, this);
    }
    function Me(b) {
        return (b = b.toString().replace(yc, "").match(zc)) ? "function(" + (b[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
    }
    function Mb(b, a, c) {
        var d;
        if ("function" === typeof b) {
            if (!(d = b.$inject)) {
                d = [];
                if (b.length) {
                    if (a) throw G(c) && c || (c = b.name || Me(b)), Ha("strictdi", c);
                    a = b.toString().replace(yc, "");
                    a = a.match(zc);
                    q(a[1].split(Ne), function(a) {
                        a.replace(Oe, function(a, b, c) {
                            d.push(c);
                        });
                    });
                }
                b.$inject = d;
            }
        } else M(b) ? (a = b.length - 1, Pa(b[a], "fn"), d = b.slice(0, a)) : Pa(b, "fn", !0);
        return d;
    }
    function Fb(b, a) {
        function c(a) {
            return function(b, c) {
                if (Q(b)) q(b, ac(a)); else return a(b, c);
            };
        }
        function d(a, b) {
            Aa(a, "service");
            if (A(b) || M(b)) b = k.instantiate(b);
            if (!b.$get) throw Ha("pget", a);
            return p[a + n] = b;
        }
        function e(a, b) {
            return d(a, {
                $get: b
            });
        }
        function f(a) {
            var b = [], c;
            q(a, function(a) {
                function d(a) {
                    var b, c;
                    b = 0;
                    for (c = a.length; b < c; b++) {
                        var e = a[b], f = k.get(e[0]);
                        f[e[1]].apply(f, e[2]);
                    }
                }
                if (!m.get(a)) {
                    m.put(a, !0);
                    try {
                        G(a) ? (c = Ra(a), b = b.concat(f(c.requires)).concat(c._runBlocks), d(c._invokeQueue), 
                        d(c._configBlocks)) : A(a) ? b.push(k.invoke(a)) : M(a) ? b.push(k.invoke(a)) : Pa(a, "module");
                    } catch (e) {
                        throw M(a) && (a = a[a.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), 
                        Ha("modulerr", a, e.stack || e.message || e);
                    }
                }
            });
            return b;
        }
        function h(b, c) {
            function d(a) {
                if (b.hasOwnProperty(a)) {
                    if (b[a] === g) throw Ha("cdep", a + " <- " + l.join(" <- "));
                    return b[a];
                }
                try {
                    return l.unshift(a), b[a] = g, b[a] = c(a);
                } catch (e) {
                    throw b[a] === g && delete b[a], e;
                } finally {
                    l.shift();
                }
            }
            function e(b, c, f, g) {
                "string" === typeof f && (g = f, f = null);
                var h = [];
                g = Mb(b, a, g);
                var n, l, k;
                l = 0;
                for (n = g.length; l < n; l++) {
                    k = g[l];
                    if ("string" !== typeof k) throw Ha("itkn", k);
                    h.push(f && f.hasOwnProperty(k) ? f[k] : d(k));
                }
                M(b) && (b = b[n]);
                return b.apply(c, h);
            }
            return {
                invoke: e,
                instantiate: function(a, b, c) {
                    var d = function() {};
                    d.prototype = (M(a) ? a[a.length - 1] : a).prototype;
                    d = new d();
                    a = e(a, d, b, c);
                    return Q(a) || A(a) ? a : d;
                },
                get: d,
                annotate: Mb,
                has: function(a) {
                    return p.hasOwnProperty(a + n) || b.hasOwnProperty(a);
                }
            };
        }
        a = !0 === a;
        var g = {}, n = "Provider", l = [], m = new Va([], !0), p = {
            $provide: {
                provider: c(d),
                factory: c(e),
                service: c(function(a, b) {
                    return e(a, [ "$injector", function(a) {
                        return a.instantiate(b);
                    } ]);
                }),
                value: c(function(a, b) {
                    return e(a, ba(b));
                }),
                constant: c(function(a, b) {
                    Aa(a, "constant");
                    p[a] = b;
                    s[a] = b;
                }),
                decorator: function(a, b) {
                    var c = k.get(a + n), d = c.$get;
                    c.$get = function() {
                        var a = r.invoke(d, c);
                        return r.invoke(b, null, {
                            $delegate: a
                        });
                    };
                }
            }
        }, k = p.$injector = h(p, function() {
            throw Ha("unpr", l.join(" <- "));
        }, a), s = {}, r = s.$injector = h(s, function(a) {
            var b = k.get(a + n);
            return r.invoke(b.$get, b, t, a);
        }, a);
        q(f(b), function(a) {
            r.invoke(a || B);
        });
        return r;
    }
    function ee() {
        var b = !0;
        this.disableAutoScrolling = function() {
            b = !1;
        };
        this.$get = [ "$window", "$location", "$rootScope", function(a, c, d) {
            function e(a) {
                var b = null;
                q(a, function(a) {
                    b || "a" !== ma(a) || (b = a);
                });
                return b;
            }
            function f() {
                var b = c.hash(), d;
                b ? (d = h.getElementById(b)) ? d.scrollIntoView() : (d = e(h.getElementsByName(b))) ? d.scrollIntoView() : "top" === b && a.scrollTo(0, 0) : a.scrollTo(0, 0);
            }
            var h = a.document;
            b && d.$watch(function() {
                return c.hash();
            }, function() {
                d.$evalAsync(f);
            });
            return f;
        } ];
    }
    function Ce() {
        this.$get = [ "$$rAF", "$timeout", function(b, a) {
            return b.supported ? function(a) {
                return b(a);
            } : function(b) {
                return a(b, 0, !1);
            };
        } ];
    }
    function Pe(b, a, c, d) {
        function e(a) {
            try {
                a.apply(null, ka.call(arguments, 1));
            } finally {
                if (r--, 0 === r) for (;L.length; ) try {
                    L.pop()();
                } catch (b) {
                    c.error(b);
                }
            }
        }
        function f(a, b) {
            !function qb() {
                q(u, function(a) {
                    a();
                });
                K = b(qb, a);
            }();
        }
        function h() {
            y = null;
            w != g.url() && (w = g.url(), q(Y, function(a) {
                a(g.url());
            }));
        }
        var g = this, n = a[0], l = b.location, m = b.history, p = b.setTimeout, k = b.clearTimeout, s = {};
        g.isMock = !1;
        var r = 0, L = [];
        g.$$completeOutstandingRequest = e;
        g.$$incOutstandingRequestCount = function() {
            r++;
        };
        g.notifyWhenNoOutstandingRequests = function(a) {
            q(u, function(a) {
                a();
            });
            0 === r ? a() : L.push(a);
        };
        var u = [], K;
        g.addPollFn = function(a) {
            F(K) && f(100, p);
            u.push(a);
            return a;
        };
        var w = l.href, x = a.find("base"), y = null;
        g.url = function(a, c) {
            l !== b.location && (l = b.location);
            m !== b.history && (m = b.history);
            if (a) {
                if (w != a) return w = a, d.history ? c ? m.replaceState(null, "", a) : (m.pushState(null, "", a), 
                x.attr("href", x.attr("href"))) : (y = a, c ? l.replace(a) : l.href = a), g;
            } else return y || l.href.replace(/%27/g, "'");
        };
        var Y = [], N = !1;
        g.onUrlChange = function(a) {
            if (!N) {
                if (d.history) z(b).on("popstate", h);
                if (d.hashchange) z(b).on("hashchange", h); else g.addPollFn(h);
                N = !0;
            }
            Y.push(a);
            return a;
        };
        g.baseHref = function() {
            var a = x.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        };
        var R = {}, H = "", C = g.baseHref();
        g.cookies = function(a, b) {
            var d, e, f, g;
            if (a) b === t ? n.cookie = encodeURIComponent(a) + "=;path=" + C + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : G(b) && (d = (n.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(b) + ";path=" + C).length + 1, 
            4096 < d && c.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + d + " > 4096 bytes)!")); else {
                if (n.cookie !== H) for (H = n.cookie, d = H.split("; "), R = {}, f = 0; f < d.length; f++) e = d[f], 
                g = e.indexOf("="), 0 < g && (a = decodeURIComponent(e.substring(0, g)), R[a] === t && (R[a] = decodeURIComponent(e.substring(g + 1))));
                return R;
            }
        };
        g.defer = function(a, b) {
            var c;
            r++;
            c = p(function() {
                delete s[c];
                e(a);
            }, b || 0);
            s[c] = !0;
            return c;
        };
        g.defer.cancel = function(a) {
            return s[a] ? (delete s[a], k(a), e(B), !0) : !1;
        };
    }
    function ge() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function(b, a, c, d) {
            return new Pe(b, d, a, c);
        } ];
    }
    function he() {
        this.$get = function() {
            function b(b, d) {
                function e(a) {
                    a != p && (k ? k == a && (k = a.n) : k = a, f(a.n, a.p), f(a, p), p = a, p.n = null);
                }
                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a));
                }
                if (b in a) throw O("$cacheFactory")("iid", b);
                var h = 0, g = E({}, d, {
                    id: b
                }), n = {}, l = d && d.capacity || Number.MAX_VALUE, m = {}, p = null, k = null;
                return a[b] = {
                    put: function(a, b) {
                        if (l < Number.MAX_VALUE) {
                            var c = m[a] || (m[a] = {
                                key: a
                            });
                            e(c);
                        }
                        if (!F(b)) return a in n || h++, n[a] = b, h > l && this.remove(k.key), b;
                    },
                    get: function(a) {
                        if (l < Number.MAX_VALUE) {
                            var b = m[a];
                            if (!b) return;
                            e(b);
                        }
                        return n[a];
                    },
                    remove: function(a) {
                        if (l < Number.MAX_VALUE) {
                            var b = m[a];
                            if (!b) return;
                            b == p && (p = b.p);
                            b == k && (k = b.n);
                            f(b.n, b.p);
                            delete m[a];
                        }
                        delete n[a];
                        h--;
                    },
                    removeAll: function() {
                        n = {};
                        h = 0;
                        m = {};
                        p = k = null;
                    },
                    destroy: function() {
                        m = g = n = null;
                        delete a[b];
                    },
                    info: function() {
                        return E({}, g, {
                            size: h
                        });
                    }
                };
            }
            var a = {};
            b.info = function() {
                var b = {};
                q(a, function(a, e) {
                    b[e] = a.info();
                });
                return b;
            };
            b.get = function(b) {
                return a[b];
            };
            return b;
        };
    }
    function ye() {
        this.$get = [ "$cacheFactory", function(b) {
            return b("templates");
        } ];
    }
    function ic(b, a) {
        var c = {}, d = "Directive", e = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/, f = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/, h = kd("ngSrc,ngSrcset,src,srcset"), g = /^(on[a-z]+|formaction)$/;
        this.directive = function l(a, e) {
            Aa(a, "directive");
            G(a) ? (Gb(e, "directiveFactory"), c.hasOwnProperty(a) || (c[a] = [], b.factory(a + d, [ "$injector", "$exceptionHandler", function(b, d) {
                var e = [];
                q(c[a], function(c, f) {
                    try {
                        var g = b.invoke(c);
                        A(g) ? g = {
                            compile: ba(g)
                        } : !g.compile && g.link && (g.compile = ba(g.link));
                        g.priority = g.priority || 0;
                        g.index = f;
                        g.name = g.name || a;
                        g.require = g.require || g.controller && g.name;
                        g.restrict = g.restrict || "A";
                        e.push(g);
                    } catch (h) {
                        d(h);
                    }
                });
                return e;
            } ])), c[a].push(e)) : q(a, ac(l));
            return this;
        };
        this.aHrefSanitizationWhitelist = function(b) {
            return v(b) ? (a.aHrefSanitizationWhitelist(b), this) : a.aHrefSanitizationWhitelist();
        };
        this.imgSrcSanitizationWhitelist = function(b) {
            return v(b) ? (a.imgSrcSanitizationWhitelist(b), this) : a.imgSrcSanitizationWhitelist();
        };
        this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, b, p, k, s, r, L, u, K, w, x, y) {
            function Y(a, b, c, d, e) {
                a instanceof z || (a = z(a));
                q(a, function(b, c) {
                    3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = z(b).wrap("<span></span>").parent()[0]);
                });
                var f = R(a, b, a, c, d, e);
                N(a, "ng-scope");
                return function(b, c, d, e) {
                    Gb(b, "scope");
                    var g = c ? Fa.clone.call(a) : a;
                    q(d, function(a, b) {
                        g.data("$" + b + "Controller", a);
                    });
                    g.data("$scope", b);
                    c && c(g, b);
                    f && f(b, g, g, e);
                    return g;
                };
            }
            function N(a, b) {
                try {
                    a.addClass(b);
                } catch (c) {}
            }
            function R(a, b, c, d, e, f) {
                function g(a, c, d, e) {
                    var f, l, k, m, p, s, u;
                    f = c.length;
                    var r = Array(f);
                    for (m = 0; m < f; m++) r[m] = c[m];
                    s = m = 0;
                    for (p = h.length; m < p; s++) l = r[s], c = h[m++], f = h[m++], c ? (c.scope ? (k = a.$new(), 
                    z.data(l, "$scope", k)) : k = a, u = c.transcludeOnThisElement ? H(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? H(a, b) : null, 
                    c(f, k, l, d, u)) : f && f(a, l.childNodes, t, e);
                }
                for (var h = [], l, k, m, p, s = 0; s < a.length; s++) l = new Nb(), k = C(a[s], [], l, 0 === s ? d : t, e), 
                (f = k.length ? ca(k, a[s], l, b, c, null, [], [], f) : null) && f.scope && N(l.$$element, "ng-scope"), 
                l = f && f.terminal || !(m = a[s].childNodes) || !m.length ? null : R(m, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b), 
                h.push(f, l), p = p || f || l, f = null;
                return p ? g : null;
            }
            function H(a, b, c) {
                return function(d, e, f) {
                    var g = !1;
                    d || (d = a.$new(), g = d.$$transcluded = !0);
                    e = b(d, e, f, c);
                    if (g) e.on("$destroy", function() {
                        d.$destroy();
                    });
                    return e;
                };
            }
            function C(b, g, h, k, m) {
                var p = h.$attr, s;
                switch (b.nodeType) {
                  case 1:
                    v(g, oa(ma(b)), "E", k, m);
                    for (var u, r, K, L = b.attributes, x = 0, w = L && L.length; x < w; x++) {
                        var y = !1, N = !1;
                        u = L[x];
                        if (!T || 8 <= T || u.specified) {
                            s = u.name;
                            u = Z(u.value);
                            r = oa(s);
                            if (K = ua.test(r)) s = gb(r.substr(6), "-");
                            var q = r.replace(/(Start|End)$/, ""), H;
                            a: {
                                var D = q;
                                if (c.hasOwnProperty(D)) {
                                    H = void 0;
                                    for (var D = a.get(D + d), X = 0, C = D.length; X < C; X++) if (H = D[X], H.multiElement) {
                                        H = !0;
                                        break a;
                                    }
                                }
                                H = !1;
                            }
                            H && r === q + "Start" && (y = s, N = s.substr(0, s.length - 5) + "end", s = s.substr(0, s.length - 6));
                            r = oa(s.toLowerCase());
                            p[r] = s;
                            if (K || !h.hasOwnProperty(r)) h[r] = u, vc(b, r) && (h[r] = !0);
                            S(b, g, u, r);
                            v(g, r, "A", k, m, y, N);
                        }
                    }
                    b = b.className;
                    if (G(b) && "" !== b) for (;s = f.exec(b); ) r = oa(s[2]), v(g, r, "C", k, m) && (h[r] = Z(s[3])), 
                    b = b.substr(s.index + s[0].length);
                    break;

                  case 3:
                    O(g, b.nodeValue);
                    break;

                  case 8:
                    try {
                        if (s = e.exec(b.nodeValue)) r = oa(s[1]), v(g, r, "M", k, m) && (h[r] = Z(s[2]));
                    } catch (R) {}
                }
                g.sort(F);
                return g;
            }
            function D(a, b, c) {
                var d = [], e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a) throw ha("uterdir", b, c);
                        1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);
                        d.push(a);
                        a = a.nextSibling;
                    } while (0 < e);
                } else d.push(a);
                return z(d);
            }
            function X(a, b, c) {
                return function(d, e, f, g, h) {
                    e = D(e[0], b, c);
                    return a(d, e, f, g, h);
                };
            }
            function ca(a, c, d, e, f, g, h, l, k) {
                function s(a, b, c, d) {
                    if (a) {
                        c && (a = X(a, c, d));
                        a.require = I.require;
                        a.directiveName = na;
                        if (H === I || I.$$isolateScope) a = Cc(a, {
                            isolateScope: !0
                        });
                        h.push(a);
                    }
                    if (b) {
                        c && (b = X(b, c, d));
                        b.require = I.require;
                        b.directiveName = na;
                        if (H === I || I.$$isolateScope) b = Cc(b, {
                            isolateScope: !0
                        });
                        l.push(b);
                    }
                }
                function u(a, b, c, d) {
                    var e, f = "data", g = !1;
                    if (G(b)) {
                        for (;"^" == (e = b.charAt(0)) || "?" == e; ) b = b.substr(1), "^" == e && (f = "inheritedData"), 
                        g = g || "?" == e;
                        e = null;
                        d && "data" === f && (e = d[b]);
                        e = e || c[f]("$" + b + "Controller");
                        if (!e && !g) throw ha("ctreq", b, a);
                    } else M(b) && (e = [], q(b, function(b) {
                        e.push(u(a, b, c, d));
                    }));
                    return e;
                }
                function K(a, e, f, g, k) {
                    function s(a, b) {
                        var c;
                        2 > arguments.length && (b = a, a = t);
                        F && (c = ca);
                        return k(a, b, c);
                    }
                    var x, w, Bc, D, X, C, ca = {}, Y;
                    x = c === f ? d : ja(d, new Nb(z(f), d.$attr));
                    w = x.$$element;
                    if (H) {
                        var v = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                        C = e.$new(!0);
                        !R || R !== H && R !== H.$$originalDirective ? w.data("$isolateScopeNoTemplate", C) : w.data("$isolateScope", C);
                        N(w, "ng-isolate-scope");
                        q(H.scope, function(a, c) {
                            var d = a.match(v) || [], f = d[3] || c, g = "?" == d[2], d = d[1], h, k, l, s;
                            C.$$isolateBindings[c] = d + f;
                            switch (d) {
                              case "@":
                                x.$observe(f, function(a) {
                                    C[c] = a;
                                });
                                x.$$observers[f].$$scope = e;
                                x[f] && (C[c] = b(x[f])(e));
                                break;

                              case "=":
                                if (g && !x[f]) break;
                                k = r(x[f]);
                                s = k.literal ? ra : function(a, b) {
                                    return a === b;
                                };
                                l = k.assign || function() {
                                    h = C[c] = k(e);
                                    throw ha("nonassign", x[f], H.name);
                                };
                                h = C[c] = k(e);
                                g = e.$watch(r(x[f], function(a) {
                                    s(a, C[c]) || (s(a, h) ? l(e, a = C[c]) : C[c] = a);
                                    return h = a;
                                }), null, k.literal);
                                C.$on("$destroy", g);
                                break;

                              case "&":
                                k = r(x[f]);
                                C[c] = function(a) {
                                    return k(e, a);
                                };
                                break;

                              default:
                                throw ha("iscp", H.name, c, a);
                            }
                        });
                    }
                    Y = k && s;
                    y && q(y, function(a) {
                        var b = {
                            $scope: a === H || a.$$isolateScope ? C : e,
                            $element: w,
                            $attrs: x,
                            $transclude: Y
                        }, c;
                        X = a.controller;
                        "@" == X && (X = x[a.name]);
                        c = L(X, b);
                        ca[a.name] = c;
                        F || w.data("$" + a.name + "Controller", c);
                        a.controllerAs && (b.$scope[a.controllerAs] = c);
                    });
                    g = 0;
                    for (Bc = h.length; g < Bc; g++) try {
                        D = h[g], D(D.isolateScope ? C : e, w, x, D.require && u(D.directiveName, D.require, w, ca), Y);
                    } catch (Qe) {
                        p(Qe, ga(w));
                    }
                    g = e;
                    H && (H.template || null === H.templateUrl) && (g = C);
                    a && a(g, f.childNodes, t, k);
                    for (g = l.length - 1; 0 <= g; g--) try {
                        D = l[g], D(D.isolateScope ? C : e, w, x, D.require && u(D.directiveName, D.require, w, ca), Y);
                    } catch (S) {
                        p(S, ga(w));
                    }
                }
                k = k || {};
                for (var x = -Number.MAX_VALUE, w, y = k.controllerDirectives, H = k.newIsolateScopeDirective, R = k.templateDirective, ca = k.nonTlbTranscludeDirective, v = !1, Wa = !1, F = k.hasElementTranscludeDirective, E = d.$$element = z(c), I, na, S, O = e, J, P = 0, ua = a.length; P < ua; P++) {
                    I = a[P];
                    var T = I.$$start, U = I.$$end;
                    T && (E = D(c, T, U));
                    S = t;
                    if (x > I.priority) break;
                    if (S = I.scope) I.templateUrl || (Q(S) ? (Ia("new/isolated scope", H || w, I, E), 
                    H = I) : Ia("new/isolated scope", H, I, E)), w = w || I;
                    na = I.name;
                    !I.templateUrl && I.controller && (S = I.controller, y = y || {}, Ia("'" + na + "' controller", y[na], I, E), 
                    y[na] = I);
                    if (S = I.transclude) v = !0, I.$$tlb || (Ia("transclusion", ca, I, E), ca = I), 
                    "element" == S ? (F = !0, x = I.priority, S = E, E = d.$$element = z(W.createComment(" " + na + ": " + d[na] + " ")), 
                    c = E[0], rb(f, ka.call(S, 0), c), O = Y(S, e, x, g && g.name, {
                        nonTlbTranscludeDirective: ca
                    })) : (S = z(Jb(c)).contents(), E.empty(), O = Y(S, e));
                    if (I.template) if (Wa = !0, Ia("template", R, I, E), R = I, S = A(I.template) ? I.template(E, d) : I.template, 
                    S = Dc(S), I.replace) {
                        g = I;
                        S = Hb.test(S) ? z(V(I.type, Z(S))) : [];
                        c = S[0];
                        if (1 != S.length || 1 !== c.nodeType) throw ha("tplrt", na, "");
                        rb(f, E, c);
                        ua = {
                            $attr: {}
                        };
                        S = C(c, [], ua);
                        var Se = a.splice(P + 1, a.length - (P + 1));
                        H && qb(S);
                        a = a.concat(S).concat(Se);
                        Ac(d, ua);
                        ua = a.length;
                    } else E.html(S);
                    if (I.templateUrl) Wa = !0, Ia("template", R, I, E), R = I, I.replace && (g = I), 
                    K = B(a.splice(P, a.length - P), E, d, f, v && O, h, l, {
                        controllerDirectives: y,
                        newIsolateScopeDirective: H,
                        templateDirective: R,
                        nonTlbTranscludeDirective: ca
                    }), ua = a.length; else if (I.compile) try {
                        J = I.compile(E, d, O), A(J) ? s(null, J, T, U) : J && s(J.pre, J.post, T, U);
                    } catch (Re) {
                        p(Re, ga(E));
                    }
                    I.terminal && (K.terminal = !0, x = Math.max(x, I.priority));
                }
                K.scope = w && !0 === w.scope;
                K.transcludeOnThisElement = v;
                K.templateOnThisElement = Wa;
                K.transclude = O;
                k.hasElementTranscludeDirective = F;
                return K;
            }
            function qb(a) {
                for (var b = 0, c = a.length; b < c; b++) a[b] = cc(a[b], {
                    $$isolateScope: !0
                });
            }
            function v(b, e, f, g, h, k, m) {
                if (e === h) return null;
                h = null;
                if (c.hasOwnProperty(e)) {
                    var s;
                    e = a.get(e + d);
                    for (var u = 0, r = e.length; u < r; u++) try {
                        s = e[u], (g === t || g > s.priority) && -1 != s.restrict.indexOf(f) && (k && (s = cc(s, {
                            $$start: k,
                            $$end: m
                        })), b.push(s), h = s);
                    } catch (K) {
                        p(K);
                    }
                }
                return h;
            }
            function Ac(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element;
                q(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), 
                    a.$set(e, d, !0, c[e]));
                });
                q(b, function(b, f) {
                    "class" == f ? (N(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), 
                    a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, 
                    d[f] = c[f]);
                });
            }
            function B(a, b, c, d, e, f, g, h) {
                var l = [], m, p, u = b[0], r = a.shift(), K = E({}, r, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: r
                }), x = A(r.templateUrl) ? r.templateUrl(b, c) : r.templateUrl, L = r.type;
                b.empty();
                k.get(w.getTrustedResourceUrl(x), {
                    cache: s
                }).success(function(k) {
                    var s, w;
                    k = Dc(k);
                    if (r.replace) {
                        k = Hb.test(k) ? z(V(L, Z(k))) : [];
                        s = k[0];
                        if (1 != k.length || 1 !== s.nodeType) throw ha("tplrt", r.name, x);
                        k = {
                            $attr: {}
                        };
                        rb(d, b, s);
                        var y = C(s, [], k);
                        Q(r.scope) && qb(y);
                        a = y.concat(a);
                        Ac(c, k);
                    } else s = u, b.html(k);
                    a.unshift(K);
                    m = ca(a, s, c, e, b, r, f, g, h);
                    q(d, function(a, c) {
                        a == s && (d[c] = b[0]);
                    });
                    for (p = R(b[0].childNodes, e); l.length; ) {
                        k = l.shift();
                        w = l.shift();
                        var D = l.shift(), X = l.shift(), y = b[0];
                        if (w !== u) {
                            var Y = w.className;
                            h.hasElementTranscludeDirective && r.replace || (y = Jb(s));
                            rb(D, z(w), y);
                            N(z(y), Y);
                        }
                        w = m.transcludeOnThisElement ? H(k, m.transclude, X) : X;
                        m(p, k, y, d, w);
                    }
                    l = null;
                }).error(function(a, b, c, d) {
                    throw ha("tpload", d.url);
                });
                return function(a, b, c, d, e) {
                    a = e;
                    l ? (l.push(b), l.push(c), l.push(d), l.push(a)) : (m.transcludeOnThisElement && (a = H(b, m.transclude, e)), 
                    m(p, b, c, d, a));
                };
            }
            function F(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
            }
            function Ia(a, b, c, d) {
                if (b) throw ha("multidir", b.name, c.name, a, ga(d));
            }
            function O(a, c) {
                var d = b(c, !0);
                d && a.push({
                    priority: 0,
                    compile: function(a) {
                        var b = a.parent().length;
                        b && N(a.parent(), "ng-binding");
                        return function(a, c) {
                            var e = c.parent(), f = e.data("$binding") || [];
                            f.push(d);
                            e.data("$binding", f);
                            b || N(e, "ng-binding");
                            a.$watch(d, function(a) {
                                c[0].nodeValue = a;
                            });
                        };
                    }
                });
            }
            function V(a, b) {
                a = J(a || "html");
                switch (a) {
                  case "svg":
                  case "math":
                    var c = W.createElement("div");
                    c.innerHTML = "<" + a + ">" + b + "</" + a + ">";
                    return c.childNodes[0].childNodes;

                  default:
                    return b;
                }
            }
            function Wa(a, b) {
                if ("srcdoc" == b) return w.HTML;
                var c = ma(a);
                if ("xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b)) return w.RESOURCE_URL;
            }
            function S(a, c, d, e) {
                var f = b(d, !0);
                if (f) {
                    if ("multiple" === e && "select" === ma(a)) throw ha("selmulti", ga(a));
                    c.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(c, d, k) {
                                    d = k.$$observers || (k.$$observers = {});
                                    if (g.test(e)) throw ha("nodomevents");
                                    if (f = b(k[e], !0, Wa(a, e), h[e])) k[e] = f(c), (d[e] || (d[e] = [])).$$inter = !0, 
                                    (k.$$observers && k.$$observers[e].$$scope || c).$watch(f, function(a, b) {
                                        "class" === e && a != b ? k.$updateClass(a, b) : k.$set(e, a);
                                    });
                                }
                            };
                        }
                    });
                }
            }
            function rb(a, b, c) {
                var d = b[0], e = b.length, f = d.parentNode, g, h;
                if (a) for (g = 0, h = a.length; g < h; g++) if (a[g] == d) {
                    a[g++] = c;
                    h = g + e - 1;
                    for (var k = a.length; g < k; g++, h++) h < k ? a[g] = a[h] : delete a[g];
                    a.length -= e - 1;
                    break;
                }
                f && f.replaceChild(c, d);
                a = W.createDocumentFragment();
                a.appendChild(d);
                c[z.expando] = d[z.expando];
                d = 1;
                for (e = b.length; d < e; d++) f = b[d], z(f).remove(), a.appendChild(f), delete b[d];
                b[0] = c;
                b.length = 1;
            }
            function Cc(a, b) {
                return E(function() {
                    return a.apply(null, arguments);
                }, a, b);
            }
            var Nb = function(a, b) {
                this.$$element = a;
                this.$attr = b || {};
            };
            Nb.prototype = {
                $normalize: oa,
                $addClass: function(a) {
                    a && 0 < a.length && x.addClass(this.$$element, a);
                },
                $removeClass: function(a) {
                    a && 0 < a.length && x.removeClass(this.$$element, a);
                },
                $updateClass: function(a, b) {
                    var c = Ec(a, b), d = Ec(b, a);
                    0 === c.length ? x.removeClass(this.$$element, d) : 0 === d.length ? x.addClass(this.$$element, c) : x.setClass(this.$$element, c, d);
                },
                $set: function(a, b, c, d) {
                    var e = this.$$element[0], f = vc(e, a), g = Ke(e, a), e = a;
                    f ? (this.$$element.prop(a, b), d = f) : g && (this[g] = b, e = g);
                    this[a] = b;
                    d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = gb(a, "-"));
                    f = ma(this.$$element);
                    if ("a" === f && "href" === a || "img" === f && "src" === a) this[a] = b = y(b, "src" === a);
                    !1 !== c && (null === b || b === t ? this.$$element.removeAttr(d) : this.$$element.attr(d, b));
                    (a = this.$$observers) && q(a[e], function(a) {
                        try {
                            a(b);
                        } catch (c) {
                            p(c);
                        }
                    });
                },
                $observe: function(a, b) {
                    var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
                    e.push(b);
                    u.$evalAsync(function() {
                        e.$$inter || b(c[a]);
                    });
                    return function() {
                        Da(e, b);
                    };
                }
            };
            var P = b.startSymbol(), U = b.endSymbol(), Dc = "{{" == P || "}}" == U ? Ba : function(a) {
                return a.replace(/\{\{/g, P).replace(/}}/g, U);
            }, ua = /^ngAttr[A-Z]/;
            return Y;
        } ];
    }
    function oa(b) {
        return Sa(b.replace(Te, ""));
    }
    function Ec(b, a) {
        var c = "", d = b.split(/\s+/), e = a.split(/\s+/), f = 0;
        a: for (;f < d.length; f++) {
            for (var h = d[f], g = 0; g < e.length; g++) if (h == e[g]) continue a;
            c += (0 < c.length ? " " : "") + h;
        }
        return c;
    }
    function ie() {
        var b = {}, a = !1, c = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(a, c) {
            Aa(a, "controller");
            Q(a) ? E(b, a) : b[a] = c;
        };
        this.allowGlobals = function() {
            a = !0;
        };
        this.$get = [ "$injector", "$window", function(d, e) {
            return function(f, h) {
                var g, n, l;
                G(f) && (g = f.match(c), n = g[1], l = g[3], f = b.hasOwnProperty(n) ? b[n] : hc(h.$scope, n, !0) || (a ? hc(e, n, !0) : t), 
                Pa(f, n, !0));
                g = d.instantiate(f, h, n);
                if (l) {
                    if (!h || "object" !== typeof h.$scope) throw O("$controller")("noscp", n || f.name, l);
                    h.$scope[l] = g;
                }
                return g;
            };
        } ];
    }
    function je() {
        this.$get = [ "$window", function(b) {
            return z(b.document);
        } ];
    }
    function ke() {
        this.$get = [ "$log", function(b) {
            return function(a, c) {
                b.error.apply(b, arguments);
            };
        } ];
    }
    function Fc(b) {
        var a = {}, c, d, e;
        if (!b) return a;
        q(b.split("\n"), function(b) {
            e = b.indexOf(":");
            c = J(Z(b.substr(0, e)));
            d = Z(b.substr(e + 1));
            c && (a[c] = a[c] ? a[c] + ", " + d : d);
        });
        return a;
    }
    function Gc(b) {
        var a = Q(b) ? b : t;
        return function(c) {
            a || (a = Fc(b));
            return c ? a[J(c)] || null : a;
        };
    }
    function Hc(b, a, c) {
        if (A(c)) return c(b, a);
        q(c, function(c) {
            b = c(b, a);
        });
        return b;
    }
    function ne() {
        var b = /^\s*(\[|\{[^\{])/, a = /[\}\]]\s*$/, c = /^\)\]\}',?\n/, d = {
            "Content-Type": "application/json;charset=utf-8"
        }, e = this.defaults = {
            transformResponse: [ function(d) {
                G(d) && (d = d.replace(c, ""), b.test(d) && a.test(d) && (d = dc(d)));
                return d;
            } ],
            transformRequest: [ function(a) {
                return Q(a) && "[object File]" !== ya.call(a) && "[object Blob]" !== ya.call(a) ? sa(a) : a;
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: ja(d),
                put: ja(d),
                patch: ja(d)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        }, f = this.interceptors = [];
        this.$get = [ "$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, c, d, m, p) {
            function k(a) {
                function b(a) {
                    var d = E({}, a, {
                        data: Hc(a.data, a.headers, c.transformResponse)
                    });
                    return 200 <= a.status && 300 > a.status ? d : m.reject(d);
                }
                var c = {
                    method: "get",
                    transformRequest: e.transformRequest,
                    transformResponse: e.transformResponse
                }, d = function(a) {
                    var b = e.headers, c = E({}, a.headers), d, f, b = E({}, b.common, b[J(a.method)]);
                    a: for (d in b) {
                        a = J(d);
                        for (f in c) if (J(f) === a) continue a;
                        c[d] = b[d];
                    }
                    !function(a) {
                        var b;
                        q(a, function(c, d) {
                            A(c) && (b = c(), null != b ? a[d] = b : delete a[d]);
                        });
                    }(c);
                    return c;
                }(a);
                E(c, a);
                c.headers = d;
                c.method = ib(c.method);
                var f = [ function(a) {
                    d = a.headers;
                    var c = Hc(a.data, Gc(d), a.transformRequest);
                    F(c) && q(d, function(a, b) {
                        "content-type" === J(b) && delete d[b];
                    });
                    F(a.withCredentials) && !F(e.withCredentials) && (a.withCredentials = e.withCredentials);
                    return s(a, c, d).then(b, b);
                }, t ], g = m.when(c);
                for (q(u, function(a) {
                    (a.request || a.requestError) && f.unshift(a.request, a.requestError);
                    (a.response || a.responseError) && f.push(a.response, a.responseError);
                }); f.length; ) {
                    a = f.shift();
                    var h = f.shift(), g = g.then(a, h);
                }
                g.success = function(a) {
                    g.then(function(b) {
                        a(b.data, b.status, b.headers, c);
                    });
                    return g;
                };
                g.error = function(a) {
                    g.then(null, function(b) {
                        a(b.data, b.status, b.headers, c);
                    });
                    return g;
                };
                return g;
            }
            function s(c, f, n) {
                function s(a, b, c, e) {
                    C && (200 <= a && 300 > a ? C.put(X, [ a, b, Fc(c), e ]) : C.remove(X));
                    p(b, a, c, e);
                    d.$$phase || d.$apply();
                }
                function p(a, b, d, e) {
                    b = Math.max(b, 0);
                    (200 <= b && 300 > b ? q.resolve : q.reject)({
                        data: a,
                        status: b,
                        headers: Gc(d),
                        config: c,
                        statusText: e
                    });
                }
                function u() {
                    var a = Ma(k.pendingRequests, c);
                    -1 !== a && k.pendingRequests.splice(a, 1);
                }
                var q = m.defer(), H = q.promise, C, D, X = r(c.url, c.params);
                k.pendingRequests.push(c);
                H.then(u, u);
                (c.cache || e.cache) && !1 !== c.cache && "GET" == c.method && (C = Q(c.cache) ? c.cache : Q(e.cache) ? e.cache : L);
                if (C) if (D = C.get(X), v(D)) {
                    if (D.then) return D.then(u, u), D;
                    M(D) ? p(D[1], D[0], ja(D[2]), D[3]) : p(D, 200, {}, "OK");
                } else C.put(X, H);
                F(D) && ((D = Ob(c.url) ? b.cookies()[c.xsrfCookieName || e.xsrfCookieName] : t) && (n[c.xsrfHeaderName || e.xsrfHeaderName] = D), 
                a(c.method, X, f, s, n, c.timeout, c.withCredentials, c.responseType));
                return H;
            }
            function r(a, b) {
                if (!b) return a;
                var c = [];
                hd(b, function(a, b) {
                    null === a || F(a) || (M(a) || (a = [ a ]), q(a, function(a) {
                        Q(a) && (da(a) ? a = a.toISOString() : Q(a) && (a = sa(a)));
                        c.push(za(b) + "=" + za(a));
                    }));
                });
                0 < c.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&"));
                return a;
            }
            var L = c("$http"), u = [];
            q(f, function(a) {
                u.unshift(G(a) ? p.get(a) : p.invoke(a));
            });
            k.pendingRequests = [];
            !function(a) {
                q(arguments, function(a) {
                    k[a] = function(b, c) {
                        return k(E(c || {}, {
                            method: a,
                            url: b
                        }));
                    };
                });
            }("get", "delete", "head", "jsonp");
            !function(a) {
                q(arguments, function(a) {
                    k[a] = function(b, c, d) {
                        return k(E(d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }));
                    };
                });
            }("post", "put", "patch");
            k.defaults = e;
            return k;
        } ];
    }
    function Ue(b) {
        if (8 >= T && (!b.match(/^(get|post|head|put|delete|options)$/i) || !P.XMLHttpRequest)) return new P.ActiveXObject("Microsoft.XMLHTTP");
        if (P.XMLHttpRequest) return new P.XMLHttpRequest();
        throw O("$httpBackend")("noxhr");
    }
    function oe() {
        this.$get = [ "$browser", "$window", "$document", function(b, a, c) {
            return Ve(b, Ue, b.defer, a.angular.callbacks, c[0]);
        } ];
    }
    function Ve(b, a, c, d, e) {
        function f(a, b, c) {
            var f = e.createElement("script"), h = null;
            f.type = "text/javascript";
            f.src = a;
            f.async = !0;
            h = function(a) {
                Ta(f, "load", h);
                Ta(f, "error", h);
                e.body.removeChild(f);
                f = null;
                var g = -1, r = "unknown";
                a && ("load" !== a.type || d[b].called || (a = {
                    type: "error"
                }), r = a.type, g = "error" === a.type ? 404 : 200);
                c && c(g, r);
            };
            sb(f, "load", h);
            sb(f, "error", h);
            e.body.appendChild(f);
            return h;
        }
        var h = -1;
        return function(e, n, l, m, p, k, s, r) {
            function L() {
                K = h;
                x && x();
                y && y.abort();
            }
            function u(a, d, e, f, g) {
                N && c.cancel(N);
                x = y = null;
                0 === d && (d = e ? 200 : "file" == va(n).protocol ? 404 : 0);
                a(1223 === d ? 204 : d, e, f, g || "");
                b.$$completeOutstandingRequest(B);
            }
            var K;
            b.$$incOutstandingRequestCount();
            n = n || b.url();
            if ("jsonp" == J(e)) {
                var w = "_" + (d.counter++).toString(36);
                d[w] = function(a) {
                    d[w].data = a;
                    d[w].called = !0;
                };
                var x = f(n.replace("JSON_CALLBACK", "angular.callbacks." + w), w, function(a, b) {
                    u(m, a, d[w].data, "", b);
                    d[w] = B;
                });
            } else {
                var y = a(e);
                y.open(e, n, !0);
                q(p, function(a, b) {
                    v(a) && y.setRequestHeader(b, a);
                });
                y.onreadystatechange = function() {
                    if (y && 4 == y.readyState) {
                        var a = null, b = null, c = "";
                        K !== h && (a = y.getAllResponseHeaders(), b = "response" in y ? y.response : y.responseText);
                        K === h && 10 > T || (c = y.statusText);
                        u(m, K || y.status, b, a, c);
                    }
                };
                s && (y.withCredentials = !0);
                if (r) try {
                    y.responseType = r;
                } catch (Y) {
                    if ("json" !== r) throw Y;
                }
                y.send(l || null);
            }
            if (0 < k) var N = c(L, k); else k && k.then && k.then(L);
        };
    }
    function le() {
        var b = "{{", a = "}}";
        this.startSymbol = function(a) {
            return a ? (b = a, this) : b;
        };
        this.endSymbol = function(b) {
            return b ? (a = b, this) : a;
        };
        this.$get = [ "$parse", "$exceptionHandler", "$sce", function(c, d, e) {
            function f(a) {
                return "\\\\\\" + a;
            }
            function h(f, h, s, r) {
                function L(a) {
                    try {
                        var b;
                        var c = s ? e.getTrusted(s, a) : e.valueOf(a);
                        if (null == c) b = ""; else {
                            switch (typeof c) {
                              case "string":
                                break;

                              case "number":
                                c = "" + c;
                                break;

                              default:
                                c = sa(c);
                            }
                            b = c;
                        }
                        return b;
                    } catch (g) {
                        a = Pb("interr", f, g.toString()), d(a);
                    }
                }
                r = !!r;
                for (var u, K, w = 0, x = [], y = [], Y = [], N = f.length, R = !1, H = !1, C = []; w < N; ) if (-1 != (u = f.indexOf(b, w)) && -1 != (K = f.indexOf(a, u + g))) w !== u && (H = !0), 
                x.push(f.substring(w, u)), w = f.substring(u + g, K), y.push(w), Y.push(c(w, L)), 
                w = K + n, R = !0; else {
                    w !== N && (H = !0, x.push(f.substring(w)));
                    break;
                }
                q(x, function(c, d) {
                    x[d] = x[d].replace(l, b).replace(m, a);
                });
                x.length === y.length && x.push("");
                if (s && R && (H || 1 < y.length)) throw Pb("noconcat", f);
                if (!h || R) {
                    C.length = x.length + y.length;
                    var D = function(a) {
                        for (var b = 0, c = y.length; b < c; b++) {
                            if (r && F(a[b])) return;
                            C[2 * b] = x[b];
                            C[2 * b + 1] = a[b];
                        }
                        C[2 * c] = x[c];
                        return C.join("");
                    };
                    return E(function(a) {
                        var b = 0, c = y.length, e = Array(c);
                        try {
                            for (;b < c; b++) e[b] = Y[b](a);
                            return D(e);
                        } catch (g) {
                            a = Pb("interr", f, g.toString()), d(a);
                        }
                    }, {
                        exp: f,
                        separators: x,
                        expressions: y,
                        $$watchDelegate: function(a, b, c, d) {
                            var e;
                            return a.$watchGroup(Y, function(c, d) {
                                var f = D(c);
                                A(b) && b.call(this, f, c !== d ? e : f, a);
                                e = f;
                            }, c, d);
                        }
                    });
                }
            }
            var g = b.length, n = a.length, l = RegExp(b.replace(/./g, f), "g"), m = RegExp(a.replace(/./g, f), "g");
            h.startSymbol = function() {
                return b;
            };
            h.endSymbol = function() {
                return a;
            };
            return h;
        } ];
    }
    function me() {
        this.$get = [ "$rootScope", "$window", "$q", "$$q", function(b, a, c, d) {
            function e(e, g, n, l) {
                var m = a.setInterval, p = a.clearInterval, k = 0, s = v(l) && !l, r = (s ? d : c).defer(), L = r.promise;
                n = v(n) ? n : 0;
                L.then(null, null, e);
                L.$$intervalId = m(function() {
                    r.notify(k++);
                    0 < n && k >= n && (r.resolve(k), p(L.$$intervalId), delete f[L.$$intervalId]);
                    s || b.$apply();
                }, g);
                f[L.$$intervalId] = r;
                return L;
            }
            var f = {};
            e.cancel = function(b) {
                return b && b.$$intervalId in f ? (f[b.$$intervalId].reject("canceled"), a.clearInterval(b.$$intervalId), 
                delete f[b.$$intervalId], !0) : !1;
            };
            return e;
        } ];
    }
    function ud() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [ {
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    } ],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January February March April May June July August September October November December".split(" "),
                    SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                    AMPMS: [ "AM", "PM" ],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(b) {
                    return 1 === b ? "one" : "other";
                }
            };
        };
    }
    function Qb(b) {
        b = b.split("/");
        for (var a = b.length; a--; ) b[a] = eb(b[a]);
        return b.join("/");
    }
    function Ic(b, a, c) {
        b = va(b, c);
        a.$$protocol = b.protocol;
        a.$$host = b.hostname;
        a.$$port = U(b.port) || We[b.protocol] || null;
    }
    function Jc(b, a, c) {
        var d = "/" !== b.charAt(0);
        d && (b = "/" + b);
        b = va(b, c);
        a.$$path = decodeURIComponent(d && "/" === b.pathname.charAt(0) ? b.pathname.substring(1) : b.pathname);
        a.$$search = fc(b.search);
        a.$$hash = decodeURIComponent(b.hash);
        a.$$path && "/" != a.$$path.charAt(0) && (a.$$path = "/" + a.$$path);
    }
    function pa(b, a) {
        if (0 === a.indexOf(b)) return a.substr(b.length);
    }
    function Xa(b) {
        var a = b.indexOf("#");
        return -1 == a ? b : b.substr(0, a);
    }
    function Rb(b) {
        return b.substr(0, Xa(b).lastIndexOf("/") + 1);
    }
    function Kc(b, a) {
        this.$$html5 = !0;
        a = a || "";
        var c = Rb(b);
        Ic(b, this, b);
        this.$$parse = function(a) {
            var e = pa(c, a);
            if (!G(e)) throw Sb("ipthprfx", a, c);
            Jc(e, this, b);
            this.$$path || (this.$$path = "/");
            this.$$compose();
        };
        this.$$compose = function() {
            var a = Eb(this.$$search), b = this.$$hash ? "#" + eb(this.$$hash) : "";
            this.$$url = Qb(this.$$path) + (a ? "?" + a : "") + b;
            this.$$absUrl = c + this.$$url.substr(1);
        };
        this.$$rewrite = function(d) {
            var e;
            if ((e = pa(b, d)) !== t) return d = e, (e = pa(a, e)) !== t ? c + (pa("/", e) || e) : b + d;
            if ((e = pa(c, d)) !== t) return c + e;
            if (c == d + "/") return c;
        };
    }
    function Tb(b, a) {
        var c = Rb(b);
        Ic(b, this, b);
        this.$$parse = function(d) {
            var e = pa(b, d) || pa(c, d), e = "#" == e.charAt(0) ? pa(a, e) : this.$$html5 ? e : "";
            if (!G(e)) throw Sb("ihshprfx", d, a);
            Jc(e, this, b);
            d = this.$$path;
            var f = /^\/[A-Z]:(\/.*)/;
            0 === e.indexOf(b) && (e = e.replace(b, ""));
            f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d);
            this.$$path = d;
            this.$$compose();
        };
        this.$$compose = function() {
            var c = Eb(this.$$search), e = this.$$hash ? "#" + eb(this.$$hash) : "";
            this.$$url = Qb(this.$$path) + (c ? "?" + c : "") + e;
            this.$$absUrl = b + (this.$$url ? a + this.$$url : "");
        };
        this.$$rewrite = function(a) {
            if (Xa(b) == Xa(a)) return a;
        };
    }
    function Ub(b, a) {
        this.$$html5 = !0;
        Tb.apply(this, arguments);
        var c = Rb(b);
        this.$$rewrite = function(d) {
            var e;
            if (b == Xa(d)) return d;
            if (e = pa(c, d)) return b + a + e;
            if (c === d + "/") return c;
        };
        this.$$compose = function() {
            var c = Eb(this.$$search), e = this.$$hash ? "#" + eb(this.$$hash) : "";
            this.$$url = Qb(this.$$path) + (c ? "?" + c : "") + e;
            this.$$absUrl = b + a + this.$$url;
        };
    }
    function tb(b) {
        return function() {
            return this[b];
        };
    }
    function Lc(b, a) {
        return function(c) {
            if (F(c)) return this[b];
            this[b] = a(c);
            this.$$compose();
            return this;
        };
    }
    function pe() {
        var b = "", a = !1;
        this.hashPrefix = function(a) {
            return v(a) ? (b = a, this) : b;
        };
        this.html5Mode = function(b) {
            return v(b) ? (a = b, this) : a;
        };
        this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", function(c, d, e, f) {
            function h(a) {
                c.$broadcast("$locationChangeSuccess", g.absUrl(), a);
            }
            var g, n, l = d.baseHref(), m = d.url(), p;
            a ? (p = m.substring(0, m.indexOf("/", m.indexOf("//") + 2)) + (l || "/"), n = e.history ? Kc : Ub) : (p = Xa(m), 
            n = Tb);
            g = new n(p, "#" + b);
            g.$$parse(g.$$rewrite(m));
            f.on("click", function(a) {
                if (!a.ctrlKey && !a.metaKey && 2 != a.which) {
                    for (var e = z(a.target); "a" !== ma(e[0]); ) if (e[0] === f[0] || !(e = e.parent())[0]) return;
                    var h = e.prop("href");
                    Q(h) && "[object SVGAnimatedString]" === h.toString() && (h = va(h.animVal).href);
                    if (n === Ub) {
                        var k = e.attr("href") || e.attr("xlink:href");
                        if (0 > k.indexOf("://")) if (h = "#" + b, "/" == k[0]) h = p + h + k; else if ("#" == k[0]) h = p + h + (g.path() || "/") + k; else {
                            for (var l = g.path().split("/"), k = k.split("/"), m = 0; m < k.length; m++) "." != k[m] && (".." == k[m] ? l.pop() : k[m].length && l.push(k[m]));
                            h = p + h + l.join("/");
                        }
                    }
                    l = g.$$rewrite(h);
                    h && !e.attr("target") && l && !a.isDefaultPrevented() && (a.preventDefault(), l != d.url() && (g.$$parse(l), 
                    c.$apply(), P.angular["ff-684208-preventDefault"] = !0));
                }
            });
            g.absUrl() != m && d.url(g.absUrl(), !0);
            d.onUrlChange(function(a) {
                g.absUrl() != a && (c.$evalAsync(function() {
                    var b = g.absUrl();
                    g.$$parse(a);
                    c.$broadcast("$locationChangeStart", a, b).defaultPrevented ? (g.$$parse(b), d.url(b)) : h(b);
                }), c.$$phase || c.$digest());
            });
            var k = 0;
            c.$watch(function() {
                var a = d.url(), b = g.$$replace;
                k && a == g.absUrl() || (k++, c.$evalAsync(function() {
                    c.$broadcast("$locationChangeStart", g.absUrl(), a).defaultPrevented ? g.$$parse(a) : (d.url(g.absUrl(), b), 
                    h(a));
                }));
                g.$$replace = !1;
                return k;
            });
            return g;
        } ];
    }
    function qe() {
        var b = !0, a = this;
        this.debugEnabled = function(a) {
            return v(a) ? (b = a, this) : b;
        };
        this.$get = [ "$window", function(c) {
            function d(a) {
                a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line));
                return a;
            }
            function e(a) {
                var b = c.console || {}, e = b[a] || b.log || B;
                a = !1;
                try {
                    a = !!e.apply;
                } catch (n) {}
                return a ? function() {
                    var a = [];
                    q(arguments, function(b) {
                        a.push(d(b));
                    });
                    return e.apply(b, a);
                } : function(a, b) {
                    e(a, null == b ? "" : b);
                };
            }
            return {
                log: e("log"),
                info: e("info"),
                warn: e("warn"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        b && c.apply(a, arguments);
                    };
                }()
            };
        } ];
    }
    function qa(b, a) {
        if ("__defineGetter__" === b || "__defineSetter__" === b || "__lookupGetter__" === b || "__lookupSetter__" === b || "__proto__" === b) throw ia("isecfld", a);
        return b;
    }
    function Ja(b, a) {
        if (b) {
            if (b.constructor === b) throw ia("isecfn", a);
            if (b.window === b) throw ia("isecwindow", a);
            if (b.children && (b.nodeName || b.prop && b.attr && b.find)) throw ia("isecdom", a);
            if (b === Object) throw ia("isecobj", a);
        }
        return b;
    }
    function ub(b, a, c, d) {
        a = a.split(".");
        for (var e, f = 0; 1 < a.length; f++) {
            e = qa(a.shift(), d);
            var h = b[e];
            h || (h = {}, b[e] = h);
            b = h;
        }
        e = qa(a.shift(), d);
        Ja(b, d);
        Ja(b[e], d);
        return b[e] = c;
    }
    function Mc(b, a, c, d, e, f) {
        qa(b, f);
        qa(a, f);
        qa(c, f);
        qa(d, f);
        qa(e, f);
        return function(f, g) {
            var n = g && g.hasOwnProperty(b) ? g : f;
            if (null == n) return n;
            n = n[b];
            if (!a) return n;
            if (null == n) return t;
            n = n[a];
            if (!c) return n;
            if (null == n) return t;
            n = n[c];
            if (!d) return n;
            if (null == n) return t;
            n = n[d];
            return e ? null == n ? t : n = n[e] : n;
        };
    }
    function Nc(b, a, c) {
        if (Vb.hasOwnProperty(b)) return Vb[b];
        var d = b.split("."), e = d.length;
        if (a.csp) a = 6 > e ? Mc(d[0], d[1], d[2], d[3], d[4], c) : function(a, b) {
            var f = 0, l;
            do l = Mc(d[f++], d[f++], d[f++], d[f++], d[f++], c)(a, b), b = t, a = l; while (f < e);
            return l;
        }; else {
            var f = "var p;\n";
            q(d, function(a, b) {
                qa(a, c);
                f += "if(s == null) return undefined;\ns=" + (b ? "s" : '((k&&k.hasOwnProperty("' + a + '"))?k:s)') + '["' + a + '"];\n';
            });
            f += "return s;";
            a = new Function("s", "k", f);
            a.toString = ba(f);
        }
        "hasOwnProperty" !== b && (Vb[b] = a);
        return a;
    }
    function re() {
        var b = {}, a = {
            csp: !1
        };
        this.$get = [ "$filter", "$sniffer", function(c, d) {
            function e(a, b, c, d, e) {
                var f, h;
                return f = a.$watch(function(a) {
                    return e(a);
                }, function(a, c, d) {
                    h = a;
                    A(b) && b.apply(this, arguments);
                    v(a) && d.$$postDigest(function() {
                        v(h) && f();
                    });
                }, c, d);
            }
            function f(a, b, c, d, e) {
                var f;
                return f = a.$watch(function(a) {
                    return e(a);
                }, function(a, c, d) {
                    A(b) && b.apply(this, arguments);
                    f();
                }, c, d);
            }
            function h(a, b) {
                if (A(b)) {
                    var c = function(c, d) {
                        var e = a(c, d), f = b(e, c, d);
                        return v(e) ? f : e;
                    };
                    c.$$watchDelegate = a.$$watchDelegate;
                    return c;
                }
                return a;
            }
            a.csp = d.csp;
            return function(d, n) {
                var l, m, p = d = Z(d);
                switch (typeof d) {
                  case "string":
                    return b.hasOwnProperty(p) ? l = b[p] : (":" === d.charAt(0) && ":" === d.charAt(1) && (m = !0, 
                    d = d.substring(2)), l = new Wb(a), l = new Ya(l, c, a).parse(d), l.constant ? l.$$watchDelegate = f : m && (l.$$watchDelegate = e), 
                    "hasOwnProperty" !== p && (b[p] = l)), h(l, n);

                  case "function":
                    return h(d, n);

                  default:
                    return h(B, n);
                }
            };
        } ];
    }
    function te() {
        this.$get = [ "$rootScope", "$exceptionHandler", function(b, a) {
            return Oc(function(a) {
                b.$evalAsync(a);
            }, a);
        } ];
    }
    function ue() {
        this.$get = [ "$browser", "$exceptionHandler", function(b, a) {
            return Oc(function(a) {
                b.defer(a);
            }, a);
        } ];
    }
    function Oc(b, a) {
        function c(a) {
            return a;
        }
        function d(a) {
            return h(a);
        }
        var e = function() {
            var h = [], l, m;
            return m = {
                resolve: function(a) {
                    if (h) {
                        var c = h;
                        h = t;
                        l = f(a);
                        c.length && b(function() {
                            for (var a, b = 0, d = c.length; b < d; b++) a = c[b], l.then(a[0], a[1], a[2]);
                        });
                    }
                },
                reject: function(a) {
                    m.resolve(g(a));
                },
                notify: function(a) {
                    if (h) {
                        var c = h;
                        h.length && b(function() {
                            for (var b, d = 0, e = c.length; d < e; d++) b = c[d], b[2](a);
                        });
                    }
                },
                promise: {
                    then: function(b, f, g) {
                        var m = e(), L = function(d) {
                            try {
                                m.resolve((A(b) ? b : c)(d));
                            } catch (e) {
                                m.reject(e), a(e);
                            }
                        }, u = function(b) {
                            try {
                                m.resolve((A(f) ? f : d)(b));
                            } catch (c) {
                                m.reject(c), a(c);
                            }
                        }, K = function(b) {
                            try {
                                m.notify((A(g) ? g : c)(b));
                            } catch (d) {
                                a(d);
                            }
                        };
                        h ? h.push([ L, u, K ]) : l.then(L, u, K);
                        return m.promise;
                    },
                    "catch": function(a) {
                        return this.then(null, a);
                    },
                    "finally": function(a) {
                        function b(a, c) {
                            var d = e();
                            c ? d.resolve(a) : d.reject(a);
                            return d.promise;
                        }
                        function d(e, f) {
                            var g = null;
                            try {
                                g = (a || c)();
                            } catch (h) {
                                return b(h, !1);
                            }
                            return g && A(g.then) ? g.then(function() {
                                return b(e, f);
                            }, function(a) {
                                return b(a, !1);
                            }) : b(e, f);
                        }
                        return this.then(function(a) {
                            return d(a, !0);
                        }, function(a) {
                            return d(a, !1);
                        });
                    }
                }
            };
        }, f = function(a) {
            return a && A(a.then) ? a : {
                then: function(c) {
                    var d = e();
                    b(function() {
                        d.resolve(c(a));
                    });
                    return d.promise;
                }
            };
        }, h = function(a) {
            var b = e();
            b.reject(a);
            return b.promise;
        }, g = function(c) {
            return {
                then: function(f, g) {
                    var h = e();
                    b(function() {
                        try {
                            h.resolve((A(g) ? g : d)(c));
                        } catch (b) {
                            h.reject(b), a(b);
                        }
                    });
                    return h.promise;
                }
            };
        };
        return {
            defer: e,
            reject: h,
            when: function(g, l, m, p) {
                var k = e(), s, r = function(b) {
                    try {
                        return (A(l) ? l : c)(b);
                    } catch (d) {
                        return a(d), h(d);
                    }
                }, L = function(b) {
                    try {
                        return (A(m) ? m : d)(b);
                    } catch (c) {
                        return a(c), h(c);
                    }
                }, u = function(b) {
                    try {
                        return (A(p) ? p : c)(b);
                    } catch (d) {
                        a(d);
                    }
                };
                b(function() {
                    f(g).then(function(a) {
                        s || (s = !0, k.resolve(f(a).then(r, L, u)));
                    }, function(a) {
                        s || (s = !0, k.resolve(L(a)));
                    }, function(a) {
                        s || k.notify(u(a));
                    });
                });
                return k.promise;
            },
            all: function(a) {
                var b = e(), c = 0, d = M(a) ? [] : {};
                q(a, function(a, e) {
                    c++;
                    f(a).then(function(a) {
                        d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d));
                    }, function(a) {
                        d.hasOwnProperty(e) || b.reject(a);
                    });
                });
                0 === c && b.resolve(d);
                return b.promise;
            }
        };
    }
    function Be() {
        this.$get = [ "$window", "$timeout", function(b, a) {
            var c = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame, d = b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.mozCancelAnimationFrame || b.webkitCancelRequestAnimationFrame, e = !!c, f = e ? function(a) {
                var b = c(a);
                return function() {
                    d(b);
                };
            } : function(b) {
                var c = a(b, 16.66, !1);
                return function() {
                    a.cancel(c);
                };
            };
            f.supported = e;
            return f;
        } ];
    }
    function se() {
        var b = 10, a = O("$rootScope"), c = null;
        this.digestTtl = function(a) {
            arguments.length && (b = a);
            return b;
        };
        this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function(d, e, f, h) {
            function g() {
                this.$id = ++cb;
                this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                this["this"] = this.$root = this;
                this.$$destroyed = !1;
                this.$$asyncQueue = [];
                this.$$postDigestQueue = [];
                this.$$listeners = {};
                this.$$listenerCount = {};
                this.$$isolateBindings = {};
            }
            function n(b) {
                if (k.$$phase) throw a("inprog", k.$$phase);
                k.$$phase = b;
            }
            function l(a, b) {
                var c = f(a);
                Pa(c, b);
                return c;
            }
            function m(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent);
            }
            function p() {}
            g.prototype = {
                constructor: g,
                $new: function(a) {
                    a ? (a = new g(), a.$root = this.$root, a.$$asyncQueue = this.$$asyncQueue, a.$$postDigestQueue = this.$$postDigestQueue) : (this.$$childScopeClass || (this.$$childScopeClass = function() {
                        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;
                        this.$$listeners = {};
                        this.$$listenerCount = {};
                        this.$id = ++cb;
                        this.$$childScopeClass = null;
                    }, this.$$childScopeClass.prototype = this), a = new this.$$childScopeClass());
                    a["this"] = a;
                    a.$parent = this;
                    a.$$prevSibling = this.$$childTail;
                    this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a;
                    return a;
                },
                $watch: function(a, b, d, e) {
                    var f = l(a, "watch");
                    if (f.$$watchDelegate) return f.$$watchDelegate(this, b, d, e, f);
                    var g = this.$$watchers, h = {
                        fn: b,
                        last: p,
                        get: f,
                        exp: a,
                        eq: !!d
                    };
                    c = null;
                    A(b) || (h.fn = B);
                    g || (g = this.$$watchers = []);
                    g.unshift(h);
                    return function() {
                        Da(g, h);
                        c = null;
                        A(e) && e();
                    };
                },
                $watchGroup: function(a, b) {
                    var c = Array(a.length), d = Array(a.length), e = [], f = 0, g = this, h;
                    if (1 === a.length) return this.$watch(a[0], function(a, e, f) {
                        d[0] = a;
                        c[0] = e;
                        b.call(this, d, a === e ? d : c, f);
                    });
                    q(a, function(a, b) {
                        var k = g.$watch(a, function(a, e) {
                            d[b] = a;
                            c[b] = e;
                            f++;
                        }, !1, function() {
                            Da(e, k);
                            e.length || h();
                        });
                        e.push(k);
                    }, this);
                    h = g.$watch(function() {
                        return f;
                    }, function(a, e) {
                        b(d, a === e ? d : c, g);
                    });
                    return function() {
                        for (;e.length; ) e[0]();
                    };
                },
                $watchCollection: function(a, b) {
                    var c = this, d, e, g, h = 1 < b.length, k = 0, n = f(a, function(a) {
                        d = a;
                        var b, c;
                        if (Q(d)) if (bb(d)) for (e !== l && (e = l, q = e.length = 0, k++), a = d.length, 
                        q !== a && (k++, e.length = q = a), b = 0; b < a; b++) c = e[b] !== e[b] && d[b] !== d[b], 
                        c || e[b] === d[b] || (k++, e[b] = d[b]); else {
                            e !== m && (e = m = {}, q = 0, k++);
                            a = 0;
                            for (b in d) d.hasOwnProperty(b) && (a++, e.hasOwnProperty(b) ? (c = e[b] !== e[b] && d[b] !== d[b], 
                            c || e[b] === d[b] || (k++, e[b] = d[b])) : (q++, e[b] = d[b], k++));
                            if (q > a) for (b in k++, e) e.hasOwnProperty(b) && !d.hasOwnProperty(b) && (q--, 
                            delete e[b]);
                        } else e !== d && (e = d, k++);
                        return k;
                    }), l = [], m = {}, p = !0, q = 0;
                    return this.$watch(n, function() {
                        p ? (p = !1, b(d, d, c)) : b(d, g, c);
                        if (h) if (Q(d)) if (bb(d)) {
                            g = Array(d.length);
                            for (var a = 0; a < d.length; a++) g[a] = d[a];
                        } else for (a in g = {}, d) Db.call(d, a) && (g[a] = d[a]); else g = d;
                    });
                },
                $digest: function() {
                    var d, f, g, h, l = this.$$asyncQueue, m = this.$$postDigestQueue, x, q, v = b, N, R = [], H, C, D;
                    n("$digest");
                    c = null;
                    do {
                        q = !1;
                        for (N = this; l.length; ) {
                            try {
                                D = l.shift(), D.scope.$eval(D.expression);
                            } catch (t) {
                                k.$$phase = null, e(t);
                            }
                            c = null;
                        }
                        a: do {
                            if (h = N.$$watchers) for (x = h.length; x--; ) try {
                                if (d = h[x]) if ((f = d.get(N)) !== (g = d.last) && !(d.eq ? ra(f, g) : "number" === typeof f && "number" === typeof g && isNaN(f) && isNaN(g))) q = !0, 
                                c = d, d.last = d.eq ? Ea(f, null) : f, d.fn(f, g === p ? f : g, N), 5 > v && (H = 4 - v, 
                                R[H] || (R[H] = []), C = A(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, 
                                C += "; newVal: " + sa(f) + "; oldVal: " + sa(g), R[H].push(C)); else if (d === c) {
                                    q = !1;
                                    break a;
                                }
                            } catch (E) {
                                k.$$phase = null, e(E);
                            }
                            if (!(h = N.$$childHead || N !== this && N.$$nextSibling)) for (;N !== this && !(h = N.$$nextSibling); ) N = N.$parent;
                        } while (N = h);
                        if ((q || l.length) && !v--) throw k.$$phase = null, a("infdig", b, sa(R));
                    } while (q || l.length);
                    for (k.$$phase = null; m.length; ) try {
                        m.shift()();
                    } catch (z) {
                        e(z);
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy");
                        this.$$destroyed = !0;
                        this !== k && (q(this.$$listenerCount, Cb(null, m, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), 
                        a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), 
                        this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, 
                        this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], 
                        this.$destroy = this.$digest = this.$apply = B, this.$on = this.$watch = this.$watchGroup = function() {
                            return B;
                        });
                    }
                },
                $eval: function(a, b) {
                    return f(a)(this, b);
                },
                $evalAsync: function(a) {
                    k.$$phase || k.$$asyncQueue.length || h.defer(function() {
                        k.$$asyncQueue.length && k.$digest();
                    });
                    this.$$asyncQueue.push({
                        scope: this,
                        expression: a
                    });
                },
                $$postDigest: function(a) {
                    this.$$postDigestQueue.push(a);
                },
                $apply: function(a) {
                    try {
                        return n("$apply"), this.$eval(a);
                    } catch (b) {
                        e(b);
                    } finally {
                        k.$$phase = null;
                        try {
                            k.$digest();
                        } catch (c) {
                            throw e(c), c;
                        }
                    }
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []);
                    c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
                    var e = this;
                    return function() {
                        c[Ma(c, b)] = null;
                        m(e, 1, a);
                    };
                },
                $emit: function(a, b) {
                    var c = [], d, f = this, g = !1, h = {
                        name: a,
                        targetScope: f,
                        stopPropagation: function() {
                            g = !0;
                        },
                        preventDefault: function() {
                            h.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, k = [ h ].concat(ka.call(arguments, 1)), n, l;
                    do {
                        d = f.$$listeners[a] || c;
                        h.currentScope = f;
                        n = 0;
                        for (l = d.length; n < l; n++) if (d[n]) try {
                            d[n].apply(null, k);
                        } catch (m) {
                            e(m);
                        } else d.splice(n, 1), n--, l--;
                        if (g) return h.currentScope = null, h;
                        f = f.$parent;
                    } while (f);
                    h.currentScope = null;
                    return h;
                },
                $broadcast: function(a, b) {
                    for (var c = this, d = this, f = {
                        name: a,
                        targetScope: this,
                        preventDefault: function() {
                            f.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, g = [ f ].concat(ka.call(arguments, 1)), h, k; c = d; ) {
                        f.currentScope = c;
                        d = c.$$listeners[a] || [];
                        h = 0;
                        for (k = d.length; h < k; h++) if (d[h]) try {
                            d[h].apply(null, g);
                        } catch (n) {
                            e(n);
                        } else d.splice(h, 1), h--, k--;
                        if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (;c !== this && !(d = c.$$nextSibling); ) c = c.$parent;
                    }
                    f.currentScope = null;
                    return f;
                }
            };
            var k = new g();
            return k;
        } ];
    }
    function vd() {
        var b = /^\s*(https?|ftp|mailto|tel|file):/, a = /^\s*(https?|ftp|file|blob):|data:image\//;
        this.aHrefSanitizationWhitelist = function(a) {
            return v(a) ? (b = a, this) : b;
        };
        this.imgSrcSanitizationWhitelist = function(b) {
            return v(b) ? (a = b, this) : a;
        };
        this.$get = function() {
            return function(c, d) {
                var e = d ? a : b, f;
                if (!T || 8 <= T) if (f = va(c).href, "" !== f && !f.match(e)) return "unsafe:" + f;
                return c;
            };
        };
    }
    function Xe(b) {
        if ("self" === b) return b;
        if (G(b)) {
            if (-1 < b.indexOf("***")) throw wa("iwcard", b);
            b = b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08").replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");
            return RegExp("^" + b + "$");
        }
        if (db(b)) return RegExp("^" + b.source + "$");
        throw wa("imatcher");
    }
    function Pc(b) {
        var a = [];
        v(b) && q(b, function(b) {
            a.push(Xe(b));
        });
        return a;
    }
    function we() {
        this.SCE_CONTEXTS = fa;
        var b = [ "self" ], a = [];
        this.resourceUrlWhitelist = function(a) {
            arguments.length && (b = Pc(a));
            return b;
        };
        this.resourceUrlBlacklist = function(b) {
            arguments.length && (a = Pc(b));
            return a;
        };
        this.$get = [ "$injector", function(c) {
            function d(a) {
                var b = function(a) {
                    this.$$unwrapTrustedValue = function() {
                        return a;
                    };
                };
                a && (b.prototype = new a());
                b.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue();
                };
                b.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString();
                };
                return b;
            }
            var e = function(a) {
                throw wa("unsafe");
            };
            c.has("$sanitize") && (e = c.get("$sanitize"));
            var f = d(), h = {};
            h[fa.HTML] = d(f);
            h[fa.CSS] = d(f);
            h[fa.URL] = d(f);
            h[fa.JS] = d(f);
            h[fa.RESOURCE_URL] = d(h[fa.URL]);
            return {
                trustAs: function(a, b) {
                    var c = h.hasOwnProperty(a) ? h[a] : null;
                    if (!c) throw wa("icontext", a, b);
                    if (null === b || b === t || "" === b) return b;
                    if ("string" !== typeof b) throw wa("itype", a);
                    return new c(b);
                },
                getTrusted: function(c, d) {
                    if (null === d || d === t || "" === d) return d;
                    var f = h.hasOwnProperty(c) ? h[c] : null;
                    if (f && d instanceof f) return d.$$unwrapTrustedValue();
                    if (c === fa.RESOURCE_URL) {
                        var f = va(d.toString()), m, p, k = !1;
                        m = 0;
                        for (p = b.length; m < p; m++) if ("self" === b[m] ? Ob(f) : b[m].exec(f.href)) {
                            k = !0;
                            break;
                        }
                        if (k) for (m = 0, p = a.length; m < p; m++) if ("self" === a[m] ? Ob(f) : a[m].exec(f.href)) {
                            k = !1;
                            break;
                        }
                        if (k) return d;
                        throw wa("insecurl", d.toString());
                    }
                    if (c === fa.HTML) return e(d);
                    throw wa("unsafe");
                },
                valueOf: function(a) {
                    return a instanceof f ? a.$$unwrapTrustedValue() : a;
                }
            };
        } ];
    }
    function ve() {
        var b = !0;
        this.enabled = function(a) {
            arguments.length && (b = !!a);
            return b;
        };
        this.$get = [ "$parse", "$sniffer", "$sceDelegate", function(a, c, d) {
            if (b && c.msie && 8 > c.msieDocumentMode) throw wa("iequirks");
            var e = ja(fa);
            e.isEnabled = function() {
                return b;
            };
            e.trustAs = d.trustAs;
            e.getTrusted = d.getTrusted;
            e.valueOf = d.valueOf;
            b || (e.trustAs = e.getTrusted = function(a, b) {
                return b;
            }, e.valueOf = Ba);
            e.parseAs = function(b, c) {
                var d = a(c);
                return d.literal && d.constant ? d : a(c, function(a) {
                    return e.getTrusted(b, a);
                });
            };
            var f = e.parseAs, h = e.getTrusted, g = e.trustAs;
            q(fa, function(a, b) {
                var c = J(b);
                e[Sa("parse_as_" + c)] = function(b) {
                    return f(a, b);
                };
                e[Sa("get_trusted_" + c)] = function(b) {
                    return h(a, b);
                };
                e[Sa("trust_as_" + c)] = function(b) {
                    return g(a, b);
                };
            });
            return e;
        } ];
    }
    function xe() {
        this.$get = [ "$window", "$document", function(b, a) {
            var c = {}, d = U((/android (\d+)/.exec(J((b.navigator || {}).userAgent)) || [])[1]), e = /Boxee/i.test((b.navigator || {}).userAgent), f = a[0] || {}, h = f.documentMode, g, n = /^(Moz|webkit|O|ms)(?=[A-Z])/, l = f.body && f.body.style, m = !1, p = !1;
            if (l) {
                for (var k in l) if (m = n.exec(k)) {
                    g = m[0];
                    g = g.substr(0, 1).toUpperCase() + g.substr(1);
                    break;
                }
                g || (g = "WebkitOpacity" in l && "webkit");
                m = !!("transition" in l || g + "Transition" in l);
                p = !!("animation" in l || g + "Animation" in l);
                !d || m && p || (m = G(f.body.style.webkitTransition), p = G(f.body.style.webkitAnimation));
            }
            return {
                history: !(!b.history || !b.history.pushState || 4 > d || e),
                hashchange: "onhashchange" in b && (!h || 7 < h),
                hasEvent: function(a) {
                    if ("input" == a && 9 == T) return !1;
                    if (F(c[a])) {
                        var b = f.createElement("div");
                        c[a] = "on" + a in b;
                    }
                    return c[a];
                },
                csp: Qa(),
                vendorPrefix: g,
                transitions: m,
                animations: p,
                android: d,
                msie: T,
                msieDocumentMode: h
            };
        } ];
    }
    function ze() {
        this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(b, a, c, d, e) {
            function f(f, n, l) {
                var m = v(l) && !l, p = (m ? d : c).defer(), k = p.promise;
                n = a.defer(function() {
                    try {
                        p.resolve(f());
                    } catch (a) {
                        p.reject(a), e(a);
                    } finally {
                        delete h[k.$$timeoutId];
                    }
                    m || b.$apply();
                }, n);
                k.$$timeoutId = n;
                h[n] = p;
                return k;
            }
            var h = {};
            f.cancel = function(b) {
                return b && b.$$timeoutId in h ? (h[b.$$timeoutId].reject("canceled"), delete h[b.$$timeoutId], 
                a.defer.cancel(b.$$timeoutId)) : !1;
            };
            return f;
        } ];
    }
    function va(b, a) {
        var c = b;
        T && ($.setAttribute("href", c), c = $.href);
        $.setAttribute("href", c);
        return {
            href: $.href,
            protocol: $.protocol ? $.protocol.replace(/:$/, "") : "",
            host: $.host,
            search: $.search ? $.search.replace(/^\?/, "") : "",
            hash: $.hash ? $.hash.replace(/^#/, "") : "",
            hostname: $.hostname,
            port: $.port,
            pathname: "/" === $.pathname.charAt(0) ? $.pathname : "/" + $.pathname
        };
    }
    function Ob(b) {
        b = G(b) ? va(b) : b;
        return b.protocol === Qc.protocol && b.host === Qc.host;
    }
    function Ae() {
        this.$get = ba(P);
    }
    function pc(b) {
        function a(d, e) {
            if (Q(d)) {
                var f = {};
                q(d, function(b, c) {
                    f[c] = a(c, b);
                });
                return f;
            }
            return b.factory(d + c, e);
        }
        var c = "Filter";
        this.register = a;
        this.$get = [ "$injector", function(a) {
            return function(b) {
                return a.get(b + c);
            };
        } ];
        a("currency", Rc);
        a("date", Sc);
        a("filter", Ye);
        a("json", Ze);
        a("limitTo", $e);
        a("lowercase", af);
        a("number", Tc);
        a("orderBy", Uc);
        a("uppercase", bf);
    }
    function Ye() {
        return function(b, a, c) {
            if (!M(b)) return b;
            var d = typeof c, e = [];
            e.check = function(a) {
                for (var b = 0; b < e.length; b++) if (!e[b](a)) return !1;
                return !0;
            };
            "function" !== d && (c = "boolean" === d && c ? function(a, b) {
                return Oa.equals(a, b);
            } : function(a, b) {
                if (a && b && "object" === typeof a && "object" === typeof b) {
                    for (var d in a) if ("$" !== d.charAt(0) && Db.call(a, d) && c(a[d], b[d])) return !0;
                    return !1;
                }
                b = ("" + b).toLowerCase();
                return -1 < ("" + a).toLowerCase().indexOf(b);
            });
            var f = function(a, b) {
                if ("string" == typeof b && "!" === b.charAt(0)) return !f(a, b.substr(1));
                switch (typeof a) {
                  case "boolean":
                  case "number":
                  case "string":
                    return c(a, b);

                  case "object":
                    switch (typeof b) {
                      case "object":
                        return c(a, b);

                      default:
                        for (var d in a) if ("$" !== d.charAt(0) && f(a[d], b)) return !0;
                    }
                    return !1;

                  case "array":
                    for (d = 0; d < a.length; d++) if (f(a[d], b)) return !0;
                    return !1;

                  default:
                    return !1;
                }
            };
            switch (typeof a) {
              case "boolean":
              case "number":
              case "string":
                a = {
                    $: a
                };

              case "object":
                for (var h in a) (function(b) {
                    "undefined" !== typeof a[b] && e.push(function(c) {
                        return f("$" == b ? c : c && c[b], a[b]);
                    });
                })(h);
                break;

              case "function":
                e.push(a);
                break;

              default:
                return b;
            }
            d = [];
            for (h = 0; h < b.length; h++) {
                var g = b[h];
                e.check(g) && d.push(g);
            }
            return d;
        };
    }
    function Rc(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            F(d) && (d = a.CURRENCY_SYM);
            return Vc(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, 2).replace(/\u00A4/g, d);
        };
    }
    function Tc(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            return Vc(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d);
        };
    }
    function Vc(b, a, c, d, e) {
        if (null == b || !isFinite(b) || Q(b)) return "";
        var f = 0 > b;
        b = Math.abs(b);
        var h = b + "", g = "", n = [], l = !1;
        if (-1 !== h.indexOf("e")) {
            var m = h.match(/([\d\.]+)e(-?)(\d+)/);
            m && "-" == m[2] && m[3] > e + 1 ? (h = "0", b = 0) : (g = h, l = !0);
        }
        if (l) 0 < e && -1 < b && 1 > b && (g = b.toFixed(e)); else {
            h = (h.split(Wc)[1] || "").length;
            F(e) && (e = Math.min(Math.max(a.minFrac, h), a.maxFrac));
            b = +(Math.round(+(b.toString() + "e" + e)).toString() + "e" + -e);
            b = ("" + b).split(Wc);
            h = b[0];
            b = b[1] || "";
            var m = 0, p = a.lgSize, k = a.gSize;
            if (h.length >= p + k) for (m = h.length - p, l = 0; l < m; l++) 0 === (m - l) % k && 0 !== l && (g += c), 
            g += h.charAt(l);
            for (l = m; l < h.length; l++) 0 === (h.length - l) % p && 0 !== l && (g += c), 
            g += h.charAt(l);
            for (;b.length < e; ) b += "0";
            e && "0" !== e && (g += d + b.substr(0, e));
        }
        n.push(f ? a.negPre : a.posPre);
        n.push(g);
        n.push(f ? a.negSuf : a.posSuf);
        return n.join("");
    }
    function vb(b, a, c) {
        var d = "";
        0 > b && (d = "-", b = -b);
        for (b = "" + b; b.length < a; ) b = "0" + b;
        c && (b = b.substr(b.length - a));
        return d + b;
    }
    function aa(b, a, c, d) {
        c = c || 0;
        return function(e) {
            e = e["get" + b]();
            if (0 < c || e > -c) e += c;
            0 === e && -12 == c && (e = 12);
            return vb(e, a, d);
        };
    }
    function wb(b, a) {
        return function(c, d) {
            var e = c["get" + b](), f = ib(a ? "SHORT" + b : b);
            return d[f][e];
        };
    }
    function Xc(b) {
        var a = new Date(b, 0, 1).getDay();
        return new Date(b, 0, (4 >= a ? 5 : 12) - a);
    }
    function Yc(b) {
        return function(a) {
            var c = Xc(a.getFullYear());
            a = +new Date(a.getFullYear(), a.getMonth(), a.getDate() + (4 - a.getDay())) - +c;
            a = 1 + Math.round(a / 6048e5);
            return vb(a, b);
        };
    }
    function Sc(b) {
        function a(a) {
            var b;
            if (b = a.match(c)) {
                a = new Date(0);
                var f = 0, h = 0, g = b[8] ? a.setUTCFullYear : a.setFullYear, n = b[8] ? a.setUTCHours : a.setHours;
                b[9] && (f = U(b[9] + b[10]), h = U(b[9] + b[11]));
                g.call(a, U(b[1]), U(b[2]) - 1, U(b[3]));
                f = U(b[4] || 0) - f;
                h = U(b[5] || 0) - h;
                g = U(b[6] || 0);
                b = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
                n.call(a, f, h, g, b);
            }
            return a;
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, e) {
            var f = "", h = [], g, n;
            e = e || "mediumDate";
            e = b.DATETIME_FORMATS[e] || e;
            G(c) && (c = cf.test(c) ? U(c) : a(c));
            Ca(c) && (c = new Date(c));
            if (!da(c)) return c;
            for (;e; ) (n = df.exec(e)) ? (h = h.concat(ka.call(n, 1)), e = h.pop()) : (h.push(e), 
            e = null);
            q(h, function(a) {
                g = ef[a];
                f += g ? g(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            });
            return f;
        };
    }
    function Ze() {
        return function(b) {
            return sa(b, !0);
        };
    }
    function $e() {
        return function(b, a) {
            if (!M(b) && !G(b)) return b;
            a = 1/0 === Math.abs(Number(a)) ? Number(a) : U(a);
            if (G(b)) return a ? 0 <= a ? b.slice(0, a) : b.slice(a, b.length) : "";
            var c = [], d, e;
            a > b.length ? a = b.length : a < -b.length && (a = -b.length);
            0 < a ? (d = 0, e = a) : (d = b.length + a, e = b.length);
            for (;d < e; d++) c.push(b[d]);
            return c;
        };
    }
    function Uc(b) {
        return function(a, c, d) {
            function e(a, b) {
                return b ? function(b, c) {
                    return a(c, b);
                } : a;
            }
            function f(a, b) {
                var c = typeof a, d = typeof b;
                return c == d ? (da(a) && da(b) && (a = a.valueOf(), b = b.valueOf()), "string" == c && (a = a.toLowerCase(), 
                b = b.toLowerCase()), a === b ? 0 : a < b ? -1 : 1) : c < d ? -1 : 1;
            }
            if (!M(a) || !c) return a;
            c = M(c) ? c : [ c ];
            c = ld(c, function(a) {
                var c = !1, d = a || Ba;
                if (G(a)) {
                    if ("+" == a.charAt(0) || "-" == a.charAt(0)) c = "-" == a.charAt(0), a = a.substring(1);
                    d = b(a);
                    if (d.constant) {
                        var g = d();
                        return e(function(a, b) {
                            return f(a[g], b[g]);
                        }, c);
                    }
                }
                return e(function(a, b) {
                    return f(d(a), d(b));
                }, c);
            });
            for (var h = [], g = 0; g < a.length; g++) h.push(a[g]);
            return h.sort(e(function(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e) return e;
                }
                return 0;
            }, d));
        };
    }
    function xa(b) {
        A(b) && (b = {
            link: b
        });
        b.restrict = b.restrict || "AC";
        return ba(b);
    }
    function Zc(b, a, c, d) {
        function e(a, c) {
            c = c ? "-" + gb(c, "-") : "";
            d.removeClass(b, (a ? xb : yb) + c);
            d.addClass(b, (a ? yb : xb) + c);
        }
        var f = this, h = b.parent().controller("form") || zb, g = 0, n = f.$error = {}, l = [];
        f.$name = a.name || a.ngForm;
        f.$dirty = !1;
        f.$pristine = !0;
        f.$valid = !0;
        f.$invalid = !1;
        h.$addControl(f);
        b.addClass(Ka);
        e(!0);
        f.$rollbackViewValue = function() {
            q(l, function(a) {
                a.$rollbackViewValue();
            });
        };
        f.$commitViewValue = function() {
            q(l, function(a) {
                a.$commitViewValue();
            });
        };
        f.$addControl = function(a) {
            Aa(a.$name, "input");
            l.push(a);
            a.$name && (f[a.$name] = a);
        };
        f.$removeControl = function(a) {
            a.$name && f[a.$name] === a && delete f[a.$name];
            q(n, function(b, c) {
                f.$setValidity(c, !0, a);
            });
            Da(l, a);
        };
        f.$setValidity = function(a, b, c) {
            var d = n[a];
            if (b) d && (Da(d, c), d.length || (g--, g || (e(b), f.$valid = !0, f.$invalid = !1), 
            n[a] = !1, e(!0, a), h.$setValidity(a, !0, f))); else {
                g || e(b);
                if (d) {
                    if (-1 != Ma(d, c)) return;
                } else n[a] = d = [], g++, e(!1, a), h.$setValidity(a, !1, f);
                d.push(c);
                f.$valid = !1;
                f.$invalid = !0;
            }
        };
        f.$setDirty = function() {
            d.removeClass(b, Ka);
            d.addClass(b, Ab);
            f.$dirty = !0;
            f.$pristine = !1;
            h.$setDirty();
        };
        f.$setPristine = function() {
            d.removeClass(b, Ab);
            d.addClass(b, Ka);
            f.$dirty = !1;
            f.$pristine = !0;
            q(l, function(a) {
                a.$setPristine();
            });
        };
    }
    function Xb(b, a, c, d) {
        b.$setValidity(a, c);
        return c ? d : t;
    }
    function $c(b, a) {
        var c, d;
        if (a) for (c = 0; c < a.length; ++c) if (d = a[c], b[d]) return !0;
        return !1;
    }
    function ff(b, a, c, d, e) {
        Q(e) && (b.$$hasNativeValidators = !0, b.$parsers.push(function(f) {
            if (b.$error[a] || $c(e, d) || !$c(e, c)) return f;
            b.$setValidity(a, !1);
        }));
    }
    function Za(b, a, c, d, e, f) {
        var h = a.prop(gf), g = a[0].placeholder, n = {};
        d.$$validityState = h;
        if (!e.android) {
            var l = !1;
            a.on("compositionstart", function(a) {
                l = !0;
            });
            a.on("compositionend", function() {
                l = !1;
                m();
            });
        }
        var m = function(e) {
            if (!l) {
                var f = a.val(), k = e && e.type;
                if (T && "input" === (e || n).type && a[0].placeholder !== g) g = a[0].placeholder; else {
                    c.ngTrim && "false" === c.ngTrim || (f = Z(f));
                    var m = h && d.$$hasNativeValidators;
                    if (d.$viewValue !== f || "" === f && m) b.$$phase ? d.$setViewValue(f, k, m) : b.$apply(function() {
                        d.$setViewValue(f, k, m);
                    });
                }
            }
        };
        if (e.hasEvent("input")) a.on("input", m); else {
            var p, k = function(a) {
                p || (p = f.defer(function() {
                    m(a);
                    p = null;
                }));
            };
            a.on("keydown", function(a) {
                var b = a.keyCode;
                91 === b || 15 < b && 19 > b || 37 <= b && 40 >= b || k(a);
            });
            if (e.hasEvent("paste")) a.on("paste cut", k);
        }
        a.on("change", m);
        d.$render = function() {
            a.val(d.$isEmpty(d.$viewValue) ? "" : d.$viewValue);
        };
    }
    function Bb(b, a) {
        return function(c) {
            var d;
            return da(c) ? c : G(c) && (b.lastIndex = 0, c = b.exec(c)) ? (c.shift(), d = {
                yyyy: 0,
                MM: 1,
                dd: 1,
                HH: 0,
                mm: 0
            }, q(c, function(b, c) {
                c < a.length && (d[a[c]] = +b);
            }), new Date(d.yyyy, d.MM - 1, d.dd, d.HH, d.mm)) : 0/0;
        };
    }
    function $a(b, a, c, d) {
        return function(e, f, h, g, n, l, m) {
            Za(e, f, h, g, n, l);
            g.$parsers.push(function(d) {
                if (g.$isEmpty(d)) return g.$setValidity(b, !0), null;
                if (a.test(d)) return g.$setValidity(b, !0), c(d);
                g.$setValidity(b, !1);
                return t;
            });
            g.$formatters.push(function(a) {
                return da(a) ? m("date")(a, d) : "";
            });
            h.min && (e = function(a) {
                var b = g.$isEmpty(a) || c(a) >= c(h.min);
                g.$setValidity("min", b);
                return b ? a : t;
            }, g.$parsers.push(e), g.$formatters.push(e));
            h.max && (e = function(a) {
                var b = g.$isEmpty(a) || c(a) <= c(h.max);
                g.$setValidity("max", b);
                return b ? a : t;
            }, g.$parsers.push(e), g.$formatters.push(e));
        };
    }
    function ad(b, a, c, d, e) {
        if (v(d)) {
            b = b(d);
            if (!b.constant) throw new O("ngModel")("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", c, d);
            return b(a);
        }
        return e;
    }
    function Yb(b, a) {
        b = "ngClass" + b;
        return [ "$animate", function(c) {
            function d(a, b) {
                var c = [], d = 0;
                a: for (;d < a.length; d++) {
                    for (var e = a[d], m = 0; m < b.length; m++) if (e == b[m]) continue a;
                    c.push(e);
                }
                return c;
            }
            function e(a) {
                if (!M(a)) {
                    if (G(a)) return a.split(" ");
                    if (Q(a)) {
                        var b = [];
                        q(a, function(a, c) {
                            a && (b = b.concat(c.split(" ")));
                        });
                        return b;
                    }
                }
                return a;
            }
            return {
                restrict: "AC",
                link: function(f, h, g) {
                    function n(a, b) {
                        var c = h.data("$classCounts") || {}, d = [];
                        q(a, function(a) {
                            if (0 < b || c[a]) c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a);
                        });
                        h.data("$classCounts", c);
                        return d.join(" ");
                    }
                    function l(b) {
                        if (!0 === a || f.$index % 2 === a) {
                            var k = e(b || []);
                            if (!m) {
                                var l = n(k, 1);
                                g.$addClass(l);
                            } else if (!ra(b, m)) {
                                var q = e(m), l = d(k, q), k = d(q, k), k = n(k, -1), l = n(l, 1);
                                0 === l.length ? c.removeClass(h, k) : 0 === k.length ? c.addClass(h, l) : c.setClass(h, l, k);
                            }
                        }
                        m = ja(b);
                    }
                    var m;
                    f.$watch(g[b], l, !0);
                    g.$observe("class", function(a) {
                        l(f.$eval(g[b]));
                    });
                    "ngClass" !== b && f.$watch("$index", function(c, d) {
                        var h = 1 & c;
                        if (h !== (1 & d)) {
                            var l = e(f.$eval(g[b]));
                            h === a ? (h = n(l, 1), g.$addClass(h)) : (h = n(l, -1), g.$removeClass(h));
                        }
                    });
                }
            };
        } ];
    }
    var hf = /^\/(.+)\/([a-z]*)$/, gf = "validity", J = function(b) {
        return G(b) ? b.toLowerCase() : b;
    }, Db = Object.prototype.hasOwnProperty, ib = function(b) {
        return G(b) ? b.toUpperCase() : b;
    }, T, z, ta, ka = [].slice, sc = [].push, ya = Object.prototype.toString, Na = O("ng"), Oa = P.angular || (P.angular = {}), Ra, ma, cb = 0;
    T = U((/msie (\d+)/.exec(J(navigator.userAgent)) || [])[1]);
    isNaN(T) && (T = U((/trident\/.*; rv:(\d+)/.exec(J(navigator.userAgent)) || [])[1]));
    B.$inject = [];
    Ba.$inject = [];
    var M = function() {
        return A(Array.isArray) ? Array.isArray : function(b) {
            return "[object Array]" === ya.call(b);
        };
    }(), Z = function() {
        return String.prototype.trim ? function(b) {
            return G(b) ? b.trim() : b;
        } : function(b) {
            return G(b) ? b.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : b;
        };
    }();
    ma = 9 > T ? function(b) {
        b = b.nodeName ? b : b[0];
        return J(b.scopeName && "HTML" != b.scopeName ? b.scopeName + ":" + b.nodeName : b.nodeName);
    } : function(b) {
        return J(b.nodeName ? b.nodeName : b[0].nodeName);
    };
    var Qa = function() {
        if (v(Qa.isActive_)) return Qa.isActive_;
        var b = !(!W.querySelector("[ng-csp]") && !W.querySelector("[data-ng-csp]"));
        if (!b) try {
            new Function("");
        } catch (a) {
            b = !0;
        }
        return Qa.isActive_ = b;
    }, fb = [ "ng-", "data-ng-", "ng:", "x-ng-" ], pd = /[A-Z]/g, td = {
        full: "1.3.0-build.2969+sha.92a10d8",
        major: 1,
        minor: 3,
        dot: 0,
        codeName: "snapshot"
    };
    V.expando = "ng339";
    var Ua = V.cache = {}, Je = 1, sb = P.document.addEventListener ? function(b, a, c) {
        b.addEventListener(a, c, !1);
    } : function(b, a, c) {
        b.attachEvent("on" + a, c);
    }, Ta = P.document.removeEventListener ? function(b, a, c) {
        b.removeEventListener(a, c, !1);
    } : function(b, a, c) {
        b.detachEvent("on" + a, c);
    };
    V._data = function(b) {
        return this.cache[b[this.expando]] || {};
    };
    var De = /([\:\-\_]+(.))/g, Ee = /^moz([A-Z])/, Ib = O("jqLite"), Ie = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Hb = /<|&#?\w+;/, Ge = /<([\w:]+)/, He = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ea = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    ea.optgroup = ea.option;
    ea.tbody = ea.tfoot = ea.colgroup = ea.caption = ea.thead;
    ea.th = ea.td;
    var Fa = V.prototype = {
        ready: function(b) {
            function a() {
                c || (c = !0, b());
            }
            var c = !1;
            "complete" === W.readyState ? setTimeout(a) : (this.on("DOMContentLoaded", a), V(P).on("load", a));
        },
        toString: function() {
            var b = [];
            q(this, function(a) {
                b.push("" + a);
            });
            return "[" + b.join(", ") + "]";
        },
        eq: function(b) {
            return 0 <= b ? z(this[b]) : z(this[this.length + b]);
        },
        length: 0,
        push: sc,
        sort: [].sort,
        splice: [].splice
    }, pb = {};
    q("multiple selected checked disabled readOnly required open".split(" "), function(b) {
        pb[J(b)] = b;
    });
    var wc = {};
    q("input select option textarea button form details".split(" "), function(b) {
        wc[b] = !0;
    });
    var xc = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngPattern: "pattern"
    };
    q({
        data: Kb,
        removeData: lb
    }, function(b, a) {
        V[a] = b;
    });
    q({
        data: Kb,
        inheritedData: ob,
        scope: function(b) {
            return z.data(b, "$scope") || ob(b.parentNode || b, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(b) {
            return z.data(b, "$isolateScope") || z.data(b, "$isolateScopeNoTemplate");
        },
        controller: tc,
        injector: function(b) {
            return ob(b, "$injector");
        },
        removeAttr: function(b, a) {
            b.removeAttribute(a);
        },
        hasClass: Lb,
        css: function(b, a, c) {
            a = Sa(a);
            if (v(c)) b.style[a] = c; else {
                var d;
                8 >= T && (d = b.currentStyle && b.currentStyle[a], "" === d && (d = "auto"));
                d = d || b.style[a];
                8 >= T && (d = "" === d ? t : d);
                return d;
            }
        },
        attr: function(b, a, c) {
            var d = J(a);
            if (pb[d]) if (v(c)) c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d)); else return b[a] || (b.attributes.getNamedItem(a) || B).specified ? d : t; else if (v(c)) b.setAttribute(a, c); else if (b.getAttribute) return b = b.getAttribute(a, 2), 
            null === b ? t : b;
        },
        prop: function(b, a, c) {
            if (v(c)) b[a] = c; else return b[a];
        },
        text: function() {
            function b(a, b) {
                if (F(b)) {
                    var d = a.nodeType;
                    return 1 === d || 3 === d ? a.textContent : "";
                }
                a.textContent = b;
            }
            b.$dv = "";
            return b;
        }(),
        val: function(b, a) {
            if (F(a)) {
                if (b.multiple && "select" === ma(b)) {
                    var c = [];
                    q(b.options, function(a) {
                        a.selected && c.push(a.value || a.text);
                    });
                    return 0 === c.length ? null : c;
                }
                return b.value;
            }
            b.value = a;
        },
        html: function(b, a) {
            if (F(a)) return b.innerHTML;
            kb(b, !0);
            b.innerHTML = a;
        },
        empty: uc
    }, function(b, a) {
        V.prototype[a] = function(a, d) {
            var e, f, h = this.length;
            if (b !== uc && (2 == b.length && b !== Lb && b !== tc ? a : d) === t) {
                if (Q(a)) {
                    for (e = 0; e < h; e++) if (b === Kb) b(this[e], a); else for (f in a) b(this[e], f, a[f]);
                    return this;
                }
                e = b.$dv;
                h = e === t ? Math.min(h, 1) : h;
                for (f = 0; f < h; f++) {
                    var g = b(this[f], a, d);
                    e = e ? e + g : g;
                }
                return e;
            }
            for (e = 0; e < h; e++) b(this[e], a, d);
            return this;
        };
    });
    q({
        removeData: lb,
        on: function a(c, d, e, f) {
            if (v(f)) throw Ib("onargs");
            if (!c.nodeType || 1 === c.nodeType || 9 === c.nodeType) {
                var h = la(c, "events"), g = la(c, "handle");
                h || la(c, "events", h = {});
                g || la(c, "handle", g = Le(c, h));
                q(d.split(" "), function(d) {
                    var f = h[d];
                    if (!f) {
                        if ("mouseenter" == d || "mouseleave" == d) {
                            var m = W.body.contains || W.body.compareDocumentPosition ? function(a, c) {
                                var d = 9 === a.nodeType ? a.documentElement : a, e = c && c.parentNode;
                                return a === e || !!(e && 1 === e.nodeType && (d.contains ? d.contains(e) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(e)));
                            } : function(a, c) {
                                if (c) for (;c = c.parentNode; ) if (c === a) return !0;
                                return !1;
                            };
                            h[d] = [];
                            a(c, {
                                mouseleave: "mouseout",
                                mouseenter: "mouseover"
                            }[d], function(a) {
                                var c = a.relatedTarget;
                                c && (c === this || m(this, c)) || g(a, d);
                            });
                        } else sb(c, d, g), h[d] = [];
                        f = h[d];
                    }
                    f.push(e);
                });
            }
        },
        off: rc,
        one: function(a, c, d) {
            a = z(a);
            a.on(c, function f() {
                a.off(c, d);
                a.off(c, f);
            });
            a.on(c, d);
        },
        replaceWith: function(a, c) {
            var d, e = a.parentNode;
            kb(a);
            q(new V(c), function(c) {
                d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a);
                d = c;
            });
        },
        children: function(a) {
            var c = [];
            q(a.childNodes, function(a) {
                1 === a.nodeType && c.push(a);
            });
            return c;
        },
        contents: function(a) {
            return a.contentDocument || a.childNodes || [];
        },
        append: function(a, c) {
            q(new V(c), function(c) {
                1 !== a.nodeType && 11 !== a.nodeType || a.appendChild(c);
            });
        },
        prepend: function(a, c) {
            if (1 === a.nodeType) {
                var d = a.firstChild;
                q(new V(c), function(c) {
                    a.insertBefore(c, d);
                });
            }
        },
        wrap: function(a, c) {
            c = z(c)[0];
            var d = a.parentNode;
            d && d.replaceChild(c, a);
            c.appendChild(a);
        },
        remove: function(a) {
            kb(a);
            var c = a.parentNode;
            c && c.removeChild(a);
        },
        after: function(a, c) {
            var d = a, e = a.parentNode;
            q(new V(c), function(a) {
                e.insertBefore(a, d.nextSibling);
                d = a;
            });
        },
        addClass: nb,
        removeClass: mb,
        toggleClass: function(a, c, d) {
            c && q(c.split(" "), function(c) {
                var f = d;
                F(f) && (f = !Lb(a, c));
                (f ? nb : mb)(a, c);
            });
        },
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
        },
        next: function(a) {
            if (a.nextElementSibling) return a.nextElementSibling;
            for (a = a.nextSibling; null != a && 1 !== a.nodeType; ) a = a.nextSibling;
            return a;
        },
        find: function(a, c) {
            return a.getElementsByTagName ? a.getElementsByTagName(c) : [];
        },
        clone: Jb,
        triggerHandler: function(a, c, d) {
            c = (la(a, "events") || {})[c];
            d = d || [];
            var e = [ {
                preventDefault: function() {
                    this.defaultPrevented = !0;
                },
                isDefaultPrevented: function() {
                    return !0 === this.defaultPrevented;
                },
                stopPropagation: B
            } ];
            q(c, function(c) {
                c.apply(a, e.concat(d));
            });
        }
    }, function(a, c) {
        V.prototype[c] = function(c, e, f) {
            for (var h, g = 0; g < this.length; g++) F(h) ? (h = a(this[g], c, e, f), v(h) && (h = z(h))) : qc(h, a(this[g], c, e, f));
            return v(h) ? h : this;
        };
        V.prototype.bind = V.prototype.on;
        V.prototype.unbind = V.prototype.off;
    });
    Va.prototype = {
        put: function(a, c) {
            this[Ga(a, this.nextUid)] = c;
        },
        get: function(a) {
            return this[Ga(a, this.nextUid)];
        },
        remove: function(a) {
            var c = this[a = Ga(a, this.nextUid)];
            delete this[a];
            return c;
        }
    };
    var zc = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, Ne = /,/, Oe = /^\s*(_?)(\S+?)\1\s*$/, yc = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Ha = O("$injector");
    Fb.$$annotate = Mb;
    var jf = O("$animate"), fe = [ "$provide", function(a) {
        this.$$selectors = {};
        this.register = function(c, d) {
            var e = c + "-animation";
            if (c && "." != c.charAt(0)) throw jf("notcsel", c);
            this.$$selectors[c.substr(1)] = e;
            a.factory(e, d);
        };
        this.classNameFilter = function(a) {
            1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null);
            return this.$$classNameFilter;
        };
        this.$get = [ "$timeout", "$$asyncCallback", function(a, d) {
            return {
                enter: function(a, c, h, g) {
                    h ? h.after(a) : c.prepend(a);
                    g && d(g);
                    return B;
                },
                leave: function(a, c) {
                    a.remove();
                    c && d(c);
                    return B;
                },
                move: function(a, c, d, g) {
                    return this.enter(a, c, d, g);
                },
                addClass: function(a, c, h) {
                    c = G(c) ? c : M(c) ? c.join(" ") : "";
                    q(a, function(a) {
                        nb(a, c);
                    });
                    h && d(h);
                    return B;
                },
                removeClass: function(a, c, h) {
                    c = G(c) ? c : M(c) ? c.join(" ") : "";
                    q(a, function(a) {
                        mb(a, c);
                    });
                    h && d(h);
                    return B;
                },
                setClass: function(a, c, h, g) {
                    q(a, function(a) {
                        nb(a, c);
                        mb(a, h);
                    });
                    g && d(g);
                    return B;
                },
                enabled: B
            };
        } ];
    } ], ha = O("$compile");
    ic.$inject = [ "$provide", "$$sanitizeUriProvider" ];
    var Te = /^(x[\:\-_]|data[\:\-_])/i, Pb = O("$interpolate"), kf = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, We = {
        http: 80,
        https: 443,
        ftp: 21
    }, Sb = O("$location");
    Ub.prototype = Tb.prototype = Kc.prototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: tb("$$absUrl"),
        url: function(a, c) {
            if (F(a)) return this.$$url;
            var d = kf.exec(a);
            d[1] && this.path(decodeURIComponent(d[1]));
            (d[2] || d[1]) && this.search(d[3] || "");
            this.hash(d[5] || "", c);
            return this;
        },
        protocol: tb("$$protocol"),
        host: tb("$$host"),
        port: tb("$$port"),
        path: Lc("$$path", function(a) {
            return "/" == a.charAt(0) ? a : "/" + a;
        }),
        search: function(a, c) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (G(a)) this.$$search = fc(a); else if (Q(a)) q(a, function(c, e) {
                    null == c && delete a[e];
                }), this.$$search = a; else throw Sb("isrcharg");
                break;

              default:
                F(c) || null === c ? delete this.$$search[a] : this.$$search[a] = c;
            }
            this.$$compose();
            return this;
        },
        hash: Lc("$$hash", Ba),
        replace: function() {
            this.$$replace = !0;
            return this;
        }
    };
    var ia = O("$parse"), lf = Function.prototype.call, mf = Function.prototype.apply, nf = Function.prototype.bind, ab = {
        "null": function() {
            return null;
        },
        "true": function() {
            return !0;
        },
        "false": function() {
            return !1;
        },
        undefined: B,
        "+": function(a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return v(d) ? v(e) ? d + e : d : v(e) ? e : t;
        },
        "-": function(a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return (v(d) ? d : 0) - (v(e) ? e : 0);
        },
        "*": function(a, c, d, e) {
            return d(a, c) * e(a, c);
        },
        "/": function(a, c, d, e) {
            return d(a, c) / e(a, c);
        },
        "%": function(a, c, d, e) {
            return d(a, c) % e(a, c);
        },
        "^": function(a, c, d, e) {
            return d(a, c) ^ e(a, c);
        },
        "=": B,
        "===": function(a, c, d, e) {
            return d(a, c) === e(a, c);
        },
        "!==": function(a, c, d, e) {
            return d(a, c) !== e(a, c);
        },
        "==": function(a, c, d, e) {
            return d(a, c) == e(a, c);
        },
        "!=": function(a, c, d, e) {
            return d(a, c) != e(a, c);
        },
        "<": function(a, c, d, e) {
            return d(a, c) < e(a, c);
        },
        ">": function(a, c, d, e) {
            return d(a, c) > e(a, c);
        },
        "<=": function(a, c, d, e) {
            return d(a, c) <= e(a, c);
        },
        ">=": function(a, c, d, e) {
            return d(a, c) >= e(a, c);
        },
        "&&": function(a, c, d, e) {
            return d(a, c) && e(a, c);
        },
        "||": function(a, c, d, e) {
            return d(a, c) || e(a, c);
        },
        "&": function(a, c, d, e) {
            return d(a, c) & e(a, c);
        },
        "|": function(a, c, d, e) {
            return e(a, c)(a, c, d(a, c));
        },
        "!": function(a, c, d) {
            return !d(a, c);
        }
    }, of = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    }, Wb = function(a) {
        this.options = a;
    };
    Wb.prototype = {
        constructor: Wb,
        lex: function(a) {
            this.text = a;
            this.index = 0;
            this.ch = t;
            for (this.tokens = []; this.index < this.text.length; ) if (this.ch = this.text.charAt(this.index), 
            this.is("\"'")) this.readString(this.ch); else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(this.ch)) this.readIdent(); else if (this.is("(){}[].,;:?")) this.tokens.push({
                index: this.index,
                text: this.ch
            }), this.index++; else if (this.isWhitespace(this.ch)) this.index++; else {
                a = this.ch + this.peek();
                var c = a + this.peek(2), d = ab[this.ch], e = ab[a], f = ab[c];
                f ? (this.tokens.push({
                    index: this.index,
                    text: c,
                    fn: f
                }), this.index += 3) : e ? (this.tokens.push({
                    index: this.index,
                    text: a,
                    fn: e
                }), this.index += 2) : d ? (this.tokens.push({
                    index: this.index,
                    text: this.ch,
                    fn: d
                }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1);
            }
            return this.tokens;
        },
        is: function(a) {
            return -1 !== a.indexOf(this.ch);
        },
        peek: function(a) {
            a = a || 1;
            return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1;
        },
        isNumber: function(a) {
            return "0" <= a && "9" >= a;
        },
        isWhitespace: function(a) {
            return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a;
        },
        isIdent: function(a) {
            return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a;
        },
        isExpOperator: function(a) {
            return "-" === a || "+" === a || this.isNumber(a);
        },
        throwError: function(a, c, d) {
            d = d || this.index;
            c = v(c) ? "s " + c + "-" + this.index + " [" + this.text.substring(c, d) + "]" : " " + d;
            throw ia("lexerr", a, c, this.text);
        },
        readNumber: function() {
            for (var a = "", c = this.index; this.index < this.text.length; ) {
                var d = J(this.text.charAt(this.index));
                if ("." == d || this.isNumber(d)) a += d; else {
                    var e = this.peek();
                    if ("e" == d && this.isExpOperator(e)) a += d; else if (this.isExpOperator(d) && e && this.isNumber(e) && "e" == a.charAt(a.length - 1)) a += d; else if (!this.isExpOperator(d) || e && this.isNumber(e) || "e" != a.charAt(a.length - 1)) break; else this.throwError("Invalid exponent");
                }
                this.index++;
            }
            a *= 1;
            this.tokens.push({
                index: c,
                text: a,
                constant: !0,
                fn: function() {
                    return a;
                }
            });
        },
        readIdent: function() {
            for (var a = this, c = "", d = this.index, e, f, h, g; this.index < this.text.length; ) {
                g = this.text.charAt(this.index);
                if ("." === g || this.isIdent(g) || this.isNumber(g)) "." === g && (e = this.index), 
                c += g; else break;
                this.index++;
            }
            if (e) for (f = this.index; f < this.text.length; ) {
                g = this.text.charAt(f);
                if ("(" === g) {
                    h = c.substr(e - d + 1);
                    c = c.substr(0, e - d);
                    this.index = f;
                    break;
                }
                if (this.isWhitespace(g)) f++; else break;
            }
            d = {
                index: d,
                text: c
            };
            if (ab.hasOwnProperty(c)) d.fn = ab[c], d.constant = !0; else {
                var n = Nc(c, this.options, this.text);
                d.fn = E(function(a, c) {
                    return n(a, c);
                }, {
                    assign: function(d, e) {
                        return ub(d, c, e, a.text);
                    }
                });
            }
            this.tokens.push(d);
            h && (this.tokens.push({
                index: e,
                text: "."
            }), this.tokens.push({
                index: e + 1,
                text: h
            }));
        },
        readString: function(a) {
            var c = this.index;
            this.index++;
            for (var d = "", e = a, f = !1; this.index < this.text.length; ) {
                var h = this.text.charAt(this.index), e = e + h;
                if (f) "u" === h ? (f = this.text.substring(this.index + 1, this.index + 5), f.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + f + "]"), 
                this.index += 4, d += String.fromCharCode(parseInt(f, 16))) : d += of[h] || h, f = !1; else if ("\\" === h) f = !0; else {
                    if (h === a) {
                        this.index++;
                        this.tokens.push({
                            index: c,
                            text: e,
                            string: d,
                            constant: !0,
                            fn: function() {
                                return d;
                            }
                        });
                        return;
                    }
                    d += h;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", c);
        }
    };
    var Ya = function(a, c, d) {
        this.lexer = a;
        this.$filter = c;
        this.options = d;
    };
    Ya.ZERO = E(function() {
        return 0;
    }, {
        constant: !0
    });
    Ya.prototype = {
        constructor: Ya,
        parse: function(a) {
            this.text = a;
            this.tokens = this.lexer.lex(a);
            a = this.statements();
            0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]);
            a.literal = !!a.literal;
            a.constant = !!a.constant;
            return a;
        },
        primary: function() {
            var a;
            if (this.expect("(")) a = this.filterChain(), this.consume(")"); else if (this.expect("[")) a = this.arrayDeclaration(); else if (this.expect("{")) a = this.object(); else {
                var c = this.expect();
                (a = c.fn) || this.throwError("not a primary expression", c);
                c.constant && (a.constant = !0, a.literal = !0);
            }
            for (var d; c = this.expect("(", "[", "."); ) "(" === c.text ? (a = this.functionCall(a, d), 
            d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, 
            a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a;
        },
        throwError: function(a, c) {
            throw ia("syntax", c.text, a, c.index + 1, this.text, this.text.substring(c.index));
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw ia("ueoe", this.text);
            return this.tokens[0];
        },
        peek: function(a, c, d, e) {
            if (0 < this.tokens.length) {
                var f = this.tokens[0], h = f.text;
                if (h === a || h === c || h === d || h === e || !(a || c || d || e)) return f;
            }
            return !1;
        },
        expect: function(a, c, d, e) {
            return (a = this.peek(a, c, d, e)) ? (this.tokens.shift(), a) : !1;
        },
        consume: function(a) {
            this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek());
        },
        unaryFn: function(a, c) {
            return E(function(d, e) {
                return a(d, e, c);
            }, {
                constant: c.constant
            });
        },
        ternaryFn: function(a, c, d) {
            return E(function(e, f) {
                return a(e, f) ? c(e, f) : d(e, f);
            }, {
                constant: a.constant && c.constant && d.constant
            });
        },
        binaryFn: function(a, c, d) {
            return E(function(e, f) {
                return c(e, f, a, d);
            }, {
                constant: a.constant && d.constant
            });
        },
        statements: function() {
            for (var a = []; ;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), 
            !this.expect(";")) return 1 === a.length ? a[0] : function(c, d) {
                for (var e, f = 0; f < a.length; f++) {
                    var h = a[f];
                    h && (e = h(c, d));
                }
                return e;
            };
        },
        filterChain: function() {
            for (var a = this.expression(), c; ;) if (c = this.expect("|")) a = this.binaryFn(a, c.fn, this.filter()); else return a;
        },
        filter: function() {
            for (var a = this.expect(), c = this.$filter(a.text), d = []; this.expect(":"); ) d.push(this.expression());
            return ba(function(a, f, h) {
                h = [ h ];
                for (var g = 0; g < d.length; g++) h.push(d[g](a, f));
                return c.apply(a, h);
            });
        },
        expression: function() {
            return this.assignment();
        },
        assignment: function() {
            var a = this.ternary(), c, d;
            return (d = this.expect("=")) ? (a.assign || this.throwError("implies assignment but [" + this.text.substring(0, d.index) + "] can not be assigned to", d), 
            c = this.ternary(), function(d, f) {
                return a.assign(d, c(d, f), f);
            }) : a;
        },
        ternary: function() {
            var a = this.logicalOR(), c, d;
            if (this.expect("?")) {
                c = this.ternary();
                if (d = this.expect(":")) return this.ternaryFn(a, c, this.ternary());
                this.throwError("expected :", d);
            } else return a;
        },
        logicalOR: function() {
            for (var a = this.logicalAND(), c; ;) if (c = this.expect("||")) a = this.binaryFn(a, c.fn, this.logicalAND()); else return a;
        },
        logicalAND: function() {
            var a = this.equality(), c;
            if (c = this.expect("&&")) a = this.binaryFn(a, c.fn, this.logicalAND());
            return a;
        },
        equality: function() {
            var a = this.relational(), c;
            if (c = this.expect("==", "!=", "===", "!==")) a = this.binaryFn(a, c.fn, this.equality());
            return a;
        },
        relational: function() {
            var a = this.additive(), c;
            if (c = this.expect("<", ">", "<=", ">=")) a = this.binaryFn(a, c.fn, this.relational());
            return a;
        },
        additive: function() {
            for (var a = this.multiplicative(), c; c = this.expect("+", "-"); ) a = this.binaryFn(a, c.fn, this.multiplicative());
            return a;
        },
        multiplicative: function() {
            for (var a = this.unary(), c; c = this.expect("*", "/", "%"); ) a = this.binaryFn(a, c.fn, this.unary());
            return a;
        },
        unary: function() {
            var a;
            return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(Ya.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary();
        },
        fieldAccess: function(a) {
            var c = this, d = this.expect().text, e = Nc(d, this.options, this.text);
            return E(function(c, d, g) {
                return e(g || a(c, d));
            }, {
                assign: function(e, h, g) {
                    return ub(a(e, g), d, h, c.text);
                }
            });
        },
        objectIndex: function(a) {
            var c = this, d = this.expression();
            this.consume("]");
            return E(function(e, f) {
                var h = a(e, f), g = d(e, f);
                qa(g, c.text);
                return h ? Ja(h[g], c.text) : t;
            }, {
                assign: function(e, f, h) {
                    var g = d(e, h);
                    return Ja(a(e, h), c.text)[g] = f;
                }
            });
        },
        functionCall: function(a, c) {
            var d = [];
            if (")" !== this.peekToken().text) do d.push(this.expression()); while (this.expect(","));
            this.consume(")");
            var e = this;
            return function(f, h) {
                for (var g = [], n = c ? c(f, h) : f, l = 0; l < d.length; l++) g.push(d[l](f, h));
                l = a(f, h, n) || B;
                Ja(n, e.text);
                var m = e.text;
                if (l) {
                    if (l.constructor === l) throw ia("isecfn", m);
                    if (l === lf || l === mf || l === nf) throw ia("isecff", m);
                }
                g = l.apply ? l.apply(n, g) : l(g[0], g[1], g[2], g[3], g[4]);
                return Ja(g, e.text);
            };
        },
        arrayDeclaration: function() {
            var a = [], c = !0;
            if ("]" !== this.peekToken().text) do {
                if (this.peek("]")) break;
                var d = this.expression();
                a.push(d);
                d.constant || (c = !1);
            } while (this.expect(","));
            this.consume("]");
            return E(function(c, d) {
                for (var h = [], g = 0; g < a.length; g++) h.push(a[g](c, d));
                return h;
            }, {
                literal: !0,
                constant: c
            });
        },
        object: function() {
            var a = [], c = !0;
            if ("}" !== this.peekToken().text) do {
                if (this.peek("}")) break;
                var d = this.expect(), d = d.string || d.text;
                this.consume(":");
                var e = this.expression();
                a.push({
                    key: d,
                    value: e
                });
                e.constant || (c = !1);
            } while (this.expect(","));
            this.consume("}");
            return E(function(c, d) {
                for (var e = {}, n = 0; n < a.length; n++) {
                    var l = a[n];
                    e[l.key] = l.value(c, d);
                }
                return e;
            }, {
                literal: !0,
                constant: c
            });
        }
    };
    var Vb = {}, wa = O("$sce"), fa = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, $ = W.createElement("a"), Qc = va(P.location.href, !0);
    pc.$inject = [ "$provide" ];
    Rc.$inject = [ "$locale" ];
    Tc.$inject = [ "$locale" ];
    var Wc = ".", ef = {
        yyyy: aa("FullYear", 4),
        yy: aa("FullYear", 2, 0, !0),
        y: aa("FullYear", 1),
        MMMM: wb("Month"),
        MMM: wb("Month", !0),
        MM: aa("Month", 2, 1),
        M: aa("Month", 1, 1),
        dd: aa("Date", 2),
        d: aa("Date", 1),
        HH: aa("Hours", 2),
        H: aa("Hours", 1),
        hh: aa("Hours", 2, -12),
        h: aa("Hours", 1, -12),
        mm: aa("Minutes", 2),
        m: aa("Minutes", 1),
        ss: aa("Seconds", 2),
        s: aa("Seconds", 1),
        sss: aa("Milliseconds", 3),
        EEEE: wb("Day"),
        EEE: wb("Day", !0),
        a: function(a, c) {
            return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1];
        },
        Z: function(a) {
            a = -1 * a.getTimezoneOffset();
            return a = (0 <= a ? "+" : "") + (vb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + vb(Math.abs(a % 60), 2));
        },
        ww: Yc(2),
        w: Yc(1)
    }, df = /((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/, cf = /^\-?\d+$/;
    Sc.$inject = [ "$locale" ];
    var af = ba(J), bf = ba(ib);
    Uc.$inject = [ "$parse" ];
    var wd = ba({
        restrict: "E",
        compile: function(a, c) {
            8 >= T && (c.href || c.name || c.$set("href", ""), a.append(W.createComment("IE fix")));
            if (!c.href && !c.xlinkHref && !c.name) return function(a, c) {
                var f = "[object SVGAnimatedString]" === ya.call(c.prop("href")) ? "xlink:href" : "href";
                c.on("click", function(a) {
                    c.attr(f) || a.preventDefault();
                });
            };
        }
    }), jb = {};
    q(pb, function(a, c) {
        if ("multiple" != a) {
            var d = oa("ng-" + c);
            jb[d] = function() {
                return {
                    priority: 100,
                    link: function(a, f, h) {
                        a.$watch(h[d], function(a) {
                            h.$set(c, !!a);
                        });
                    }
                };
            };
        }
    });
    q(xc, function(a, c) {
        jb[c] = function() {
            return {
                priority: 100,
                link: function(a, e, f) {
                    if ("ngPattern" === c && "/" == f.ngPattern.charAt(0) && (e = f.ngPattern.match(hf))) {
                        f.$set("ngPattern", RegExp(e[1], e[2]));
                        return;
                    }
                    a.$watch(f[c], function(a) {
                        f.$set(c, a);
                    });
                }
            };
        };
    });
    q([ "src", "srcset", "href" ], function(a) {
        var c = oa("ng-" + a);
        jb[c] = function() {
            return {
                priority: 99,
                link: function(d, e, f) {
                    var h = a, g = a;
                    "href" === a && "[object SVGAnimatedString]" === ya.call(e.prop("href")) && (g = "xlinkHref", 
                    f.$attr[g] = "xlink:href", h = null);
                    f.$observe(c, function(a) {
                        a && (f.$set(g, a), T && h && e.prop(h, f[g]));
                    });
                }
            };
        };
    });
    var zb = {
        $addControl: B,
        $removeControl: B,
        $setValidity: B,
        $setDirty: B,
        $setPristine: B
    };
    Zc.$inject = [ "$element", "$attrs", "$scope", "$animate" ];
    var bd = function(a) {
        return [ "$timeout", function(c) {
            return {
                name: "form",
                restrict: a ? "EAC" : "E",
                controller: Zc,
                compile: function() {
                    return {
                        pre: function(a, e, f, h) {
                            if (!f.action) {
                                var g = function(c) {
                                    a.$apply(function() {
                                        h.$commitViewValue();
                                    });
                                    c.preventDefault ? c.preventDefault() : c.returnValue = !1;
                                };
                                sb(e[0], "submit", g);
                                e.on("$destroy", function() {
                                    c(function() {
                                        Ta(e[0], "submit", g);
                                    }, 0, !1);
                                });
                            }
                            var n = e.parent().controller("form"), l = f.name || f.ngForm;
                            l && ub(a, l, h, l);
                            if (n) e.on("$destroy", function() {
                                n.$removeControl(h);
                                l && ub(a, l, t, l);
                                E(h, zb);
                            });
                        }
                    };
                }
            };
        } ];
    }, xd = bd(), Kd = bd(!0), pf = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, qf = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, rf = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, cd = /^(\d{4})-(\d{2})-(\d{2})$/, dd = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)$/, Zb = /^(\d{4})-W(\d\d)$/, ed = /^(\d{4})-(\d\d)$/, fd = /^(\d\d):(\d\d)$/, sf = /(\s+|^)default(\s+|$)/, gd = {
        text: Za,
        date: $a("date", cd, Bb(cd, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
        "datetime-local": $a("datetimelocal", dd, Bb(dd, [ "yyyy", "MM", "dd", "HH", "mm" ]), "yyyy-MM-ddTHH:mm"),
        time: $a("time", fd, Bb(fd, [ "HH", "mm" ]), "HH:mm"),
        week: $a("week", Zb, function(a) {
            if (da(a)) return a;
            if (G(a)) {
                Zb.lastIndex = 0;
                var c = Zb.exec(a);
                if (c) {
                    a = +c[1];
                    var d = +c[2], c = Xc(a), d = 7 * (d - 1);
                    return new Date(a, 0, c.getDate() + d);
                }
            }
            return 0/0;
        }, "yyyy-Www"),
        month: $a("month", ed, Bb(ed, [ "yyyy", "MM" ]), "yyyy-MM"),
        number: function(a, c, d, e, f, h) {
            Za(a, c, d, e, f, h);
            e.$parsers.push(function(a) {
                var c = e.$isEmpty(a);
                if (c || rf.test(a)) return e.$setValidity("number", !0), "" === a ? null : c ? a : parseFloat(a);
                e.$setValidity("number", !1);
                return t;
            });
            ff(e, "number", tf, null, e.$$validityState);
            e.$formatters.push(function(a) {
                return e.$isEmpty(a) ? "" : "" + a;
            });
            d.min && (a = function(a) {
                var c = parseFloat(d.min);
                return Xb(e, "min", e.$isEmpty(a) || a >= c, a);
            }, e.$parsers.push(a), e.$formatters.push(a));
            d.max && (a = function(a) {
                var c = parseFloat(d.max);
                return Xb(e, "max", e.$isEmpty(a) || a <= c, a);
            }, e.$parsers.push(a), e.$formatters.push(a));
            e.$formatters.push(function(a) {
                return Xb(e, "number", e.$isEmpty(a) || Ca(a), a);
            });
        },
        url: function(a, c, d, e, f, h) {
            Za(a, c, d, e, f, h);
            e.$validators.url = function(a, c) {
                var d = a || c;
                return e.$isEmpty(d) || pf.test(d);
            };
        },
        email: function(a, c, d, e, f, h) {
            Za(a, c, d, e, f, h);
            e.$validators.email = function(a, c) {
                var d = a || c;
                return e.$isEmpty(d) || qf.test(d);
            };
        },
        radio: function(a, c, d, e) {
            F(d.name) && c.attr("name", ++cb);
            c.on("click", function(f) {
                c[0].checked && a.$apply(function() {
                    e.$setViewValue(d.value, f && f.type);
                });
            });
            e.$render = function() {
                c[0].checked = d.value == e.$viewValue;
            };
            d.$observe("value", e.$render);
        },
        checkbox: function(a, c, d, e, f, h, g, n) {
            var l = ad(n, a, "ngTrueValue", d.ngTrueValue, !0), m = ad(n, a, "ngFalseValue", d.ngFalseValue, !1);
            c.on("click", function(d) {
                a.$apply(function() {
                    e.$setViewValue(c[0].checked, d && d.type);
                });
            });
            e.$render = function() {
                c[0].checked = e.$viewValue;
            };
            e.$isEmpty = function(a) {
                return a !== l;
            };
            e.$formatters.push(function(a) {
                return ra(a, l);
            });
            e.$parsers.push(function(a) {
                return a ? l : m;
            });
        },
        hidden: B,
        button: B,
        submit: B,
        reset: B,
        file: B
    }, tf = [ "badInput" ], jc = [ "$browser", "$sniffer", "$filter", "$parse", function(a, c, d, e) {
        return {
            restrict: "E",
            require: [ "?ngModel" ],
            link: function(f, h, g, n) {
                n[0] && (gd[J(g.type)] || gd.text)(f, h, g, n[0], c, a, d, e);
            }
        };
    } ], yb = "ng-valid", xb = "ng-invalid", Ka = "ng-pristine", Ab = "ng-dirty", uf = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", function(a, c, d, e, f, h, g) {
        function n(a, c) {
            c = c ? "-" + gb(c, "-") : "";
            h.removeClass(e, (a ? xb : yb) + c);
            h.addClass(e, (a ? yb : xb) + c);
        }
        this.$modelValue = this.$viewValue = Number.NaN;
        this.$validators = {};
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$untouched = !0;
        this.$touched = !1;
        this.$pristine = !0;
        this.$dirty = !1;
        this.$valid = !0;
        this.$invalid = !1;
        this.$name = d.name;
        var l = f(d.ngModel), m = l.assign, p = null, k = this;
        if (!m) throw O("ngModel")("nonassign", d.ngModel, ga(e));
        this.$render = B;
        this.$isEmpty = function(a) {
            return F(a) || "" === a || null === a || a !== a;
        };
        var s = e.inheritedData("$formController") || zb, r = 0, L = this.$error = {};
        e.addClass(Ka).addClass("ng-untouched");
        n(!0);
        this.$setValidity = function(a, c) {
            L[a] !== !c && (c ? (L[a] && r--, r || (n(!0), k.$valid = !0, k.$invalid = !1)) : (n(!1), 
            k.$invalid = !0, k.$valid = !1, r++), L[a] = !c, n(c, a), s.$setValidity(a, c, k));
        };
        this.$setPristine = function() {
            k.$dirty = !1;
            k.$pristine = !0;
            h.removeClass(e, Ab);
            h.addClass(e, Ka);
        };
        this.$setUntouched = function() {
            k.$touched = !1;
            k.$untouched = !0;
            h.setClass(e, "ng-untouched", "ng-touched");
        };
        this.$setTouched = function() {
            k.$touched = !0;
            k.$untouched = !1;
            h.setClass(e, "ng-touched", "ng-untouched");
        };
        this.$rollbackViewValue = function() {
            g.cancel(p);
            k.$viewValue = k.$$lastCommittedViewValue;
            k.$render();
        };
        this.$validate = function() {
            if (k.$modelValue === k.$modelValue) {
                var a = k.$modelValue;
                k.$$runValidators(k.$$invalidModelValue || k.$modelValue, k.$viewValue);
                a !== k.$modelValue && k.$$writeModelToScope();
            }
        };
        this.$$runValidators = function(a, c) {
            q(k.$validators, function(d, e) {
                k.$setValidity(e, d(a, c));
            });
            k.$modelValue = k.$valid ? a : t;
            k.$$invalidModelValue = k.$valid ? t : a;
        };
        this.$commitViewValue = function(a) {
            var c = k.$viewValue;
            g.cancel(p);
            if (a || k.$$lastCommittedViewValue !== c) {
                k.$$lastCommittedViewValue = c;
                k.$pristine && (k.$dirty = !0, k.$pristine = !1, h.removeClass(e, Ka), h.addClass(e, Ab), 
                s.$setDirty());
                var d = c;
                q(k.$parsers, function(a) {
                    d = a(d);
                });
                k.$modelValue === d || !F(k.$$invalidModelValue) && k.$$invalidModelValue == d || (k.$$runValidators(d, c), 
                k.$$writeModelToScope());
            }
        };
        this.$$writeModelToScope = function() {
            var d;
            k.$options && k.$options.getterSetter && A(d = l(a)) ? d(k.$modelValue) : m(a, k.$modelValue);
            q(k.$viewChangeListeners, function(a) {
                try {
                    a();
                } catch (d) {
                    c(d);
                }
            });
        };
        this.$setViewValue = function(a, c, d) {
            k.$viewValue = a;
            k.$options && !k.$options.updateOnDefault || k.$$debounceViewValueCommit(c, d);
        };
        this.$$debounceViewValueCommit = function(a, c) {
            var d = 0, e = k.$options;
            e && v(e.debounce) && (e = e.debounce, Ca(e) ? d = e : Ca(e[a]) ? d = e[a] : Ca(e["default"]) && (d = e["default"]));
            g.cancel(p);
            d ? p = g(function() {
                k.$commitViewValue(c);
            }, d) : k.$commitViewValue(c);
        };
        a.$watch(function() {
            var c = l(a);
            k.$options && k.$options.getterSetter && A(c) && (c = c());
            if (k.$modelValue !== c && (F(k.$$invalidModelValue) || k.$$invalidModelValue != c)) {
                for (var d = k.$formatters, e = d.length, f = c; e--; ) f = d[e](f);
                k.$$runValidators(c, f);
                k.$viewValue !== f && (k.$viewValue = k.$$lastCommittedViewValue = f, k.$render());
            }
            return c;
        });
    } ], Zd = function() {
        return {
            require: [ "ngModel", "^?form", "^?ngModelOptions" ],
            controller: uf,
            link: {
                pre: function(a, c, d, e) {
                    e[2] && (e[0].$options = e[2].$options);
                    var f = e[0], h = e[1] || zb;
                    h.$addControl(f);
                    a.$on("$destroy", function() {
                        h.$removeControl(f);
                    });
                },
                post: function(a, c, d, e) {
                    var f = e[0];
                    if (f.$options && f.$options.updateOn) c.on(f.$options.updateOn, function(c) {
                        a.$apply(function() {
                            f.$$debounceViewValueCommit(c && c.type);
                        });
                    });
                    c.on("blur", function(c) {
                        a.$apply(function() {
                            f.$setTouched();
                        });
                    });
                }
            }
        };
    }, ae = ba({
        require: "ngModel",
        link: function(a, c, d, e) {
            e.$viewChangeListeners.push(function() {
                a.$eval(d.ngChange);
            });
        }
    }), lc = function() {
        return {
            require: "?ngModel",
            link: function(a, c, d, e) {
                e && (d.required = !0, e.$validators.required = function(a, c) {
                    return !d.required || !e.$isEmpty(c);
                }, d.$observe("required", function() {
                    e.$validate();
                }));
            }
        };
    }, kc = function() {
        return {
            require: "?ngModel",
            link: function(a, c, d, e) {
                if (e) {
                    var f, h = d.ngPattern || d.pattern;
                    d.$observe("pattern", function(a) {
                        G(a) && 0 < a.length && (a = RegExp(a));
                        if (a && !a.test) throw O("ngPattern")("noregexp", h, a, ga(c));
                        f = a || t;
                        e.$validate();
                    });
                    e.$validators.pattern = function(a) {
                        return e.$isEmpty(a) || F(f) || f.test(a);
                    };
                }
            }
        };
    }, nc = function() {
        return {
            require: "?ngModel",
            link: function(a, c, d, e) {
                if (e) {
                    var f = 0;
                    d.$observe("maxlength", function(a) {
                        f = U(a) || 0;
                        e.$validate();
                    });
                    e.$validators.maxlength = function(a) {
                        return e.$isEmpty(a) || a.length <= f;
                    };
                }
            }
        };
    }, mc = function() {
        return {
            require: "?ngModel",
            link: function(a, c, d, e) {
                if (e) {
                    var f = 0;
                    d.$observe("minlength", function(a) {
                        f = U(a) || 0;
                        e.$validate();
                    });
                    e.$validators.minlength = function(a) {
                        return e.$isEmpty(a) || a.length >= f;
                    };
                }
            }
        };
    }, $d = function() {
        return {
            require: "ngModel",
            link: function(a, c, d, e) {
                var f = c.attr(d.$attr.ngList) || ", ", h = "false" !== d.ngTrim, g = h ? Z(f) : f;
                e.$parsers.push(function(a) {
                    if (!F(a)) {
                        var c = [];
                        a && q(a.split(g), function(a) {
                            a && c.push(h ? Z(a) : a);
                        });
                        return c;
                    }
                });
                e.$formatters.push(function(a) {
                    return M(a) ? a.join(f) : t;
                });
                e.$isEmpty = function(a) {
                    return !a || !a.length;
                };
            }
        };
    }, vf = /^(true|false|\d+)$/, be = function() {
        return {
            priority: 100,
            compile: function(a, c) {
                return vf.test(c.ngValue) ? function(a, c, f) {
                    f.$set("value", a.$eval(f.ngValue));
                } : function(a, c, f) {
                    a.$watch(f.ngValue, function(a) {
                        f.$set("value", a);
                    });
                };
            }
        };
    }, ce = function() {
        return {
            controller: [ "$scope", "$attrs", function(a, c) {
                var d = this;
                this.$options = a.$eval(c.ngModelOptions);
                this.$options.updateOn !== t ? (this.$options.updateOnDefault = !1, this.$options.updateOn = Z(this.$options.updateOn.replace(sf, function() {
                    d.$options.updateOnDefault = !0;
                    return " ";
                }))) : this.$options.updateOnDefault = !0;
            } ]
        };
    }, Cd = xa({
        compile: function(a) {
            a.addClass("ng-binding");
            return function(a, d, e) {
                d.data("$binding", e.ngBind);
                a.$watch(e.ngBind, function(a) {
                    d.text(a == t ? "" : a);
                });
            };
        }
    }), Ed = [ "$interpolate", function(a) {
        return function(c, d, e) {
            c = a(d.attr(e.$attr.ngBindTemplate));
            d.addClass("ng-binding").data("$binding", c);
            e.$observe("ngBindTemplate", function(a) {
                d.text(a);
            });
        };
    } ], Dd = [ "$sce", "$parse", function(a, c) {
        return {
            compile: function(d, e) {
                d.addClass("ng-binding");
                return function(d, e, g) {
                    e.data("$binding", g.ngBindHtml);
                    var n = c(g.ngBindHtml);
                    g = c(g.ngBindHtml, function(a) {
                        return (a || "").toString();
                    });
                    d.$watch(g, function() {
                        e.html(a.getTrustedHtml(n(d)) || "");
                    });
                };
            }
        };
    } ], Fd = Yb("", !0), Hd = Yb("Odd", 0), Gd = Yb("Even", 1), Id = xa({
        compile: function(a, c) {
            c.$set("ngCloak", t);
            a.removeClass("ng-cloak");
        }
    }), Jd = [ function() {
        return {
            scope: !0,
            controller: "@",
            priority: 500
        };
    } ], oc = {};
    q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var c = oa("ng-" + a);
        oc[c] = [ "$parse", function(d) {
            return {
                compile: function(e, f) {
                    var h = d(f[c]);
                    return function(c, d) {
                        d.on(J(a), function(a) {
                            c.$apply(function() {
                                h(c, {
                                    $event: a
                                });
                            });
                        });
                    };
                }
            };
        } ];
    });
    var Md = [ "$animate", function(a) {
        return {
            multiElement: !0,
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function(c, d, e, f, h) {
                var g, n, l;
                c.$watch(e.ngIf, function(c) {
                    c ? n || h(function(c, f) {
                        n = f;
                        c[c.length++] = W.createComment(" end ngIf: " + e.ngIf + " ");
                        g = {
                            clone: c
                        };
                        a.enter(c, d.parent(), d);
                    }) : (l && (l.remove(), l = null), n && (n.$destroy(), n = null), g && (l = hb(g.clone), 
                    a.leave(l, function() {
                        l = null;
                    }), g = null));
                });
            }
        };
    } ], Nd = [ "$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function(a, c, d, e, f) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: Oa.noop,
            compile: function(h, g) {
                var n = g.ngInclude || g.src, l = g.onload || "", m = g.autoscroll;
                return function(g, h, q, r, L) {
                    var u = 0, t, w, x, y = function() {
                        w && (w.remove(), w = null);
                        t && (t.$destroy(), t = null);
                        x && (e.leave(x, function() {
                            w = null;
                        }), w = x, x = null);
                    };
                    g.$watch(f.parseAsResourceUrl(n), function(f) {
                        var n = function() {
                            !v(m) || m && !g.$eval(m) || d();
                        }, q = ++u;
                        f ? (a.get(f, {
                            cache: c
                        }).success(function(a) {
                            if (q === u) {
                                var c = g.$new();
                                r.template = a;
                                a = L(c, function(a) {
                                    y();
                                    e.enter(a, null, h, n);
                                });
                                t = c;
                                x = a;
                                t.$emit("$includeContentLoaded");
                                g.$eval(l);
                            }
                        }).error(function() {
                            q === u && (y(), g.$emit("$includeContentError"));
                        }), g.$emit("$includeContentRequested")) : (y(), r.template = null);
                    });
                };
            }
        };
    } ], de = [ "$compile", function(a) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(c, d, e, f) {
                d.html(f.template);
                a(d.contents())(c);
            }
        };
    } ], Od = xa({
        priority: 450,
        compile: function() {
            return {
                pre: function(a, c, d) {
                    a.$eval(d.ngInit);
                }
            };
        }
    }), Pd = xa({
        terminal: !0,
        priority: 1e3
    }), Qd = [ "$locale", "$interpolate", function(a, c) {
        var d = /{}/g;
        return {
            restrict: "EA",
            link: function(e, f, h) {
                var g = h.count, n = h.$attr.when && f.attr(h.$attr.when), l = h.offset || 0, m = e.$eval(n) || {}, p = {}, k = c.startSymbol(), s = c.endSymbol(), r = /^when(Minus)?(.+)$/;
                q(h, function(a, c) {
                    r.test(c) && (m[J(c.replace("when", "").replace("Minus", "-"))] = f.attr(h.$attr[c]));
                });
                q(m, function(a, e) {
                    p[e] = c(a.replace(d, k + g + "-" + l + s));
                });
                e.$watch(function() {
                    var c = parseFloat(e.$eval(g));
                    if (isNaN(c)) return "";
                    c in m || (c = a.pluralCat(c - l));
                    return p[c](e);
                }, function(a) {
                    f.text(a);
                });
            }
        };
    } ], Rd = [ "$parse", "$animate", function(a, c) {
        var d = O("ngRepeat");
        return {
            multiElement: !0,
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            link: function(e, f, h, g, n) {
                var l = h.ngRepeat, m = l.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), p, k, s, r, t, u, v = {
                    $id: Ga
                };
                if (!m) throw d("iexp", l);
                h = m[1];
                g = m[2];
                (m = m[3]) ? (p = a(m), k = function(a, c, d) {
                    u && (v[u] = a);
                    v[t] = c;
                    v.$index = d;
                    return p(e, v);
                }) : (s = function(a, c) {
                    return Ga(c);
                }, r = function(a) {
                    return a;
                });
                m = h.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                if (!m) throw d("iidexp", h);
                t = m[3] || m[1];
                u = m[2];
                var w = {};
                e.$watchCollection(g, function(a) {
                    var e, g, h = f[0], m, p = {}, v, D, E, B, F, G, A, K = [], M = function(a, c) {
                        a[t] = E;
                        u && (a[u] = D);
                        a.$index = c;
                        a.$first = 0 === c;
                        a.$last = c === v - 1;
                        a.$middle = !(a.$first || a.$last);
                        a.$odd = !(a.$even = 0 === (1 & c));
                    };
                    if (bb(a)) G = a, F = k || s; else {
                        F = k || r;
                        G = [];
                        for (g in a) a.hasOwnProperty(g) && "$" != g.charAt(0) && G.push(g);
                        G.sort();
                    }
                    v = G.length;
                    g = K.length = G.length;
                    for (e = 0; e < g; e++) if (D = a === G ? e : G[e], E = a[D], B = F(D, E, e), Aa(B, "`track by` id"), 
                    w.hasOwnProperty(B)) A = w[B], delete w[B], p[B] = A, K[e] = A; else {
                        if (p.hasOwnProperty(B)) throw q(K, function(a) {
                            a && a.scope && (w[a.id] = a);
                        }), d("dupes", l, B);
                        K[e] = {
                            id: B
                        };
                        p[B] = !1;
                    }
                    for (m in w) w.hasOwnProperty(m) && (A = w[m], g = hb(A.clone), c.leave(g), q(g, function(a) {
                        a.$$NG_REMOVED = !0;
                    }), A.scope.$destroy());
                    e = 0;
                    for (g = G.length; e < g; e++) if (D = a === G ? e : G[e], E = a[D], A = K[e], K[e - 1] && (h = K[e - 1].clone[K[e - 1].clone.length - 1]), 
                    A.scope) {
                        m = h;
                        do m = m.nextSibling; while (m && m.$$NG_REMOVED);
                        A.clone[0] != m && c.move(hb(A.clone), null, z(h));
                        h = A.clone[A.clone.length - 1];
                        M(A.scope, e);
                    } else n(function(a, d) {
                        A.scope = d;
                        a[a.length++] = W.createComment(" end ngRepeat: " + l + " ");
                        c.enter(a, null, z(h));
                        h = a;
                        A.clone = a;
                        p[A.id] = A;
                        M(A.scope, e);
                    });
                    w = p;
                });
            }
        };
    } ], Sd = [ "$animate", function(a) {
        return {
            multiElement: !0,
            link: function(c, d, e) {
                c.$watch(e.ngShow, function(c) {
                    a[c ? "removeClass" : "addClass"](d, "ng-hide");
                });
            }
        };
    } ], Ld = [ "$animate", function(a) {
        return {
            multiElement: !0,
            link: function(c, d, e) {
                c.$watch(e.ngHide, function(c) {
                    a[c ? "addClass" : "removeClass"](d, "ng-hide");
                });
            }
        };
    } ], Td = xa(function(a, c, d) {
        a.$watch(d.ngStyle, function(a, d) {
            d && a !== d && q(d, function(a, d) {
                c.css(d, "");
            });
            a && c.css(a);
        }, !0);
    }), Ud = [ "$animate", function(a) {
        return {
            restrict: "EA",
            require: "ngSwitch",
            controller: [ "$scope", function() {
                this.cases = {};
            } ],
            link: function(c, d, e, f) {
                var h = [], g = [], n = [], l = [];
                c.$watch(e.ngSwitch || e.on, function(d) {
                    var p, k;
                    p = 0;
                    for (k = n.length; p < k; ++p) n[p].remove();
                    p = n.length = 0;
                    for (k = l.length; p < k; ++p) {
                        var s = hb(g[p].clone);
                        l[p].$destroy();
                        n[p] = s;
                        a.leave(s, function() {
                            n.splice(p, 1);
                        });
                    }
                    g.length = 0;
                    l.length = 0;
                    if (h = f.cases["!" + d] || f.cases["?"]) c.$eval(e.change), q(h, function(c) {
                        c.transclude(function(d, e) {
                            l.push(e);
                            var f = c.element;
                            d[d.length++] = W.createComment(" end ngSwitchWhen: ");
                            g.push({
                                clone: d
                            });
                            a.enter(d, f.parent(), f);
                        });
                    });
                });
            }
        };
    } ], Vd = xa({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(a, c, d, e, f) {
            e.cases["!" + d.ngSwitchWhen] = e.cases["!" + d.ngSwitchWhen] || [];
            e.cases["!" + d.ngSwitchWhen].push({
                transclude: f,
                element: c
            });
        }
    }), Wd = xa({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(a, c, d, e, f) {
            e.cases["?"] = e.cases["?"] || [];
            e.cases["?"].push({
                transclude: f,
                element: c
            });
        }
    }), Yd = xa({
        restrict: "EAC",
        link: function(a, c, d, e, f) {
            if (!f) throw O("ngTransclude")("orphan", ga(c));
            f(function(a) {
                c.empty();
                c.append(a);
            });
        }
    }), yd = [ "$templateCache", function(a) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(c, d) {
                "text/ng-template" == d.type && a.put(d.id, c[0].text);
            }
        };
    } ], wf = O("ngOptions"), Xd = ba({
        terminal: !0
    }), zd = [ "$compile", "$parse", function(a, c) {
        var d = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, e = {
            $setViewValue: B
        };
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: [ "$element", "$scope", "$attrs", function(a, c, d) {
                var n = this, l = {}, m = e, p;
                n.databound = d.ngModel;
                n.init = function(a, c, d) {
                    m = a;
                    p = d;
                };
                n.addOption = function(c, d) {
                    Aa(c, '"option value"');
                    l[c] = !0;
                    m.$viewValue == c && (a.val(c), p.parent() && p.remove());
                    d[0].hasAttribute("selected") && (d[0].selected = !0);
                };
                n.removeOption = function(a) {
                    this.hasOption(a) && (delete l[a], m.$viewValue == a && this.renderUnknownOption(a));
                };
                n.renderUnknownOption = function(c) {
                    c = "? " + Ga(c) + " ?";
                    p.val(c);
                    a.prepend(p);
                    a.val(c);
                    p.prop("selected", !0);
                };
                n.hasOption = function(a) {
                    return l.hasOwnProperty(a);
                };
                c.$on("$destroy", function() {
                    n.renderUnknownOption = B;
                });
            } ],
            link: function(e, h, g, n) {
                function l(a, c, d, e) {
                    d.$render = function() {
                        var a = d.$viewValue;
                        e.hasOption(a) ? (x.parent() && x.remove(), c.val(a), "" === a && u.prop("selected", !0)) : F(a) && u ? c.val("") : e.renderUnknownOption(a);
                    };
                    c.on("change", function() {
                        a.$apply(function() {
                            x.parent() && x.remove();
                            d.$setViewValue(c.val());
                        });
                    });
                }
                function m(a, c, d) {
                    var e;
                    d.$render = function() {
                        var a = new Va(d.$viewValue);
                        q(c.find("option"), function(c) {
                            c.selected = v(a.get(c.value));
                        });
                    };
                    a.$watch(function() {
                        ra(e, d.$viewValue) || (e = ja(d.$viewValue), d.$render());
                    });
                    c.on("change", function() {
                        a.$apply(function() {
                            var a = [];
                            q(c.find("option"), function(c) {
                                c.selected && a.push(c.value);
                            });
                            d.$setViewValue(a);
                        });
                    });
                }
                function p(e, f, g) {
                    function h() {
                        var a = {
                            "": []
                        }, c = [ "" ], d, k, r, t, B;
                        t = g.$modelValue;
                        B = x(e) || [];
                        var D = n ? $b(B) : B, G, z, C;
                        z = {};
                        r = !1;
                        var F, J;
                        if (s) if (u && M(t)) for (r = new Va([]), C = 0; C < t.length; C++) z[m] = t[C], 
                        r.put(u(e, z), t[C]); else r = new Va(t);
                        for (C = 0; G = D.length, C < G; C++) {
                            k = C;
                            if (n) {
                                k = D[C];
                                if ("$" === k.charAt(0)) continue;
                                z[n] = k;
                            }
                            z[m] = B[k];
                            d = p(e, z) || "";
                            (k = a[d]) || (k = a[d] = [], c.push(d));
                            s ? d = v(r.remove(u ? u(e, z) : q(e, z))) : (u ? (d = {}, d[m] = t, d = u(e, d) === u(e, z)) : d = t === q(e, z), 
                            r = r || d);
                            F = l(e, z);
                            F = v(F) ? F : "";
                            k.push({
                                id: u ? u(e, z) : n ? D[C] : C,
                                label: F,
                                selected: d
                            });
                        }
                        s || (A || null === t ? a[""].unshift({
                            id: "",
                            label: "",
                            selected: !r
                        }) : r || a[""].unshift({
                            id: "?",
                            label: "",
                            selected: !0
                        }));
                        z = 0;
                        for (D = c.length; z < D; z++) {
                            d = c[z];
                            k = a[d];
                            y.length <= z ? (t = {
                                element: w.clone().attr("label", d),
                                label: k.label
                            }, B = [ t ], y.push(B), f.append(t.element)) : (B = y[z], t = B[0], t.label != d && t.element.attr("label", t.label = d));
                            F = null;
                            C = 0;
                            for (G = k.length; C < G; C++) r = k[C], (d = B[C + 1]) ? (F = d.element, d.label !== r.label && F.text(d.label = r.label), 
                            d.id !== r.id && F.val(d.id = r.id), d.selected !== r.selected && (F.prop("selected", d.selected = r.selected), 
                            T && F.prop("selected", d.selected))) : ("" === r.id && A ? J = A : (J = E.clone()).val(r.id).prop("selected", r.selected).text(r.label), 
                            B.push({
                                element: J,
                                label: r.label,
                                id: r.id,
                                selected: r.selected
                            }), F ? F.after(J) : t.element.append(J), F = J);
                            for (C++; B.length > C; ) B.pop().element.remove();
                        }
                        for (;y.length > z; ) y.pop()[0].element.remove();
                    }
                    var k;
                    if (!(k = r.match(d))) throw wf("iexp", r, ga(f));
                    var l = c(k[2] || k[1]), m = k[4] || k[6], n = k[5], p = c(k[3] || ""), q = c(k[2] ? k[1] : m), x = c(k[7]), u = k[8] ? c(k[8]) : null, y = [ [ {
                        element: f,
                        label: ""
                    } ] ];
                    A && (a(A)(e), A.removeClass("ng-scope"), A.remove());
                    f.empty();
                    f.on("change", function() {
                        e.$apply(function() {
                            var a, c = x(e) || [], d = {}, h, k, l, p, r, w, v;
                            if (s) {
                                for (k = [], p = 0, w = y.length; p < w; p++) for (a = y[p], l = 1, r = a.length; l < r; l++) if ((h = a[l].element)[0].selected) {
                                    h = h.val();
                                    n && (d[n] = h);
                                    if (u) for (v = 0; v < c.length && (d[m] = c[v], u(e, d) != h); v++) ; else d[m] = c[h];
                                    k.push(q(e, d));
                                }
                            } else {
                                h = f.val();
                                if ("?" == h) k = t; else if ("" === h) k = null; else if (u) {
                                    for (v = 0; v < c.length; v++) if (d[m] = c[v], u(e, d) == h) {
                                        k = q(e, d);
                                        break;
                                    }
                                } else d[m] = c[h], n && (d[n] = h), k = q(e, d);
                                1 < y[0].length && y[0][1].id !== h && (y[0][1].selected = !1);
                            }
                            g.$setViewValue(k);
                        });
                    });
                    g.$render = h;
                    e.$watch(h);
                }
                if (n[1]) {
                    var k = n[0];
                    n = n[1];
                    var s = g.multiple, r = g.ngOptions, A = !1, u, E = z(W.createElement("option")), w = z(W.createElement("optgroup")), x = E.clone();
                    g = 0;
                    for (var y = h.children(), B = y.length; g < B; g++) if ("" === y[g].value) {
                        u = A = y.eq(g);
                        break;
                    }
                    k.init(n, A, x);
                    s && (n.$isEmpty = function(a) {
                        return !a || 0 === a.length;
                    });
                    r ? p(e, h, n) : s ? m(e, h, n) : l(e, h, n, k);
                }
            }
        };
    } ], Bd = [ "$interpolate", function(a) {
        var c = {
            addOption: B,
            removeOption: B
        };
        return {
            restrict: "E",
            priority: 100,
            compile: function(d, e) {
                if (F(e.value)) {
                    var f = a(d.text(), !0);
                    f || e.$set("value", d.text());
                }
                return function(a, d, e) {
                    var l = d.parent(), m = l.data("$selectController") || l.parent().data("$selectController");
                    m && m.databound ? d.prop("selected", !1) : m = c;
                    f ? a.$watch(f, function(a, c) {
                        e.$set("value", a);
                        c !== a && m.removeOption(c);
                        m.addOption(a, d);
                    }) : m.addOption(e.value, d);
                    d.on("$destroy", function() {
                        m.removeOption(e.value);
                    });
                };
            }
        };
    } ], Ad = ba({
        restrict: "E",
        terminal: !1
    });
    P.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : (qd(), 
    sd(Oa), z(W).ready(function() {
        od(W, gc);
    }));
}(window, document);

!window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-animate){display:none !important;}ng\\:form{display:block;}</style>');

!function() {
    "use strict";
    var e = angular.module("pasvaz.bindonce", []);
    e.directive("bindonce", function() {
        var e = function(e) {
            if (e && 0 !== e.length) {
                var t = angular.lowercase("" + e);
                e = !("f" === t || "0" === t || "false" === t || "no" === t || "n" === t || "[]" === t);
            } else e = !1;
            return e;
        }, t = parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10);
        isNaN(t) && (t = parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10));
        var r = {
            restrict: "AM",
            controller: [ "$scope", "$element", "$attrs", "$interpolate", function(r, a, n, i) {
                var c = function(t, r, a) {
                    var n = "show" === r ? "" : "none", i = "hide" === r ? "" : "none";
                    t.css("display", e(a) ? n : i);
                }, o = function(e, t) {
                    if (angular.isObject(t) && !angular.isArray(t)) {
                        var r = [];
                        angular.forEach(t, function(e, t) {
                            e && r.push(t);
                        }), t = r;
                    }
                    t && e.addClass(angular.isArray(t) ? t.join(" ") : t);
                }, s = {
                    watcherRemover: void 0,
                    binders: [],
                    group: n.boName,
                    element: a,
                    ran: !1,
                    addBinder: function(e) {
                        this.binders.push(e), this.ran && this.runBinders();
                    },
                    setupWatcher: function(e) {
                        var t = this;
                        this.watcherRemover = r.$watch(e, function(e) {
                            void 0 !== e && (t.removeWatcher(), t.runBinders());
                        }, !0);
                    },
                    removeWatcher: function() {
                        void 0 !== this.watcherRemover && (this.watcherRemover(), this.watcherRemover = void 0);
                    },
                    runBinders: function() {
                        for (;this.binders.length > 0; ) {
                            var r = this.binders.shift();
                            if (!this.group || this.group == r.group) {
                                var a = r.scope.$eval(r.interpolate ? i(r.value) : r.value);
                                switch (r.attr) {
                                  case "boIf":
                                    e(a) && r.transclude(r.scope.$new(), function(e) {
                                        var t = r.element.parent(), a = r.element && r.element[r.element.length - 1], n = t && t[0] || a && a.parentNode, i = a && a.nextSibling || null;
                                        angular.forEach(e, function(e) {
                                            n.insertBefore(e, i);
                                        });
                                    });
                                    break;

                                  case "boSwitch":
                                    var n, s = r.controller[0];
                                    (n = s.cases["!" + a] || s.cases["?"]) && (r.scope.$eval(r.attrs.change), angular.forEach(n, function(e) {
                                        e.transclude(r.scope.$new(), function(t) {
                                            var r = e.element.parent(), a = e.element && e.element[e.element.length - 1], n = r && r[0] || a && a.parentNode, i = a && a.nextSibling || null;
                                            angular.forEach(t, function(e) {
                                                n.insertBefore(e, i);
                                            });
                                        });
                                    }));
                                    break;

                                  case "boSwitchWhen":
                                    var l = r.controller[0];
                                    l.cases["!" + r.attrs.boSwitchWhen] = l.cases["!" + r.attrs.boSwitchWhen] || [], 
                                    l.cases["!" + r.attrs.boSwitchWhen].push({
                                        transclude: r.transclude,
                                        element: r.element
                                    });
                                    break;

                                  case "boSwitchDefault":
                                    var l = r.controller[0];
                                    l.cases["?"] = l.cases["?"] || [], l.cases["?"].push({
                                        transclude: r.transclude,
                                        element: r.element
                                    });
                                    break;

                                  case "hide":
                                  case "show":
                                    c(r.element, r.attr, a);
                                    break;

                                  case "class":
                                    o(r.element, a);
                                    break;

                                  case "text":
                                    r.element.text(a);
                                    break;

                                  case "html":
                                    r.element.html(a);
                                    break;

                                  case "style":
                                    r.element.css(a);
                                    break;

                                  case "src":
                                    r.element.attr(r.attr, a), t && r.element.prop("src", a);
                                    break;

                                  case "attr":
                                    angular.forEach(r.attrs, function(e, t) {
                                        var a, n;
                                        t.match(/^boAttr./) && r.attrs[t] && (a = t.replace(/^boAttr/, "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), 
                                        n = r.scope.$eval(r.attrs[t]), r.element.attr(a, n));
                                    });
                                    break;

                                  case "href":
                                  case "alt":
                                  case "title":
                                  case "id":
                                  case "value":
                                    r.element.attr(r.attr, a);
                                }
                            }
                        }
                        this.ran = !0;
                    }
                };
                return s;
            } ],
            link: function(e, t, r, a) {
                var n = r.bindonce ? e.$eval(r.bindonce) : !0;
                void 0 !== n ? n.then && "function" == typeof n.then ? n.then(function() {
                    a.runBinders();
                }) : a.runBinders() : (a.setupWatcher(r.bindonce), t.bind("$destroy", a.removeWatcher));
            }
        };
        return r;
    }), angular.forEach([ {
        directiveName: "boShow",
        attribute: "show"
    }, {
        directiveName: "boHide",
        attribute: "hide"
    }, {
        directiveName: "boClass",
        attribute: "class"
    }, {
        directiveName: "boText",
        attribute: "text"
    }, {
        directiveName: "boBind",
        attribute: "text"
    }, {
        directiveName: "boHtml",
        attribute: "html"
    }, {
        directiveName: "boSrcI",
        attribute: "src",
        interpolate: !0
    }, {
        directiveName: "boSrc",
        attribute: "src"
    }, {
        directiveName: "boHrefI",
        attribute: "href",
        interpolate: !0
    }, {
        directiveName: "boHref",
        attribute: "href"
    }, {
        directiveName: "boAlt",
        attribute: "alt"
    }, {
        directiveName: "boTitle",
        attribute: "title"
    }, {
        directiveName: "boId",
        attribute: "id"
    }, {
        directiveName: "boStyle",
        attribute: "style"
    }, {
        directiveName: "boValue",
        attribute: "value"
    }, {
        directiveName: "boAttr",
        attribute: "attr"
    }, {
        directiveName: "boIf",
        transclude: "element",
        terminal: !0,
        priority: 1e3
    }, {
        directiveName: "boSwitch",
        require: "boSwitch",
        controller: function() {
            this.cases = {};
        }
    }, {
        directiveName: "boSwitchWhen",
        transclude: "element",
        priority: 800,
        require: "^boSwitch"
    }, {
        directiveName: "boSwitchDefault",
        transclude: "element",
        priority: 800,
        require: "^boSwitch"
    } ], function(t) {
        var r = 200;
        return e.directive(t.directiveName, function() {
            var e = {
                priority: t.priority || r,
                transclude: t.transclude || !1,
                terminal: t.terminal || !1,
                require: [ "^bindonce" ].concat(t.require || []),
                controller: t.controller,
                compile: function(e, r, a) {
                    return function(e, r, n, i) {
                        var c = i[0], o = n.boParent;
                        if (o && c.group !== o) {
                            var s = c.element.parent();
                            c = void 0;
                            for (var l; 9 !== s[0].nodeType && s.length; ) {
                                if ((l = s.data("$bindonceController")) && l.group === o) {
                                    c = l;
                                    break;
                                }
                                s = s.parent();
                            }
                            if (!c) throw new Error("No bindonce controller: " + o);
                        }
                        c.addBinder({
                            element: r,
                            attr: t.attribute || t.directiveName,
                            attrs: n,
                            value: n[t.directiveName],
                            interpolate: t.interpolate,
                            group: o,
                            transclude: a,
                            controller: i.slice(1),
                            scope: e
                        });
                    };
                }
            };
            return e;
        });
    });
}();

!function(a, b) {
    function c(a) {
        return function(b) {
            return {}.toString.call(b) == "[object " + a + "]";
        };
    }
    function d() {
        return A++;
    }
    function e(a) {
        return a.match(D)[0];
    }
    function f(a) {
        for (a = a.replace(E, "/"); a.match(F); ) a = a.replace(F, "/");
        return a = a.replace(G, "$1/");
    }
    function g(a) {
        var b = a.length - 1, c = a.charAt(b);
        return "#" === c ? a.substring(0, b) : ".js" === a.substring(b - 2) || a.indexOf("?") > 0 || ".css" === a.substring(b - 3) || "/" === c ? a : a + ".js";
    }
    function h(a) {
        var b = v.alias;
        return b && x(b[a]) ? b[a] : a;
    }
    function i(a) {
        var b = v.paths, c;
        return b && (c = a.match(H)) && x(b[c[1]]) && (a = b[c[1]] + c[2]), a;
    }
    function j(a) {
        var b = v.vars;
        return b && a.indexOf("{") > -1 && (a = a.replace(I, function(a, c) {
            return x(b[c]) ? b[c] : a;
        })), a;
    }
    function k(a) {
        var b = v.map, c = a;
        if (b) for (var d = 0, e = b.length; e > d; d++) {
            var f = b[d];
            if (c = z(f) ? f(a) || a : a.replace(f[0], f[1]), c !== a) break;
        }
        return c;
    }
    function l(a, b) {
        var c, d = a.charAt(0);
        if (J.test(a)) c = a; else if ("." === d) c = f((b ? e(b) : v.cwd) + a); else if ("/" === d) {
            var g = v.cwd.match(K);
            c = g ? g[0] + a.substring(1) : a;
        } else c = v.base + a;
        return 0 === c.indexOf("//") && (c = location.protocol + c), c;
    }
    function m(a, b) {
        if (!a) return "";
        a = h(a), a = i(a), a = j(a), a = g(a);
        var c = l(a, b);
        return c = k(c);
    }
    function n(a) {
        return a.hasAttribute ? a.src : a.getAttribute("src", 4);
    }
    function o(a, b, c) {
        var d = S.test(a), e = L.createElement(d ? "link" : "script");
        if (c) {
            var f = z(c) ? c(a) : c;
            f && (e.charset = f);
        }
        p(e, b, d, a), d ? (e.rel = "stylesheet", e.href = a) : (e.async = !0, e.src = a), 
        T = e, R ? Q.insertBefore(e, R) : Q.appendChild(e), T = null;
    }
    function p(a, c, d, e) {
        function f() {
            a.onload = a.onerror = a.onreadystatechange = null, d || v.debug || Q.removeChild(a), 
            a = null, c();
        }
        var g = "onload" in a;
        return !d || !V && g ? (g ? (a.onload = f, a.onerror = function() {
            C("error", {
                uri: e,
                node: a
            }), f();
        }) : a.onreadystatechange = function() {
            /loaded|complete/.test(a.readyState) && f();
        }, b) : (setTimeout(function() {
            q(a, c);
        }, 1), b);
    }
    function q(a, b) {
        var c = a.sheet, d;
        if (V) c && (d = !0); else if (c) try {
            c.cssRules && (d = !0);
        } catch (e) {
            "NS_ERROR_DOM_SECURITY_ERR" === e.name && (d = !0);
        }
        setTimeout(function() {
            d ? b() : q(a, b);
        }, 20);
    }
    function r() {
        if (T) return T;
        if (U && "interactive" === U.readyState) return U;
        for (var a = Q.getElementsByTagName("script"), b = a.length - 1; b >= 0; b--) {
            var c = a[b];
            if ("interactive" === c.readyState) return U = c;
        }
    }
    function s(a) {
        var b = [];
        return a.replace(X, "").replace(W, function(a, c, d) {
            d && b.push(d);
        }), b;
    }
    function t(a, b) {
        this.uri = a, this.dependencies = b || [], this.exports = null, this.status = 0, 
        this._waitings = {}, this._remain = 0;
    }
    if (!a.seajs) {
        var u = a.seajs = {
            version: "2.2.0"
        }, v = u.data = {}, w = c("Object"), x = c("String"), y = Array.isArray || c("Array"), z = c("Function"), A = 0, B = v.events = {};
        u.on = function(a, b) {
            var c = B[a] || (B[a] = []);
            return c.push(b), u;
        }, u.off = function(a, b) {
            if (!a && !b) return B = v.events = {}, u;
            var c = B[a];
            if (c) if (b) for (var d = c.length - 1; d >= 0; d--) c[d] === b && c.splice(d, 1); else delete B[a];
            return u;
        };
        var C = u.emit = function(a, b) {
            var c = B[a], d;
            if (c) for (c = c.slice(); d = c.shift(); ) d(b);
            return u;
        }, D = /[^?#]*\//, E = /\/\.\//g, F = /\/[^/]+\/\.\.\//, G = /([^:/])\/\//g, H = /^([^/:]+)(\/.+)$/, I = /{([^{]+)}/g, J = /^\/\/.|:\//, K = /^.*?\/\/.*?\//, L = document, M = e(L.URL), N = L.scripts, O = L.getElementById("seajsnode") || N[N.length - 1], P = e(n(O) || M);
        u.resolve = m;
        var Q = L.getElementsByTagName("head")[0] || L.documentElement, R = Q.getElementsByTagName("base")[0], S = /\.css(?:\?|$)/i, T, U, V = +navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536;
        u.request = o;
        var W = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, X = /\\\\/g, Y = u.cache = {}, Z, $ = {}, _ = {}, ab = {}, bb = t.STATUS = {
            FETCHING: 1,
            SAVED: 2,
            LOADING: 3,
            LOADED: 4,
            EXECUTING: 5,
            EXECUTED: 6
        };
        t.prototype.resolve = function() {
            for (var a = this, b = a.dependencies, c = [], d = 0, e = b.length; e > d; d++) c[d] = t.resolve(b[d], a.uri);
            return c;
        }, t.prototype.load = function() {
            var a = this;
            if (!(a.status >= bb.LOADING)) {
                a.status = bb.LOADING;
                var c = a.resolve();
                C("load", c);
                for (var d = a._remain = c.length, e, f = 0; d > f; f++) e = t.get(c[f]), e.status < bb.LOADED ? e._waitings[a.uri] = (e._waitings[a.uri] || 0) + 1 : a._remain--;
                if (0 === a._remain) return a.onload(), b;
                var g = {};
                for (f = 0; d > f; f++) e = Y[c[f]], e.status < bb.FETCHING ? e.fetch(g) : e.status === bb.SAVED && e.load();
                for (var h in g) g.hasOwnProperty(h) && g[h]();
            }
        }, t.prototype.onload = function() {
            var a = this;
            a.status = bb.LOADED, a.callback && a.callback();
            var b = a._waitings, c, d;
            for (c in b) b.hasOwnProperty(c) && (d = Y[c], d._remain -= b[c], 0 === d._remain && d.onload());
            delete a._waitings, delete a._remain;
        }, t.prototype.fetch = function(a) {
            function c() {
                u.request(g.requestUri, g.onRequest, g.charset);
            }
            function d() {
                delete $[h], _[h] = !0, Z && (t.save(f, Z), Z = null);
                var a, b = ab[h];
                for (delete ab[h]; a = b.shift(); ) a.load();
            }
            var e = this, f = e.uri;
            e.status = bb.FETCHING;
            var g = {
                uri: f
            };
            C("fetch", g);
            var h = g.requestUri || f;
            return !h || _[h] ? (e.load(), b) : $[h] ? (ab[h].push(e), b) : ($[h] = !0, ab[h] = [ e ], 
            C("request", g = {
                uri: f,
                requestUri: h,
                onRequest: d,
                charset: v.charset
            }), g.requested || (a ? a[g.requestUri] = c : c()), b);
        }, t.prototype.exec = function() {
            function a(b) {
                return t.get(a.resolve(b)).exec();
            }
            var c = this;
            if (c.status >= bb.EXECUTING) return c.exports;
            c.status = bb.EXECUTING;
            var e = c.uri;
            a.resolve = function(a) {
                return t.resolve(a, e);
            }, a.async = function(b, c) {
                return t.use(b, c, e + "_async_" + d()), a;
            };
            var f = c.factory, g = z(f) ? f(a, c.exports = {}, c) : f;
            return g === b && (g = c.exports), delete c.factory, c.exports = g, c.status = bb.EXECUTED, 
            C("exec", c), g;
        }, t.resolve = function(a, b) {
            var c = {
                id: a,
                refUri: b
            };
            return C("resolve", c), c.uri || u.resolve(c.id, b);
        }, t.define = function(a, c, d) {
            var e = arguments.length;
            1 === e ? (d = a, a = b) : 2 === e && (d = c, y(a) ? (c = a, a = b) : c = b), !y(c) && z(d) && (c = s("" + d));
            var f = {
                id: a,
                uri: t.resolve(a),
                deps: c,
                factory: d
            };
            if (!f.uri && L.attachEvent) {
                var g = r();
                g && (f.uri = g.src);
            }
            C("define", f), f.uri ? t.save(f.uri, f) : Z = f;
        }, t.save = function(a, b) {
            var c = t.get(a);
            c.status < bb.SAVED && (c.id = b.id || a, c.dependencies = b.deps || [], c.factory = b.factory, 
            c.status = bb.SAVED);
        }, t.get = function(a, b) {
            return Y[a] || (Y[a] = new t(a, b));
        }, t.use = function(b, c, d) {
            var e = t.get(d, y(b) ? b : [ b ]);
            e.callback = function() {
                for (var b = [], d = e.resolve(), f = 0, g = d.length; g > f; f++) b[f] = Y[d[f]].exec();
                c && c.apply(a, b), delete e.callback;
            }, e.load();
        }, t.preload = function(a) {
            var b = v.preload, c = b.length;
            c ? t.use(b, function() {
                b.splice(0, c), t.preload(a);
            }, v.cwd + "_preload_" + d()) : a();
        }, u.use = function(a, b) {
            return t.preload(function() {
                t.use(a, b, v.cwd + "_use_" + d());
            }), u;
        }, t.define.cmd = {}, a.define = t.define, u.Module = t, v.fetchedList = _, v.cid = d, 
        u.require = function(a) {
            var b = t.get(t.resolve(a));
            return b.status < bb.EXECUTING && b.exec(), b.exports;
        };
        var cb = /^(.+?\/)(\?\?)?(seajs\/)+/;
        v.base = (P.match(cb) || [ "", P ])[1], v.dir = P, v.cwd = M, v.charset = "utf-8", 
        v.preload = function() {
            var a = [], b = location.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
            return b += " " + L.cookie, b.replace(/(seajs-\w+)=1/g, function(b, c) {
                a.push(c);
            }), a;
        }(), u.config = function(a) {
            for (var b in a) {
                var c = a[b], d = v[b];
                if (d && w(d)) for (var e in c) d[e] = c[e]; else y(d) ? c = d.concat(c) : "base" === b && ("/" !== c.slice(-1) && (c += "/"), 
                c = l(c)), v[b] = c;
            }
            return C("config", a), u;
        };
    }
}(this);

!function(global, undefined) {
    "use strict";
    var isMobile = !navigator.userAgent || navigator.userAgent.indexOf("Android") > -1;
    if ("undefined" == typeof global.PROD) if (isMobile) global.PROD = true; else global.PROD = false;
    var promptCount = 0;
    var JSBridge = {
        callbackCache: {},
        callbackId: 0,
        callCount: 0,
        batchCache: [],
        callNative: function(clz, method, args, callback) {
            var jsonStr;
            if ("object" === typeof clz) jsonStr = JSON.stringify(clz); else jsonStr = JSON.stringify(JSBridge.collectParams(clz, method, args, callback));
            JSBridge.callCount++;
            if (true) return prompt(jsonStr);
        },
        callLater: function(clz, method, args, callback) {
            JSBridge.batchCache.push(Array.prototype.slice.call(arguments, 0));
            if (!JSBridge.isCallingLater) JSBridge.isCallingLater = setTimeout(function() {
                if (JSBridge.batchCache.length > 0) {
                    JSBridge.callBatch(JSBridge.batchCache);
                    JSBridge.batchCache = [];
                }
                JSBridge.isCallingLater = null;
            }, 50);
        },
        callBatch: function(params) {
            var jsonArr = [];
            for (var i = 0, len = params.length; i < len; i++) {
                var json = JSBridge.collectParams.apply(JSBridge, params[i]);
                jsonArr.push(json);
            }
            if (1 == jsonArr.length) jsonArr = jsonArr[0];
            return JSON.parse(JSBridge.callNative(jsonArr) || "[]");
        },
        collectParams: function(clz, method, args, callback) {
            var json = {
                clz: clz,
                method: method,
                args: args
            };
            if (callback) {
                JSBridge.callbackId++;
                var callbackId = JSBridge.callbackId.toString();
                JSBridge.callbackCache[callbackId] = callback;
                callback.callbackId = callbackId;
                json.args = args || {};
                json.args.callbackId = callbackId;
            }
            return json;
        },
        onCallback: function(callbackId, data) {
            if (JSBridge.callbackCache.hasOwnProperty(callbackId)) {
                JSBridge.callbackCache[callbackId](data);
                JSBridge.callbackCache[callbackId] = undefined;
                delete JSBridge.callbackCache[callbackId];
            } else console.warn("[JSBridge] unavailable callbackId: " + callbackId);
        },
        onEvent: function(type, data, params) {
            console.log("[JSBridge] default onEvent handler: ", type, data);
        }
    };
    JSBridge.getNativeApp = function() {
        return angular.element(document.body).injector().get("NativeApp");
    };
    JSBridge.getInjector = function(serviceName) {
        var injector = angular.element(document.body).injector();
        return serviceName ? injector.get(serviceName) : injector;
    };
    JSBridge.getRootScope = function() {
        return angular.element(document.body).injector().get("$rootScope");
    };
    JSBridge.getViewScope = function() {
        return angular.element(document.getElementById("view")).scope();
    };
    JSBridge.callNineGameClient = function(method, args, callback) {
        return JSBridge.callNative("NineGameClient", method, args, callback);
    };
    JSBridge.touchBottom = function() {
        JSBridge.onEvent("page_scroll_bottom");
    };
    global.JSBridge = JSBridge;
}(window);

!function(global, undefined) {
    "use strict";
    var exports = {};
    exports.isMobile = function() {
        return !navigator.userAgent || navigator.userAgent.indexOf("Android") > -1;
    };
    exports.applyIf = function(config, defaults) {
        if (config && defaults && angular.isObject(defaults)) for (var key in defaults) if (defaults.hasOwnProperty(key)) {
            var value = config[key];
            var defaultValue = defaults[key];
            if (value == undefined && defaultValue != undefined) config[key] = angular.copy(defaultValue); else if (!angular.isArray(value) && angular.isObject(value) && !angular.isArray(defaultValue) && angular.isObject(defaultValue)) exports.applyIf(value, defaultValue);
        }
        return config;
        return config;
    };
    exports.slice = function(input, start, end) {
        return input ? input.slice(start, end) : input;
    };
    exports.formatSize = function(input, count) {
        if (null == input) return "";
        input = parseInt(input);
        count = count === undefined ? 1 : count;
        if (input < 1024) return input.toFixed(count); else if (input < 1048576) return (input / 1024).toFixed(count) + "K"; else if (input < 1073741824) return (input / 1048576).toFixed(count) + "M"; else return (input / 1073741824).toFixed(count) + "G";
    };
    exports.formatDownload = function(input) {
        var charAry = [ "亿", "万" ];
        var numAry = [ 1e8, 1e4 ];
        for (var i = 0; i < numAry.length; i++) {
            var fair = input % numAry[i];
            var itInt = input / numAry[i];
            if (itInt > 1) return parseInt(itInt) + charAry[i] + (0 != fair ? "+" : "");
        }
        if (input <= 5e3) return 2500 + (input % 5e3 != 0 ? "+" : "");
        if (input > 5e3 && input < 1e4) return 5e3 + "+";
        return input;
    };
    exports.group = function(items, groupSize) {
        if (!items) return [];
        if (!groupSize) return items;
        var groups = [];
        var inner = [];
        for (var i = 0; i < items.length; i++) {
            if (i % groupSize === 0) {
                inner = [];
                groups.push(inner);
            }
            inner.push(items[i]);
        }
        return groups;
    };
    exports.groupBy = function(items, groupKey, formatFn) {
        var groups = [];
        var mapping = {};
        formatFn = formatFn || angular.identity;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var key = angular.isFunction(groupKey) ? groupKey(item) : item[groupKey];
            if (!mapping.hasOwnProperty(key)) {
                mapping[key] = {
                    name: key,
                    list: []
                };
                groups.push(mapping[key]);
            }
            mapping[key].list.push(formatFn(items[i]));
        }
        return groups;
    };
    exports.traverse = function(obj, callback, traversePath) {
        for (var key in obj) if (obj.hasOwnProperty(key)) {
            var item = obj[key];
            var path = traversePath || [];
            if (item instanceof Object && !(item instanceof Array)) {
                callback.apply(this, [ key, item, false, obj, path ]);
                var nextPath = angular.copy(path);
                nextPath.push(key);
                exports.traverse(item, callback, nextPath);
            } else callback.apply(this, [ key, item, true, obj, path ]);
        }
    };
    exports.findSubItem = function(obj, property) {
        var result = [];
        exports.traverse(obj, function(key, value, isLeaf, parent, traversePath) {
            if (key === property) result.push({
                key: key,
                value: value,
                isLeaf: isLeaf,
                parent: parent,
                traversePath: traversePath
            });
        });
        return result;
    };
    exports.htmlDecode = function(input) {
        if (!input) return;
        var strLen = input.length, lastFourChars = "", currCharCode = "", resstr = "";
        for (var k = 0; k < strLen; k++) {
            var currChar = input[k];
            if ("&" == currChar || "#" == currChar) continue;
            if (";" == currChar) {
                var decodeChar = String.fromCharCode(parseInt(currCharCode));
                if ("<" == decodeChar || lastFourChars) lastFourChars += decodeChar; else resstr += decodeChar;
                if (lastFourChars.length >= 4) {
                    resstr += lastFourChars;
                    lastFourChars = "";
                }
                currCharCode = "";
            } else currCharCode += currChar;
        }
        return resstr;
    };
    exports.removeHtml = function(input) {
        return input && input.replace(/<(?:.|\n)*?>/gm, "").replace(/(&rdquo;)/g, '"').replace(/&ldquo;/g, '"').replace(/&mdash;/g, "-").replace(/&nbsp;/g, "").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/<[\w\s"':=\/]*/, "");
    };
    exports.getURLParameters = function(url, name) {
        var params = {};
        url.replace(/[?&]+([^=&]+)=([^&#]*)/gi, function(m, key, value) {
            params[key] = decodeURIComponent(value);
        });
        return name ? params[name] : params;
    };
    exports.formatStr = function(tpl, obj) {
        obj = "object" === typeof obj ? obj : Array.prototype.slice.call(arguments, 1);
        return tpl.replace(/\{\{|\}\}|\{(\w+)\}/g, function(m, n) {
            if ("{{" == m) return "{";
            if ("}}" == m) return "}";
            return obj.hasOwnProperty(n) ? obj[n] : "";
        });
    };
    exports.formatDate = function(obj, format) {
        var date = obj || new Date();
        if (obj && "[object Date]" !== obj.toString) if (isNaN(obj)) date = new Date(obj); else {
            date = new Date();
            date.setTime(obj);
        }
        format = format || "yyyy-MM-dd hh:mm:ss";
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, 1 == RegExp.$1.length ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };
    exports.formatRemainTime = function(input) {
        if (null == input) return "";
        input = parseInt(input);
        var hour = parseInt(input / 3600);
        var minute = parseInt(input % 3600 / 60);
        var second = parseInt(input % 3600 % 60);
        var result = "剩";
        if (hour) result += hour + "小时";
        if (minute) result += minute + "分";
        if (second) {
            if (hour && !minute) result += minute + "分";
            result += second + "秒";
        }
        return result;
    };
    exports.transformDate = function(timestamp) {
        if (timestamp) {
            var currentDate = new Date();
            var currentYear = currentDate.getYear();
            var currentMonth = currentDate.getMonth() + 1;
            var currentDay = currentDate.getDate();
            var date = new Date(timestamp);
            var year = date.getYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var mSecond = currentDate.getTime() - timestamp;
            var dtNew = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1e3);
            if (mSecond > 0 && mSecond <= 1e3 * 60 * 10) return Math.ceil(mSecond / (1e3 * 60)) + "分钟前"; else if (currentYear == year && currentMonth == month && currentDay == day) return "今天"; else if (currentYear == dtNew.getYear() && currentMonth == dtNew.getMonth() + 1 && currentDay == dtNew.getDate()) return "昨天"; else return exports.formatDate(timestamp, "MM-dd");
        } else return "";
    };
    exports.closest = function(el, parentClass) {
        while (el = angular.element(el).parent()) {
            if (!el.length) return false;
            if (el.hasClass(parentClass)) return el;
        }
    };
    exports.loadCss = function(cssName) {
        var cssTag = document.getElementById("loadCss");
        var head = document.getElementsByTagName("head").item(0);
        if (cssTag) head.removeChild(cssTag);
        var css = document.createElement("link");
        css.href = "css/" + cssName;
        css.rel = "stylesheet";
        css.type = "text/css";
        css.id = "loadCss";
        head.appendChild(css);
    };
    exports.valueOf = function(value, defaultValue) {
        var ret = value;
        if ("" == ret || ret == undefined) ret = defaultValue;
        return ret;
    };
    var app = angular.module("ngmUtils", []);
    app.factory("Utils", function() {
        return exports;
    });
    registerFilter(app, exports);
    function registerFilter(subModule, obj) {
        var addFilter = function(key, fn) {
            if (angular.isFunction(fn)) subModule.filter(key, function() {
                return fn;
            });
        };
        for (var key in obj) if (obj.hasOwnProperty(key)) addFilter(key, obj[key]);
    }
    exports.relayout = function(dom) {
        if (!dom) dom = document.body;
        var overflow, arr = [ overflow = dom.style.overflow, "hidden" == overflow ? "auto" : "hidden" ];
        dom.style.overflow = arr.pop();
        dom.offsetHeight;
        dom.style.overflow = arr.pop();
    };
}(window);

!function(global, undefined) {
    "use strict";
    if (!global.JSBridge) throw new Error("plz load jsbridge.js first.");
    var app = angular.module("ngmBridge", [ "ngmUtils" ]);
    app.factory("NativeApp", [ "$rootScope", "$location", "$http", "$timeout", "$q", "Utils", function($rootScope, $location, $http, $timeout, $q, Utils) {
        var NativeApp = {};
        var callNative = function(method, args, callback) {
            var param = [ "NineGameClient" ].concat(Array.prototype.slice.call(arguments, 0));
            return JSBridge.callNative.apply(JSBridge, param);
        };
        var callLater = function(method, args, callback) {
            var param = [ "NineGameClient" ].concat(Array.prototype.slice.call(arguments, 0));
            return JSBridge.callLater.apply(JSBridge, param);
        };
        NativeApp.CONSTANT_PAGE_BOTTOM = 500;
        NativeApp.EVENT_ERROR = "error";
        NativeApp.EVENT_MESSAGE_RECEIVED = "message_received";
        NativeApp.EVENT_CONFIG_CHANGED = "config_changed";
        NativeApp.EVENT_WEBVIEW_INIT = "webview_init";
        NativeApp.EVENT_WEBVIEW_VISIBLE_CHANGED = "webview_visible_changed";
        NativeApp.EVENT_PAGE_SCROLL_BOTTOM = "page_scroll_bottom";
        NativeApp.EVENT_TAB_SWITCH = "tab_switch";
        NativeApp.EVENT_WINDOW_CLOSED = "window_closed";
        NativeApp.EVENT_WINDOW_OPEN = "window_open";
        NativeApp.EVENT_PACKAGE_STATE_CHANGED = "package_state_changed";
        NativeApp.EVENT_FOLLOW_STATE_CHANGED = "follow_state_changed";
        NativeApp.EVENT_EXTRACT_PROGRESS_CHANGED = "extract_progress_changed";
        NativeApp.EVENT_GIFT_STATE_CHANGED = "gift_state_changed";
        NativeApp.EVENT_GIFT_NEW_COUNT_CHANGED = "gift_new_count_changed";
        NativeApp.EVENT_COMMENT_ADDED = "comment_added";
        NativeApp.EVENT_WEBVIEW_VISIBLE_CHANGED = "webview_visible_changed";
        NativeApp.EVENT_ACCOUNT_STATE_CHANGED = "account_state_changed";
        NativeApp.showMessage = function(msg, iconType, callback) {
            if (1 == arguments.length) alert(msg); else callNative("showMessage", {
                msg: msg,
                iconType: iconType
            }, callback);
        };
        NativeApp.timeCounters = {};
        NativeApp.time = function(name) {
            if (name) {
                var time = new Date().getTime();
                NativeApp.timeCounters[name] = time;
            }
        };
        NativeApp.timeEnd = function(name, threshold) {
            var time = new Date().getTime();
            var timeCounter = NativeApp.timeCounters[name];
            var diff;
            if (timeCounter) {
                diff = time - timeCounter;
                var label = name + ": " + diff + "ms";
                if (threshold && diff > threshold) console.warn(label + " , cost max than " + threshold + "ms"); else console.debug(label);
                delete NativeApp.timeCounters[name];
            }
            return diff;
        };
        NativeApp.getEnv = function(key) {
            if (!true) if ("imei" == key) return "351746051785353";
            NativeApp.env = NativeApp.env || {};
            if (NativeApp.env.hasOwnProperty(key)) return NativeApp.env[key]; else {
                var value = callNative("getEnv", {
                    key: key
                });
                if ([ "uuid", "model", "imei", "mac", "apkversion", "versioncode", "templateversion", "systemversion", "realscreenw", "realscreenh", "webviewid" ].indexOf(key) != -1) NativeApp.env[key] = value;
                return value;
            }
        };
        NativeApp.getConfig = function(key) {
            if (!NativeApp.cfg) {
                var config = callNative("getConfig", {});
                NativeApp.cfg = JSON.parse(config || "{}");
            }
            return key ? NativeApp.cfg[key] : NativeApp.cfg;
        };
        NativeApp.setConfig = function(key, value) {
            return callNative("setConfig", {
                key: key,
                value: value
            });
        };
        NativeApp.getServerUrl = function(path) {
            var serverUrl;
            if (path && path.match(/^https?:\/\//)) serverUrl = path; else {
                if (true) serverUrl = (NativeApp.getConfig("h5_api_server") || "http://assistant.9game.cn").replace(/\/$/, ""); else serverUrl = "http://9game.dev2.g.uc.cn";
                if (path) serverUrl = serverUrl + "/" + path.replace(/^\//, "");
            }
            return serverUrl;
        };
        NativeApp.readFile = function(path, base, callback) {
            if (2 == arguments.length) {
                callback = base;
                base = "html";
            }
            if (!true && callback) callback({
                result: false,
                msg: "readFile return fail on pc"
            }); else return callNative("readFile", {
                path: "/" + path.replace(/^\//, ""),
                base: base,
                encoding: "utf-8"
            }, callback);
        };
        NativeApp.getCache = function(key, clearCache) {
            return callNative("getCache", {
                key: key,
                clearCache: clearCache
            });
        };
        NativeApp.setCache = function(key, value, maxAge) {
            return callNative("setCache", {
                key: key,
                value: value,
                maxAge: maxAge ? maxAge : 1e3 * 60 * 60 * 24 * 7
            });
        };
        NativeApp.getSession = function(key, clearCache) {
            return callNative("getSession", {
                key: key,
                clearCache: clearCache
            });
        };
        NativeApp.setSession = function(key, value) {
            return callNative("setSession", {
                key: key,
                value: value
            });
        };
        NativeApp.getClipboard = function() {
            return callNative("getClipboard");
        };
        NativeApp.setClipboard = function(value) {
            return callNative("setClipboard", {
                value: value
            });
        };
        NativeApp.addActionStat = function(action, a1, a2, a3, adpId, admId) {
            if (angular.isString(action) && a1) callLater("addStat", {
                statInfo: {
                    action: action,
                    a1: a1,
                    a2: a2,
                    a3: a3,
                    ad: admId,
                    ad_position: adpId
                }
            }); else if (angular.isObject(action) && action.action && action.a1 || angular.isArray(action)) callLater("addStat", {
                statInfo: action
            }); else console.warn("The action=[%s] & a1=[%s] is not valid!", action, a1);
        };
        var statArray = [];
        var isFlushingStat;
        NativeApp.batchAddActionStat = function(action, a1, a2, a3, adpId, admId) {
            if (action && a1) statArray.push({
                action: action,
                a1: a1,
                a2: a2,
                a3: a3,
                ad: admId,
                ad_position: adpId
            });
            if (!isFlushingStat && statArray.length > 0) isFlushingStat = setTimeout(function() {
                callNative("addStat", {
                    statInfo: statArray
                });
                statArray = [];
                isFlushingStat = null;
            }, 500);
        };
        NativeApp.addRegionStat = function(region, position, p1, p2, p3) {
            if (angular.isString(region)) callLater("addStat", {
                statInfo: {
                    region: region,
                    position: position,
                    p1: p1,
                    p2: p2,
                    p3: p3
                }
            }); else if (angular.isObject(region) && region.region) callLater("addStat", {
                statInfo: region
            }); else console.warn("The region [%s] is not valid!", region);
        };
        NativeApp.eventList = {};
        JSBridge.onEvent = function(type, data, params) {
            if (NativeApp.eventList.hasOwnProperty(type)) $timeout(function() {
                var listener = NativeApp.eventList[type];
                if (angular.isFunction(listener)) listener(type, data, params); else $rootScope.$broadcast(type, data, params);
            }); else console.log("receive unregister event:" + type);
        };
        NativeApp.registerEvent = function(type, params, listener) {
            if (2 == arguments.length && angular.isFunction(params)) {
                listener = params;
                params = {};
            }
            if (NativeApp.eventList.hasOwnProperty(type)) console.debug("[NativeApp] registerEvent " + type + " multi time");
            if (angular.isFunction(listener)) NativeApp.eventList[type] = listener; else NativeApp.eventList[type] = params;
            callLater("registerEvent", {
                type: type,
                params: params
            });
        };
        NativeApp.unregisterEvent = function(type) {
            callLater("unregisterEvent", {
                type: type
            });
            delete NativeApp.eventList[type];
        };
        NativeApp.triggerEvent = function(type, data) {
            callLater("triggerEvent", {
                type: type,
                data: data
            });
        };
        NativeApp.requestTClient = function(params) {
            var query = angular.copy(params);
            query.url = NativeApp.getServerUrl(params.url || "/tclient.html");
            return $http.get(query.url, {
                params: {
                    key: query.key,
                    params: query.params
                },
                headers: {
                    "jycache-time": query.cache
                }
            });
        };
        NativeApp.requestDataApi = function(params) {
            var promise;
            var query = angular.copy(params);
            query.data = query.data || {};
            query.url = NativeApp.getServerUrl(params.url);
            query.client = query.client || {};
            query.client.caller = query.client.caller || "h5";
            if (true) {
                var deferred = $q.defer();
                promise = deferred.promise;
                var startTime = new Date().getTime();
                callNative("DataApi", query, function(json) {
                    var finishTime = new Date().getTime();
                    deferred.resolve({
                        status: 200,
                        data: json,
                        measure: {
                            startTime: startTime,
                            finishTime: finishTime,
                            duration: finishTime - startTime
                        }
                    });
                });
            } else {
                angular.extend(query, {
                    id: new Date().getTime(),
                    encrypt: "md5",
                    client: {
                        caller: "h5",
                        os: "android",
                        ver: "2.7.0",
                        uuid: "0b4160cb-5d61-4d78-94c6-ffa979907c6f",
                        ch: "KD_45",
                        ex: {
                            imei: "351746051785353",
                            imsi: "460010912121001"
                        }
                    }
                });
                var startTime = new Date().getTime();
                promise = $http.post(query.url, query).then(function(response) {
                    var finishTime = new Date().getTime();
                    response.measure = {
                        startTime: startTime,
                        finishTime: finishTime,
                        duration: finishTime - startTime
                    };
                    return response;
                });
            }
            return promise;
        };
        NativeApp.setNavTitle = function(value) {
            if (true) callLater("setNavTitle", {
                value: value
            }); else document.title = value;
        };
        NativeApp.switchTab = function(index, tag) {
            callNative("switchTab", {
                index: index,
                tag: tag
            });
        };
        NativeApp.setTabTitle = function(value, index) {
            callLater("setTabTitle", {
                value: value,
                index: index
            });
        };
        NativeApp.openWindow = function(url, params, target, options, callback) {
            if (true) {
                if (url && !target) {
                    var urlParams = Utils.getURLParameters(url);
                    target = urlParams["pageType"];
                    if (!target) target = /^http/.test(url) || /^https/.test(url) || /^www/.test(url) ? "browser" : "common";
                    if (/^www/.test(url)) url = "http://" + url;
                }
                callNative("openWindow", {
                    url: url,
                    params: params,
                    target: target || "common",
                    options: options || {}
                }, callback);
            } else {
                if (0 != url.indexOf("http")) url = "/?route=" + url;
                var paramStr = "";
                if (null != params && "" != params) {
                    angular.forEach(params, function(value, key) {
                        value = angular.isObject(value) ? JSON.stringify(value) : value;
                        paramStr += key + "=" + value + "&";
                    });
                    var index = paramStr.lastIndexOf("&");
                    if (index > -1) if (url.indexOf("?") > -1) url = url + "&" + paramStr.substring(0, index); else url = url + "?" + paramStr.substring(0, index);
                }
                window.open(url);
            }
        };
        NativeApp.closeWindow = function(json) {
            callNative("closeWindow", json);
        };
        NativeApp.setWebViewState = function(state) {
            angular.element(document.body).css("visibility", "visible");
            $rootScope.loadState = state;
            if ("error" == state) {
                angular.element(document.body).removeClass("body");
                angular.element(document.body).css("background-color", "#FFF");
                $rootScope.loadErrorType = "unavailable" == NativeApp.getEnv("network") ? "network" : "";
            } else {
                angular.element(document.body).addClass("body");
                if ($rootScope.bgColor) angular.element(document.body).css("background-color", $rootScope.bgColor); else angular.element(document.body).css("background-color", "#E3E3E3");
            }
        };
        NativeApp.setLoadMoreState = function(state) {
            angular.element(document.body).css("visibility", "visible");
            $rootScope.loadMoreState = state;
            if ("end" == state) $timeout(function() {
                $rootScope.loadMoreState = null;
            }, 2e3);
        };
        NativeApp.isDebugMode = function() {
            return "dev" == NativeApp.getEnv("mode");
        };
        NativeApp.downloadImage = function(url, callback) {
            var cache = NativeApp.imageCache || (NativeApp.imageCache = {});
            if (cache[url]) callback(cache[url]); else callLater("downloadImage", {
                url: url
            }, callback && function(json) {
                if (json && json.result) {
                    var path = json.data && json.data.path;
                    if (path) {
                        cache[url] = path;
                        callback(path);
                    } else {
                        callback("");
                        console.warn("[NativeApp] downloadImage url: " + url + " got empty path: " + JSON.stringify(json));
                    }
                }
            });
        };
        NativeApp.getPackageState = function(gameInfo, callback) {
            callLater("getPackageState", {
                gameInfo: gameInfo
            }, function(json) {
                $timeout(function() {
                    callback(json);
                });
            });
        };
        NativeApp.startDownloadApp = function(gameInfo, statInfo, callback) {
            callNative("startDownloadApp", {
                gameInfo: gameInfo,
                statInfo: [].concat(statInfo)
            }, callback);
        };
        NativeApp.resumeDownloadApp = function(gameInfo, statInfo, callback) {
            callNative("resumeDownloadApp", {
                gameInfo: gameInfo,
                statInfo: [].concat(statInfo)
            }, callback);
        };
        NativeApp.stopDownloadApp = function(gameInfo, statInfo) {
            callNative("stopDownloadApp", {
                gameInfo: gameInfo,
                statInfo: [].concat(statInfo)
            });
        };
        NativeApp.installApp = function(gameInfo, statInfo) {
            callNative("installApp", {
                gameInfo: gameInfo,
                statInfo: [].concat(statInfo)
            });
        };
        NativeApp.startupApp = function(gameInfo, statInfo) {
            callNative("startupApp", {
                gameInfo: gameInfo,
                statInfo: [].concat(statInfo)
            });
        };
        NativeApp.startupWebApp = function(gameInfo, statInfo) {
            NativeApp.addActionStat(statInfo);
            NativeApp.openWindow(gameInfo.base.serverUrl, {}, "system");
        };
        NativeApp.confirm = function(title, msg, btnList, callback, options) {
            NativeApp.openWindow("/modal.html", {
                title: title,
                content: encodeURIComponent(msg),
                btnList: encodeURIComponent(JSON.stringify(btnList || [ {
                    id: "close",
                    text: "关闭"
                }, {
                    id: "ok",
                    text: "确定",
                    primary: true
                } ]))
            }, "blank", options || {
                width: 280,
                height: 300
            }, callback);
        };
        NativeApp.followApp = function(gameInfo, statInfo, userInfo, isAuto) {
            var a1 = isAuto ? "gz_qh" : "gz";
            var loginMessage = "登录后马上关注游戏，礼包、开测等动态第一时间知道~";
            var handler = function() {
                callNative("followApp", {
                    gameInfo: gameInfo,
                    statInfo: statInfo
                }, function(res) {
                    if (res && res.data && res.data.code) {
                        var code = String(res.data.code);
                        if (0 == code.indexOf("200")) NativeApp.confirm("关注成功", '新动态请留意通知栏消息哦。<br/><span class="tips">游戏动态包括：开测、礼包、新上架安装包。</span>', [ {
                            id: "close",
                            text: "我知道了"
                        } ]); else if ("5000014" == code) {
                            NativeApp.login({
                                content: loginMessage
                            }, {
                                a1: a1
                            }, function(json) {
                                if (json.data && 1 == json.data.code) NativeApp.followApp(gameInfo, statInfo);
                            });
                            NativeApp.addActionStat("btn_signindialog", a1);
                        } else NativeApp.showMessage("关注失败，请重试");
                    } else NativeApp.showMessage("关注失败，请重试");
                });
            };
            if (NativeApp.isLogin()) handler(); else {
                var ucid = "";
                if (userInfo && userInfo.ucid) ucid = userInfo.ucid;
                NativeApp.login({
                    account: ucid,
                    content: loginMessage
                }, {
                    a1: a1
                }, function(json) {
                    if (json.data && 1 == json.data.code) handler();
                });
                NativeApp.addActionStat("btn_signindialog", a1);
            }
        };
        NativeApp.changeAccount = function(userInfo, msgInfo, callback) {
            var accountInfo = NativeApp.getAccountInfo();
            var ucid = Utils.valueOf(userInfo.ucid, "");
            if (accountInfo && accountInfo.data && accountInfo.data.ucid) {
                var currentUCID = accountInfo.data.ucid;
                var currentNick = Utils.valueOf(accountInfo.data.nickName, currentUCID);
                var nick = Utils.valueOf(userInfo.nickName, ucid);
                console.log(userInfo, !isNaN(ucid), currentUCID != ucid);
                if (ucid && !isNaN(ucid) && currentUCID != ucid) {
                    var message = "<div>已登录:" + currentNick + "</div><div>是否切换账号:" + nick + msgInfo.message + "?</div>";
                    NativeApp.confirm(msgInfo.message, message, [ {
                        id: "login",
                        text: "使用已登录账号"
                    }, {
                        id: "changeAccount",
                        text: "切换",
                        primary: true
                    } ], function(btn) {
                        if ("login" == btn.id) {
                            callback();
                            NativeApp.addActionStat("btn_changeucid", "lb", 0);
                        } else if ("changeAccount" == btn.id) {
                            NativeApp.login({
                                account: ucid,
                                content: "切换账号后马上" + msgInfo.message + "~"
                            }, {
                                a1: "lb_qh"
                            }, function(json) {
                                if (json.data && 1 == json.data.code) callback();
                            });
                            NativeApp.addActionStat("btn_signindialog", "lb_qh");
                            NativeApp.addActionStat("btn_changeucid", "lb", 1);
                        }
                    });
                    NativeApp.addActionStat("btn_changeuciddialog", "lb");
                } else callback();
            } else {
                NativeApp.addActionStat("btn_signindialog", "lb_qh");
                NativeApp.login({
                    account: ucid,
                    content: "切换账号后马上" + msgInfo.message + "~"
                }, {
                    a1: "lb_qh"
                }, function(json) {
                    if (json.data && 1 == json.data.code) callback();
                });
            }
        };
        NativeApp.autoFollowApp = function(gameInfo, userInfo, statInfo) {
            if ("follow" != userInfo.opt) return;
            var accountInfo = NativeApp.getAccountInfo();
            var ucid = Utils.valueOf(userInfo.ucid, "");
            if (accountInfo && accountInfo.data && accountInfo.data.ucid) {
                var currentUCID = accountInfo.data.ucid;
                var currentNick = Utils.valueOf(accountInfo.data.nickName, currentUCID);
                var nick = Utils.valueOf(userInfo.nickName, ucid);
                if (ucid && !isNaN(ucid) && currentUCID != ucid) {
                    var message = '<div>已登录: <strong style="color: green;">' + currentNick + '</strong></div><div>是否切换账号: <strong style="color: green;">' + nick + "</strong> 进行关注?</div>";
                    NativeApp.confirm("关注提示", message, [ {
                        id: "login",
                        text: "使用已登录账号"
                    }, {
                        id: "changeAccount",
                        text: "切换",
                        primary: true
                    } ], function(btn) {
                        if ("login" == btn.id) {
                            NativeApp.followApp(gameInfo, statInfo, null, true);
                            NativeApp.addActionStat("btn_changeucid", "gz", 0);
                        } else if ("changeAccount" == btn.id) {
                            NativeApp.login({
                                account: ucid,
                                content: "切换账号后马上关注游戏~"
                            }, {
                                a1: "gz_qh"
                            }, function(json) {
                                if (json.data && 1 == json.data.code) NativeApp.followApp(gameInfo, statInfo, null, true);
                            });
                            NativeApp.addActionStat("btn_signindialog", "gz_qh");
                            NativeApp.addActionStat("btn_changeucid", "gz", 1);
                        }
                    });
                    NativeApp.addActionStat("btn_changeuciddialog", "gz");
                } else NativeApp.followApp(gameInfo, statInfo, userInfo, true);
            } else NativeApp.followApp(gameInfo, statInfo, userInfo, true);
        };
        NativeApp.unfollowApp = function(gameInfo, statInfo, callback) {
            NativeApp.confirm("取消关注", '取消后你将无法及时收到<span style="color: red;">礼包、开测</span>等游戏新动态的提醒哦~确定取消吗？', null, function(btn) {
                if (btn && "ok" == btn.id) callNative("unfollowApp", {
                    gameInfo: gameInfo,
                    statInfo: statInfo
                }, function(json) {
                    console.log(">>>H5 unfollowApp:" + JSON.stringify(json));
                    if (1 == json.data.code) {
                        NativeApp.showMessage("取消关注成功");
                        if (callback) callback({
                            result: true,
                            msg: "取消关注成功",
                            data: json
                        });
                    } else if (5000014 == json.data.code) {
                        NativeApp.addActionStat("btn_signindialog", "gz");
                        NativeApp.login({
                            content: "登陆后才能进行取消关注的操作哦~"
                        }, {
                            a1: "gz"
                        }, function() {
                            if (json.data && 1 == json.data.code) NativeApp.unfollowApp(gameInfo, statInfo, callback);
                        });
                    } else {
                        NativeApp.showMessage("取消关注失败，请重试");
                        if (callback) callback({
                            result: true,
                            msg: "取消关注失败",
                            data: json
                        });
                    }
                });
            });
        };
        NativeApp.isFollowApp = function(gameInfo) {
            if (angular.isArray(gameInfo)) {
                var json = gameInfo.map(function(item) {
                    return {
                        clz: "NineGameClient",
                        method: "isFollowApp",
                        args: {
                            gameInfo: item
                        }
                    };
                });
                var result = JSON.parse(JSBridge.callNative(json) || "[]").map(function(item) {
                    return !!item;
                });
                return result;
            } else return !!callNative("isFollowApp", {
                gameInfo: gameInfo
            });
        };
        NativeApp.getFollowApps = function(callback) {
            callNative("getFollowApps", {}, callback);
            if (!true) callback();
        };
        NativeApp.getInstalledApp = function(callback) {
            callNative("getInstalledApp", {}, callback);
            if (!true) callback();
        };
        NativeApp.setPackageInfo = function(gameInfo, statInfo) {
            callNative("setPackageInfo", {
                gameInfo: gameInfo,
                statInfo: [].concat(statInfo)
            });
        };
        NativeApp.getUserComment = function(gameInfo) {
            var data = callNative("getUserComment", {
                gameInfo: gameInfo
            });
            if (!data || "null" == data) return JSON.parse(NativeApp.getCache("comment_mycomment_" + gameInfo.base.gameId) || "[]");
            return "object" == typeof data ? data : JSON.parse(data);
        };
        NativeApp.subscribeGift = function(giftInfo, loginInfo, statInfo, callback) {
            if (giftInfo.needLogin && !NativeApp.isLogin()) {
                NativeApp.addActionStat("btn_signindialog", "lbfh");
                NativeApp.login(loginInfo, {
                    a1: "lbdltc"
                }, function(json) {
                    if (json.data && 1 == json.data.code) callNative("subscribeGift", {
                        giftInfo: giftInfo,
                        statInfo: statInfo
                    }, callback);
                });
            } else callNative("subscribeGift", {
                giftInfo: giftInfo,
                statInfo: statInfo
            }, callback);
        };
        NativeApp.unsubscribeGift = function(giftInfo, statInfo, callback) {
            callNative("unsubscribeGift", {
                giftInfo: giftInfo,
                statInfo: statInfo
            }, callback);
        };
        NativeApp.getGift = function(giftInfo, loginInfo, statInfo, callback) {
            if (true) if (giftInfo.needLogin && !NativeApp.isLogin()) {
                NativeApp.addActionStat("btn_signindialog", "lbfh");
                NativeApp.login(loginInfo, {
                    a1: "lbdltc"
                }, function(json) {
                    if (json.data && 1 == json.data.code) callNative("getGift", {
                        giftInfo: giftInfo,
                        statInfo: statInfo
                    }, callback);
                });
            } else callNative("getGift", {
                giftInfo: giftInfo,
                statInfo: statInfo
            }, callback); else callback({
                data: {
                    sceneId: "13871830111081514",
                    code: "5000107"
                },
                msg: "该礼包暂时不能领取哦",
                result: false
            });
        };
        NativeApp.registerGift = function(giftInfo, statInfo, userInput, callback) {
            callNative("registerGift", {
                giftInfo: giftInfo,
                statInfo: statInfo,
                userInput: userInput
            }, callback);
        };
        NativeApp.dredgeGift = function(giftInfo, statInfo, callback) {
            callNative("dredgeGift", {
                giftInfo: giftInfo,
                statInfo: statInfo
            }, callback);
        };
        NativeApp.readGiftInfo = function(sceneId, storeId) {
            if (true) {
                var result = callNative("readGiftInfo", {
                    sceneId: sceneId,
                    storeId: storeId
                });
                return result ? JSON.parse(result) : {};
            } else return {
                property: "用户名,密码",
                code: "user	12345"
            };
        };
        NativeApp.gotoPage = function(path) {
            if (angular.isDefined(path)) if (true) {
                var clickEvent = document.createEvent("MouseEvents");
                clickEvent.initEvent("click", true, true);
                angular.element("<a/>").attr("href", path.replace(/^\//, ""))[0].dispatchEvent(clickEvent);
            } else path.indexOf("http://") > -1 ? window.open(path) : $location.url(path);
        };
        NativeApp.showReportDialog = function(gameInfo) {
            var obj = {
                gameid: gameInfo.base.gameId,
                gamename: gameInfo.base.gameName,
                gameversion: gameInfo.detail.versionName
            };
            callNative("showReportDialog", {
                jsonObj: obj
            });
        };
        NativeApp.showSlideShow = function(imageUrl, index) {
            callNative("showSlideShow", {
                imageUrl: imageUrl,
                isAllScreen: true,
                index: index
            });
        };
        NativeApp.setGameDetailPageScroll = function(enabled) {
            callNative("setGameDetailPageScroll", {
                isDisable: !enabled
            });
        };
        NativeApp.setNativeDefaultActionState = function(enabled) {
            callNative("setNativeDefaultActionState", {
                enabled: enabled
            });
        };
        NativeApp.getDefaultImageSize = function() {
            var width = NativeApp.getEnv("webview_dimension_width");
            if (true && !width) width = 480; else width = document.documentElement.clientWidth;
            var height = Math.round(.75 * (width + 6) * (228 / 456));
            return {
                width: width,
                height: height
            };
        };
        NativeApp.checkClientUpdate = function(callback) {
            callNative("checkClientUpdate", {}, callback);
        };
        NativeApp.getSubscribeInfo = function(callback) {
            callNative("getSubscribeInfos", {}, callback);
        };
        NativeApp.getMyGiftInfo = function(callback) {
            callNative("getMyGiftInfos", {}, callback);
        };
        NativeApp.login = function(loginInfo, statInfo, callback) {
            var params = angular.extend({
                tag: "",
                type: "floatview",
                title: "登录",
                content: "登录领取礼包",
                account: "",
                accountType: "uc"
            }, loginInfo);
            callNative("login", {
                loginInfo: params,
                statInfo: statInfo
            }, callback);
        };
        NativeApp.getAccountInfo = function() {
            var accountInfo = callNative("getAccountInfo");
            return JSON.parse(accountInfo || "{}");
        };
        NativeApp.isLogin = function() {
            var accountInfo = NativeApp.getAccountInfo();
            if (accountInfo && accountInfo.data && accountInfo.data.ucid) return true; else return false;
        };
        NativeApp.setShareInfo = function(shareInfo, statInfo) {
            if (!angular.isArray(statInfo)) statInfo = [ statInfo ];
            callLater("setShareInfo", {
                shareInfo: shareInfo,
                statInfo: statInfo
            });
        };
        NativeApp.share = function(shareInfo, statInfo) {
            if (!angular.isArray(statInfo)) statInfo = [ statInfo ];
            callNative("share", {
                shareInfo: shareInfo,
                statInfo: statInfo
            });
        };
        NativeApp.setFavoriteInfo = function(favoriteInfo, statInfo) {
            callLater("setFavoriteInfo", {
                favoriteInfo: favoriteInfo,
                statInfo: statInfo
            });
        };
        return NativeApp;
    } ]);
}(window);

!function(global, undefined) {
    "use strict";
    var app = angular.module("ngmPatch", [ "ngmUtils", "ngmBridge" ]);
    app.config([ "$provide", function($provide) {
        patchTemplate($provide);
        patchImage($provide);
    } ]);
    function patchImage($provide) {
        $provide.decorator("ngSrcDirective", [ "$delegate", "NativeApp", "$location", function($delegate, NativeApp, $location) {
            NativeApp.registerEvent(NativeApp.EVENT_CONFIG_CHANGED);
            var key = "image_disabled";
            var hideImage = !!parseInt(NativeApp.getConfig(key));
            $delegate[0].compile = function() {
                return function(scope, element, attr) {
                    var defaultSrc = attr["defaultSrc"];
                    var hideOnError = attr["hideOnError"];
                    var localPath;
                    attr.$observe("ngSrc", function(src) {
                        refreshImage(src);
                    });
                    scope.$on(NativeApp.EVENT_CONFIG_CHANGED, function(type, data) {
                        if (data.hasOwnProperty(key)) {
                            hideImage = !!data[key];
                            refreshImage(localPath || attr["ngSrc"]);
                        }
                    });
                    function refreshImage(src) {
                        if (src && !hideImage) if (!true || 0 == $location.absUrl().indexOf("file") && 0 != src.indexOf("http")) {
                            attr.$set("src", src);
                            element.css("visibility", "visible");
                        } else {
                            hide();
                            NativeApp.downloadImage(src, function(path) {
                                if (path) {
                                    localPath = path;
                                    attr.$set("src", path);
                                    element.css("visibility", "visible");
                                }
                            });
                        } else hide();
                    }
                    element.on("error", hide);
                    function hide() {
                        if (hideOnError) element.css("visibility", "hidden"); else if (defaultSrc) {
                            attr.$set("src", defaultSrc);
                            element.css("visibility", "visible");
                        }
                    }
                };
            };
            return $delegate;
        } ]);
    }
    function patchTemplate($provide) {
        if (true) $provide.decorator("$templateCache", [ "$delegate", "NativeApp", "$q", "$location", function($delegate, NativeApp, $q, $location) {
            var getHolder = $delegate.get;
            $delegate.get = function(key) {
                if (0 == $location.absUrl().indexOf("file") && !getHolder(key)) {
                    var template = NativeApp.readFile(key);
                    $delegate.put(key, template);
                    return template;
                } else return getHolder(key);
            };
            return $delegate;
        } ]);
    }
    app.directive("uiEvent", [ "$parse", function($parse) {
        return function($scope, elm, attrs) {
            var events = $scope.$eval(attrs["uiEvent"]);
            angular.forEach(events, function(uiEvent, eventName) {
                var fn = $parse(uiEvent);
                elm.bind(eventName, function(evt) {
                    var params = Array.prototype.slice.call(arguments);
                    params = params.splice(1);
                    fn($scope, {
                        $event: evt,
                        $params: params
                    });
                    if (!$scope.$$phase) $scope.$apply();
                });
            });
        };
    } ]);
}(window);

!function(global, undefined) {
    "use strict";
    var app = angular.module("ngmProtocol", [ "ngmUtils", "ngmBridge" ]);
    app.factory("ConfigNode", [ "Utils", function(Utils) {
        function ConfigNode(obj) {
            Utils.applyIf(this, obj);
            Utils.applyIf(this, ConfigNode.defaults);
            this.callbackId = this.callbackId || this.service;
        }
        ConfigNode.format = function(obj) {
            var configMapping = {};
            if (obj.service) {
                var temp = {};
                temp[obj.service] = obj;
                obj = temp;
            }
            angular.forEach(obj, function(item, key) {
                var configNode;
                if (item instanceof ConfigNode) configNode = item; else {
                    item.callbackId = item.callbackId || key;
                    configNode = new ConfigNode(item);
                }
                var callbackId = configNode.callbackId;
                if (configMapping[callbackId]) console.warn("[ConfigNode] config.callbackId duplicate: " + callbackId); else configMapping[callbackId] = configNode;
            });
            return configMapping;
        };
        ConfigNode.DEFAULT_PAGE_SIZE = 10;
        ConfigNode.DEFAULT_CACHE_SECOND = 600;
        ConfigNode.defaults = {
            data: {},
            page: {
                page: 1,
                size: ConfigNode.DEFAULT_PAGE_SIZE
            },
            options: {
                required: false,
                preload: true,
                single: false,
                cache: ConfigNode.DEFAULT_CACHE_SECOND
            }
        };
        return ConfigNode;
    } ]);
    app.factory("ResponseNode", [ "Utils", function(Utils) {
        function ResponseNode(obj, config) {
            Utils.applyIf(this, obj);
            Utils.applyIf(this, ResponseNode.defaults);
            this.page.hasNextPage = this.page.nextPage > 0;
            if (angular.isArray(this.data)) this.data = {
                list: this.data
            };
            if (config && config.options.single && angular.isArray(this.data.list)) this.data = this.data.list[0];
            if (config && angular.isFunction(config.options.transformResponse)) this.data = config.options.transformResponse(this.data, this);
        }
        ResponseNode.format = function(originResponse, configMap) {
            var responseMap = {};
            angular.forEach(originResponse, function(item, key) {
                responseMap[key] = new ResponseNode(item, configMap[key]);
            });
            return responseMap;
        };
        ResponseNode.defaults = {
            state: {},
            data: {},
            page: {}
        };
        return ResponseNode;
    } ]);
    app.factory("Protocol", [ "$q", "$timeout", "NativeApp", "ConfigNode", function($q, $timeout, NativeApp, ConfigNode) {
        function Protocol(name) {
            this.name = name;
            this.loadData = angular.identity;
            this.is = angular.noop;
            if (Protocol.workerNames.indexOf(name) != -1) console.warn("[Protocol] duplicate workers: " + name); else {
                Protocol.workers.push(this);
                Protocol.workerNames.push(name);
            }
        }
        Protocol.request = function(requestList) {
            var timestamp = {
                start: new Date().getTime()
            };
            var configMapping = ConfigNode.format(requestList);
            var requestPromises = {};
            angular.forEach(Protocol.workers, function(worker) {
                var workerConfigMapping = {};
                var workerConfigCount = 0;
                angular.forEach(configMapping, function(configNode, key) {
                    if (configNode.type === worker.name || !configNode.type && worker.is(configNode)) {
                        configNode.type = worker.name;
                        workerConfigMapping[key] = configNode;
                        workerConfigCount++;
                    }
                });
                if (workerConfigCount > 0) {
                    requestPromises[worker.name] = worker.loadData(workerConfigMapping);
                    workerConfigMapping = undefined;
                }
            });
            timestamp.send = new Date().getTime();
            var promise = $q.all(requestPromises).then(function(results) {
                timestamp.end = new Date().getTime();
                timestamp.cost = timestamp.end - timestamp.start;
                var originData = {};
                var dataMapping = {};
                var pageMapping = {};
                angular.forEach(results, function(protocolResult, protocolName) {
                    if (protocolResult) {
                        angular.forEach(protocolResult.data, function(item, key) {
                            originData[key] = item;
                            dataMapping[key] = item.data;
                            pageMapping[key] = item.page;
                        });
                        timestamp[protocolName] = protocolResult.measure;
                    }
                });
                var result = {
                    data: dataMapping,
                    page: pageMapping,
                    originData: originData,
                    timestamp: timestamp
                };
                for (var key in configMapping) if (configMapping.hasOwnProperty(key)) {
                    var config = requestList[key];
                    if (config) {
                        var callbackId = config.callbackId;
                        if (callbackId && config.options && config.options.required && !dataMapping[callbackId]) return $q.reject(callbackId + " is required, but not response.");
                    }
                }
                return result;
            }).then(null, function(reason) {
                console.warn("[Protocol] request error, ", reason);
                return $q.reject(reason);
            });
            return promise;
        };
        Protocol.workers = [];
        Protocol.workerNames = [];
        return Protocol;
    } ]);
    app.factory("DataApiProtocol", [ "$q", "Protocol", "NativeApp", "ConfigNode", "ResponseNode", function($q, Protocol, NativeApp, ConfigNode, ResponseNode) {
        var protocol = new Protocol("DataApi");
        protocol.loadData = function(configGroup) {
            var data = [];
            var cache = undefined;
            var anyRequired = 1 == Protocol.workers.length;
            angular.forEach(configGroup, function(item) {
                if (protocol.is(item)) {
                    var configNode = item instanceof ConfigNode ? item : new ConfigNode(item);
                    configNode.type = protocol.name;
                    data.push({
                        id: configNode.callbackId,
                        service: configNode.service,
                        data: configNode.data,
                        page: configNode.page
                    });
                    if (angular.isUndefined(cache) && angular.isDefined(configNode.options.cache)) if (false == configNode.options.cache) cache = 0; else cache = configNode.options.cache;
                    anyRequired = configNode.options.required || anyRequired;
                }
            });
            if (data.length > 0) {
                var query;
                if (1 === data.length) {
                    query = data[0];
                    query.url = "/api/" + query.service;
                    query.callbackId = query.id;
                    query.cache = cache;
                    delete query.id;
                } else if (data.length > 1) query = {
                    url: "/combine",
                    data: data,
                    cache: cache
                };
                var promise = NativeApp.requestDataApi(query).then(function(response) {
                    if (protocol.isSuccess(response)) {
                        var tempMap = {};
                        if (response.data.state.combine) tempMap = response.data.data; else {
                            tempMap[query.callbackId] = response.data;
                            tempMap[query.callbackId].id = query.callbackId;
                        }
                        var responseMapping = {};
                        angular.forEach(tempMap, function(item, key) {
                            var configNode = configGroup[key];
                            if (protocol.isSuccessItem(item)) responseMapping[key] = new ResponseNode(item, configNode); else if (configNode && configNode.options.required) responseMapping = $q.reject("subRequest fail, " + key + "(" + configNode.service + "), state = " + JSON.stringify(item.state)); else console.warn("subRequest fail, " + key + "(" + configNode.service + "), state = " + JSON.stringify(item.state));
                        });
                        return {
                            data: responseMapping,
                            measure: response.measure
                        };
                    } else if (!anyRequired) {
                        console.warn("[Protocol] request fail, but none is required, so pass success.");
                        return {
                            data: {},
                            measure: response.measure
                        };
                    } else return $q.reject(response);
                });
                return promise;
            }
        };
        protocol.is = function(config) {
            return /^[a-zA-Z].*$/.test(config.service);
        };
        protocol.isSuccess = function(response) {
            return 200 <= response.status && response.status < 300 && protocol.isSuccessItem(response.data);
        };
        protocol.isSuccessItem = function(response) {
            return angular.isObject(response) && angular.isObject(response.state) && /^200\d*$/.test(response.state.code);
        };
        return protocol;
    } ]);
    app.run([ "Protocol", "DataApiProtocol", function(Protocol, DataApiProtocol) {} ]);
}(window);

!function(window, undefined) {
    "use strict";
    var app = angular.module("ngmLoader", [ "ngmUtils", "ngmBridge", "ngmProtocol" ]);
    app.factory("Loader", [ "Region", "NativeApp", "$q", "$timeout", "$rootScope", "Protocol", "Utils", "ConfigNode", function(Region, NativeApp, $q, $timeout, $rootScope, Protocol, Utils, ConfigNode) {
        function Loader() {
            this.isLoading = false;
            this.isLoadedFirst = false;
            this.loadSuccessCount = 0;
            this.isAllLoaded = false;
        }
        Loader.prototype.regionList = [];
        Loader.prototype.request = Protocol.request;
        Loader.prototype.init = function(config) {
            var self = this;
            self.config = Utils.applyIf(config, {
                configList: [],
                onInit: angular.identity,
                onData: angular.identity,
                onRegionChange: angular.identity,
                statInfo: {}
            });
            self.config.configList = [].concat(self.config.configList);
            self.regionList = [];
            self.loadedCount = undefined;
            self.miniLoadCount = undefined;
            self.autoLoadPageCount = 0;
            angular.forEach(self.config.configList, function(item) {
                var region = new Region(item);
                if (region.configCount > 0) {
                    if (region.pager && !self.miniLoadCount) {
                        self.loadedCount = 0;
                        self.miniLoadCount = 10;
                    }
                    self.regionList.push(region);
                }
            });
            console.debug("[Loader] init region, len = " + self.regionList.length);
            if (self.miniLoadCount) NativeApp.registerEvent(NativeApp.EVENT_PAGE_SCROLL_BOTTOM, function() {
                self.loadData();
            });
            $rootScope.reload = function() {
                self.reload();
            };
            $rootScope.reloadPage = function() {
                self.loadData();
            };
            self.loadData();
        };
        Loader.prototype.initPager = function(pagerConfig, onPage, statInfo) {
            pagerConfig = [].concat(pagerConfig || []);
            angular.forEach(pagerConfig, function(item) {
                item.options = item.options || {};
                item.options.pager = true;
            });
            this.init({
                configList: pagerConfig,
                statInfo: statInfo,
                onData: onPage
            });
        };
        Loader.prototype.initOnce = function(initConfig, onInit, statInfo) {
            this.init({
                configList: initConfig,
                statInfo: statInfo,
                onInit: onInit
            });
        };
        Loader.prototype.loadData = function() {
            var self = this;
            var region = self.regionList[0];
            if (self.isLoading) console.debug("[Loader] still loading, plz wait, take more patience."); else if (region) {
                self.isLoading = true;
                if (!self.isLoadedFirst) NativeApp.setWebViewState("loading"); else NativeApp.setLoadMoreState("loading");
                var promise = self.preloadPromise || region.loadData();
                self.preloadPromise = undefined;
                promise = promise.then(function(response) {
                    var result = response;
                    self.isLoading = false;
                    if (!self.isLoadedFirst) result = $q.when(self.config.onInit(response)).then(function() {
                        self.isLoadedFirst = true;
                        NativeApp.setWebViewState("loaded");
                        self.config.onInit = undefined;
                        return response;
                    });
                    self.config.onData(response, region);
                    return result;
                });
                promise = promise.then(function(response) {
                    self.loadedCount += region.pagerCurrentCount;
                    if (1 == self.regionList.length && !region.hasNextPage) {
                        console.debug("[Loader] all of the regionList is loaded.");
                        self.isAllLoaded = true;
                        if (self.loadedCount > 0 && self.loadedCount >= self.miniLoadCount) NativeApp.setLoadMoreState("end"); else NativeApp.setLoadMoreState();
                        self.config.onRegionChange(undefined, region);
                        self.clean();
                    } else {
                        NativeApp.setLoadMoreState("loaded");
                        if (!region.hasNextPage) {
                            var lastRegion = self.regionList.shift();
                            region = self.regionList[0];
                            console.debug("[Loader] change to next region: ", region.configNames.join(","));
                            self.config.onRegionChange(region, lastRegion);
                        }
                        if ((self.loadedCount < self.miniLoadCount || 0 == region.pagerCurrentCount) && self.autoLoadPageCount < 20) {
                            console.debug("[Loader] auto load next page to touch bottom. %d / %d", self.loadedCount, self.miniLoadCount);
                            self.autoLoadPageCount++;
                            self.loadData();
                        } else {
                            console.debug("[Loader] preload next...");
                            self.preloadPromise = $timeout(function() {
                                return region.loadData();
                            }, 50, false);
                            self.preloadPromise.then(null, function(reason) {
                                self.preloadPromise = undefined;
                            });
                        }
                    }
                    return response;
                });
                promise = promise.then(null, function(reason) {
                    self.isLoading = false;
                    if (!self.isLoadedFirst) {
                        NativeApp.setWebViewState("error");
                        if (self.config.statInfo.a1) {
                            var statInfo = Utils.applyIf({
                                action: "loadingerror",
                                a2: NativeApp.getEnv("network")
                            }, self.config.statInfo);
                            NativeApp.addActionStat(statInfo);
                        }
                    } else NativeApp.setLoadMoreState("error");
                    return $q.reject(reason);
                });
                return promise;
            } else {
                console.debug("[Loader] no more region.");
                self.clean();
                NativeApp.setLoadMoreState("end");
            }
        };
        Loader.prototype.reload = function() {
            this.loadData();
        };
        Loader.prototype.clean = function() {
            this.regionList = [];
            this.preloadPromise = undefined;
            this.config = undefined;
            $rootScope.reloadPage = angular.noop;
            if (self.miniLoadCount) NativeApp.unregisterEvent(NativeApp.EVENT_PAGE_SCROLL_BOTTOM);
        };
        return new Loader();
    } ]);
    app.factory("Region", [ "Utils", "Protocol", "ConfigNode", function(Utils, Protocol, ConfigNode) {
        function Region(mapping) {
            var self = this;
            self.hasNextPage = true;
            self.configCount = 0;
            self.configNames = [];
            self.configMapping = ConfigNode.format(mapping);
            angular.forEach(self.configMapping, function(configNode) {
                self.configCount++;
                self.configNames.push(configNode.callbackId);
                if (configNode.options.pager) if (self.pager) console.warn("[Region] multi pager."); else {
                    self.pager = configNode;
                    self.pagerCallbackId = configNode.callbackId;
                    self.pagerLoadedCount = 0;
                    self.pagerMaxCount = configNode.page.maxCount;
                }
            });
        }
        Region.prototype.loadData = function() {
            var self = this;
            if (self.hasNextPage) {
                console.debug("[Loader] start loadData: ", self.configMapping);
                var start = new Date().getTime();
                var promise = Protocol.request(self.configMapping).then(function(response) {
                    console.debug("[Loader] finish loadData, " + (new Date().getTime() - start) + "ms", response);
                    if (self.pager) {
                        self.configMapping = self.pager;
                        var pagerResult = response.page && response.page[self.pagerCallbackId];
                        if (pagerResult) {
                            var pageCount = pagerResult.pageCount;
                            var responseData = response.data[self.pagerCallbackId];
                            if (!pageCount && responseData && responseData.list) pageCount = responseData.length;
                            self.pagerCurrentCount = pageCount;
                            self.pagerLoadedCount += pageCount;
                            self.pager.page.page = pagerResult.nextPage || self.pager.page.page + 1;
                            self.hasNextPage = !!pagerResult.hasNextPage && !(angular.isDefined(self.pagerMaxCount) && self.pagerLoadedCount >= self.pagerMaxCount);
                        } else self.hasNextPage = false;
                    } else self.hasNextPage = false;
                    return response;
                });
                return promise;
            } else console.warn("[Loader] hasNextPage is false, not call loadData anymore.");
        };
        return Region;
    } ]);
}(window);

!function(global, undefined) {
    "use strict";
    var app = angular.module("ngmApp", [ "pasvaz.bindonce", "ngmUtils", "ngmBridge", "ngmPatch", "ngmProtocol", "ngmLoader" ]);
    app.run([ "NativeApp", "$rootScope", function(NativeApp, $rootScope) {
        $rootScope.imei = NativeApp.getEnv("imei");
        console.log(">>>H5 app run:" + $rootScope.imei);
    } ]);
}(window);

!function(global, undefined) {
    "use strict";
    var app = angular.module("ngmApp");
    var route = {
        "/category": {
            name: "分类",
            controller: "categoryCtrl",
            controllerUrl: "modules/category/categoryCtrl.js",
            templateUrl: "modules/category/category.tpl.html"
        },
        "/category/detail": {
            name: "分类详情",
            controller: "categoryDetailCtrl",
            controllerUrl: "modules/category/categoryDetailCtrl.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/rank": {
            name: "排行",
            controller: "rankCtrl",
            controllerUrl: "modules/rank/rankCtrl.js",
            templateUrl: "modules/rank/rank.tpl.html"
        },
        "/newgame": {
            name: "新游专区",
            controller: "newgameCtrl",
            controllerUrl: "modules/newgame/newgameCtrl.js",
            templateUrl: "modules/newgame/newgame.tpl.html"
        },
        "/newgame/category": {
            name: "新游分类",
            controller: "categoryCtrl",
            controllerUrl: "modules/category/categoryCtrl.js",
            templateUrl: "modules/category/categoryList.tpl.html"
        },
        "/newgame/brokeList": {
            name: "新游爆料列表",
            controller: "brokeListCtrl",
            controllerUrl: "modules/newgame/brokeListCtrl.js",
            templateUrl: "modules/newgame/brokeList.tpl.html"
        },
        "/newgame/evaluateList": {
            name: "评测列表",
            controller: "evaluateListCtrl",
            controllerUrl: "modules/newgame/evaluateListCtrl.js",
            templateUrl: "modules/newgame/evaluateList.tpl.html"
        },
        "/newgame/expectList": {
            name: "新游期待榜列表",
            controller: "expectListCtrl",
            controllerUrl: "modules/newgame/expectListCtrl.js",
            templateUrl: "modules/newgame/expectList.tpl.html"
        },
        "/newgame/latestGameList": {
            name: "新游最新专区列表",
            controller: "latestGameListCtrl",
            controllerUrl: "modules/newgame/latestGameListCtrl.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/netgame": {
            name: "网游",
            controller: "netgameCtrl",
            controllerUrl: "modules/netgame/netgameCtrl.js",
            templateUrl: "modules/netgame/netgame.tpl.html"
        },
        "/netgame/event": {
            name: "开服开测",
            controller: "netgameEventCtrl",
            controllerUrl: "modules/netgame/netgameEventCtrl.js",
            templateUrl: "modules/netgame/netgameEvent.tpl.html"
        },
        "/netgame/category": {
            name: "网游分类",
            controller: "categoryCtrl",
            controllerUrl: "modules/category/categoryCtrl.js",
            templateUrl: "modules/category/categoryList.tpl.html"
        },
        "/netgame/pastCommend": {
            name: "往期推荐列表",
            controller: "pastCommendListCtrl",
            controllerUrl: "modules/shared/gameList.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/netgame/subject": {
            name: "网游题材详情",
            controller: "netGameCategoryDetailCtrl",
            controllerUrl: "modules/netgame/categoryDetailCtrl.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/gift": {
            name: "礼包领取",
            controller: "giftIndexCtrl",
            controllerUrl: "modules/gift/giftIndexCtrl.js",
            templateUrl: "modules/gift/giftIndex.tpl.html"
        },
        "/gift/list": {
            name: "某游戏的礼包列表",
            controller: "giftListCtrl",
            controllerUrl: "modules/gift/giftListCtrl.js",
            templateUrl: "modules/gift/giftList.tpl.html"
        },
        "/gift/gameGiftList": {
            name: "更多礼包列表",
            controller: "gameGiftListCtrl",
            controllerUrl: "modules/gift/gameGiftListCtrl.js",
            templateUrl: "modules/shared/gameGiftList.tpl.html"
        },
        "/gift/detail": {
            name: "礼包详情",
            controller: "giftDetailCtrl",
            controllerUrl: "modules/gift/giftDetailCtrl.js",
            templateUrl: "modules/gift/giftDetail.tpl.html"
        },
        "/gift/thirdParty": {
            name: "中转发号",
            controller: "thirdPartyCtrl",
            controllerUrl: "modules/gift/thirdPartyCtrl.js",
            templateUrl: "modules/gift/thirdParty.tpl.html"
        },
        "/gift/giftModal": {
            name: "礼包弹窗",
            controller: "giftModalCtrl",
            controllerUrl: "modules/gift/giftModalCtrl.js",
            templateUrl: "modules/gift/giftModal.tpl.html"
        },
        "/gift/grabGift": {
            name: "抢礼包",
            controller: "grabGiftCtrl",
            controllerUrl: "modules/gift/grabGiftCtrl.js",
            templateUrl: "modules/gift/grabGift.tpl.html"
        },
        "/gift/activation": {
            name: "激活码",
            controller: "activationCtrl",
            controllerUrl: "modules/gift/activationCtrl.js",
            templateUrl: "modules/gift/activation.tpl.html"
        },
        "/gift/myGift": {
            name: "存号箱",
            controller: "myGiftCtrl",
            controllerUrl: "modules/gift/myGiftCtrl.js",
            templateUrl: "modules/gift/myGift.tpl.html"
        },
        "/gift/test": {
            name: "礼包弹窗",
            controller: "test",
            controllerUrl: "modules/gift/test.js",
            templateUrl: "modules/gift/test.tpl.html"
        },
        "/gift/search": {
            name: "礼包搜索列表页",
            controller: "giftSearchCtrl",
            controllerUrl: "modules/gift/giftSearchCtrl.js",
            templateUrl: "modules/gift/giftSearch.tpl.html"
        },
        "/game/detail": {
            name: "游戏详情",
            controller: "gameDetailCtrl",
            controllerUrl: "modules/game/gameDetailCtrl.js",
            templateUrl: "modules/game/gameDetail.tpl.html"
        },
        "/game/comment": {
            name: "游戏评论",
            controller: "gameCommentCtrl",
            controllerUrl: "modules/game/gameCommentCtrl.js",
            templateUrl: "modules/game/gameComment.tpl.html"
        },
        "/article/detail": {
            name: "资讯详情",
            controller: "articleDetailCtrl",
            controllerUrl: "modules/article/articleDetailCtrl.js",
            templateUrl: "modules/article/articleDetail.tpl.html"
        },
        "/article/list": {
            name: "资讯列表",
            controller: "articleListCtrl",
            controllerUrl: "modules/article/articleListCtrl.js",
            templateUrl: "modules/article/articleList.tpl.html"
        },
        "/article/topicList": {
            name: "每日一聊",
            controller: "topicListCtrl",
            controllerUrl: "modules/article/topicListCtrl.js",
            templateUrl: "modules/article/topicList.tpl.html"
        },
        "/collection/recommend": {
            name: "每日一荐",
            controller: "recommendCtrl",
            controllerUrl: "modules/collection/recommendCtrl.js",
            templateUrl: "modules/rank/rank.tpl.html"
        },
        "/collection/crack": {
            name: "破解频道",
            controller: "crackCtrl",
            controllerUrl: "modules/collection/crackCtrl.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/collection/newest": {
            name: "新游频道",
            controller: "newestCtrl",
            controllerUrl: "modules/collection/newestCtrl.js",
            templateUrl: "modules/collection/newest.tpl.html"
        },
        "/collection/worth": {
            name: "必玩频道",
            controller: "mustplayCtrl",
            controllerUrl: "modules/collection/mustplayCtrl.js",
            templateUrl: "modules/collection/mustplay.tpl.html"
        },
        "/collection/excellent": {
            name: "优质频道",
            controller: "excellentCtrl",
            controllerUrl: "modules/collection/excellentCtrl.js",
            templateUrl: "modules/shared/gameList.tpl.html"
        },
        "/album/list": {
            name: "专辑列表",
            controller: "albumListCtrl",
            controllerUrl: "modules/album/albumListCtrl.js",
            templateUrl: "modules/album/albumList.tpl.html"
        },
        "/album/detail": {
            name: "专辑详情",
            controller: "albumDetailCtrl",
            controllerUrl: "modules/album/albumDetailCtrl.js",
            templateUrl: "modules/album/albumDetail.tpl.html"
        },
        "/search": {
            name: "搜索结果",
            controller: "searchCtrl",
            controllerUrl: "modules/search/searchCtrl.js",
            templateUrl: "modules/search/search.tpl.html"
        },
        "/game/info": {
            name: "专区游戏基本信息",
            controller: "gameInfoCtrl",
            controllerUrl: "modules/game/gameInfoCtrl.js",
            templateUrl: "modules/game/gameInfo.tpl.html"
        },
        "/game/guide": {
            name: "专区攻略",
            controller: "gameGuideCtrl",
            controllerUrl: "modules/game/gameGuideCtrl.js",
            templateUrl: "modules/game/gameGuide.tpl.html"
        },
        "/game/gift": {
            name: "专区礼包",
            controller: "gameGiftCtrl",
            controllerUrl: "modules/game/gameGiftCtrl.js",
            templateUrl: "modules/game/gameGift.tpl.html"
        },
        "/article/listType": {
            name: "资讯活动3个TAB页",
            controller: "articleListTypeCtrl",
            controllerUrl: "modules/article/articleListTypeCtrl.js",
            templateUrl: "modules/article/articleListType.tpl.html"
        },
        "/events/free": {
            name: "联通免流量活动",
            controller: "freeUnicomCtrl",
            controllerUrl: "modules/events/free/freeUnicomCtrl.js",
            templateUrl: "modules/events/free/freeUnicom.tpl.html"
        },
        "/modal": {
            name: "弹窗",
            controller: "modalCtrl",
            controllerUrl: "modules/shared/modalCtrl.js",
            templateUrl: "modules/shared/modal.tpl.html"
        },
        "/remote": {
            name: "远端页面测试",
            controller: "remoteCtrl",
            controllerUrl: "modules/remote/remoteCtrl.js",
            templateUrl: "modules/remote/remote.tpl.html"
        },
        "/remote/pageOpen": {
            name: "页面跳转",
            controller: "pageOpenCtrl",
            controllerUrl: "modules/remote/pageOpenCtrl.js",
            templateUrl: "modules/remote/pageOpen.tpl.html"
        },
        "/remote/submit": {
            name: "提交",
            controller: "submitCtrl",
            controllerUrl: "modules/remote/submitCtrl.js",
            templateUrl: "modules/remote/submit.tpl.html"
        },
        "/remote/dialog": {
            name: "dialog",
            controller: "dialogCtrl",
            controllerUrl: "modules/remote/dialogCtrl.js",
            templateUrl: "modules/remote/dialog.tpl.html"
        },
        "/remote/upgrade": {
            name: "升级",
            controller: "upgradeCtrl",
            controllerUrl: "modules/remote/upgradeCtrl.js",
            templateUrl: "modules/remote/upgrade.tpl.html"
        },
        "/remote/giftList": {
            name: "礼包",
            controller: "giftListCtrl",
            controllerUrl: "modules/remote/giftListCtrl.js",
            templateUrl: "modules/remote/giftList.tpl.html"
        },
        "/test/pager": {
            name: "测试分页",
            controller: "pagerTestCtrl",
            controllerUrl: "modules/test/pagerTestCtrl.js",
            templateUrl: "modules/test/pagerTest.tpl.html"
        },
        "/test/loader": {
            name: "测试加载",
            controller: "loaderTestCtrl",
            controllerUrl: "modules/test/loaderTestCtrl.js",
            templateUrl: "modules/test/loaderTest.tpl.html"
        },
        "/test/dataloader": {
            name: "测试加载",
            controller: "dataLoaderTestCtrl",
            controllerUrl: "modules/test/dataLoaderTestCtrl.js",
            templateUrl: "modules/test/loaderTest.tpl.html"
        },
        "/test/protocol": {
            name: "测试Protocol",
            controller: "protocolTestCtrl",
            controllerUrl: "modules/test/protocolTestCtrl.js",
            templateUrl: "modules/test/protocolTest.tpl.html"
        },
        "/test/cache": {
            name: "测试Cache",
            controller: "cacheTestCtrl",
            controllerUrl: "modules/test/cacheTestCtrl.js",
            templateUrl: "modules/test/cacheTest.tpl.html"
        },
        "/test/default": {
            name: "路由列表",
            controller: [ "$scope", function($scope) {
                $scope.route = route;
                angular.element(document.body).css("visibility", "visible");
                $scope.changeRoute = function(key) {
                    window.location.search = "route=" + key;
                };
            } ],
            template: [ '<div ng-repeat="(key, value) in route track by key">', "<ul>", '<li><a ng-click="changeRoute(key)">{{value.name || key}}</a></li>', "</ul>", "</div>" ].join("")
        }
    };
    var params = getURLParameters(global.location.href);
    var routePath = params["route"] ? params["route"].replace(/\.html$/, "") : "/test/default";
    var target = route[routePath] || route["/test/default"];
    params["$$routePath"] = routePath;
    app.value("$routeParams", params);
    app.run(function() {
        console.info("Route#init route: " + routePath, target, params);
    });
    if (target.controllerUrl) seajs.use(target.controllerUrl, function() {
        bootstrap();
    }); else bootstrap();
    function bootstrap() {
        if (!target.controllerUrl) {
            app.controller("defaultCtrl", target.controller);
            document.body.setAttribute("ng-controller", "defaultCtrl as " + (target.controllerAs || "vm"));
        } else document.body.setAttribute("ng-controller", target.controller + " as " + (target.controllerAs || "vm"));
        if (!target.templateUrl) document.getElementById("view").innerHTML = target.template; else document.getElementById("view").setAttribute("ng-include", "'" + target.templateUrl + "'");
        angular.bootstrap(document, [ "ngmApp" ]);
    }
    function getURLParameters(url, name) {
        var params = {};
        url.replace(/[?&]+([^=&]+)=([^&#]*)/gi, function(m, key, value) {
            params[key] = decodeURIComponent(value);
        });
        return name ? params[name] : params;
    }
}(window);

!function(global, undefined) {
    "use strict";
    var app = angular.module("ngmApp");
    app.factory("GameService", function() {
        function GameInfo(origin) {
            if (origin && origin.game) {
                var game = origin.game;
                var gpkg = origin.gpkg;
                var gameInfo = this;
                angular.extend(gameInfo, {
                    key: {
                        gameId: game.id,
                        pkgName: "",
                        pkgId: "",
                        versionCode: ""
                    },
                    base: {
                        gameId: game.id,
                        oldGameId: game.oldId,
                        gameName: game.name || game.shortName,
                        shortName: game.shortName,
                        gameIcon: game.logourl,
                        isSimple: !!game.issimple,
                        opStatus: game.operationStatus,
                        category: game.category,
                        playType: game.downtype,
                        serverUrl: game.svrUrl,
                        uploadTime: game.uploadTime,
                        modifyTime: game.modifyTime,
                        createTime: game.createTime,
                        recommendTime: game.colGameCreateTime,
                        operationType: game.operationType,
                        groupName: game.groupName,
                        groupFlag: game.groupFlag
                    },
                    status: {
                        scoreTotal: game.scoreTotal,
                        commentTotal: game.commentTotal,
                        avgScore: game.avrgScore,
                        downloadTotal: game.downstatTotal,
                        downloadMonth: game.downstatMonth,
                        downloadWeek: game.downstatWeek,
                        gift: !!game.gifting,
                        newest: !!game.newestState,
                        excellent: game.excellent,
                        uninstall: game.uninstall,
                        hasActiCode: game.hasActiCode || false,
                        hotValue: game.hotValue,
                        trend: game.trend,
                        stage: game.stage
                    },
                    detail: {
                        versionName: game.version,
                        customerInfo: game.customerInfo,
                        lang: game.langDesc,
                        description: game.description,
                        instruction: game.instruction,
                        versionUpdateDesc: game.versionUpdateDesc
                    }
                });
                var group = origin.colinfo;
                if (group) gameInfo.group = {
                    groupName: group.group,
                    createDate: group.createDate,
                    total: group.total
                };
                var event = origin.eventinfo;
                if (event) gameInfo.event = {
                    title: event.title,
                    beginTime: event.beginTime,
                    dimBeginTime: event.dimBeginTime,
                    type: event.type
                };
                var adm = origin.adm;
                if (adm) gameInfo.adm = {
                    adpId: adm.adpId,
                    adWord: adm.adWord,
                    admId: adm.admId,
                    admType: adm.admType,
                    imageUrl: adm.imageUrl
                };
                if (gpkg) {
                    gameInfo.key = angular.extend(gameInfo.key, {
                        pkgId: gpkg.id,
                        pkgName: gpkg.packageName,
                        versionCode: gpkg.orgVersionCode
                    });
                    gameInfo.detail.versionName = gpkg.versionName;
                    gameInfo.base.fileSize = gpkg.fileSize || 0;
                    gameInfo.pkg = {
                        apk: {
                            pkgId: gpkg.id,
                            pkgName: gpkg.packageName,
                            downloadUrl: gpkg.downUrl,
                            fileSize: gpkg.fileSize,
                            chId: gpkg.chId,
                            overrideChId: gpkg.overrideChId,
                            isDefaultCh: gpkg.isDefaultCh,
                            versionCode: gpkg.orgVersionCode,
                            versionName: gpkg.versionName,
                            highVer: gpkg.highVer,
                            lowVer: gpkg.lowVer,
                            targetVer: gpkg.targetVer
                        },
                        data: []
                    };
                    angular.forEach(gpkg.dataPkgsField, function(item) {
                        gameInfo.pkg.data.push({
                            pkgId: item.id,
                            downloadUrl: item.downUrl,
                            fileSize: item.fileSize,
                            extractPath: item.datapkgInstallPath
                        });
                        gameInfo.base.fileSize += item.fileSize || 0;
                    });
                }
            } else {
                console.warn("[GameService] incorrect old gameinfo format", origin);
                return null;
            }
        }
        GameInfo.format = function(arg) {
            if (!arg) console.warn("[GameService] incorrect old gameinfo format, input is undefined"); else if (angular.isArray(arg)) return arg.map(function(item) {
                return new GameInfo(item);
            }).filter(function(item) {
                return null != item;
            }); else if (angular.isArray(arg.list)) {
                var attrCount = 0;
                for (var key in arg) if (arg.hasOwnProperty(key)) attrCount++;
                var gameList = arg.list.map(function(item) {
                    return new GameInfo(item);
                }).filter(function(item) {
                    return null != item;
                });
                if (attrCount > 1) {
                    arg.list = gameList;
                    return arg;
                } else return gameList;
            } else {
                var gameInfo = new GameInfo(arg);
                return gameInfo && gameInfo.base ? gameInfo : null;
            }
        };
        GameInfo.isSameGameInfo = function(data, gameInfo) {
            return data && gameInfo && gameInfo.key && gameInfo.key.gameId == data.gameId && gameInfo.key.pkgName == data.pkgName;
        };
        GameInfo.findSameGameInfo = function(data, gameInfo) {
            if (!data || !gameInfo || !gameInfo.key) return false;
            var matchData = null;
            var changeValues = angular.isArray(data) ? data : [ data ];
            for (var i = 0, len = changeValues.length; i < len; i++) if (changeValues[i].gameId == gameInfo.key.gameId) {
                matchData = changeValues[i];
                break;
            }
            return matchData;
        };
        return GameInfo;
    });
    app.factory("GameState", [ "NativeApp", "$timeout", "Utils", function(NativeApp, $timeout, Utils) {
        function GameState() {
            this.state = "-1";
            this.btnText = "下载";
            this.btnStyle = "";
            this.clickAction = angular.noop;
            this.region = "info";
            this.stateText = "";
            this.statAction = "";
            this.data = {
                network: "",
                isFollow: false,
                gameIcon: "",
                retryCount: "",
                retryInterval: "",
                fileSize: "",
                downloadedBytes: "",
                progress: "",
                downloadSpeed: "",
                remainTime: ""
            };
            this.noClick = false;
        }
        GameState.prototype.hasInit = function() {
            return "-1" != this.state;
        };
        GameState.prototype.isInstalled = function() {
            return "300" == this.state || "301" == this.state || "302" == this.state;
        };
        GameState.prototype.clickBtn = function(gameInfo, statInfo, $event) {
            if ($event) $event.stopPropagation();
            var gameState = this;
            if (!gameState.noClick) {
                gameState.noClick = true;
                var statList = [];
                var gameId = gameInfo.base.gameId;
                var tempStatInfo = angular.extend({
                    action: gameState.statAction,
                    a2: gameId
                }, statInfo);
                statList.push(tempStatInfo);
                if ("btn_open" == gameState.statAction) tempStatInfo.a3 = Utils.formatDate(new Date(), "yyyyMMddhhmmss");
                if ("btn_down" == gameState.statAction && statInfo && statInfo.ada1 && statInfo.adpId && gameInfo.adm && gameInfo.adm.admId) {
                    NativeApp.addActionStat("ad_click", statInfo.ada1, gameId, "", statInfo.adpId, gameInfo.adm.admId);
                    statList.push({
                        action: "ad_down",
                        a1: statInfo.ada1,
                        a2: gameId,
                        a3: "",
                        ad_position: statInfo.adpId,
                        ad: gameInfo.adm.admId
                    });
                }
                gameState.clickAction(gameInfo, statList);
            }
            setTimeout(function() {
                gameState.noClick = false;
            }, 500);
        };
        GameState.prototype.updatePackageState = function(json, gameInfo) {
            if (gameInfo) {
                var gameState = this;
                var state = gameState.state = String(json.state) || "-1";
                var data = gameState.data = ("string" == typeof json.data && "" != json.data ? JSON.parse(json.data) : json.data) || {};
                if (data.downloadedBytes) data.progress = (100 * data.downloadedBytes / data.fileSize).toFixed(0);
                data.gameIcon = data.gameIcon || gameInfo.base.gameIcon;
                switch (state) {
                  case "-1":
                    gameState.btnText = "下载";
                    gameState.clickAction = angular.noop;
                    gameState.region = "info";
                    gameState.btnStyle = "";
                    break;

                  case "0":
                    gameState.btnText = "下载";
                    gameState.clickAction = NativeApp.startDownloadApp;
                    gameState.statAction = "btn_down";
                    gameState.region = "info";
                    gameState.btnStyle = "";
                    break;

                  case "1":
                    gameState.region = "info";
                    if (!gameInfo.base.isSimple) if (gameState.data.isFollow) {
                        gameState.btnText = "已关注";
                        gameState.btnStyle = "-dis";
                        gameState.clickAction = angular.noop;
                        gameState.statAction = "";
                    } else {
                        gameState.btnText = "关注";
                        gameState.btnStyle = "";
                        gameState.clickAction = NativeApp.followApp;
                        gameState.statAction = "btn_bookonlinegame";
                    } else {
                        gameState.btnText = "即将开放";
                        gameState.clickAction = angular.noop;
                        gameState.btnStyle = "-dis";
                    }
                    break;

                  case "100":
                    gameState.btnText = "暂停";
                    gameState.clickAction = NativeApp.stopDownloadApp;
                    gameState.statAction = "";
                    gameState.btnStyle = "";
                    gameState.region = "progress";
                    gameState.data.network = null;
                    gameState.stateText = "启动下载中...";
                    gameState.shortStateText = "启动下载";
                    break;

                  case "101":
                    gameState.btnText = "暂停";
                    gameState.clickAction = NativeApp.stopDownloadApp;
                    gameState.statAction = "";
                    gameState.btnStyle = "";
                    gameState.region = "state";
                    gameState.stateText = "等待下载(最多同时下载2个)";
                    gameState.shortStateText = "等待下载";
                    break;

                  case "102":
                    gameState.btnText = "继续";
                    gameState.btnStyle = "";
                    gameState.clickAction = NativeApp.resumeDownloadApp;
                    gameState.statAction = "";
                    gameState.region = "state";
                    gameState.stateText = "队列中,WIFI下自动下载";
                    gameState.shortStateText = "下载队列";
                    break;

                  case "103":
                    gameState.btnText = "继续";
                    gameState.btnStyle = "";
                    gameState.clickAction = NativeApp.resumeDownloadApp;
                    gameState.statAction = "";
                    gameState.region = "progress";
                    gameState.data.network = null;
                    gameState.stateText = "已暂停";
                    break;

                  case "104":
                    gameState.btnText = "暂停";
                    gameState.btnStyle = "";
                    gameState.clickAction = NativeApp.stopDownloadApp;
                    gameState.statAction = "";
                    gameState.region = "progress";
                    if (data.downloadSpeed > 0) {
                        var speed = Utils.formatSize(data.downloadSpeed);
                        var remainTime = Utils.formatRemainTime((data.fileSize - data.downloadedBytes) / data.downloadSpeed);
                        gameState.stateText = speed + "B/s(" + remainTime + ")";
                    } else gameState.stateText = "0.0KB/s";
                    break;

                  case "105":
                    gameState.btnText = "暂停";
                    gameState.clickAction = NativeApp.stopDownloadApp;
                    gameState.statAction = "";
                    gameState.btnStyle = "";
                    gameState.region = "progress";
                    gameState.data.network = null;
                    gameState.stateText = "重连第" + (data.retryCount || 1) + "次...";
                    break;

                  case "106":
                    gameState.btnText = "重试";
                    gameState.clickAction = NativeApp.resumeDownloadApp;
                    gameState.statAction = "";
                    gameState.btnStyle = "";
                    gameState.region = "progress";
                    gameState.stateText = "重试" + (data.retryCount || 5) + "次失败(" + ("unavailable" == data.network ? "网络中断)" : "请稍后再试)");
                    break;

                  case "107":
                    gameState.btnText = "安装";
                    gameState.clickAction = NativeApp.installApp;
                    gameState.statAction = "btn_install";
                    gameState.btnStyle = "-em";
                    gameState.region = "state";
                    gameState.stateText = "下载完成";
                    gameState.shortStateText = "下载完成";
                    break;

                  case "108":
                    gameState.btnText = "继续";
                    gameState.clickAction = NativeApp.resumeDownloadApp;
                    gameState.statAction = "";
                    gameState.btnStyle = "";
                    gameState.region = "progress";
                    gameState.data.network = null;
                    gameState.stateText = "已暂停(WIFI中断)";
                    break;

                  case "200":
                    gameState.btnText = "安装中";
                    gameState.clickAction = angular.noop;
                    gameState.btnStyle = "-dis";
                    gameState.region = "state";
                    gameState.stateText = "安装中...";
                    gameState.shortStateText = "安装中";
                    break;

                  case "205":
                    gameState.btnText = "解包中";
                    gameState.clickAction = angular.noop;
                    gameState.btnStyle = "-dis";
                    gameState.region = "state";
                    gameState.stateText = "数据包解压中...";
                    gameState.shortStateText = "解包中";
                    break;

                  case "206":
                    gameState.btnText = "重试";
                    gameState.clickAction = NativeApp.installApp;
                    gameState.statAction = "btn_install";
                    gameState.btnStyle = "";
                    gameState.region = "state";
                    gameState.stateText = "数据包解压失败";
                    gameState.shortStateText = "解压失败";
                    break;

                  case "207":
                    gameState.btnText = "安装";
                    gameState.clickAction = NativeApp.installApp;
                    gameState.statAction = "btn_install";
                    gameState.btnStyle = "-em";
                    gameState.region = "state";
                    gameState.stateText = "安装失败";
                    gameState.shortStateText = "安装失败";
                    break;

                  case "300":
                    gameState.btnText = "打开";
                    gameState.clickAction = NativeApp.startupApp;
                    gameState.statAction = "btn_open";
                    gameState.btnStyle = "-em";
                    gameState.region = "info";
                    break;

                  case "301":
                    gameState.btnText = "升级";
                    gameState.clickAction = NativeApp.startDownloadApp;
                    gameState.statAction = "btn_down";
                    gameState.btnStyle = "-em";
                    gameState.region = "info";
                    break;

                  case "302":
                    gameState.btnText = "安装";
                    gameState.clickAction = NativeApp.installApp;
                    gameState.statAction = "btn_install";
                    gameState.btnStyle = "-em";
                    gameState.region = "info";
                    break;

                  case "400":
                    gameState.btnText = "进入游戏";
                    gameState.clickAction = NativeApp.startupWebApp;
                    gameState.statAction = "btn_entergame";
                    gameState.btnStyle = "";
                    gameState.region = "info";
                    break;

                  default:
                    gameState.btnText = "下载";
                    gameState.clickAction = angular.noop;
                    gameState.region = "info";
                    gameState.btnStyle = "";
                    console.warn("[GameState] changePackageState got unknown btn state: " + state, gameInfo, json);
                }
            } else console.warn("[GameState] updatePackageState got undefined gameInfo.");
        };
        GameState.prototype.updateFollowState = function(json, gameInfo) {
            if (gameInfo) {
                var gameState = this;
                if (!gameInfo.base.isSimple) if (json.isFollow) {
                    gameState.btnText = "已关注";
                    gameState.clickAction = angular.noop();
                    gameState.statAction = "";
                    gameState.btnStyle = "-dis";
                } else {
                    gameState.btnText = "关注";
                    gameState.clickAction = NativeApp.followApp;
                    gameState.statAction = "btn_bookonlinegame";
                    gameState.btnStyle = "";
                }
            } else console.warn("[GameState] updateFollowState got undefined gameInfo.");
        };
        return GameState;
    } ]);
    app.factory("GameStateWatcher", [ "$rootScope", "NativeApp", "GameState", "GameService", function($rootScope, NativeApp, GameState, GameService) {
        function GameStateWatcher() {}
        GameStateWatcher.mapping = {};
        GameStateWatcher.monitor = function(key, gameInfoList) {
            if (gameInfoList && gameInfoList.length > 0) {
                GameStateWatcher.mapping[key] = gameInfoList;
                var newGameList = [];
                var gameMapping = {};
                for (var i = 0, len = gameInfoList.length; i < len; i++) {
                    var gameInfo = gameInfoList[i];
                    gameInfo.ui = gameInfo.ui || new GameState();
                    if (!gameInfo.ui.hasInit()) {
                        newGameList.push(gameInfo);
                        gameMapping[gameInfo.key.gameId + "_" + gameInfo.key.pkgName] = gameInfo;
                        if (!true) gameInfo.ui.data.gameIcon = gameInfo.base.gameIcon;
                    }
                }
                if (newGameList.length > 0) {
                    console.debug("[GameStateWatcher] watching %s with %d new gameInfo", key, newGameList.length);
                    NativeApp.getPackageState(newGameList, function(json) {
                        var resultList = json.data;
                        if (newGameList.length != resultList.length) console.warn("[GameStateWatcher] getPackageState count problem", newGameList, resultList);
                        for (var i = 0, len = resultList.length; i < len; i++) {
                            var data = resultList[i];
                            var gameInfo = gameMapping[data.gameId + "_" + (data.pkgName || "")];
                            if (gameInfo && gameInfo.ui) gameInfo.ui.updatePackageState(data, gameInfo); else console.warn("[GameStateWatcher] getPackageState missing item: " + data.gameId + "_" + (data.pkgName || ""));
                        }
                        gameMapping = null;
                        newGameList = null;
                    });
                }
            } else delete GameStateWatcher.mapping[key];
        };
        var isWatchingStateEvent = false;
        var isWatchingFollowEvent = false;
        GameStateWatcher.initEvent = function(watchState, watchFollow) {
            if (!isWatchingStateEvent && watchState) {
                isWatchingStateEvent = true;
                NativeApp.registerEvent(NativeApp.EVENT_PACKAGE_STATE_CHANGED, function(event, json) {
                    updateGameInfo(json, function(gameInfo) {
                        gameInfo.ui.updatePackageState(json, gameInfo);
                    });
                });
                NativeApp.registerEvent(NativeApp.EVENT_EXTRACT_PROGRESS_CHANGED, function(event, json) {
                    updateGameInfo(json, function(gameInfo) {
                        gameInfo.ui.updatePackageState(json, gameInfo);
                    });
                });
            }
            if (!isWatchingFollowEvent && watchFollow) {
                isWatchingFollowEvent = true;
                NativeApp.registerEvent(NativeApp.EVENT_FOLLOW_STATE_CHANGED);
                $rootScope.$on(NativeApp.EVENT_FOLLOW_STATE_CHANGED, function(event, json) {
                    angular.forEach(json, function(data, key) {
                        updateGameInfo(data, function(gameInfo) {
                            gameInfo.ui.updateFollowState(data, gameInfo);
                        });
                    });
                });
            }
        };
        function updateGameInfo(json, callback) {
            angular.forEach(GameStateWatcher.mapping, function(gameInfoList) {
                angular.forEach(gameInfoList, function(gameInfo) {
                    if (gameInfo && gameInfo.key && gameInfo.key.gameId == json.gameId && gameInfo.key.pkgName == json.pkgName) callback(gameInfo);
                });
            });
        }
        return GameStateWatcher;
    } ]);
    app.directive("ngmGameItem", [ "$rootScope", "NativeApp", "Utils", "$timeout", "GameService", "GameState", function($rootScope, NativeApp, Utils, $timeout, GameService, GameState) {
        return {
            scope: {
                ngmGameItem: "="
            },
            link: function(scope, element, attrs) {
                var unbindWatch = scope.$watch("ngmGameItem", function(gameInfo) {
                    if (gameInfo) {
                        if (!gameInfo.base.isSimple) {
                            gameInfo.ui = new GameState();
                            initEvent();
                            updateFollowState(NativeApp.isFollowApp(gameInfo), gameInfo);
                        }
                        unbindWatch();
                        unbindWatch = null;
                    }
                });
                function initEvent() {
                    NativeApp.registerEvent(NativeApp.EVENT_FOLLOW_STATE_CHANGED);
                    scope.$on(NativeApp.EVENT_FOLLOW_STATE_CHANGED, function(event, json) {
                        console.log(">>>H5 json EVENT_FOLLOW_STATE_CHANGED:" + JSON.stringify(json));
                        var gameInfo = scope.ngmGameItem;
                        angular.forEach(json, function(data, key) {
                            if (gameInfo && gameInfo.key && gameInfo.key.gameId == data.gameId && gameInfo.key.pkgName == data.pkgName) updateFollowState(data.isFollow, gameInfo);
                        });
                    });
                }
                function updateFollowState(isFollow, gameInfo) {
                    if (gameInfo && gameInfo.ui) {
                        var gameState = gameInfo.ui;
                        if (isFollow) {
                            gameState.btnText = "取消关注";
                            gameState.clickAction = NativeApp.unfollowApp;
                            gameState.statAction = "btn_unbookonlinegame";
                            gameState.btnStyle = "-long";
                        } else {
                            gameState.btnText = "关注";
                            gameState.clickAction = NativeApp.followApp;
                            gameState.statAction = "btn_bookonlinegame";
                            gameState.btnStyle = "";
                        }
                    }
                }
            }
        };
    } ]);
    app.directive("ngmGameList", [ "GameStateWatcher", function(GameStateWatcher) {
        var directiveConfig = {
            scope: {
                ngmGameList: "="
            },
            link: function(scope, element, attrs) {
                GameStateWatcher.initEvent(true, true);
                scope.$watchCollection("ngmGameList", function() {
                    GameStateWatcher.monitor(attrs["ngmGameListKey"] || attrs["ngmGameList"], scope.ngmGameList);
                });
            }
        };
        return directiveConfig;
    } ]);
}(window);