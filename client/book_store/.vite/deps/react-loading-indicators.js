import {
  require_react
} from "./chunk-GH6UE3LJ.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/react-loading-indicators/esm/index.js
var import_react = __toESM(require_react());
function r(n2, r2) {
  void 0 === r2 && (r2 = {});
  var o2 = r2.insertAt;
  if (n2 && "undefined" != typeof document) {
    var a2 = document.head || document.getElementsByTagName("head")[0], e2 = document.createElement("style");
    e2.type = "text/css", "top" === o2 && a2.firstChild ? a2.insertBefore(e2, a2.firstChild) : a2.appendChild(e2), e2.styleSheet ? e2.styleSheet.cssText = n2 : e2.appendChild(document.createTextNode(n2));
  }
}
r('.react-loading-indicator-normalize,\n[class$=rli-bounding-box] {\n  font-size: 1rem;\n  display: inline-block;\n  box-sizing: border-box;\n  text-align: unset;\n  isolation: isolate;\n}\n\n.rli-d-i-b {\n  display: inline-block;\n}\n\n.rli-text-format {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-weight: 600;\n  width: 90%;\n  text-transform: uppercase;\n  text-align: center;\n  font-size: 0.7em;\n  letter-spacing: 0.5px;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Avenir Next", "Avenir", "Segoe UI", "Lucida Grande", "Helvetica Neue", "Helvetica", "Fira Sans", "Roboto", "Noto", "Droid Sans", "Cantarell", "Oxygen", "Ubuntu", "Franklin Gothic Medium", "Century Gothic", "Liberation Sans", sans-serif;\n}');
var o = function() {
  return o = Object.assign || function(n2) {
    for (var r2, o2 = 1, a2 = arguments.length; o2 < a2; o2++) for (var e2 in r2 = arguments[o2]) Object.prototype.hasOwnProperty.call(r2, e2) && (n2[e2] = r2[e2]);
    return n2;
  }, o.apply(this, arguments);
};
function a(n2) {
  return a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n3) {
    return typeof n3;
  } : function(n3) {
    return n3 && "function" == typeof Symbol && n3.constructor === Symbol && n3 !== Symbol.prototype ? "symbol" : typeof n3;
  }, a(n2);
}
var e = /^\s+/;
var t = /\s+$/;
function i(n2, r2) {
  if (r2 = r2 || {}, (n2 = n2 || "") instanceof i) return n2;
  if (!(this instanceof i)) return new i(n2, r2);
  var o2 = (function(n3) {
    var r3 = { r: 0, g: 0, b: 0 }, o3 = 1, i2 = null, l2 = null, s2 = null, c2 = false, u2 = false;
    "string" == typeof n3 && (n3 = (function(n4) {
      n4 = n4.replace(e, "").replace(t, "").toLowerCase();
      var r4, o4 = false;
      if (P[n4]) n4 = P[n4], o4 = true;
      else if ("transparent" == n4) return { r: 0, g: 0, b: 0, a: 0, format: "name" };
      if (r4 = R.rgb.exec(n4)) return { r: r4[1], g: r4[2], b: r4[3] };
      if (r4 = R.rgba.exec(n4)) return { r: r4[1], g: r4[2], b: r4[3], a: r4[4] };
      if (r4 = R.hsl.exec(n4)) return { h: r4[1], s: r4[2], l: r4[3] };
      if (r4 = R.hsla.exec(n4)) return { h: r4[1], s: r4[2], l: r4[3], a: r4[4] };
      if (r4 = R.hsv.exec(n4)) return { h: r4[1], s: r4[2], v: r4[3] };
      if (r4 = R.hsva.exec(n4)) return { h: r4[1], s: r4[2], v: r4[3], a: r4[4] };
      if (r4 = R.hex8.exec(n4)) return { r: z(r4[1]), g: z(r4[2]), b: z(r4[3]), a: C(r4[4]), format: o4 ? "name" : "hex8" };
      if (r4 = R.hex6.exec(n4)) return { r: z(r4[1]), g: z(r4[2]), b: z(r4[3]), format: o4 ? "name" : "hex" };
      if (r4 = R.hex4.exec(n4)) return { r: z(r4[1] + "" + r4[1]), g: z(r4[2] + "" + r4[2]), b: z(r4[3] + "" + r4[3]), a: C(r4[4] + "" + r4[4]), format: o4 ? "name" : "hex8" };
      if (r4 = R.hex3.exec(n4)) return { r: z(r4[1] + "" + r4[1]), g: z(r4[2] + "" + r4[2]), b: z(r4[3] + "" + r4[3]), format: o4 ? "name" : "hex" };
      return false;
    })(n3));
    "object" == a(n3) && (J(n3.r) && J(n3.g) && J(n3.b) ? (d2 = n3.r, p2 = n3.g, b2 = n3.b, r3 = { r: 255 * S(d2, 255), g: 255 * S(p2, 255), b: 255 * S(b2, 255) }, c2 = true, u2 = "%" === String(n3.r).substr(-1) ? "prgb" : "rgb") : J(n3.h) && J(n3.s) && J(n3.v) ? (i2 = _(n3.s), l2 = _(n3.v), r3 = (function(n4, r4, o4) {
      n4 = 6 * S(n4, 360), r4 = S(r4, 100), o4 = S(o4, 100);
      var a2 = Math.floor(n4), e2 = n4 - a2, t2 = o4 * (1 - r4), i3 = o4 * (1 - e2 * r4), l3 = o4 * (1 - (1 - e2) * r4), s3 = a2 % 6, c3 = [o4, i3, t2, t2, l3, o4][s3], u3 = [l3, o4, o4, i3, t2, t2][s3], d3 = [t2, t2, l3, o4, o4, i3][s3];
      return { r: 255 * c3, g: 255 * u3, b: 255 * d3 };
    })(n3.h, i2, l2), c2 = true, u2 = "hsv") : J(n3.h) && J(n3.s) && J(n3.l) && (i2 = _(n3.s), s2 = _(n3.l), r3 = (function(n4, r4, o4) {
      var a2, e2, t2;
      function i3(n5, r5, o5) {
        return o5 < 0 && (o5 += 1), o5 > 1 && (o5 -= 1), o5 < 1 / 6 ? n5 + 6 * (r5 - n5) * o5 : o5 < 0.5 ? r5 : o5 < 2 / 3 ? n5 + (r5 - n5) * (2 / 3 - o5) * 6 : n5;
      }
      if (n4 = S(n4, 360), r4 = S(r4, 100), o4 = S(o4, 100), 0 === r4) a2 = e2 = t2 = o4;
      else {
        var l3 = o4 < 0.5 ? o4 * (1 + r4) : o4 + r4 - o4 * r4, s3 = 2 * o4 - l3;
        a2 = i3(s3, l3, n4 + 1 / 3), e2 = i3(s3, l3, n4), t2 = i3(s3, l3, n4 - 1 / 3);
      }
      return { r: 255 * a2, g: 255 * e2, b: 255 * t2 };
    })(n3.h, i2, s2), c2 = true, u2 = "hsl"), n3.hasOwnProperty("a") && (o3 = n3.a));
    var d2, p2, b2;
    return o3 = E(o3), { ok: c2, format: n3.format || u2, r: Math.min(255, Math.max(r3.r, 0)), g: Math.min(255, Math.max(r3.g, 0)), b: Math.min(255, Math.max(r3.b, 0)), a: o3 };
  })(n2);
  this._originalInput = n2, this._r = o2.r, this._g = o2.g, this._b = o2.b, this._a = o2.a, this._roundA = Math.round(100 * this._a) / 100, this._format = r2.format || o2.format, this._gradientType = r2.gradientType, this._r < 1 && (this._r = Math.round(this._r)), this._g < 1 && (this._g = Math.round(this._g)), this._b < 1 && (this._b = Math.round(this._b)), this._ok = o2.ok;
}
function l(n2, r2, o2) {
  n2 = S(n2, 255), r2 = S(r2, 255), o2 = S(o2, 255);
  var a2, e2, t2 = Math.max(n2, r2, o2), i2 = Math.min(n2, r2, o2), l2 = (t2 + i2) / 2;
  if (t2 == i2) a2 = e2 = 0;
  else {
    var s2 = t2 - i2;
    switch (e2 = l2 > 0.5 ? s2 / (2 - t2 - i2) : s2 / (t2 + i2), t2) {
      case n2:
        a2 = (r2 - o2) / s2 + (r2 < o2 ? 6 : 0);
        break;
      case r2:
        a2 = (o2 - n2) / s2 + 2;
        break;
      case o2:
        a2 = (n2 - r2) / s2 + 4;
    }
    a2 /= 6;
  }
  return { h: a2, s: e2, l: l2 };
}
function s(n2, r2, o2) {
  n2 = S(n2, 255), r2 = S(r2, 255), o2 = S(o2, 255);
  var a2, e2, t2 = Math.max(n2, r2, o2), i2 = Math.min(n2, r2, o2), l2 = t2, s2 = t2 - i2;
  if (e2 = 0 === t2 ? 0 : s2 / t2, t2 == i2) a2 = 0;
  else {
    switch (t2) {
      case n2:
        a2 = (r2 - o2) / s2 + (r2 < o2 ? 6 : 0);
        break;
      case r2:
        a2 = (o2 - n2) / s2 + 2;
        break;
      case o2:
        a2 = (n2 - r2) / s2 + 4;
    }
    a2 /= 6;
  }
  return { h: a2, s: e2, v: l2 };
}
function c(n2, r2, o2, a2) {
  var e2 = [A(Math.round(n2).toString(16)), A(Math.round(r2).toString(16)), A(Math.round(o2).toString(16))];
  return a2 && e2[0].charAt(0) == e2[0].charAt(1) && e2[1].charAt(0) == e2[1].charAt(1) && e2[2].charAt(0) == e2[2].charAt(1) ? e2[0].charAt(0) + e2[1].charAt(0) + e2[2].charAt(0) : e2.join("");
}
function u(n2, r2, o2, a2) {
  return [A(T(a2)), A(Math.round(n2).toString(16)), A(Math.round(r2).toString(16)), A(Math.round(o2).toString(16))].join("");
}
function d(n2, r2) {
  r2 = 0 === r2 ? 0 : r2 || 10;
  var o2 = i(n2).toHsl();
  return o2.s -= r2 / 100, o2.s = N(o2.s), i(o2);
}
function p(n2, r2) {
  r2 = 0 === r2 ? 0 : r2 || 10;
  var o2 = i(n2).toHsl();
  return o2.s += r2 / 100, o2.s = N(o2.s), i(o2);
}
function b(n2) {
  return i(n2).desaturate(100);
}
function h(n2, r2) {
  r2 = 0 === r2 ? 0 : r2 || 10;
  var o2 = i(n2).toHsl();
  return o2.l += r2 / 100, o2.l = N(o2.l), i(o2);
}
function m(n2, r2) {
  r2 = 0 === r2 ? 0 : r2 || 10;
  var o2 = i(n2).toRgb();
  return o2.r = Math.max(0, Math.min(255, o2.r - Math.round(-r2 / 100 * 255))), o2.g = Math.max(0, Math.min(255, o2.g - Math.round(-r2 / 100 * 255))), o2.b = Math.max(0, Math.min(255, o2.b - Math.round(-r2 / 100 * 255))), i(o2);
}
function g(n2, r2) {
  r2 = 0 === r2 ? 0 : r2 || 10;
  var o2 = i(n2).toHsl();
  return o2.l -= r2 / 100, o2.l = N(o2.l), i(o2);
}
function f(n2, r2) {
  var o2 = i(n2).toHsl(), a2 = (o2.h + r2) % 360;
  return o2.h = a2 < 0 ? 360 + a2 : a2, i(o2);
}
function v(n2) {
  var r2 = i(n2).toHsl();
  return r2.h = (r2.h + 180) % 360, i(r2);
}
function y(n2, r2) {
  if (isNaN(r2) || r2 <= 0) throw new Error("Argument to polyad must be a positive number");
  for (var o2 = i(n2).toHsl(), a2 = [i(n2)], e2 = 360 / r2, t2 = 1; t2 < r2; t2++) a2.push(i({ h: (o2.h + t2 * e2) % 360, s: o2.s, l: o2.l }));
  return a2;
}
function x(n2) {
  var r2 = i(n2).toHsl(), o2 = r2.h;
  return [i(n2), i({ h: (o2 + 72) % 360, s: r2.s, l: r2.l }), i({ h: (o2 + 216) % 360, s: r2.s, l: r2.l })];
}
function k(n2, r2, o2) {
  r2 = r2 || 6, o2 = o2 || 30;
  var a2 = i(n2).toHsl(), e2 = 360 / o2, t2 = [i(n2)];
  for (a2.h = (a2.h - (e2 * r2 >> 1) + 720) % 360; --r2; ) a2.h = (a2.h + e2) % 360, t2.push(i(a2));
  return t2;
}
function O(n2, r2) {
  r2 = r2 || 6;
  for (var o2 = i(n2).toHsv(), a2 = o2.h, e2 = o2.s, t2 = o2.v, l2 = [], s2 = 1 / r2; r2--; ) l2.push(i({ h: a2, s: e2, v: t2 })), t2 = (t2 + s2) % 1;
  return l2;
}
i.prototype = { isDark: function() {
  return this.getBrightness() < 128;
}, isLight: function() {
  return !this.isDark();
}, isValid: function() {
  return this._ok;
}, getOriginalInput: function() {
  return this._originalInput;
}, getFormat: function() {
  return this._format;
}, getAlpha: function() {
  return this._a;
}, getBrightness: function() {
  var n2 = this.toRgb();
  return (299 * n2.r + 587 * n2.g + 114 * n2.b) / 1e3;
}, getLuminance: function() {
  var n2, r2, o2, a2 = this.toRgb();
  return n2 = a2.r / 255, r2 = a2.g / 255, o2 = a2.b / 255, 0.2126 * (n2 <= 0.03928 ? n2 / 12.92 : Math.pow((n2 + 0.055) / 1.055, 2.4)) + 0.7152 * (r2 <= 0.03928 ? r2 / 12.92 : Math.pow((r2 + 0.055) / 1.055, 2.4)) + 0.0722 * (o2 <= 0.03928 ? o2 / 12.92 : Math.pow((o2 + 0.055) / 1.055, 2.4));
}, setAlpha: function(n2) {
  return this._a = E(n2), this._roundA = Math.round(100 * this._a) / 100, this;
}, toHsv: function() {
  var n2 = s(this._r, this._g, this._b);
  return { h: 360 * n2.h, s: n2.s, v: n2.v, a: this._a };
}, toHsvString: function() {
  var n2 = s(this._r, this._g, this._b), r2 = Math.round(360 * n2.h), o2 = Math.round(100 * n2.s), a2 = Math.round(100 * n2.v);
  return 1 == this._a ? "hsv(" + r2 + ", " + o2 + "%, " + a2 + "%)" : "hsva(" + r2 + ", " + o2 + "%, " + a2 + "%, " + this._roundA + ")";
}, toHsl: function() {
  var n2 = l(this._r, this._g, this._b);
  return { h: 360 * n2.h, s: n2.s, l: n2.l, a: this._a };
}, toHslString: function() {
  var n2 = l(this._r, this._g, this._b), r2 = Math.round(360 * n2.h), o2 = Math.round(100 * n2.s), a2 = Math.round(100 * n2.l);
  return 1 == this._a ? "hsl(" + r2 + ", " + o2 + "%, " + a2 + "%)" : "hsla(" + r2 + ", " + o2 + "%, " + a2 + "%, " + this._roundA + ")";
}, toHex: function(n2) {
  return c(this._r, this._g, this._b, n2);
}, toHexString: function(n2) {
  return "#" + this.toHex(n2);
}, toHex8: function(n2) {
  return (function(n3, r2, o2, a2, e2) {
    var t2 = [A(Math.round(n3).toString(16)), A(Math.round(r2).toString(16)), A(Math.round(o2).toString(16)), A(T(a2))];
    if (e2 && t2[0].charAt(0) == t2[0].charAt(1) && t2[1].charAt(0) == t2[1].charAt(1) && t2[2].charAt(0) == t2[2].charAt(1) && t2[3].charAt(0) == t2[3].charAt(1)) return t2[0].charAt(0) + t2[1].charAt(0) + t2[2].charAt(0) + t2[3].charAt(0);
    return t2.join("");
  })(this._r, this._g, this._b, this._a, n2);
}, toHex8String: function(n2) {
  return "#" + this.toHex8(n2);
}, toRgb: function() {
  return { r: Math.round(this._r), g: Math.round(this._g), b: Math.round(this._b), a: this._a };
}, toRgbString: function() {
  return 1 == this._a ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
}, toPercentageRgb: function() {
  return { r: Math.round(100 * S(this._r, 255)) + "%", g: Math.round(100 * S(this._g, 255)) + "%", b: Math.round(100 * S(this._b, 255)) + "%", a: this._a };
}, toPercentageRgbString: function() {
  return 1 == this._a ? "rgb(" + Math.round(100 * S(this._r, 255)) + "%, " + Math.round(100 * S(this._g, 255)) + "%, " + Math.round(100 * S(this._b, 255)) + "%)" : "rgba(" + Math.round(100 * S(this._r, 255)) + "%, " + Math.round(100 * S(this._g, 255)) + "%, " + Math.round(100 * S(this._b, 255)) + "%, " + this._roundA + ")";
}, toName: function() {
  return 0 === this._a ? "transparent" : !(this._a < 1) && (w[c(this._r, this._g, this._b, true)] || false);
}, toFilter: function(n2) {
  var r2 = "#" + u(this._r, this._g, this._b, this._a), o2 = r2, a2 = this._gradientType ? "GradientType = 1, " : "";
  if (n2) {
    var e2 = i(n2);
    o2 = "#" + u(e2._r, e2._g, e2._b, e2._a);
  }
  return "progid:DXImageTransform.Microsoft.gradient(" + a2 + "startColorstr=" + r2 + ",endColorstr=" + o2 + ")";
}, toString: function(n2) {
  var r2 = !!n2;
  n2 = n2 || this._format;
  var o2 = false, a2 = this._a < 1 && this._a >= 0;
  return r2 || !a2 || "hex" !== n2 && "hex6" !== n2 && "hex3" !== n2 && "hex4" !== n2 && "hex8" !== n2 && "name" !== n2 ? ("rgb" === n2 && (o2 = this.toRgbString()), "prgb" === n2 && (o2 = this.toPercentageRgbString()), "hex" !== n2 && "hex6" !== n2 || (o2 = this.toHexString()), "hex3" === n2 && (o2 = this.toHexString(true)), "hex4" === n2 && (o2 = this.toHex8String(true)), "hex8" === n2 && (o2 = this.toHex8String()), "name" === n2 && (o2 = this.toName()), "hsl" === n2 && (o2 = this.toHslString()), "hsv" === n2 && (o2 = this.toHsvString()), o2 || this.toHexString()) : "name" === n2 && 0 === this._a ? this.toName() : this.toRgbString();
}, clone: function() {
  return i(this.toString());
}, _applyModification: function(n2, r2) {
  var o2 = n2.apply(null, [this].concat([].slice.call(r2)));
  return this._r = o2._r, this._g = o2._g, this._b = o2._b, this.setAlpha(o2._a), this;
}, lighten: function() {
  return this._applyModification(h, arguments);
}, brighten: function() {
  return this._applyModification(m, arguments);
}, darken: function() {
  return this._applyModification(g, arguments);
}, desaturate: function() {
  return this._applyModification(d, arguments);
}, saturate: function() {
  return this._applyModification(p, arguments);
}, greyscale: function() {
  return this._applyModification(b, arguments);
}, spin: function() {
  return this._applyModification(f, arguments);
}, _applyCombination: function(n2, r2) {
  return n2.apply(null, [this].concat([].slice.call(r2)));
}, analogous: function() {
  return this._applyCombination(k, arguments);
}, complement: function() {
  return this._applyCombination(v, arguments);
}, monochromatic: function() {
  return this._applyCombination(O, arguments);
}, splitcomplement: function() {
  return this._applyCombination(x, arguments);
}, triad: function() {
  return this._applyCombination(y, [3]);
}, tetrad: function() {
  return this._applyCombination(y, [4]);
} }, i.fromRatio = function(n2, r2) {
  if ("object" == a(n2)) {
    var o2 = {};
    for (var e2 in n2) n2.hasOwnProperty(e2) && (o2[e2] = "a" === e2 ? n2[e2] : _(n2[e2]));
    n2 = o2;
  }
  return i(n2, r2);
}, i.equals = function(n2, r2) {
  return !(!n2 || !r2) && i(n2).toRgbString() == i(r2).toRgbString();
}, i.random = function() {
  return i.fromRatio({ r: Math.random(), g: Math.random(), b: Math.random() });
}, i.mix = function(n2, r2, o2) {
  o2 = 0 === o2 ? 0 : o2 || 50;
  var a2 = i(n2).toRgb(), e2 = i(r2).toRgb(), t2 = o2 / 100;
  return i({ r: (e2.r - a2.r) * t2 + a2.r, g: (e2.g - a2.g) * t2 + a2.g, b: (e2.b - a2.b) * t2 + a2.b, a: (e2.a - a2.a) * t2 + a2.a });
}, i.readability = function(n2, r2) {
  var o2 = i(n2), a2 = i(r2);
  return (Math.max(o2.getLuminance(), a2.getLuminance()) + 0.05) / (Math.min(o2.getLuminance(), a2.getLuminance()) + 0.05);
}, i.isReadable = function(n2, r2, o2) {
  var a2, e2, t2 = i.readability(n2, r2);
  switch (e2 = false, (a2 = (function(n3) {
    var r3, o3;
    r3 = ((n3 = n3 || { level: "AA", size: "small" }).level || "AA").toUpperCase(), o3 = (n3.size || "small").toLowerCase(), "AA" !== r3 && "AAA" !== r3 && (r3 = "AA");
    "small" !== o3 && "large" !== o3 && (o3 = "small");
    return { level: r3, size: o3 };
  })(o2)).level + a2.size) {
    case "AAsmall":
    case "AAAlarge":
      e2 = t2 >= 4.5;
      break;
    case "AAlarge":
      e2 = t2 >= 3;
      break;
    case "AAAsmall":
      e2 = t2 >= 7;
  }
  return e2;
}, i.mostReadable = function(n2, r2, o2) {
  var a2, e2, t2, l2, s2 = null, c2 = 0;
  e2 = (o2 = o2 || {}).includeFallbackColors, t2 = o2.level, l2 = o2.size;
  for (var u2 = 0; u2 < r2.length; u2++) (a2 = i.readability(n2, r2[u2])) > c2 && (c2 = a2, s2 = i(r2[u2]));
  return i.isReadable(n2, s2, { level: t2, size: l2 }) || !e2 ? s2 : (o2.includeFallbackColors = false, i.mostReadable(n2, ["#fff", "#000"], o2));
};
var P = i.names = { aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "0ff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000", blanchedalmond: "ffebcd", blue: "00f", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", burntsienna: "ea7e5d", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "0ff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkgrey: "a9a9a9", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkslategrey: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dimgrey: "696969", dodgerblue: "1e90ff", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "f0f", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", grey: "808080", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgray: "d3d3d3", lightgreen: "90ee90", lightgrey: "d3d3d3", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslategray: "789", lightslategrey: "789", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "0f0", limegreen: "32cd32", linen: "faf0e6", magenta: "f0f", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370db", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "db7093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", rebeccapurple: "663399", red: "f00", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", slategrey: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3", white: "fff", whitesmoke: "f5f5f5", yellow: "ff0", yellowgreen: "9acd32" };
var w = i.hexNames = (function(n2) {
  var r2 = {};
  for (var o2 in n2) n2.hasOwnProperty(o2) && (r2[n2[o2]] = o2);
  return r2;
})(P);
function E(n2) {
  return n2 = parseFloat(n2), (isNaN(n2) || n2 < 0 || n2 > 1) && (n2 = 1), n2;
}
function S(n2, r2) {
  (function(n3) {
    return "string" == typeof n3 && -1 != n3.indexOf(".") && 1 === parseFloat(n3);
  })(n2) && (n2 = "100%");
  var o2 = (function(n3) {
    return "string" == typeof n3 && -1 != n3.indexOf("%");
  })(n2);
  return n2 = Math.min(r2, Math.max(0, parseFloat(n2))), o2 && (n2 = parseInt(n2 * r2, 10) / 100), Math.abs(n2 - r2) < 1e-6 ? 1 : n2 % r2 / parseFloat(r2);
}
function N(n2) {
  return Math.min(1, Math.max(0, n2));
}
function z(n2) {
  return parseInt(n2, 16);
}
function A(n2) {
  return 1 == n2.length ? "0" + n2 : "" + n2;
}
function _(n2) {
  return n2 <= 1 && (n2 = 100 * n2 + "%"), n2;
}
function T(n2) {
  return Math.round(255 * parseFloat(n2)).toString(16);
}
function C(n2) {
  return z(n2) / 255;
}
var D;
var M;
var q;
var R = (M = "[\\s|\\(]+(" + (D = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") + ")[,|\\s]+(" + D + ")[,|\\s]+(" + D + ")\\s*\\)?", q = "[\\s|\\(]+(" + D + ")[,|\\s]+(" + D + ")[,|\\s]+(" + D + ")[,|\\s]+(" + D + ")\\s*\\)?", { CSS_UNIT: new RegExp(D), rgb: new RegExp("rgb" + M), rgba: new RegExp("rgba" + q), hsl: new RegExp("hsl" + M), hsla: new RegExp("hsla" + q), hsv: new RegExp("hsv" + M), hsva: new RegExp("hsva" + q), hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/, hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/ });
function J(n2) {
  return !!R.CSS_UNIT.exec(n2);
}
var F = function(n2, r2) {
  var o2 = ("string" == typeof n2 ? parseInt(n2) : n2) || 0;
  if (o2 >= -5 && o2 <= 5) {
    var a2 = o2, e2 = parseFloat(r2), t2 = e2 + a2 * (e2 / 5) * -1;
    return (0 == t2 || t2 <= Number.EPSILON) && (t2 = 0.1), { animationPeriod: t2 + "s" };
  }
  return { animationPeriod: r2 };
};
var L = function(n2, r2) {
  var o2 = n2 || {}, a2 = "";
  switch (r2) {
    case "small":
      a2 = "12px";
      break;
    case "medium":
      a2 = "16px";
      break;
    case "large":
      a2 = "20px";
      break;
    default:
      a2 = void 0;
  }
  var e2 = {};
  if (o2.fontSize) {
    var t2 = o2.fontSize;
    e2 = (function(n3, r3) {
      var o3 = {};
      for (var a3 in n3) Object.prototype.hasOwnProperty.call(n3, a3) && r3.indexOf(a3) < 0 && (o3[a3] = n3[a3]);
      if (null != n3 && "function" == typeof Object.getOwnPropertySymbols) {
        var e3 = 0;
        for (a3 = Object.getOwnPropertySymbols(n3); e3 < a3.length; e3++) r3.indexOf(a3[e3]) < 0 && Object.prototype.propertyIsEnumerable.call(n3, a3[e3]) && (o3[a3[e3]] = n3[a3[e3]]);
      }
      return o3;
    })(o2, ["fontSize"]), a2 = t2;
  }
  return { fontSize: a2, styles: e2 };
};
var H = { color: "currentColor", mixBlendMode: "difference", width: "unset", display: "block", paddingTop: "2px" };
var U = function(r2) {
  var a2 = r2.className, e2 = r2.text, t2 = r2.textColor, i2 = r2.staticText, l2 = r2.style;
  return e2 ? import_react.default.createElement("span", { className: "rli-d-i-b rli-text-format ".concat(a2 || "").trim(), style: o(o(o({}, i2 && H), t2 && { color: t2, mixBlendMode: "unset" }), l2 && l2) }, "string" == typeof e2 && e2.length ? e2 : "loading") : null;
};
var X = "rgb(50, 205, 50)";
function j(n2, r2) {
  if (void 0 === r2 && (r2 = 0), 0 === n2.length) throw new Error("Input array cannot be empty!");
  var o2 = [];
  return (function n3(r3, a2) {
    return void 0 === a2 && (a2 = 0), o2.push.apply(o2, r3), o2.length < a2 && n3(o2, a2), o2.slice(0, a2);
  })(n2, r2);
}
r('.atom-rli-bounding-box {\n  --atom-phase1-rgb: 50, 205, 50;\n  color: rgba(var(--atom-phase1-rgb), 1);\n  font-size: 16px;\n  position: relative;\n  text-align: unset;\n  isolation: isolate;\n}\n.atom-rli-bounding-box .atom-indicator {\n  width: 6em;\n  height: 6em;\n  position: relative;\n  perspective: 6em;\n  overflow: hidden;\n  color: rgba(var(--atom-phase1-rgb), 1);\n  animation: calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite uxlv7gg;\n}\n.atom-rli-bounding-box .atom-indicator::after, .atom-rli-bounding-box .atom-indicator::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 0.48em;\n  height: 0.48em;\n  margin: auto;\n  border-radius: 50%;\n  background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase1-rgb), 0.1), rgba(var(--atom-phase1-rgb), 0.3) 37%, rgba(var(--atom-phase1-rgb), 1) 100%);\n  animation: calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite uxlv7eg;\n}\n.atom-rli-bounding-box .atom-indicator::before {\n  filter: drop-shadow(0px 0px 0.0625em currentColor);\n}\n.atom-rli-bounding-box .atom-indicator .electron-orbit {\n  color: rgba(var(--atom-phase1-rgb), 0.85);\n  border: 0;\n  border-left: 0.4em solid currentColor;\n  box-sizing: border-box;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  width: 4.8em;\n  height: 4.8em;\n  background-color: transparent;\n  border-radius: 50%;\n  transform-style: preserve-3d;\n  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, linear) infinite uxlv7fj, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite uxlv7gy;\n}\n.atom-rli-bounding-box .atom-indicator .electron-orbit::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  border-radius: 50%;\n  color: rgba(var(--atom-phase1-rgb), 0.18);\n  animation: calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite uxlv7hv;\n  border: 0.125em solid currentColor;\n}\n.atom-rli-bounding-box .atom-indicator .electron-orbit::before {\n  content: "";\n  width: 0.192em;\n  height: 0.192em;\n  position: absolute;\n  border-radius: 50%;\n  top: -0.096em;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: 0 auto;\n  color: rgba(var(--atom-phase1-rgb), 1);\n  box-shadow: 0px 0px 0.0625em 0.0625em currentColor, 0px 0px 0.0625em 0.125em currentColor;\n  background-color: currentColor;\n  transform: rotateY(-70deg);\n  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, linear) infinite uxlv7ew, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite uxlv7gg;\n}\n.atom-rli-bounding-box .atom-indicator .electron-orbit:nth-of-type(1) {\n  --orbit-vector-factor: -1;\n  transform: rotateY(65deg) rotateX(calc(54deg * var(--orbit-vector-factor)));\n}\n.atom-rli-bounding-box .atom-indicator .electron-orbit:nth-of-type(2) {\n  --orbit-vector-factor: 1;\n  transform: rotateY(65deg) rotateX(calc(54deg * var(--orbit-vector-factor)));\n}\n.atom-rli-bounding-box .atom-indicator .electron-orbit:nth-of-type(3) {\n  --orbit-vector-factor: 0;\n  transform: rotateY(65deg) rotateX(calc(54deg * var(--orbit-vector-factor)));\n  animation-delay: calc(var(--rli-animation-duration, 1s) * 0.5 * -1), calc(var(--rli-animation-duration, 1s) * 4 * -1);\n}\n.atom-rli-bounding-box .atom-indicator .electron-orbit:nth-of-type(3)::before {\n  animation-delay: calc(var(--rli-animation-duration, 1s) * 0.5 * -1), calc(var(--rli-animation-duration, 1s) * 4 * -1);\n}\n.atom-rli-bounding-box .atom-text {\n  color: currentColor;\n  mix-blend-mode: difference;\n  width: unset;\n  display: block;\n}\n\n@property --atom-phase1-rgb {\n  syntax: "<number>#";\n  inherits: true;\n  initial-value: 50, 205, 50;\n}\n@property --atom-phase2-rgb {\n  syntax: "<number>#";\n  inherits: true;\n  initial-value: 50, 205, 50;\n}\n@property --atom-phase3-rgb {\n  syntax: "<number>#";\n  inherits: true;\n  initial-value: 50, 205, 50;\n}\n@property --atom-phase4-rgb {\n  syntax: "<number>#";\n  inherits: true;\n  initial-value: 50, 205, 50;\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1s;\n}\n@keyframes uxlv7fj {\n  from {\n    transform: rotateY(70deg) rotateX(calc(54deg * var(--orbit-vector-factor))) rotateZ(0deg);\n  }\n  to {\n    transform: rotateY(70deg) rotateX(calc(54deg * var(--orbit-vector-factor))) rotateZ(360deg);\n  }\n}\n@keyframes uxlv7ew {\n  from {\n    transform: rotateY(-70deg) rotateX(0deg);\n  }\n  to {\n    transform: rotateY(-70deg) rotateX(-360deg);\n  }\n}\n@keyframes uxlv7eg {\n  100%, 0% {\n    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase1-rgb), 0.1), rgba(var(--atom-phase1-rgb), 0.3) 37%, rgba(var(--atom-phase1-rgb), 1) 100%);\n  }\n  20% {\n    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase1-rgb), 0.1), rgba(var(--atom-phase1-rgb), 0.3) 37%, rgba(var(--atom-phase1-rgb), 1) 100%);\n  }\n  25% {\n    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 1) 100%);\n  }\n  45% {\n    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 1) 100%);\n  }\n  50% {\n    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 1) 100%);\n  }\n  70% {\n    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 1) 100%);\n  }\n  75% {\n    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 1) 100%);\n  }\n  95% {\n    background-image: radial-gradient(circle at 35% 15%, rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.1), rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.3) 37%, rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 1) 100%);\n  }\n}\n@keyframes uxlv7gg {\n  100%, 0% {\n    color: rgba(var(--atom-phase1-rgb), 1);\n  }\n  20% {\n    color: rgba(var(--atom-phase1-rgb), 1);\n  }\n  25% {\n    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 1);\n  }\n  45% {\n    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 1);\n  }\n  50% {\n    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 1);\n  }\n  70% {\n    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 1);\n  }\n  75% {\n    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 1);\n  }\n  95% {\n    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 1);\n  }\n}\n@keyframes uxlv7gy {\n  100%, 0% {\n    color: rgba(var(--atom-phase1-rgb), 0.85);\n  }\n  20% {\n    color: rgba(var(--atom-phase1-rgb), 0.85);\n  }\n  25% {\n    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.85);\n  }\n  45% {\n    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.85);\n  }\n  50% {\n    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.85);\n  }\n  70% {\n    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.85);\n  }\n  75% {\n    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.85);\n  }\n  95% {\n    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.85);\n  }\n}\n@keyframes uxlv7hv {\n  100%, 0% {\n    color: rgba(var(--atom-phase1-rgb), 0.18);\n  }\n  20% {\n    color: rgba(var(--atom-phase1-rgb), 0.18);\n  }\n  25% {\n    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.18);\n  }\n  45% {\n    color: rgba(var(--atom-phase2-rgb, var(--atom-phase1-rgb)), 0.18);\n  }\n  50% {\n    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.18);\n  }\n  70% {\n    color: rgba(var(--atom-phase3-rgb, var(--atom-phase1-rgb)), 0.18);\n  }\n  75% {\n    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.18);\n  }\n  95% {\n    color: rgba(var(--atom-phase4-rgb, var(--atom-phase1-rgb)), 0.18);\n  }\n}');
var I = i(X).toRgb();
var Y = Array.from({ length: 4 }, (function(n2, r2) {
  return "--atom-phase".concat(r2 + 1, "-rgb");
}));
var B = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, l2 = e2.fontSize, s2 = null == r2 ? void 0 : r2.easing, c2 = F(null == r2 ? void 0 : r2.speedPlus, "1s").animationPeriod, u2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, Y.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) try {
        if (!(s3 = i(o2[a3])).isValid()) throw new Error("invalid color");
        var e3 = (c3 = s3.toRgb()).r, t3 = c3.g, l3 = c3.b;
        r3[Y[a3]] = "".concat(e3, ", ").concat(t3, ", ").concat(l3);
      } catch (n3) {
        e3 = I.r, t3 = I.g, l3 = I.b;
        r3[Y[a3]] = "".concat(e3, ", ").concat(t3, ", ").concat(l3), console.warn("Possibly an invalid color( ".concat(o2[a3], " ) passed to Atom indicator!"));
      }
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      var s3;
      if (!(s3 = i(n2)).isValid()) throw new Error("Invalid color");
      var c3;
      for (e3 = (c3 = s3.toRgb()).r, t3 = c3.g, l3 = c3.b, a3 = 0; a3 < Y.length; a3++) r3[Y[a3]] = "".concat(e3, ", ").concat(t3, ", ").concat(l3);
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), " received in <Atom /> indicator cannot be processed. Using default instead!"));
      for (a3 = 0; a3 < Y.length; a3++) {
        e3 = I.r, t3 = I.g, l3 = I.b;
        r3[Y[a3]] = "".concat(e3, ", ").concat(t3, ", ").concat(l3);
      }
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b atom-rli-bounding-box", style: o(o(o(o(o({}, l2 && { fontSize: l2 }), c2 && { "--rli-animation-duration": c2 }), s2 && { "--rli-animation-function": s2 }), u2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b atom-indicator" }, import_react.default.createElement("span", { className: "rli-d-i-b electron-orbit" }), import_react.default.createElement("span", { className: "rli-d-i-b electron-orbit" }), import_react.default.createElement("span", { className: "rli-d-i-b electron-orbit" })), import_react.default.createElement(U, { className: "atom-text", staticText: true, text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor }));
};
r('.commet-rli-bounding-box {\n  --commet-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  width: 6.85em;\n  height: 6.85em;\n  overflow: hidden;\n  display: inline-block;\n  box-sizing: border-box;\n  position: relative;\n  isolation: isolate;\n}\n.commet-rli-bounding-box .commet-indicator {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  box-sizing: border-box;\n  width: 6em;\n  height: 6em;\n  color: var(--commet-phase1-color);\n  display: inline-block;\n  isolation: isolate;\n  position: absolute;\n  z-index: 0;\n  animation: calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, cubic-bezier(0.08, 0.03, 0.91, 0.93)) infinite uxlv7cp;\n}\n.commet-rli-bounding-box .commet-indicator .commet-box {\n  position: absolute;\n  display: inline-block;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  animation: uxlv7bx var(--rli-animation-duration, 1.2s) var(--rli-animation-function, cubic-bezier(0.08, 0.03, 0.91, 0.93)) infinite;\n}\n.commet-rli-bounding-box .commet-indicator .commet-box:nth-of-type(1) {\n  width: 100%;\n  height: 100%;\n  animation-direction: normal;\n}\n.commet-rli-bounding-box .commet-indicator .commet-box:nth-of-type(2) {\n  width: 70%;\n  height: 70%;\n  animation-direction: reverse;\n}\n.commet-rli-bounding-box .commet-indicator .commet-box .commetball-box {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  bottom: 0;\n  left: 0;\n  display: inline-block;\n}\n.commet-rli-bounding-box .commet-indicator .commet-box .commetball-box::before {\n  content: "";\n  width: 0.5em;\n  height: 0.5em;\n  border-radius: 50%;\n  background-color: currentColor;\n  position: absolute;\n  top: -0.125em;\n  left: 50%;\n  transform: translateX(-50%);\n  box-shadow: 0 0 0.2em 0em currentColor, 0 0 0.6em 0em currentColor;\n}\n.commet-rli-bounding-box .commet-indicator .commet-box .commet-trail {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  bottom: 0;\n  left: 0;\n  border-radius: 50%;\n  box-sizing: border-box;\n  border-style: solid;\n}\n.commet-rli-bounding-box .commet-indicator .commet-box .commet-trail.trail1 {\n  border-color: currentColor transparent transparent currentColor;\n  border-width: 0.25em 0.25em 0 0;\n  transform: rotateZ(-45deg);\n}\n.commet-rli-bounding-box .commet-indicator .commet-box .commet-trail.trail2 {\n  border-color: currentColor currentColor transparent transparent;\n  border-width: 0.25em 0 0 0.25em;\n  transform: rotateZ(45deg);\n}\n.commet-rli-bounding-box .commet-text {\n  mix-blend-mode: difference;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: var(--commet-phase1-color);\n}\n\n@property --commet-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --commet-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --commet-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --commet-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1.2s;\n}\n@keyframes uxlv7bx {\n  to {\n    transform: rotate(1turn);\n  }\n}\n@keyframes uxlv7cp {\n  100%, 0% {\n    color: var(--commet-phase1-color);\n  }\n  20% {\n    color: var(--commet-phase1-color);\n  }\n  25% {\n    color: var(--commet-phase2-color, var(--commet-phase1-color));\n  }\n  45% {\n    color: var(--commet-phase2-color, var(--commet-phase1-color));\n  }\n  50% {\n    color: var(--commet-phase3-color, var(--commet-phase1-color));\n  }\n  70% {\n    color: var(--commet-phase3-color, var(--commet-phase1-color));\n  }\n  75% {\n    color: var(--commet-phase4-color, var(--commet-phase1-color));\n  }\n  95% {\n    color: var(--commet-phase4-color, var(--commet-phase1-color));\n  }\n}');
var Z = Array.from({ length: 4 }, (function(n2, r2) {
  return "--commet-phase".concat(r2 + 1, "-color");
}));
var V = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1.2s").animationPeriod, c2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, Z.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) r3[Z[a3]] = o2[a3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var e3 = 0; e3 < Z.length; e3++) r3[Z[e3]] = n2;
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), " received in <Commet /> indicator cannot be processed. Using default instead!"));
      for (e3 = 0; e3 < Z.length; e3++) r3[Z[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b commet-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b commet-indicator" }, import_react.default.createElement("span", { className: "rli-d-i-b commet-box" }, import_react.default.createElement("span", { className: "rli-d-i-b commet-trail trail1" }), import_react.default.createElement("span", { className: "rli-d-i-b  commetball-box" })), import_react.default.createElement("span", { className: "rli-d-i-b commet-box" }, import_react.default.createElement("span", { className: "rli-d-i-b commet-trail trail2" }), import_react.default.createElement("span", { className: "rli-d-i-b commetball-box" })), import_react.default.createElement(U, { className: "commet-text", text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor })));
};
r('.OP-annulus-rli-bounding-box {\n  --OP-annulus-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  display: inline-block;\n}\n.OP-annulus-rli-bounding-box .OP-annulus-indicator {\n  width: 5em;\n  height: 5em;\n  color: var(--OP-annulus-phase1-color);\n  display: inline-block;\n  position: relative;\n  z-index: 0;\n}\n.OP-annulus-rli-bounding-box .OP-annulus-indicator .whirl {\n  animation: uxlv7n7 calc(var(--rli-animation-duration, 1.5s) * 1.33) linear infinite;\n  height: 100%;\n  transform-origin: center center;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n}\n.OP-annulus-rli-bounding-box .OP-annulus-indicator .path {\n  stroke-dasharray: 1, 125;\n  stroke-dashoffset: 0;\n  animation: var(--rli-animation-duration, 1.5s) var(--rli-animation-function, ease-in-out) infinite uxlv7oa, calc(var(--rli-animation-duration, 1.5s) * 4) var(--rli-animation-function, ease-in-out) infinite uxlv7p5;\n  stroke-linecap: round;\n}\n.OP-annulus-rli-bounding-box .OP-annulus-text {\n  mix-blend-mode: difference;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: -2;\n}\n\n@property --OP-annulus-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-annulus-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-annulus-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-annulus-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1.5s;\n}\n@keyframes uxlv7n7 {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes uxlv7oa {\n  0% {\n    stroke-dasharray: 1, 125;\n    stroke-dashoffset: 0;\n  }\n  50% {\n    stroke-dasharray: 98, 125;\n    stroke-dashoffset: -35px;\n  }\n  100% {\n    stroke-dasharray: 98, 125;\n    stroke-dashoffset: -124px;\n  }\n}\n@keyframes uxlv7p5 {\n  100%, 0% {\n    stroke: var(--OP-annulus-phase1-color);\n  }\n  22% {\n    stroke: var(--OP-annulus-phase1-color);\n  }\n  25% {\n    stroke: var(--OP-annulus-phase2-color, var(--OP-annulus-phase1-color));\n  }\n  42% {\n    stroke: var(--OP-annulus-phase2-color, var(--OP-annulus-phase1-color));\n  }\n  50% {\n    stroke: var(--OP-annulus-phase3-color, var(--OP-annulus-phase1-color));\n  }\n  72% {\n    stroke: var(--OP-annulus-phase3-color, var(--OP-annulus-phase1-color));\n  }\n  75% {\n    stroke: var(--OP-annulus-phase4-color, var(--OP-annulus-phase1-color));\n  }\n  97% {\n    stroke: var(--OP-annulus-phase4-color, var(--OP-annulus-phase1-color));\n  }\n}');
var $ = Array.from({ length: 4 }, (function(n2, r2) {
  return "--OP-annulus-phase".concat(r2 + 1, "-color");
}));
var G = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1.5s").animationPeriod, c2 = (function(n2) {
    var r3 = {}, o2 = $.length;
    if (n2 instanceof Array) {
      for (var a3 = j(n2, o2), e3 = 0; e3 < a3.length && !(e3 >= 4); e3++) r3[$[e3]] = a3[e3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var t3 = 0; t3 < o2; t3++) r3[$[t3]] = n2;
    } catch (a4) {
      a4 instanceof Error ? console.warn("[".concat(a4.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), ' received in <OrbitProgress variant="disc" /> indicator cannot be processed. Using default instead!'));
      for (t3 = 0; t3 < o2; t3++) r3[$[t3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : ""), u2 = (null == r2 ? void 0 : r2.dense) ? 4.3 : 2.9;
  return import_react.default.createElement("span", { className: "rli-d-i-b OP-annulus-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b OP-annulus-indicator" }, import_react.default.createElement("svg", { className: "whirl", viewBox: "25 25 50 50" }, import_react.default.createElement("circle", { className: "path", cx: "50", cy: "50", r: "20", fill: "none", strokeWidth: u2, strokeMiterlimit: "10" })), import_react.default.createElement(U, { className: "OP-annulus-text", text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor })));
};
function W(n2) {
  return n2 && n2.Math === Math && n2;
}
r('.OP-dotted-rli-bounding-box {\n  --OP-dotted-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  box-sizing: border-box;\n  display: inline-block;\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator {\n  width: 5em;\n  height: 5em;\n  color: var(--OP-dotted-phase1-color);\n  display: inline-block;\n  position: relative;\n  z-index: 0;\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .OP-dotted-text {\n  mix-blend-mode: difference;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: -2;\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder .dot {\n  display: block;\n  margin: 0 auto;\n  width: 15%;\n  height: 15%;\n  background-color: currentColor;\n  border-radius: 50%;\n  animation: var(--rli-animation-duration, 1.2s) var(--rli-animation-function, ease-in-out) infinite uxlv7nu, calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, ease-in-out) infinite uxlv7ol;\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(1) {\n  transform: rotate(0deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(1) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 12 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(2) {\n  transform: rotate(30deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(2) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 11 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(3) {\n  transform: rotate(60deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(3) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 10 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(4) {\n  transform: rotate(90deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(4) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 9 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(5) {\n  transform: rotate(120deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(5) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 8 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(6) {\n  transform: rotate(150deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(6) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 7 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(7) {\n  transform: rotate(180deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(7) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 6 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(8) {\n  transform: rotate(210deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(8) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 5 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(9) {\n  transform: rotate(240deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(9) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 4 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(10) {\n  transform: rotate(270deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(10) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 3 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(11) {\n  transform: rotate(300deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(11) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 2 * -1);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(12) {\n  transform: rotate(330deg);\n}\n.OP-dotted-rli-bounding-box .OP-dotted-indicator .dot-shape-holder:nth-of-type(12) .dot {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) / 12 * 1 * -1);\n}\n\n@property --OP-dotted-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-dotted-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-dotted-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-dotted-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1.2s;\n}\n@keyframes uxlv7nu {\n  0%, 39%, 100% {\n    opacity: 0;\n  }\n  40% {\n    opacity: 1;\n  }\n}\n@keyframes uxlv7ol {\n  100%, 0% {\n    background-color: var(--OP-dotted-phase1-color);\n  }\n  22% {\n    background-color: var(--OP-dotted-phase1-color);\n  }\n  25% {\n    background-color: var(--OP-dotted-phase2-color, var(--OP-dotted-phase1-color));\n  }\n  47% {\n    background-color: var(--OP-dotted-phase2-color, var(--OP-dotted-phase1-color));\n  }\n  50% {\n    background-color: var(--OP-dotted-phase3-color, var(--OP-dotted-phase1-color));\n  }\n  72% {\n    background-color: var(--OP-dotted-phase3-color, var(--OP-dotted-phase1-color));\n  }\n  75% {\n    background-color: var(--OP-dotted-phase4-color, var(--OP-dotted-phase1-color));\n  }\n  97% {\n    background-color: var(--OP-dotted-phase4-color, var(--OP-dotted-phase1-color));\n  }\n}');
var K = W("object" == typeof window && window) || W("object" == typeof self && self) || W("object" == typeof global && global) || /* @__PURE__ */ (function() {
  return this;
})() || Function("return this")();
function Q() {
  var n2, r2;
  return (null === (n2 = null == K ? void 0 : K.crypto) || void 0 === n2 ? void 0 : n2.randomUUID) ? K.crypto.randomUUID() : (null === (r2 = null == K ? void 0 : K.btoa) || void 0 === r2 ? void 0 : r2.name) ? K.btoa(new Date(Math.ceil(1e13 * Math.random())).getTime() + "") : Date.now().toString(36) + Math.random().toString(36).substring(0);
}
var nn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--OP-dotted-phase".concat(r2 + 1, "-color");
}));
var rn = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1.2s").animationPeriod, c2 = (function(n2) {
    var r3 = {}, o2 = nn.length;
    if (n2 instanceof Array) {
      for (var a3 = j(n2, o2), e3 = 0; e3 < a3.length && !(e3 >= 4); e3++) r3[nn[e3]] = a3[e3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var t3 = 0; t3 < o2; t3++) r3[nn[t3]] = n2;
    } catch (a4) {
      a4 instanceof Error ? console.warn("[".concat(a4.message, ']: Received "').concat(typeof n2, '" with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), ' received in <OrbitProgress variant="dotted" /> indicator cannot be processed. Using default instead!'));
      for (t3 = 0; t3 < o2; t3++) r3[nn[t3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : ""), u2 = (null == r2 ? void 0 : r2.dense) ? 16 : 12;
  return import_react.default.createElement("span", { className: "rli-d-i-b OP-dotted-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b OP-dotted-indicator" }, Array.from({ length: u2 }).map((function(r3, o2) {
    var a3 = (function(n2, r4, o3) {
      if (16 === r4) {
        var a4 = 360 * n2 / r4, e4 = r4 - n2, t4 = Number.parseFloat(o3) / r4 * e4 * -1;
        return { transform: "rotate(".concat(a4, "deg)"), animationDelay: "".concat(t4, "s") };
      }
      return { transform: "", animationDelay: "" };
    })(o2, u2, s2), e3 = a3.animationDelay, t3 = a3.transform;
    return import_react.default.createElement("span", { key: Q(), className: "rli-d-i-b dot-shape-holder", style: t3 ? { transform: t3 } : void 0 }, import_react.default.createElement("span", { className: "dot", style: e3 ? { animationDelay: e3 } : void 0 }));
  })), import_react.default.createElement(U, { className: "OP-dotted-text", text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor })));
};
r('.OP-spokes-rli-bounding-box {\n  --OP-spokes-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  position: relative;\n  color: var(--OP-spokes-phase1-color);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator {\n  width: 4.8em;\n  height: 4.8em;\n  display: block;\n  position: relative;\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke {\n  position: absolute;\n  height: 1.2em;\n  width: 0.4em;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto auto auto 50%;\n  background-color: var(--OP-spokes-phase1-color);\n  border-radius: 0.24em;\n  opacity: 0;\n  animation: var(--rli-animation-duration, 1.2s) var(--rli-animation-function, ease-in-out) backwards infinite uxlv7pw, calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, ease-in-out) infinite uxlv7qn;\n  transform-origin: left center;\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(1) {\n  transform: rotate(calc(0 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(11 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(2) {\n  transform: rotate(calc(1 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(10 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(3) {\n  transform: rotate(calc(2 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(9 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(4) {\n  transform: rotate(calc(3 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(8 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(5) {\n  transform: rotate(calc(4 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(7 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(6) {\n  transform: rotate(calc(5 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(6 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(7) {\n  transform: rotate(calc(6 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(5 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(8) {\n  transform: rotate(calc(7 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(4 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(9) {\n  transform: rotate(calc(8 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(3 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(10) {\n  transform: rotate(calc(9 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(2 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(11) {\n  transform: rotate(calc(10 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(1 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator .spoke:nth-of-type(12) {\n  transform: rotate(calc(11 * 360deg / 12)) translate(-50%, -1.56em);\n  animation-delay: calc(0 * var(--rli-animation-duration, 1.2s) / 12 * -1);\n}\n.OP-spokes-rli-bounding-box .OP-spokes-indicator-text {\n  mix-blend-mode: difference;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: var(--OP-spokes-phase1-color);\n  z-index: -2;\n}\n\n@property --OP-spokes-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-spokes-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-spokes-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-spokes-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1.2s;\n}\n@keyframes uxlv7pw {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes uxlv7qn {\n  100%, 0% {\n    background-color: var(--OP-spokes-phase1-color);\n  }\n  22% {\n    background-color: var(--OP-spokes-phase1-color);\n  }\n  25% {\n    background-color: var(--OP-spokes-phase2-color, var(--OP-spokes-phase1-color));\n  }\n  42% {\n    background-color: var(--OP-spokes-phase2-color, var(--OP-spokes-phase1-color));\n  }\n  50% {\n    background-color: var(--OP-spokes-phase3-color, var(--OP-spokes-phase1-color));\n  }\n  72% {\n    background-color: var(--OP-spokes-phase3-color, var(--OP-spokes-phase1-color));\n  }\n  75% {\n    background-color: var(--OP-spokes-phase4-color, var(--OP-spokes-phase1-color));\n  }\n  97% {\n    background-color: var(--OP-spokes-phase4-color, var(--OP-spokes-phase1-color));\n  }\n}');
var on = Array.from({ length: 4 }, (function(n2, r2) {
  return "--OP-spokes-phase".concat(r2 + 1, "-color");
}));
var an = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1.2s").animationPeriod, c2 = (function(n2) {
    var r3 = {}, o2 = on.length;
    if (n2 instanceof Array) {
      for (var a3 = j(n2, o2), e3 = 0; e3 < a3.length && !(e3 >= 4); e3++) r3[on[e3]] = a3[e3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var t3 = 0; t3 < o2; t3++) r3[on[t3]] = n2;
    } catch (a4) {
      a4 instanceof Error ? console.warn("[".concat(a4.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), ' received in <OrbitProgress variant="spokes" /> indicator cannot be processed. Using default instead!'));
      for (t3 = 0; t3 < o2; t3++) r3[on[t3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : ""), u2 = (null == r2 ? void 0 : r2.dense) ? 16 : 12;
  return import_react.default.createElement("span", { className: "rli-d-i-b OP-spokes-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b OP-spokes-indicator" }, Array.from({ length: u2 }, (function(r3, o2) {
    return import_react.default.createElement("span", { key: Q(), className: "rli-d-i-b spoke", style: en(o2, u2, s2) });
  }))), import_react.default.createElement(U, { text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor }));
};
function en(n2, r2, o2) {
  if (16 === r2) {
    var a2 = r2 - n2, e2 = Number.parseFloat(o2) / r2;
    return { transform: "rotate(".concat(360 * n2 / r2, "deg) translate(-50%, ").concat("-1.56em", ")"), animationDelay: "".concat((a2 - 1) * e2 * -1, "s") };
  }
}
r('.OP-annulus-dual-sectors-rli-bounding-box {\n  --OP-annulus-dual-sectors-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  box-sizing: border-box;\n  display: inline-block;\n}\n.OP-annulus-dual-sectors-rli-bounding-box .OP-annulus-dual-sectors-indicator {\n  width: 5em;\n  height: 5em;\n  display: inline-block;\n  position: relative;\n  z-index: 0;\n  color: var(--OP-annulus-dual-sectors-phase1-color);\n}\n.OP-annulus-dual-sectors-rli-bounding-box .OP-annulus-dual-sectors-indicator .annulus-sectors {\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  border-width: 0.34em;\n  border-style: solid;\n  border-color: var(--OP-annulus-dual-sectors-phase1-color) transparent var(--OP-annulus-dual-sectors-phase1-color) transparent;\n  background-color: transparent;\n  animation: var(--rli-animation-duration, 1.2s) var(--rli-animation-function, linear) infinite uxlv7ra, calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, linear) infinite uxlv7sv;\n}\n.OP-annulus-dual-sectors-rli-bounding-box .OP-annulus-dual-sectors-indicator .OP-annulus-dual-sectors-text {\n  mix-blend-mode: difference;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: -2;\n}\n\n@property --OP-annulus-dual-sectors-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-annulus-dual-sectors-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-annulus-dual-sectors-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-annulus-dual-sectors-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1.2s;\n}\n@keyframes uxlv7ra {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes uxlv7sv {\n  100%, 0% {\n    border-color: var(--OP-annulus-dual-sectors-phase1-color) transparent;\n  }\n  20% {\n    border-color: var(--OP-annulus-dual-sectors-phase1-color) transparent;\n  }\n  25% {\n    border-color: var(--OP-annulus-dual-sectors-phase2-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;\n  }\n  45% {\n    border-color: var(--OP-annulus-dual-sectors-phase2-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;\n  }\n  50% {\n    border-color: var(--OP-annulus-dual-sectors-phase3-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;\n  }\n  70% {\n    border-color: var(--OP-annulus-dual-sectors-phase3-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;\n  }\n  75% {\n    border-color: var(--OP-annulus-dual-sectors-phase4-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;\n  }\n  95% {\n    border-color: var(--OP-annulus-dual-sectors-phase4-color, var(--OP-annulus-dual-sectors-phase1-color)) transparent;\n  }\n}');
var tn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--OP-annulus-dual-sectors-phase".concat(r2 + 1, "-color");
}));
var ln = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1.2s").animationPeriod, c2 = (function(n2) {
    var r3 = {}, o2 = tn.length;
    if (n2 instanceof Array) {
      for (var a3 = j(n2, o2), e3 = 0; e3 < a3.length && !(e3 >= 4); e3++) r3[tn[e3]] = a3[e3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var t3 = 0; t3 < o2; t3++) r3[tn[t3]] = n2;
    } catch (a4) {
      a4 instanceof Error ? console.warn("[".concat(a4.message, ']: Received "').concat(typeof n2, '" with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), ' received in <OrbitProgress variant="annulus-splits" /> indicator cannot be processed. Using default instead!'));
      for (t3 = 0; t3 < o2; t3++) r3[tn[t3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : ""), u2 = r2.dense ? "0.45em" : "";
  return import_react.default.createElement("span", { className: "rli-d-i-b OP-annulus-dual-sectors-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b OP-annulus-dual-sectors-indicator" }, import_react.default.createElement("span", { className: "rli-d-i-b annulus-sectors", style: o({}, u2 && { borderWidth: u2 }) }), import_react.default.createElement(U, { className: "OP-annulus-dual-sectors-text", text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor })));
};
r('.OP-annulus-sector-track-rli-bounding-box {\n  --OP-annulus-track-phase1-color: rgba(50, 205, 50, 0.22);\n  --OP-annulus-sector-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  display: inline-block;\n}\n.OP-annulus-sector-track-rli-bounding-box .OP-annulus-sector-track-indicator {\n  width: 5em;\n  height: 5em;\n  color: var(--OP-annulus-sector-phase1-color);\n  display: inline-block;\n  position: relative;\n  z-index: 0;\n}\n.OP-annulus-sector-track-rli-bounding-box .OP-annulus-sector-track-indicator .annulus-track-ring {\n  width: 100%;\n  height: 100%;\n  border-width: 0.34em;\n  border-style: solid;\n  border-radius: 50%;\n  box-sizing: border-box;\n  border-color: var(--OP-annulus-track-phase1-color);\n  border-top-color: var(--OP-annulus-sector-phase1-color);\n  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, linear) infinite uxlv7rl, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, linear) infinite uxlv7tf;\n}\n.OP-annulus-sector-track-rli-bounding-box .OP-annulus-sector-track-indicator .OP-annulus-sector-text {\n  mix-blend-mode: difference;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: -2;\n}\n\n@property --OP-annulus-track-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgba(50, 205, 50, 0.22);\n}\n@property --OP-annulus-track-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgba(50, 205, 50, 0.22);\n}\n@property --OP-annulus-track-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgba(50, 205, 50, 0.22);\n}\n@property --OP-annulus-track-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgba(50, 205, 50, 0.22);\n}\n@property --OP-annulus-sector-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-annulus-sector-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-annulus-sector-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --OP-annulus-sector-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1s;\n}\n@keyframes uxlv7rl {\n  to {\n    transform: rotate(1turn);\n  }\n}\n@keyframes uxlv7tf {\n  100%, 0% {\n    border-color: var(--OP-annulus-track-phase1-color);\n    border-top-color: var(--OP-annulus-sector-phase1-color);\n  }\n  18% {\n    border-color: var(--OP-annulus-track-phase1-color);\n    border-top-color: var(--OP-annulus-sector-phase1-color);\n  }\n  25% {\n    border-color: var(--OP-annulus-track-phase2-color, var(--OP-annulus-track-phase1-color));\n    border-top-color: var(--OP-annulus-sector-phase2-color, var(--OP-annulus-sector-phase1-color));\n  }\n  43% {\n    border-color: var(--OP-annulus-track-phase2-color, var(--OP-annulus-track-phase1-color));\n    border-top-color: var(--OP-annulus-sector-phase2-color, var(--OP-annulus-sector-phase1-color));\n  }\n  50% {\n    border-color: var(--OP-annulus-track-phase3-color, var(--OP-annulus-track-phase1-color));\n    border-top-color: var(--OP-annulus-sector-phase3-color, var(--OP-annulus-sector-phase1-color));\n  }\n  68% {\n    border-color: var(--OP-annulus-track-phase3-color, var(--OP-annulus-track-phase1-color));\n    border-top-color: var(--OP-annulus-sector-phase3-color, var(--OP-annulus-sector-phase1-color));\n  }\n  75% {\n    border-color: var(--OP-annulus-track-phase4-color, var(--OP-annulus-track-phase1-color));\n    border-top-color: var(--OP-annulus-sector-phase4-color, var(--OP-annulus-sector-phase1-color));\n  }\n  93% {\n    border-color: var(--OP-annulus-track-phase4-color, var(--OP-annulus-track-phase1-color));\n    border-top-color: var(--OP-annulus-sector-phase4-color, var(--OP-annulus-sector-phase1-color));\n  }\n}');
var sn = Array.from({ length: 4 }, (function(n2, r2) {
  return ["--OP-annulus-track-phase".concat(r2 + 1, "-color"), "--OP-annulus-sector-phase".concat(r2 + 1, "-color")];
}));
var cn = function(n2) {
  return void 0 === n2 && (n2 = 1), 0.25 * n2;
};
var un = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, l2 = e2.fontSize, s2 = null == r2 ? void 0 : r2.easing, c2 = F(null == r2 ? void 0 : r2.speedPlus, "1s").animationPeriod, u2 = (function(n2) {
    var r3 = {}, o2 = sn.length;
    if (n2 instanceof Array) {
      for (var a3 = j(n2, o2), e3 = 0; e3 < a3.length && !(e3 >= 4); e3++) {
        var t3 = sn[e3];
        try {
          if (!(c3 = i(a3[e3])).isValid()) throw new Error("Invalid Color: ".concat(c3.getOriginalInput()));
          var l3 = c3.setAlpha(cn(c3.getAlpha())).toRgbString(), s3 = a3[e3];
          r3[t3[0]] = l3, r3[t3[1]] = s3;
        } catch (n3) {
          s3 = X, l3 = (c3 = i(X)).setAlpha(cn(c3.getAlpha())).toRgbString();
          r3[t3[0]] = l3, r3[t3[1]] = s3;
        }
      }
      return r3;
    }
    try {
      var c3 = i(n2);
      if ("string" != typeof n2) throw new Error("Color String expected");
      if (!c3.isValid()) throw new Error("Invalid Color: ".concat(c3.getOriginalInput()));
      s3 = n2, l3 = c3.setAlpha(cn(c3.getAlpha())).toRgbString();
      for (var u3 = 0; u3 < o2; u3++) {
        r3[(t3 = sn[u3])[0]] = l3, r3[t3[1]] = s3;
      }
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), ' received in <OrbitProgress variant="annulus-track" /> indicator cannot be processed. Using default instead!'));
      for (s3 = X, l3 = (c3 = i(X)).setAlpha(cn(c3.getAlpha())).toRgbString(), u3 = 0; u3 < sn.length; u3++) {
        r3[(t3 = sn[u3])[0]] = l3, r3[t3[1]] = s3;
      }
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : ""), d2 = r2.dense ? "0.45em" : "";
  return import_react.default.createElement("span", { className: "rli-d-i-b OP-annulus-sector-track-rli-bounding-box", style: o(o(o(o(o({}, l2 && { fontSize: l2 }), c2 && { "--rli-animation-duration": c2 }), s2 && { "--rli-animation-function": s2 }), u2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b OP-annulus-sector-track-indicator" }, import_react.default.createElement("span", { className: "rli-d-i-b annulus-track-ring", style: o({}, d2 && { borderWidth: d2 }) }), import_react.default.createElement(U, { className: "OP-annulus-sector-text", text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor })));
};
var dn = function(r2) {
  var a2 = Object(r2).variant, e2 = void 0 === a2 ? "disc" : a2;
  return "dotted" === e2 ? import_react.default.createElement(rn, o({}, r2)) : "spokes" === e2 ? import_react.default.createElement(an, o({}, r2)) : "disc" === e2 ? import_react.default.createElement(G, o({}, r2)) : "split-disc" === e2 ? import_react.default.createElement(ln, o({}, r2)) : "track-disc" === e2 ? import_react.default.createElement(un, o({}, r2)) : null;
};
r('.foursquare-rli-bounding-box {\n  --four-square-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  box-sizing: border-box;\n  color: var(--four-square-phase1-color);\n  display: inline-block;\n  overflow: hidden;\n}\n.foursquare-rli-bounding-box .foursquare-indicator {\n  height: 5.3033008589em;\n  width: 5.3033008589em;\n  position: relative;\n  display: block;\n}\n.foursquare-rli-bounding-box .foursquare-indicator .squares-container {\n  position: absolute;\n  z-index: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  height: 2.5em;\n  width: 2.5em;\n  color: inherit;\n  will-change: color, width, height;\n  transform: rotate(45deg);\n  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, cubic-bezier(0.05, 0.28, 0.79, 0.98)) infinite uxlv7dk, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, cubic-bezier(0.05, 0.28, 0.79, 0.98)) infinite uxlv7es;\n}\n.foursquare-rli-bounding-box .foursquare-indicator .squares-container .square {\n  position: absolute;\n  width: 1.25em;\n  height: 1.25em;\n  border-radius: 0.1875em;\n  background-color: currentColor;\n  animation: uxlv7dd var(--rli-animation-duration, 1s) var(--rli-animation-function, cubic-bezier(0.05, 0.28, 0.79, 0.98)) both infinite;\n}\n.foursquare-rli-bounding-box .foursquare-indicator .squares-container .square.square1 {\n  top: 0;\n  left: 0;\n}\n.foursquare-rli-bounding-box .foursquare-indicator .squares-container .square.square2 {\n  top: 0;\n  right: 0;\n}\n.foursquare-rli-bounding-box .foursquare-indicator .squares-container .square.square3 {\n  bottom: 0;\n  left: 0;\n}\n.foursquare-rli-bounding-box .foursquare-indicator .squares-container .square.square4 {\n  bottom: 0;\n  right: 0;\n}\n\n@property --four-square-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --four-square-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --four-square-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --four-square-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1s;\n}\n@keyframes uxlv7dk {\n  0% {\n    width: 2.5em;\n    height: 2.5em;\n  }\n  10% {\n    width: 2.5em;\n    height: 2.5em;\n  }\n  50% {\n    width: 3.75em;\n    height: 3.75em;\n  }\n  90% {\n    width: 2.5em;\n    height: 2.5em;\n  }\n  100% {\n    width: 2.5em;\n    height: 2.5em;\n  }\n}\n@keyframes uxlv7dd {\n  0% {\n    transform: rotateZ(0deg);\n  }\n  10% {\n    transform: rotateZ(0deg);\n  }\n  50% {\n    transform: rotateZ(90deg);\n  }\n  90% {\n    transform: rotateZ(90deg);\n  }\n  100% {\n    transform: rotateZ(90deg);\n  }\n}\n@keyframes uxlv7es {\n  100%, 0% {\n    color: var(--four-square-phase1-color);\n  }\n  20% {\n    color: var(--four-square-phase1-color);\n  }\n  25% {\n    color: var(--four-square-phase2-color, var(--four-square-phase1-color));\n  }\n  45% {\n    color: var(--four-square-phase2-color, var(--four-square-phase1-color));\n  }\n  50% {\n    color: var(--four-square-phase3-color, var(--four-square-phase1-color));\n  }\n  70% {\n    color: var(--four-square-phase3-color, var(--four-square-phase1-color));\n  }\n  75% {\n    color: var(--four-square-phase4-color, var(--four-square-phase1-color));\n  }\n  95% {\n    color: var(--four-square-phase4-color, var(--four-square-phase1-color));\n  }\n}');
var pn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--four-square-phase".concat(r2 + 1, "-color");
}));
var bn = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1s").animationPeriod, c2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, pn.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) r3[pn[a3]] = o2[a3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var e3 = 0; e3 < pn.length; e3++) r3[pn[e3]] = n2;
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), " received in <FourSquare /> indicator cannot be processed. Using default instead!"));
      for (e3 = 0; e3 < pn.length; e3++) r3[pn[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b foursquare-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b foursquare-indicator" }, import_react.default.createElement("span", { className: "squares-container" }, import_react.default.createElement("span", { className: "square square1" }), import_react.default.createElement("span", { className: "square square2" }), import_react.default.createElement("span", { className: "square square3" }), import_react.default.createElement("span", { className: "square square4" }))), import_react.default.createElement(U, { text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor, staticText: true }));
};
r('.mosaic-rli-bounding-box {\n  --mosaic-phase1-color: rgb(50, 205, 50);\n  box-sizing: border-box;\n  font-size: 16px;\n  color: var(--mosaic-phase1-color);\n}\n.mosaic-rli-bounding-box .mosaic-indicator {\n  width: 5em;\n  height: 5em;\n  color: currentColor;\n  display: grid;\n  gap: 0.125em;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-areas: "a b c" "d e f" "g h i";\n  position: relative;\n  z-index: 0;\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube-text {\n  mix-blend-mode: difference;\n  position: absolute;\n  top: 105%;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: -2;\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube {\n  background-color: var(--mosaic-phase1-color);\n  animation-name: uxlv7i4, uxlv7is;\n  animation-duration: var(--rli-animation-duration, 1.5s), calc(var(--rli-animation-duration, 1.5s) * 4);\n  animation-timing-function: var(--rli-animation-function, ease-in-out);\n  animation-iteration-count: infinite;\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube1 {\n  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 2);\n  grid-area: a;\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube2 {\n  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 3);\n  grid-area: b;\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube3 {\n  grid-area: c;\n  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 4);\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube4 {\n  grid-area: d;\n  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 1);\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube5 {\n  grid-area: e;\n  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 2);\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube6 {\n  grid-area: f;\n  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 3);\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube7 {\n  grid-area: g;\n  animation-delay: 0s;\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube8 {\n  grid-area: h;\n  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 1);\n}\n.mosaic-rli-bounding-box .mosaic-indicator .mosaic-cube9 {\n  grid-area: i;\n  animation-delay: calc(var(--mosaic-skip-interval, 0.1s) * 2);\n}\n\n@property --mosaic-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --mosaic-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --mosaic-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --mosaic-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1.5s;\n}\n@keyframes uxlv7i4 {\n  0%, 60%, 100% {\n    transform: scale3D(1, 1, 1);\n  }\n  30% {\n    transform: scale3D(0, 0, 1);\n  }\n}\n@keyframes uxlv7is {\n  100%, 0% {\n    background-color: var(--mosaic-phase1-color);\n  }\n  25% {\n    background-color: var(--mosaic-phase2-color, var(--mosaic-phase1-color));\n  }\n  50% {\n    background-color: var(--mosaic-phase3-color, var(--mosaic-phase1-color));\n  }\n  75% {\n    background-color: var(--mosaic-phase4-color, var(--mosaic-phase1-color));\n  }\n}');
var hn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--mosaic-phase".concat(r2 + 1, "-color");
}));
var mn = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1.5s").animationPeriod, c2 = Math.round(parseFloat(s2) / 9 * 100) / 100;
  c2 += "s";
  var u2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, hn.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) r3[hn[a3]] = o2[a3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var e3 = 0; e3 < hn.length; e3++) r3[hn[e3]] = n2;
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), " received in <Mosaic /> indicator cannot be processed. Using default instead!"));
      for (e3 = 0; e3 < hn.length; e3++) r3[hn[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b  mosaic-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), u2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b mosaic-indicator", style: o({}, c2 && { "--mosaic-skip-interval": c2 }) }, import_react.default.createElement("span", { className: "rli-d-i-b mosaic-cube mosaic-cube1" }), import_react.default.createElement("span", { className: "rli-d-i-b mosaic-cube mosaic-cube2" }), import_react.default.createElement("span", { className: "rli-d-i-b mosaic-cube mosaic-cube3" }), import_react.default.createElement("span", { className: "rli-d-i-b mosaic-cube mosaic-cube4" }), import_react.default.createElement("span", { className: "rli-d-i-b mosaic-cube mosaic-cube5" }), import_react.default.createElement("span", { className: "rli-d-i-b mosaic-cube mosaic-cube6" }), import_react.default.createElement("span", { className: "rli-d-i-b mosaic-cube mosaic-cube7" }), import_react.default.createElement("span", { className: "rli-d-i-b mosaic-cube mosaic-cube8" }), import_react.default.createElement("span", { className: "rli-d-i-b mosaic-cube mosaic-cube9" })), import_react.default.createElement(U, { staticText: true, text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor }));
};
r('.riple-rli-bounding-box {\n  --riple-phase1-color: rgb(50, 205, 50);\n  box-sizing: border-box;\n  font-size: 16px;\n  display: inline-block;\n  color: var(--riple-phase1-color);\n}\n.riple-rli-bounding-box .riple-indicator {\n  display: inline-block;\n  width: 5em;\n  height: 5em;\n  position: relative;\n  z-index: 0;\n}\n.riple-rli-bounding-box .riple-indicator .riple-text {\n  mix-blend-mode: difference;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: -2;\n}\n.riple-rli-bounding-box .riple-indicator .riple {\n  --border-width: 0.25em;\n  position: absolute;\n  border: var(--border-width) solid var(--riple-phase1-color);\n  opacity: 1;\n  border-radius: 50%;\n  will-change: top, right, left, bottom, border-color;\n  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, cubic-bezier(0, 0.2, 0.8, 1)) infinite uxlv7i1, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, cubic-bezier(0, 0.2, 0.8, 1)) infinite uxlv7io;\n}\n.riple-rli-bounding-box .riple-indicator .riple:nth-of-type(2) {\n  animation-delay: calc(var(--rli-animation-duration, 1s) / 2 * -1);\n}\n\n@property --riple-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --riple-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --riple-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --riple-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1s;\n}\n@keyframes uxlv7i1 {\n  0% {\n    top: calc(50% - var(--border-width));\n    left: calc(50% - var(--border-width));\n    right: calc(50% - var(--border-width));\n    bottom: calc(50% - var(--border-width));\n    opacity: 0;\n  }\n  4.9% {\n    top: calc(50% - var(--border-width));\n    left: calc(50% - var(--border-width));\n    right: calc(50% - var(--border-width));\n    bottom: calc(50% - var(--border-width));\n    opacity: 0;\n  }\n  5% {\n    top: calc(50% - var(--border-width));\n    left: calc(50% - var(--border-width));\n    right: calc(50% - var(--border-width));\n    bottom: calc(50% - var(--border-width));\n    opacity: 1;\n  }\n  100% {\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    opacity: 0;\n  }\n}\n@keyframes uxlv7io {\n  100%, 0% {\n    border-color: var(--riple-phase1-color);\n  }\n  24.9% {\n    border-color: var(--riple-phase1-color);\n  }\n  25% {\n    border-color: var(--riple-phase2-color, var(--riple-phase1-color));\n  }\n  49.9% {\n    border-color: var(--riple-phase2-color, var(--riple-phase1-color));\n  }\n  50% {\n    border-color: var(--riple-phase3-color, var(--riple-phase1-color));\n  }\n  74.9% {\n    border-color: var(--riple-phase3-color, var(--riple-phase1-color));\n  }\n  75% {\n    border-color: var(--riple-phase4-color, var(--riple-phase1-color));\n  }\n  99.9% {\n    border-color: var(--riple-phase4-color, var(--riple-phase1-color));\n  }\n}');
var gn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--riple-phase".concat(r2 + 1, "-color");
}));
var fn = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1s").animationPeriod, c2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, gn.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) r3[gn[a3]] = o2[a3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var e3 = 0; e3 < gn.length; e3++) r3[gn[e3]] = n2;
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), " received in <Riple /> indicator cannot be processed. Using default instead!"));
      for (e3 = 0; e3 < gn.length; e3++) r3[gn[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b riple-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b riple-indicator" }, import_react.default.createElement("span", { className: "rli-d-i-b riple" }), import_react.default.createElement("span", { className: "rli-d-i-b riple" }), import_react.default.createElement(U, { className: "riple-text", text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor })));
};
r('.pulsate-rli-bounding-box {\n  --TD-pulsate-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  display: inline-block;\n  box-sizing: border-box;\n  color: var(--TD-pulsate-phase1-color);\n}\n.pulsate-rli-bounding-box .pulsate-indicator {\n  width: 4.4em;\n  height: 1.1em;\n  text-align: center;\n  position: relative;\n  z-index: 0;\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: nowrap;\n  align-items: center;\n}\n.pulsate-rli-bounding-box .pulsate-indicator .pulsate-dot {\n  width: 1.1em;\n  height: 1.1em;\n  border-radius: 50%;\n  background-color: var(--TD-pulsate-phase1-color);\n  transform: scale(0);\n  animation: var(--rli-animation-duration, 1.2s) var(--rli-animation-function, ease-in-out) var(--delay) infinite uxlv7s0, calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, ease-in-out) var(--delay) infinite uxlv7to;\n}\n.pulsate-rli-bounding-box .pulsate-indicator .pulsate-dot:nth-of-type(1) {\n  --delay: calc(var(--rli-animation-duration, 1.2s) * 0.15 * -1);\n}\n.pulsate-rli-bounding-box .pulsate-indicator .pulsate-dot:nth-of-type(2) {\n  --delay: calc(var(--rli-animation-duration, 1.2s) * 0);\n}\n.pulsate-rli-bounding-box .pulsate-indicator .pulsate-dot:nth-of-type(3) {\n  --delay: calc(var(--rli-animation-duration, 1.2s) * 0.15);\n}\n.pulsate-rli-bounding-box .pulsate-text {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 80%;\n  text-transform: uppercase;\n  text-align: center;\n  font-size: 0.6em;\n  letter-spacing: 0.5px;\n  font-family: sans-serif;\n  mix-blend-mode: difference;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: -2;\n}\n\n@property --TD-pulsate-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-pulsate-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-pulsate-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-pulsate-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1.2s;\n}\n@keyframes uxlv7s0 {\n  0%, 90%, 100% {\n    transform: scale(0);\n  }\n  40% {\n    transform: scale(1);\n  }\n}\n@keyframes uxlv7to {\n  0%, 100% {\n    background-color: var(--TD-pulsate-phase1-color);\n  }\n  24.9% {\n    background-color: var(--TD-pulsate-phase1-color);\n  }\n  25% {\n    background-color: var(--TD-pulsate-phase2-color, var(--TD-pulsate-phase1-color));\n  }\n  49.9% {\n    background-color: var(--TD-pulsate-phase2-color, var(--TD-pulsate-phase1-color));\n  }\n  50% {\n    background-color: var(--TD-pulsate-phase3-color, var(--TD-pulsate-phase1-color));\n  }\n  74.9% {\n    background-color: var(--TD-pulsate-phase3-color, var(--TD-pulsate-phase1-color));\n  }\n  75% {\n    background-color: var(--TD-pulsate-phase4-color, var(--TD-pulsate-phase1-color));\n  }\n  99.9% {\n    background-color: var(--TD-pulsate-phase4-color, var(--TD-pulsate-phase1-color));\n  }\n}');
var vn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--TD-pulsate-phase".concat(r2 + 1, "-color");
}));
var yn = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1.2s").animationPeriod, c2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, vn.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) r3[vn[a3]] = o2[a3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var e3 = 0; e3 < vn.length; e3++) r3[vn[e3]] = n2;
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), ' received in <ThreeDot variant="pulsate" /> indicator cannot be processed. Using default instead!'));
      for (e3 = 0; e3 < vn.length; e3++) r3[vn[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b pulsate-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b pulsate-indicator" }, import_react.default.createElement("span", { className: "rli-d-i-b pulsate-dot" }), import_react.default.createElement("span", { className: "rli-d-i-b pulsate-dot" }), import_react.default.createElement("span", { className: "rli-d-i-b pulsate-dot" })), import_react.default.createElement(U, { staticText: true, text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor }));
};
r('.brick-stack-rli-bounding-box {\n  --TD-brick-stack-phase1-color: rgb(50, 205, 50);\n  box-sizing: border-box;\n  font-size: 16px;\n  display: inline-block;\n  color: var(--TD-brick-stack-phase1-color);\n}\n.brick-stack-rli-bounding-box .brick-stack-indicator {\n  width: 2.8em;\n  height: 2.8em;\n  position: relative;\n  display: block;\n  margin: 0 auto;\n}\n.brick-stack-rli-bounding-box .brick-stack {\n  width: 100%;\n  height: 100%;\n  background: radial-gradient(circle closest-side, currentColor 0% 95%, rgba(0, 0, 0, 0) calc(95% + 1px)) 0 0/40% 40% no-repeat, radial-gradient(circle closest-side, currentColor 0% 95%, rgba(0, 0, 0, 0) calc(95% + 1px)) 0 100%/40% 40% no-repeat, radial-gradient(circle closest-side, currentColor 0% 95%, rgba(0, 0, 0, 0) calc(95% + 1px)) 100% 100%/40% 40% no-repeat;\n  animation: var(--rli-animation-duration, 1s) var(--rli-animation-function, ease-out) infinite uxlv7tu, calc(var(--rli-animation-duration, 1s) * 4) var(--rli-animation-function, ease-out) infinite uxlv7us;\n}\n\n@property --TD-brick-stack-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-brick-stack-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-brick-stack-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-brick-stack-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1s;\n}\n@keyframes uxlv7tu {\n  0% {\n    background-position: 0 0, 0 100%, 100% 100%;\n  }\n  25% {\n    background-position: 100% 0, 0 100%, 100% 100%;\n  }\n  50% {\n    background-position: 100% 0, 0 0, 100% 100%;\n  }\n  75% {\n    background-position: 100% 0, 0 0, 0 100%;\n  }\n  100% {\n    background-position: 100% 100%, 0 0, 0 100%;\n  }\n}\n@keyframes uxlv7us {\n  100%, 0% {\n    color: var(--TD-brick-stack-phase1-color);\n  }\n  20% {\n    color: var(--TD-brick-stack-phase1-color);\n  }\n  25% {\n    color: var(--TD-brick-stack-phase2-color, var(--TD-brick-stack-phase1-color));\n  }\n  45% {\n    color: var(--TD-brick-stack-phase2-color, var(--TD-brick-stack-phase1-color));\n  }\n  50% {\n    color: var(--TD-brick-stack-phase3-color, var(--TD-brick-stack-phase1-color));\n  }\n  70% {\n    color: var(--TD-brick-stack-phase3-color, var(--TD-brick-stack-phase1-color));\n  }\n  75% {\n    color: var(--TD-brick-stack-phase4-color, var(--TD-brick-stack-phase1-color));\n  }\n  95% {\n    color: var(--TD-brick-stack-phase4-color, var(--TD-brick-stack-phase1-color));\n  }\n}');
var xn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--TD-brick-stack-phase".concat(r2 + 1, "-color");
}));
var kn = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1s").animationPeriod, c2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, xn.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) r3[xn[a3]] = o2[a3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var e3 = 0; e3 < xn.length; e3++) r3[xn[e3]] = n2;
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), ' received in <ThreeDot variant="brick-stack" /> indicator cannot be processed. Using default instead!'));
      for (e3 = 0; e3 < xn.length; e3++) r3[xn[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b brick-stack-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b brick-stack-indicator" }, import_react.default.createElement("span", { className: "rli-d-i-b brick-stack" })), import_react.default.createElement(U, { staticText: true, text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor }));
};
r('.bob-rli-bounding-box {\n  --TD-bob-phase1-color: rgb(50, 205, 50);\n  box-sizing: border-box;\n  font-size: 16px;\n  display: inline-block;\n  color: var(--TD-bob-phase1-color);\n}\n.bob-rli-bounding-box .bob-indicator {\n  width: 4.4em;\n  height: 2.2em;\n  position: relative;\n  display: block;\n  margin: 0 auto;\n}\n.bob-rli-bounding-box .bob-indicator .bobbing,\n.bob-rli-bounding-box .bob-indicator .bobbing::before,\n.bob-rli-bounding-box .bob-indicator .bobbing::after {\n  width: 1.1em;\n  height: 100%;\n  display: grid;\n  animation: var(--rli-animation-duration, 1.2s) var(--rli-animation-function, linear) var(--delay) infinite uxlv7u0, calc(var(--rli-animation-duration, 1.2s) * 4) var(--rli-animation-function, linear) var(--delay) infinite uxlv7vq;\n}\n.bob-rli-bounding-box .bob-indicator .bobbing::before,\n.bob-rli-bounding-box .bob-indicator .bobbing::after {\n  content: "";\n  grid-area: 1/1;\n}\n.bob-rli-bounding-box .bob-indicator .bobbing {\n  --delay: calc(var(--rli-animation-duration, 1.2s) * 0.12 * -1);\n  background: radial-gradient(circle closest-side at center, currentColor 0% 92%, rgba(0, 0, 0, 0) calc(92% + 1px)) 50% 50%/100% 50% no-repeat;\n}\n.bob-rli-bounding-box .bob-indicator .bobbing::before {\n  --delay: calc(var(--rli-animation-duration, 1.2s) * 0);\n  transform: translateX(150%);\n  background: radial-gradient(circle closest-side at center, currentColor 0% 92%, rgba(0, 0, 0, 0) calc(92% + 1px)) 50% 50%/100% 50% no-repeat;\n}\n.bob-rli-bounding-box .bob-indicator .bobbing::after {\n  --delay: calc(var(--rli-animation-duration, 1.2s) * 0.12);\n  transform: translateX(300%);\n  background: radial-gradient(circle closest-side at center, currentColor 0% 92%, rgba(0, 0, 0, 0) calc(92% + 1px)) 50% 50%/100% 50% no-repeat;\n}\n\n@property --TD-bob-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-bob-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-bob-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-bob-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1.2s;\n}\n@keyframes uxlv7u0 {\n  100%, 0% {\n    background-position: 50% 50%;\n  }\n  15% {\n    background-position: 50% 10%;\n  }\n  30% {\n    background-position: 50% 100%;\n  }\n  40% {\n    background-position: 50% 0%;\n  }\n  50% {\n    background-position: 50% 90%;\n  }\n  70% {\n    background-position: 50% 10%;\n  }\n  98% {\n    background-position: 50% 50%;\n  }\n}\n@keyframes uxlv7vq {\n  100%, 0% {\n    color: var(--TD-bob-phase1-color);\n  }\n  22% {\n    color: var(--TD-bob-phase1-color);\n  }\n  25% {\n    color: var(--TD-bob-phase2-color, var(--TD-bob-phase1-color));\n  }\n  47% {\n    color: var(--TD-bob-phase2-color, var(--TD-bob-phase1-color));\n  }\n  50% {\n    color: var(--TD-bob-phase3-color, var(--TD-bob-phase1-color));\n  }\n  72% {\n    color: var(--TD-bob-phase3-color, var(--TD-bob-phase1-color));\n  }\n  75% {\n    color: var(--TD-bob-phase4-color, var(--TD-bob-phase1-color));\n  }\n  97% {\n    color: var(--TD-bob-phase4-color, var(--TD-bob-phase1-color));\n  }\n}');
var On = Array.from({ length: 4 }, (function(n2, r2) {
  return "--TD-bob-phase".concat(r2 + 1, "-color");
}));
var Pn = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1.2s").animationPeriod, c2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, On.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) r3[On[a3]] = o2[a3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var e3 = 0; e3 < On.length; e3++) r3[On[e3]] = n2;
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), ' received in <ThreeDot variant="bob" /> indicator cannot be processed. Using default instead!'));
      for (e3 = 0; e3 < On.length; e3++) r3[On[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b bob-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "bob-indicator" }, import_react.default.createElement("span", { className: "bobbing" })), import_react.default.createElement(U, { staticText: true, text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor }));
};
r('.bounce-rli-bounding-box {\n  --TD-bounce-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  color: var(--TD-bounce-phase1-color);\n  display: inline-block;\n  padding-bottom: 0.25125em;\n}\n.bounce-rli-bounding-box .wrapper {\n  --dot1-delay: 0s;\n  --dot1-x-offset: 0.55em;\n  --dot2-delay: calc((var(--rli-animation-duration, 0.5s) + var(--rli-animation-duration, 0.5s) * 0.75) * -1);\n  --dot2-x-offset: 2.2em;\n  --dot3-delay: calc((var(--rli-animation-duration, 0.5s) + var(--rli-animation-duration, 0.5s) * 0.5) * -1);\n  --dot3-x-offset: 3.85em;\n  width: 5.5em;\n  height: 3.125em;\n  position: relative;\n  display: block;\n  margin: 0 auto;\n}\n.bounce-rli-bounding-box .wrapper .group {\n  display: block;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.bounce-rli-bounding-box .wrapper .group .dot {\n  width: 1.1em;\n  height: 1.1em;\n  position: absolute;\n  border-radius: 50%;\n  background-color: var(--TD-bounce-phase1-color);\n  transform-origin: 50%;\n  animation: var(--rli-animation-duration, 0.5s) var(--rli-animation-function, cubic-bezier(0.74, 0.1, 0.74, 1)) alternate infinite uxlv7wc, calc(var(--rli-animation-duration, 0.5s) * 4) var(--rli-animation-function, cubic-bezier(0.74, 0.1, 0.74, 1)) infinite uxlv7x6;\n}\n.bounce-rli-bounding-box .wrapper .group .dot:nth-of-type(1) {\n  left: var(--dot1-x-offset);\n  animation-delay: var(--dot1-delay), 0s;\n}\n.bounce-rli-bounding-box .wrapper .group .dot:nth-of-type(2) {\n  left: var(--dot2-x-offset);\n  animation-delay: var(--dot2-delay), 0s;\n}\n.bounce-rli-bounding-box .wrapper .group .dot:nth-of-type(3) {\n  left: var(--dot3-x-offset);\n  animation-delay: var(--dot3-delay), 0s;\n}\n.bounce-rli-bounding-box .wrapper .group .shadow {\n  width: 1.1em;\n  height: 0.22em;\n  border-radius: 50%;\n  background-color: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  top: 101%;\n  transform-origin: 50%;\n  z-index: -1;\n  filter: blur(1px);\n  animation: var(--rli-animation-duration, 0.5s) var(--rli-animation-function, cubic-bezier(0.74, 0.1, 0.74, 1)) alternate infinite uxlv7ww;\n}\n.bounce-rli-bounding-box .wrapper .group .shadow:nth-of-type(1) {\n  left: var(--dot1-x-offset);\n  animation-delay: var(--dot1-delay);\n}\n.bounce-rli-bounding-box .wrapper .group .shadow:nth-of-type(2) {\n  left: var(--dot2-x-offset);\n  animation-delay: var(--dot2-delay);\n}\n.bounce-rli-bounding-box .wrapper .group .shadow:nth-of-type(3) {\n  left: var(--dot3-x-offset);\n  animation-delay: var(--dot3-delay);\n}\n\n@property --TD-bounce-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-bounce-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-bounce-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --TD-bounce-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 0.5s;\n}\n@keyframes uxlv7wc {\n  0% {\n    top: 0%;\n  }\n  60% {\n    height: 1.25em;\n    border-radius: 50%;\n    transform: scaleX(1);\n  }\n  100% {\n    top: 100%;\n    height: 0.22em;\n    transform: scaleX(1.5);\n    filter: blur(0.4px);\n  }\n}\n@keyframes uxlv7ww {\n  0% {\n    transform: scaleX(0.2);\n    opacity: 0.2;\n  }\n  60% {\n    opacity: 0.4;\n  }\n  100% {\n    transform: scaleX(1.5);\n    opacity: 0.6;\n  }\n}\n@keyframes uxlv7x6 {\n  0%, 100% {\n    background-color: var(--TD-bounce-phase1-color);\n  }\n  20% {\n    background-color: var(--TD-bounce-phase1-color);\n  }\n  25% {\n    background-color: var(--TD-bounce-phase2-color, var(--TD-bounce-phase1-color));\n  }\n  45% {\n    background-color: var(--TD-bounce-phase2-color, var(--TD-bounce-phase1-color));\n  }\n  50% {\n    background-color: var(--TD-bounce-phase3-color, var(--TD-bounce-phase1-color));\n  }\n  70% {\n    background-color: var(--TD-bounce-phase3-color, var(--TD-bounce-phase1-color));\n  }\n  75% {\n    background-color: var(--TD-bounce-phase4-color, var(--TD-bounce-phase1-color));\n  }\n  95% {\n    background-color: var(--TD-bounce-phase4-color, var(--TD-bounce-phase1-color));\n  }\n}');
var wn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--TD-bounce-phase".concat(r2 + 1, "-color");
}));
var En = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "0.5s").animationPeriod, c2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, wn.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) r3[wn[a3]] = o2[a3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var e3 = 0; e3 < wn.length; e3++) r3[wn[e3]] = n2;
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), ' received in <ThreeDot variant="bounce" /> indicator cannot be processed. Using default instead!'));
      for (e3 = 0; e3 < wn.length; e3++) r3[wn[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b bounce-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2) }, import_react.default.createElement("span", { className: "wrapper" }, import_react.default.createElement("span", { className: "group" }, import_react.default.createElement("span", { className: "rli-d-i-b dot" }), import_react.default.createElement("span", { className: "rli-d-i-b dot" }), import_react.default.createElement("span", { className: "rli-d-i-b dot" })), import_react.default.createElement("span", { className: "group" }, import_react.default.createElement("span", { className: "rli-d-i-b shadow" }), import_react.default.createElement("span", { className: "rli-d-i-b shadow" }), import_react.default.createElement("span", { className: "rli-d-i-b shadow" }))), import_react.default.createElement(U, { staticText: true, text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor, style: { marginTop: "2px" } }));
};
var Sn = function(r2) {
  var a2 = Object(r2).variant, e2 = void 0 === a2 ? "pulsate" : a2;
  return "pulsate" === e2 ? import_react.default.createElement(yn, o({}, r2)) : "brick-stack" === e2 ? import_react.default.createElement(kn, o({}, r2)) : "bob" === e2 ? import_react.default.createElement(Pn, o({}, r2)) : "bounce" === e2 ? import_react.default.createElement(En, o({}, r2)) : null;
};
r('.blink-blur-rli-bounding-box {\n  --shape-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  color: var(--shape-phase1-color);\n}\n.blink-blur-rli-bounding-box .blink-blur-indicator {\n  isolation: isolate;\n  display: flex;\n  flex-direction: row;\n  -moz-column-gap: 0.4em;\n       column-gap: 0.4em;\n}\n.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape {\n  --x-deg: -20deg;\n  width: 1.8em;\n  height: 2.25em;\n  border-radius: 0.25em;\n  color: inherit;\n  transform: skewX(var(--x-deg));\n  background-color: var(--shape-phase1-color);\n  animation-name: uxlv7id, uxlv7jl;\n  animation-duration: var(--rli-animation-duration, 1.2s), calc(var(--rli-animation-duration, 1.2s) * 4);\n  animation-timing-function: var(--rli-animation-function, ease-in);\n  animation-iteration-count: infinite;\n}\n.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape.blink-blur-shape1 {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) * 0.5 * -1);\n}\n.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape.blink-blur-shape2 {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) * 0.4 * -1);\n}\n.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape.blink-blur-shape3 {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) * 0.3 * -1);\n}\n.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape.blink-blur-shape4 {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) * 0.2 * -1);\n}\n.blink-blur-rli-bounding-box .blink-blur-indicator .blink-blur-shape.blink-blur-shape5 {\n  animation-delay: calc(var(--rli-animation-duration, 1.2s) * 0.1 * -1);\n}\n\n@property --shape-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --shape-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --shape-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --shape-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 1.2s;\n}\n@keyframes uxlv7id {\n  100%, 0% {\n    opacity: 0.3;\n    filter: blur(0.0675em) drop-shadow(0 0 0.0625em);\n    transform: skewX(var(--x-deg)) scale(1.2, 1.45);\n  }\n  39% {\n    opacity: 0.8;\n  }\n  40%, 41%, 42% {\n    opacity: 0;\n  }\n  43% {\n    opacity: 0.8;\n  }\n  50% {\n    opacity: 1;\n    filter: blur(0em) drop-shadow(0 0 0em);\n    transform: skewX(var(--x-deg)) scale(1, 1);\n  }\n}\n@keyframes uxlv7jl {\n  100%, 0% {\n    color: var(--shape-phase1-color);\n    background-color: var(--shape-phase1-color);\n  }\n  25% {\n    color: var(--shape-phase2-color, var(--shape-phase1-color));\n    background-color: var(--shape-phase2-color, var(--shape-phase1-color));\n  }\n  50% {\n    color: var(--shape-phase3-color, var(--shape-phase1-color));\n    background-color: var(--shape-phase3-color, var(--shape-phase1-color));\n  }\n  75% {\n    color: var(--shape-phase4-color, var(--shape-phase1-color));\n    background-color: var(--shape-phase4-color, var(--shape-phase1-color));\n  }\n}');
var Nn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--shape-phase".concat(r2 + 1, "-color");
}));
var zn = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "1.2s").animationPeriod, c2 = (function(n2) {
    var r3 = {}, o2 = Nn.length;
    if (Array.isArray(n2) && n2.length > 0) {
      for (var a3 = j(n2, o2), e3 = 0; e3 < a3.length && !(e3 > o2 - 1); e3++) {
        var t3 = a3[e3];
        r3[Nn[e3]] = t3;
      }
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (e3 = 0; e3 < o2; e3++) r3[Nn[e3]] = n2;
    } catch (a4) {
      a4 instanceof Error ? console.warn("[".concat(a4.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), " received in <BlinkBlur /> indicator cannot be processed. Using default instead!"));
      for (e3 = 0; e3 < o2; e3++) r3[Nn[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b blink-blur-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b blink-blur-indicator" }, import_react.default.createElement("span", { className: "blink-blur-shape blink-blur-shape1" }), import_react.default.createElement("span", { className: "blink-blur-shape blink-blur-shape2" }), import_react.default.createElement("span", { className: "blink-blur-shape blink-blur-shape3" }), import_react.default.createElement("span", { className: "blink-blur-shape blink-blur-shape4" }), import_react.default.createElement("span", { className: "blink-blur-shape blink-blur-shape5" })), import_react.default.createElement(U, { staticText: true, text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor, style: { marginTop: "0.8em" } }));
};
r('.trophy-spin-rli-bounding-box {\n  --trophySpin-phase1-color: rgb(50, 205, 50);\n  box-sizing: border-box;\n  font-size: 16px;\n  position: relative;\n  isolation: isolate;\n  color: var(--trophySpin-phase1-color);\n}\n.trophy-spin-rli-bounding-box .trophy-spin-indicator {\n  width: 4em;\n  perspective: 1000px;\n  transform-style: preserve-3d;\n  display: block;\n  margin: 0 auto;\n}\n.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade {\n  display: block;\n  width: 4em;\n  height: 0.5em;\n  background: var(--trophySpin-phase1-color);\n  animation: uxlv7ki var(--rli-animation-duration, 2.5s) var(--rli-animation-function, linear) infinite, uxlv7l2 calc(var(--rli-animation-duration, 2.5s) * 0.5) var(--rli-animation-function, linear) infinite, uxlv7ly calc(var(--rli-animation-duration, 2.5s) * 4) var(--rli-animation-function, linear) infinite;\n}\n.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(8) {\n  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 0 * -1);\n}\n.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(7) {\n  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 1 * -1);\n}\n.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(6) {\n  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 2 * -1);\n}\n.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(5) {\n  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 3 * -1);\n}\n.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(4) {\n  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 4 * -1);\n}\n.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(3) {\n  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 5 * -1);\n}\n.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(2) {\n  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 6 * -1);\n}\n.trophy-spin-rli-bounding-box .trophy-spin-indicator .blade:nth-of-type(1) {\n  animation-delay: calc(var(--rli-animation-duration, 2.5s) / 2 / 8 * 7 * -1);\n}\n\n@property --trophySpin-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --trophySpin-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --trophySpin-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --trophySpin-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 2.5s;\n}\n@keyframes uxlv7ki {\n  to {\n    transform: rotateY(1turn) rotateX(-25deg);\n  }\n}\n@keyframes uxlv7l2 {\n  100%, 0% {\n    filter: brightness(1);\n    opacity: 1;\n  }\n  15% {\n    filter: brightness(1);\n  }\n  25% {\n    opacity: 0.96;\n  }\n  30% {\n    filter: brightness(0.92);\n  }\n  50% {\n    filter: brightness(0.7);\n    opacity: 1;\n  }\n  75% {\n    filter: brightness(0.92);\n    opacity: 0.96;\n  }\n  90% {\n    filter: brightness(1);\n  }\n}\n@keyframes uxlv7ly {\n  100%, 0% {\n    background-color: var(--trophySpin-phase1-color);\n  }\n  18% {\n    background-color: var(--trophySpin-phase1-color);\n  }\n  25% {\n    background-color: var(--trophySpin-phase2-color, var(--trophySpin-phase1-color));\n  }\n  43% {\n    background-color: var(--trophySpin-phase2-color, var(--trophySpin-phase1-color));\n  }\n  50% {\n    background-color: var(--trophySpin-phase3-color, var(--trophySpin-phase1-color));\n  }\n  68% {\n    background-color: var(--trophySpin-phase3-color, var(--trophySpin-phase1-color));\n  }\n  75% {\n    background-color: var(--trophySpin-phase4-color, var(--trophySpin-phase1-color));\n  }\n  93% {\n    background-color: var(--trophySpin-phase4-color, var(--trophySpin-phase1-color));\n  }\n}');
var An = Array.from({ length: 4 }, (function(n2, r2) {
  return "--trophySpin-phase".concat(r2 + 1, "-color");
}));
var _n = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "2.5s").animationPeriod, c2 = (function(n2) {
    var r3 = {}, o2 = An.length;
    if (n2 instanceof Array) {
      for (var a3 = j(n2, o2), e3 = 0; e3 < a3.length && !(e3 >= 4); e3++) r3[An[e3]] = a3[e3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var t3 = 0; t3 < o2; t3++) r3[An[t3]] = n2;
    } catch (a4) {
      a4 instanceof Error ? console.warn("[".concat(a4.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), " received in <TrophySpin /> indicator cannot be processed. Using default instead!"));
      for (t3 = 0; t3 < o2; t3++) r3[An[t3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b trophy-spin-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b trophy-spin-indicator" }, import_react.default.createElement("span", { className: "blade" }), import_react.default.createElement("span", { className: "blade" }), import_react.default.createElement("span", { className: "blade" }), import_react.default.createElement("span", { className: "blade" }), import_react.default.createElement("span", { className: "blade" }), import_react.default.createElement("span", { className: "blade" }), import_react.default.createElement("span", { className: "blade" }), import_react.default.createElement("span", { className: "blade" })), import_react.default.createElement(U, { staticText: true, text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor }));
};
r('.slab-rli-bounding-box {\n  --slab-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  color: var(--slab-phase1-color);\n  position: relative;\n}\n.slab-rli-bounding-box .slab-indicator {\n  position: relative;\n  display: block;\n  width: 7em;\n  height: 4em;\n  margin: 0 auto;\n  overflow: hidden;\n}\n.slab-rli-bounding-box .slab-indicator .slabs-wrapper {\n  width: 4em;\n  height: 4em;\n  transform: perspective(15em) rotateX(66deg) rotateZ(-25deg);\n  transform-style: preserve-3d;\n  transform-origin: 50% 100%;\n  display: block;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n}\n.slab-rli-bounding-box .slab-indicator .slabs-wrapper .slab {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--slab-phase1-color);\n  opacity: 0;\n  box-shadow: -0.08em 0.15em 0 rgba(0, 0, 0, 0.45);\n  transform-origin: 0% 0%;\n  animation: calc(var(--rli-animation-duration-unitless, 3) * 1s) var(--rli-animation-function, linear) infinite uxlv7md, calc(var(--rli-animation-duration-unitless, 3) * 4s) var(--rli-animation-function, linear) infinite uxlv7n0;\n}\n.slab-rli-bounding-box .slab-indicator .slabs-wrapper .slab:nth-child(1) {\n  animation-delay: calc(4 / (16 / var(--rli-animation-duration-unitless, 3)) * 3 * -1 * 1s);\n}\n.slab-rli-bounding-box .slab-indicator .slabs-wrapper .slab:nth-child(2) {\n  animation-delay: calc(4 / (16 / var(--rli-animation-duration-unitless, 3)) * 2 * -1 * 1s);\n}\n.slab-rli-bounding-box .slab-indicator .slabs-wrapper .slab:nth-child(3) {\n  animation-delay: calc(4 / (16 / var(--rli-animation-duration-unitless, 3)) * -1 * 1s);\n}\n.slab-rli-bounding-box .slab-indicator .slabs-wrapper .slab:nth-child(4) {\n  animation-delay: 0s;\n}\n\n@property --slab-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --slab-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --slab-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --slab-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration-unitless {\n  syntax: "<number>";\n  inherits: true;\n  initial-value: 3;\n}\n@keyframes uxlv7md {\n  0% {\n    transform: translateY(0) rotateX(30deg);\n    opacity: 0;\n  }\n  10% {\n    transform: translateY(-40%) rotateX(0deg);\n    opacity: 1;\n  }\n  25% {\n    opacity: 1;\n  }\n  100% {\n    transform: translateY(-400%) rotateX(0deg);\n    opacity: 0;\n  }\n}\n@keyframes uxlv7n0 {\n  100%, 0% {\n    background-color: var(--slab-phase1-color);\n  }\n  24.9% {\n    background-color: var(--slab-phase1-color);\n  }\n  25% {\n    background-color: var(--slab-phase2-color, var(--slab-phase1-color));\n  }\n  49.9% {\n    background-color: var(--slab-phase2-color, var(--slab-phase1-color));\n  }\n  50% {\n    background-color: var(--slab-phase3-color, var(--slab-phase1-color));\n  }\n  74.9% {\n    background-color: var(--slab-phase3-color, var(--slab-phase1-color));\n  }\n  75% {\n    background-color: var(--slab-phase4-color, var(--slab-phase1-color));\n  }\n  99.9% {\n    background-color: var(--slab-phase4-color, var(--slab-phase1-color));\n  }\n}');
var Tn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--slab-phase".concat(r2 + 1, "-color");
}));
var Cn = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "3s").animationPeriod, c2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, Tn.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) r3[Tn[a3]] = o2[a3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var e3 = 0; e3 < Tn.length; e3++) r3[Tn[e3]] = n2;
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), " received in <Slab /> indicator cannot be processed. Using default instead!"));
      for (e3 = 0; e3 < Tn.length; e3++) r3[Tn[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b slab-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration-unitless": parseFloat(s2) }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b slab-indicator" }, import_react.default.createElement("span", { className: "slabs-wrapper" }, import_react.default.createElement("span", { className: "slab" }), import_react.default.createElement("span", { className: "slab" }), import_react.default.createElement("span", { className: "slab" }), import_react.default.createElement("span", { className: "slab" }))), import_react.default.createElement(U, { staticText: true, text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor }));
};
r('.lifeline-rli-bounding-box {\n  --life-line-phase1-color: rgb(50, 205, 50);\n  font-size: 16px;\n  isolation: isolate;\n  color: var(--life-line-phase1-color);\n}\n.lifeline-rli-bounding-box .lifeline-indicator {\n  position: relative;\n  text-align: center;\n}\n.lifeline-rli-bounding-box .lifeline-indicator path.rli-lifeline {\n  stroke-dasharray: 474.7616760254 30.3039367676;\n  animation: var(--rli-animation-duration, 2s) var(--rli-animation-function, linear) infinite uxlv7k3, calc(var(--rli-animation-duration, 2s) * 4) var(--rli-animation-function, linear) infinite uxlv7kg;\n}\n.lifeline-rli-bounding-box .lifeline-text {\n  color: currentColor;\n  mix-blend-mode: difference;\n  width: unset;\n  display: block;\n}\n\n@property --life-line-phase1-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --life-line-phase2-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --life-line-phase3-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --life-line-phase4-color {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: rgb(50, 205, 50);\n}\n@property --rli-animation-duration {\n  syntax: "<time>";\n  inherits: true;\n  initial-value: 2s;\n}\n@keyframes uxlv7k3 {\n  to {\n    stroke-dashoffset: -1010.1312255859;\n  }\n}\n@keyframes uxlv7kg {\n  100%, 0% {\n    color: var(--life-line-phase1-color);\n  }\n  20% {\n    color: var(--life-line-phase1-color);\n  }\n  25% {\n    color: var(--life-line-phase2-color, var(--life-line-phase1-color));\n  }\n  45% {\n    color: var(--life-line-phase2-color, var(--life-line-phase1-color));\n  }\n  50% {\n    color: var(--life-line-phase3-color, var(--life-line-phase1-color));\n  }\n  70% {\n    color: var(--life-line-phase3-color, var(--life-line-phase1-color));\n  }\n  75% {\n    color: var(--life-line-phase4-color, var(--life-line-phase1-color));\n  }\n  95% {\n    color: var(--life-line-phase4-color, var(--life-line-phase1-color));\n  }\n}');
var Dn = Array.from({ length: 4 }, (function(n2, r2) {
  return "--life-line-phase".concat(r2 + 1, "-color");
}));
var Mn = function(r2) {
  var a2, e2 = L(null == r2 ? void 0 : r2.style, null == r2 ? void 0 : r2.size), t2 = e2.styles, i2 = e2.fontSize, l2 = null == r2 ? void 0 : r2.easing, s2 = F(null == r2 ? void 0 : r2.speedPlus, "2s").animationPeriod, c2 = (function(n2) {
    var r3 = {};
    if (n2 instanceof Array) {
      for (var o2 = j(n2, Dn.length), a3 = 0; a3 < o2.length && !(a3 >= 4); a3++) r3[Dn[a3]] = o2[a3];
      return r3;
    }
    try {
      if ("string" != typeof n2) throw new Error("Color String expected");
      for (var e3 = 0; e3 < Dn.length; e3++) r3[Dn[e3]] = n2;
    } catch (o3) {
      o3 instanceof Error ? console.warn("[".concat(o3.message, ']: Received "').concat(typeof n2, '" instead with value, ').concat(JSON.stringify(n2))) : console.warn("".concat(JSON.stringify(n2), " received in <LifeLine /> indicator cannot be processed. Using default instead!"));
      for (e3 = 0; e3 < Dn.length; e3++) r3[Dn[e3]] = X;
    }
    return r3;
  })(null !== (a2 = null == r2 ? void 0 : r2.color) && void 0 !== a2 ? a2 : "");
  return import_react.default.createElement("span", { className: "rli-d-i-b lifeline-rli-bounding-box", style: o(o(o(o(o({}, i2 && { fontSize: i2 }), s2 && { "--rli-animation-duration": s2 }), l2 && { "--rli-animation-function": l2 }), c2), t2), role: "status", "aria-live": "polite", "aria-label": "Loading" }, import_react.default.createElement("span", { className: "rli-d-i-b lifeline-indicator" }, import_react.default.createElement("svg", { width: "14em", height: "6.825000001em", xmlns: "http://www.w3.org/2000/svg", version: "1.2", viewBox: "0 0 350 50", preserveAspectRatio: "xMinYMin meet" }, import_react.default.createElement("path", { className: "rli-lifeline", stroke: "currentColor", fill: "none", strokeLinejoin: "round", strokeWidth: "4px", d: "M-113 70h250q8-30 12-3t5 8 3-7 3 4 6 35 8-55 6 40 8-3s2-11 10-10 1 1 8-10l4 8c6 4 8-6 10-17s2 10 9 11h210" }))), import_react.default.createElement(U, { staticText: true, text: null == r2 ? void 0 : r2.text, textColor: null == r2 ? void 0 : r2.textColor }));
};
export {
  B as Atom,
  zn as BlinkBlur,
  V as Commet,
  bn as FourSquare,
  Mn as LifeLine,
  mn as Mosaic,
  dn as OrbitProgress,
  fn as Riple,
  Cn as Slab,
  Sn as ThreeDot,
  _n as TrophySpin
};
//# sourceMappingURL=react-loading-indicators.js.map
