var Fe = Object.defineProperty;
var We = (e, t, r) => t in e ? Fe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var o = (e, t, r) => (We(e, typeof t != "symbol" ? t + "" : t, r), r);
import * as _ from "@dlightjs/dlight";
import { View as T, DLNodeType as le } from "@dlightjs/dlight";
function je(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function qe(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var Ge = /* @__PURE__ */ function() {
  function e(r) {
    var n = this;
    this._insertTag = function(s) {
      var i;
      n.tags.length === 0 ? n.insertionPoint ? i = n.insertionPoint.nextSibling : n.prepend ? i = n.container.firstChild : i = n.before : i = n.tags[n.tags.length - 1].nextSibling, n.container.insertBefore(s, i), n.tags.push(s);
    }, this.isSpeedy = r.speedy === void 0 ? process.env.NODE_ENV === "production" : r.speedy, this.tags = [], this.ctr = 0, this.nonce = r.nonce, this.key = r.key, this.container = r.container, this.prepend = r.prepend, this.insertionPoint = r.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(n) {
    n.forEach(this._insertTag);
  }, t.insert = function(n) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(qe(this));
    var s = this.tags[this.tags.length - 1];
    if (process.env.NODE_ENV !== "production") {
      var i = n.charCodeAt(0) === 64 && n.charCodeAt(1) === 105;
      i && this._alreadyInsertedOrderInsensitiveRule && console.error(`You're attempting to insert the following rule:
` + n + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."), this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !i;
    }
    if (this.isSpeedy) {
      var a = je(s);
      try {
        a.insertRule(n, a.cssRules.length);
      } catch (c) {
        process.env.NODE_ENV !== "production" && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(n) && console.error('There was a problem inserting the following rule: "' + n + '"', c);
      }
    } else
      s.appendChild(document.createTextNode(n));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(n) {
      return n.parentNode && n.parentNode.removeChild(n);
    }), this.tags = [], this.ctr = 0, process.env.NODE_ENV !== "production" && (this._alreadyInsertedOrderInsensitiveRule = !1);
  }, e;
}(), N = "-ms-", J = "-moz-", l = "-webkit-", ce = "comm", de = "rule", pe = "decl", He = "@import", Oe = "@keyframes", ze = Math.abs, Q = String.fromCharCode, Ye = Object.assign;
function Ke(e, t) {
  return E(e, 0) ^ 45 ? (((t << 2 ^ E(e, 0)) << 2 ^ E(e, 1)) << 2 ^ E(e, 2)) << 2 ^ E(e, 3) : 0;
}
function ke(e) {
  return e.trim();
}
function Ze(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function g(e, t, r) {
  return e.replace(t, r);
}
function ie(e, t) {
  return e.indexOf(t);
}
function E(e, t) {
  return e.charCodeAt(t) | 0;
}
function j(e, t, r) {
  return e.slice(t, r);
}
function P(e) {
  return e.length;
}
function ue(e) {
  return e.length;
}
function z(e, t) {
  return t.push(e), e;
}
function Je(e, t) {
  return e.map(t).join("");
}
var ee = 1, V = 1, Pe = 0, S = 0, y = 0, B = "";
function te(e, t, r, n, s, i, a) {
  return { value: e, root: t, parent: r, type: n, props: s, children: i, line: ee, column: V, length: a, return: "" };
}
function W(e, t) {
  return Ye(te("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Xe() {
  return y;
}
function Qe() {
  return y = S > 0 ? E(B, --S) : 0, V--, y === 10 && (V = 1, ee--), y;
}
function A() {
  return y = S < Pe ? E(B, S++) : 0, V++, y === 10 && (V = 1, ee++), y;
}
function M() {
  return E(B, S);
}
function Y() {
  return S;
}
function H(e, t) {
  return j(B, e, t);
}
function q(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Me(e) {
  return ee = V = 1, Pe = P(B = e), S = 0, [];
}
function Te(e) {
  return B = "", e;
}
function K(e) {
  return ke(H(S - 1, ae(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function et(e) {
  for (; (y = M()) && y < 33; )
    A();
  return q(e) > 2 || q(y) > 3 ? "" : " ";
}
function tt(e, t) {
  for (; --t && A() && !(y < 48 || y > 102 || y > 57 && y < 65 || y > 70 && y < 97); )
    ;
  return H(e, Y() + (t < 6 && M() == 32 && A() == 32));
}
function ae(e) {
  for (; A(); )
    switch (y) {
      case e:
        return S;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ae(y);
        break;
      case 40:
        e === 41 && ae(e);
        break;
      case 92:
        A();
        break;
    }
  return S;
}
function rt(e, t) {
  for (; A() && e + y !== 47 + 10; )
    if (e + y === 42 + 42 && M() === 47)
      break;
  return "/*" + H(t, S - 1) + "*" + Q(e === 47 ? e : A());
}
function nt(e) {
  for (; !q(M()); )
    A();
  return H(e, S);
}
function st(e) {
  return Te(Z("", null, null, null, [""], e = Me(e), 0, [0], e));
}
function Z(e, t, r, n, s, i, a, c, d) {
  for (var u = 0, p = 0, f = a, $ = 0, C = 0, w = 0, h = 1, x = 1, v = 1, b = 0, O = "", F = s, D = i, k = n, m = O; x; )
    switch (w = b, b = A()) {
      case 40:
        if (w != 108 && E(m, f - 1) == 58) {
          ie(m += g(K(b), "&", "&\f"), "&\f") != -1 && (v = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        m += K(b);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        m += et(w);
        break;
      case 92:
        m += tt(Y() - 1, 7);
        continue;
      case 47:
        switch (M()) {
          case 42:
          case 47:
            z(it(rt(A(), Y()), t, r), d);
            break;
          default:
            m += "/";
        }
        break;
      case 123 * h:
        c[u++] = P(m) * v;
      case 125 * h:
      case 59:
      case 0:
        switch (b) {
          case 0:
          case 125:
            x = 0;
          case 59 + p:
            C > 0 && P(m) - f && z(C > 32 ? me(m + ";", n, r, f - 1) : me(g(m, " ", "") + ";", n, r, f - 2), d);
            break;
          case 59:
            m += ";";
          default:
            if (z(k = ge(m, t, r, u, p, s, c, O, F = [], D = [], f), i), b === 123)
              if (p === 0)
                Z(m, t, k, k, F, i, f, c, D);
              else
                switch ($ === 99 && E(m, 3) === 110 ? 100 : $) {
                  case 100:
                  case 109:
                  case 115:
                    Z(e, k, k, n && z(ge(e, k, k, 0, 0, s, c, O, s, F = [], f), D), s, D, f, c, n ? F : D);
                    break;
                  default:
                    Z(m, k, k, k, [""], D, 0, c, D);
                }
        }
        u = p = C = 0, h = v = 1, O = m = "", f = a;
        break;
      case 58:
        f = 1 + P(m), C = w;
      default:
        if (h < 1) {
          if (b == 123)
            --h;
          else if (b == 125 && h++ == 0 && Qe() == 125)
            continue;
        }
        switch (m += Q(b), b * h) {
          case 38:
            v = p > 0 ? 1 : (m += "\f", -1);
            break;
          case 44:
            c[u++] = (P(m) - 1) * v, v = 1;
            break;
          case 64:
            M() === 45 && (m += K(A())), $ = M(), p = f = P(O = m += nt(Y())), b++;
            break;
          case 45:
            w === 45 && P(m) == 2 && (h = 0);
        }
    }
  return i;
}
function ge(e, t, r, n, s, i, a, c, d, u, p) {
  for (var f = s - 1, $ = s === 0 ? i : [""], C = ue($), w = 0, h = 0, x = 0; w < n; ++w)
    for (var v = 0, b = j(e, f + 1, f = ze(h = a[w])), O = e; v < C; ++v)
      (O = ke(h > 0 ? $[v] + " " + b : g(b, /&\f/g, $[v]))) && (d[x++] = O);
  return te(e, t, r, s === 0 ? de : c, d, u, p);
}
function it(e, t, r) {
  return te(e, t, r, ce, Q(Xe()), j(e, 2, -2), 0);
}
function me(e, t, r, n) {
  return te(e, t, r, pe, j(e, 0, n), j(e, n + 1, -1), n);
}
function U(e, t) {
  for (var r = "", n = ue(e), s = 0; s < n; s++)
    r += t(e[s], s, e, t) || "";
  return r;
}
function at(e, t, r, n) {
  switch (e.type) {
    case He:
    case pe:
      return e.return = e.return || e.value;
    case ce:
      return "";
    case Oe:
      return e.return = e.value + "{" + U(e.children, n) + "}";
    case de:
      e.value = e.props.join(",");
  }
  return P(r = U(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function ot(e) {
  var t = ue(e);
  return function(r, n, s, i) {
    for (var a = "", c = 0; c < t; c++)
      a += e[c](r, n, s, i) || "";
    return a;
  };
}
function ct(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function dt(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var pt = function(t, r, n) {
  for (var s = 0, i = 0; s = i, i = M(), s === 38 && i === 12 && (r[n] = 1), !q(i); )
    A();
  return H(t, S);
}, ut = function(t, r) {
  var n = -1, s = 44;
  do
    switch (q(s)) {
      case 0:
        s === 38 && M() === 12 && (r[n] = 1), t[n] += pt(S - 1, r, n);
        break;
      case 2:
        t[n] += K(s);
        break;
      case 4:
        if (s === 44) {
          t[++n] = M() === 58 ? "&\f" : "", r[n] = t[n].length;
          break;
        }
      default:
        t[n] += Q(s);
    }
  while (s = A());
  return t;
}, ft = function(t, r) {
  return Te(ut(Me(t), r));
}, $e = /* @__PURE__ */ new WeakMap(), ht = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var r = t.value, n = t.parent, s = t.column === n.column && t.line === n.line; n.type !== "rule"; )
      if (n = n.parent, !n)
        return;
    if (!(t.props.length === 1 && r.charCodeAt(0) !== 58 && !$e.get(n)) && !s) {
      $e.set(t, !0);
      for (var i = [], a = ft(r, i), c = n.props, d = 0, u = 0; d < a.length; d++)
        for (var p = 0; p < c.length; p++, u++)
          t.props[u] = i[d] ? a[d].replace(/&\f/g, c[p]) : c[p] + " " + a[d];
    }
  }
}, lt = function(t) {
  if (t.type === "decl") {
    var r = t.value;
    // charcode for l
    r.charCodeAt(0) === 108 && // charcode for b
    r.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
}, gt = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason", mt = function(t) {
  return t.type === "comm" && t.children.indexOf(gt) > -1;
}, $t = function(t) {
  return function(r, n, s) {
    if (!(r.type !== "rule" || t.compat)) {
      var i = r.value.match(/(:first|:nth|:nth-last)-child/g);
      if (i) {
        for (var a = r.parent === s[0], c = a ? s[0].children : (
          // global rule at the root level
          s
        ), d = c.length - 1; d >= 0; d--) {
          var u = c[d];
          if (u.line < r.line)
            break;
          if (u.column < r.column) {
            if (mt(u))
              return;
            break;
          }
        }
        i.forEach(function(p) {
          console.error('The pseudo class "' + p + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + p.split("-child")[0] + '-of-type".');
        });
      }
    }
  };
}, De = function(t) {
  return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
}, vt = function(t, r) {
  for (var n = t - 1; n >= 0; n--)
    if (!De(r[n]))
      return !0;
  return !1;
}, ve = function(t) {
  t.type = "", t.value = "", t.return = "", t.children = "", t.props = "";
}, yt = function(t, r, n) {
  De(t) && (t.parent ? (console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."), ve(t)) : vt(r, n) && (console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."), ve(t)));
};
function Ie(e, t) {
  switch (Ke(e, t)) {
    case 5103:
      return l + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return l + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return l + e + J + e + N + e + e;
    case 6828:
    case 4268:
      return l + e + N + e + e;
    case 6165:
      return l + e + N + "flex-" + e + e;
    case 5187:
      return l + e + g(e, /(\w+).+(:[^]+)/, l + "box-$1$2" + N + "flex-$1$2") + e;
    case 5443:
      return l + e + N + "flex-item-" + g(e, /flex-|-self/, "") + e;
    case 4675:
      return l + e + N + "flex-line-pack" + g(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return l + e + N + g(e, "shrink", "negative") + e;
    case 5292:
      return l + e + N + g(e, "basis", "preferred-size") + e;
    case 6060:
      return l + "box-" + g(e, "-grow", "") + l + e + N + g(e, "grow", "positive") + e;
    case 4554:
      return l + g(e, /([^-])(transform)/g, "$1" + l + "$2") + e;
    case 6187:
      return g(g(g(e, /(zoom-|grab)/, l + "$1"), /(image-set)/, l + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return g(e, /(image-set\([^]*)/, l + "$1$`$1");
    case 4968:
      return g(g(e, /(.+:)(flex-)?(.*)/, l + "box-pack:$3" + N + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + l + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return g(e, /(.+)-inline(.+)/, l + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (P(e) - 1 - t > 6)
        switch (E(e, t + 1)) {
          case 109:
            if (E(e, t + 4) !== 45)
              break;
          case 102:
            return g(e, /(.+:)(.+)-([^]+)/, "$1" + l + "$2-$3$1" + J + (E(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~ie(e, "stretch") ? Ie(g(e, "stretch", "fill-available"), t) + e : e;
        }
      break;
    case 4949:
      if (E(e, t + 1) !== 115)
        break;
    case 6444:
      switch (E(e, P(e) - 3 - (~ie(e, "!important") && 10))) {
        case 107:
          return g(e, ":", ":" + l) + e;
        case 101:
          return g(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + l + (E(e, 14) === 45 ? "inline-" : "") + "box$3$1" + l + "$2$3$1" + N + "$2box$3") + e;
      }
      break;
    case 5936:
      switch (E(e, t + 11)) {
        case 114:
          return l + e + N + g(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return l + e + N + g(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return l + e + N + g(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return l + e + N + e + e;
  }
  return e;
}
var _t = function(t, r, n, s) {
  if (t.length > -1 && !t.return)
    switch (t.type) {
      case pe:
        t.return = Ie(t.value, t.length);
        break;
      case Oe:
        return U([W(t, {
          value: g(t.value, "@", "@" + l)
        })], s);
      case de:
        if (t.length)
          return Je(t.props, function(i) {
            switch (Ze(i, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return U([W(t, {
                  props: [g(i, /:(read-\w+)/, ":" + J + "$1")]
                })], s);
              case "::placeholder":
                return U([W(t, {
                  props: [g(i, /:(plac\w+)/, ":" + l + "input-$1")]
                }), W(t, {
                  props: [g(i, /:(plac\w+)/, ":" + J + "$1")]
                }), W(t, {
                  props: [g(i, /:(plac\w+)/, N + "input-$1")]
                })], s);
            }
            return "";
          });
    }
}, wt = [_t], bt = function(t) {
  var r = t.key;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
  if (r === "css") {
    var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n, function(h) {
      var x = h.getAttribute("data-emotion");
      x.indexOf(" ") !== -1 && (document.head.appendChild(h), h.setAttribute("data-s", ""));
    });
  }
  var s = t.stylisPlugins || wt;
  if (process.env.NODE_ENV !== "production" && /[^a-z-]/.test(r))
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + r + '" was passed');
  var i = {}, a, c = [];
  a = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + r + ' "]'),
    function(h) {
      for (var x = h.getAttribute("data-emotion").split(" "), v = 1; v < x.length; v++)
        i[x[v]] = !0;
      c.push(h);
    }
  );
  var d, u = [ht, lt];
  process.env.NODE_ENV !== "production" && u.push($t({
    get compat() {
      return w.compat;
    }
  }), yt);
  {
    var p, f = [at, process.env.NODE_ENV !== "production" ? function(h) {
      h.root || (h.return ? p.insert(h.return) : h.value && h.type !== ce && p.insert(h.value + "{}"));
    } : ct(function(h) {
      p.insert(h);
    })], $ = ot(u.concat(s, f)), C = function(x) {
      return U(st(x), $);
    };
    d = function(x, v, b, O) {
      p = b, process.env.NODE_ENV !== "production" && v.map !== void 0 && (p = {
        insert: function(D) {
          b.insert(D + v.map);
        }
      }), C(x ? x + "{" + v.styles + "}" : v.styles), O && (w.inserted[v.name] = !0);
    };
  }
  var w = {
    key: r,
    sheet: new Ge({
      key: r,
      container: a,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: i,
    registered: {},
    insert: d
  };
  return w.sheet.hydrate(c), w;
};
function Et(e) {
  for (var t = 0, r, n = 0, s = e.length; s >= 4; ++n, s -= 4)
    r = e.charCodeAt(n) & 255 | (e.charCodeAt(++n) & 255) << 8 | (e.charCodeAt(++n) & 255) << 16 | (e.charCodeAt(++n) & 255) << 24, r = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), r ^= /* k >>> r: */
    r >>> 24, t = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (s) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(n) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var xt = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, ye = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, Nt = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).", St = /[A-Z]|^ms/g, Le = /_EMO_([^_]+?)_([^]*?)_EMO_/g, fe = function(t) {
  return t.charCodeAt(1) === 45;
}, _e = function(t) {
  return t != null && typeof t != "boolean";
}, re = /* @__PURE__ */ dt(function(e) {
  return fe(e) ? e : e.replace(St, "-$&").toLowerCase();
}), X = function(t, r) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof r == "string")
        return r.replace(Le, function(n, s, i) {
          return R = {
            name: s,
            styles: i,
            next: R
          }, s;
        });
  }
  return xt[t] !== 1 && !fe(t) && typeof r == "number" && r !== 0 ? r + "px" : r;
};
if (process.env.NODE_ENV !== "production") {
  var Ct = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, At = ["normal", "none", "initial", "inherit", "unset"], Rt = X, Ot = /^-ms-/, kt = /-(.)/g, we = {};
  X = function(t, r) {
    if (t === "content" && (typeof r != "string" || At.indexOf(r) === -1 && !Ct.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")))
      throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + r + "\"'`");
    var n = Rt(t, r);
    return n !== "" && !fe(t) && t.indexOf("-") !== -1 && we[t] === void 0 && (we[t] = !0, console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + t.replace(Ot, "ms-").replace(kt, function(s, i) {
      return i.toUpperCase();
    }) + "?")), n;
  };
}
var Ue = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function G(e, t, r) {
  if (r == null)
    return "";
  if (r.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== "production" && r.toString() === "NO_COMPONENT_SELECTOR")
      throw new Error(Ue);
    return r;
  }
  switch (typeof r) {
    case "boolean":
      return "";
    case "object": {
      if (r.anim === 1)
        return R = {
          name: r.name,
          styles: r.styles,
          next: R
        }, r.name;
      if (r.styles !== void 0) {
        var n = r.next;
        if (n !== void 0)
          for (; n !== void 0; )
            R = {
              name: n.name,
              styles: n.styles,
              next: R
            }, n = n.next;
        var s = r.styles + ";";
        return process.env.NODE_ENV !== "production" && r.map !== void 0 && (s += r.map), s;
      }
      return Pt(e, t, r);
    }
    case "function": {
      if (e !== void 0) {
        var i = R, a = r(e);
        return R = i, G(e, t, a);
      } else
        process.env.NODE_ENV !== "production" && console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      break;
    }
    case "string":
      if (process.env.NODE_ENV !== "production") {
        var c = [], d = r.replace(Le, function(p, f, $) {
          var C = "animation" + c.length;
          return c.push("const " + C + " = keyframes`" + $.replace(/^@keyframes animation-\w+/, "") + "`"), "${" + C + "}";
        });
        c.length && console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(c, ["`" + d + "`"]).join(`
`) + `

You should wrap it with \`css\` like this:

` + ("css`" + d + "`"));
      }
      break;
  }
  if (t == null)
    return r;
  var u = t[r];
  return u !== void 0 ? u : r;
}
function Pt(e, t, r) {
  var n = "";
  if (Array.isArray(r))
    for (var s = 0; s < r.length; s++)
      n += G(e, t, r[s]) + ";";
  else
    for (var i in r) {
      var a = r[i];
      if (typeof a != "object")
        t != null && t[a] !== void 0 ? n += i + "{" + t[a] + "}" : _e(a) && (n += re(i) + ":" + X(i, a) + ";");
      else {
        if (i === "NO_COMPONENT_SELECTOR" && process.env.NODE_ENV !== "production")
          throw new Error(Ue);
        if (Array.isArray(a) && typeof a[0] == "string" && (t == null || t[a[0]] === void 0))
          for (var c = 0; c < a.length; c++)
            _e(a[c]) && (n += re(i) + ":" + X(i, a[c]) + ";");
        else {
          var d = G(e, t, a);
          switch (i) {
            case "animation":
            case "animationName": {
              n += re(i) + ":" + d + ";";
              break;
            }
            default:
              process.env.NODE_ENV !== "production" && i === "undefined" && console.error(Nt), n += i + "{" + d + "}";
          }
        }
      }
    }
  return n;
}
var be = /label:\s*([^\s;\n{]+)\s*(;|$)/g, Ve;
process.env.NODE_ENV !== "production" && (Ve = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var R, ne = function(t, r, n) {
  if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
    return t[0];
  var s = !0, i = "";
  R = void 0;
  var a = t[0];
  a == null || a.raw === void 0 ? (s = !1, i += G(n, r, a)) : (process.env.NODE_ENV !== "production" && a[0] === void 0 && console.error(ye), i += a[0]);
  for (var c = 1; c < t.length; c++)
    i += G(n, r, t[c]), s && (process.env.NODE_ENV !== "production" && a[c] === void 0 && console.error(ye), i += a[c]);
  var d;
  process.env.NODE_ENV !== "production" && (i = i.replace(Ve, function($) {
    return d = $, "";
  })), be.lastIndex = 0;
  for (var u = "", p; (p = be.exec(i)) !== null; )
    u += "-" + // $FlowFixMe we know it's not null
    p[1];
  var f = Et(i) + u;
  return process.env.NODE_ENV !== "production" ? {
    name: f,
    styles: i,
    map: d,
    next: R,
    toString: function() {
      return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
    }
  } : {
    name: f,
    styles: i,
    next: R
  };
}, Mt = !0;
function Be(e, t, r) {
  var n = "";
  return r.split(" ").forEach(function(s) {
    e[s] !== void 0 ? t.push(e[s] + ";") : n += s + " ";
  }), n;
}
var Tt = function(t, r, n) {
  var s = t.key + "-" + r.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (n === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  Mt === !1) && t.registered[s] === void 0 && (t.registered[s] = r.styles);
}, Dt = function(t, r, n) {
  Tt(t, r, n);
  var s = t.key + "-" + r.name;
  if (t.inserted[r.name] === void 0) {
    var i = r;
    do
      t.insert(r === i ? "." + s : "", i, t.sheet, !0), i = i.next;
    while (i !== void 0);
  }
};
function Ee(e, t) {
  if (e.inserted[t.name] === void 0)
    return e.insert("", t, e.sheet, !0);
}
function xe(e, t, r) {
  var n = [], s = Be(e, n, r);
  return n.length < 2 ? r : s + t(n);
}
var It = function(t) {
  var r = bt(t);
  r.sheet.speedy = function(c) {
    if (process.env.NODE_ENV !== "production" && this.ctr !== 0)
      throw new Error("speedy must be changed before any rules are inserted");
    this.isSpeedy = c;
  }, r.compat = !0;
  var n = function() {
    for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++)
      u[p] = arguments[p];
    var f = ne(u, r.registered, void 0);
    return Dt(r, f, !1), r.key + "-" + f.name;
  }, s = function() {
    for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++)
      u[p] = arguments[p];
    var f = ne(u, r.registered), $ = "animation-" + f.name;
    return Ee(r, {
      name: f.name,
      styles: "@keyframes " + $ + "{" + f.styles + "}"
    }), $;
  }, i = function() {
    for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++)
      u[p] = arguments[p];
    var f = ne(u, r.registered);
    Ee(r, f);
  }, a = function() {
    for (var d = arguments.length, u = new Array(d), p = 0; p < d; p++)
      u[p] = arguments[p];
    return xe(r.registered, n, Lt(u));
  };
  return {
    css: n,
    cx: a,
    injectGlobal: i,
    keyframes: s,
    hydrate: function(d) {
      d.forEach(function(u) {
        r.inserted[u] = !0;
      });
    },
    flush: function() {
      r.registered = {}, r.inserted = {}, r.sheet.flush();
    },
    // $FlowFixMe
    sheet: r.sheet,
    cache: r,
    getRegisteredStyles: Be.bind(null, r.registered),
    merge: xe.bind(null, r.registered, n)
  };
}, Lt = function e(t) {
  for (var r = "", n = 0; n < t.length; n++) {
    var s = t[n];
    if (s != null) {
      var i = void 0;
      switch (typeof s) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(s))
            i = e(s);
          else {
            i = "";
            for (var a in s)
              s[a] && a && (i && (i += " "), i += a);
          }
          break;
        }
        default:
          i = s;
      }
      i && (r && (r += " "), r += i);
    }
  }
  return r;
}, Ut = It({
  key: "css"
}), I = Ut.css;
class qt extends T {
  constructor() {
    super(...arguments);
    o(this, "_$tag", "Spacer");
  }
  Body() {
    const r = new _.HtmlNode("div");
    return r._$addProp("className", I`
              flex-grow: 1;
            `), [r];
  }
}
function he(e) {
  if (![le.HTML, le.Text].includes(e._$nodeType)) {
    if (e._$tag === "Spacer")
      return !0;
    for (let t of e._$nodes ?? [])
      if (he(t))
        return !0;
  }
  return !1;
}
class Gt extends T {
  constructor() {
    super(...arguments);
    o(this, "_$derivedPairs", {
      margin: ["alignment"]
    });
    o(this, "_$deps", {
      spacing: /* @__PURE__ */ new Map(),
      alignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map(),
      margin: /* @__PURE__ */ new Map()
    });
    o(this, "_$tag", "HStack");
    o(this, "_$$spacing", "_$prop");
    o(this, "spacing", 10);
    o(this, "_$$alignment", "_$prop");
    o(this, "alignment", "top");
    o(this, "_$$width", "_$prop");
    o(this, "width", "100%");
    o(this, "_$$height", "_$prop");
    o(this, "height", "max-content");
    o(this, "margin", () => function() {
      switch (this.alignment) {
        case "top":
          return "0 0 auto 0";
        case "bottom":
          return "auto 0 0 0";
        case "center":
          return "auto 0";
        default:
          return "";
      }
    }.call(this));
  }
  Body() {
    const r = new _.HtmlNode("div");
    return r._$addProp("className", () => I`
              height: ${this.height};
              width: ${this.width};
              column-gap: ${this.spacing}px;
              display: flex;
              flex-direction: row;
            `, this, ["height", "width", "spacing"]), r._$addNodes((() => {
      const n = new _.ForNode();
      return n._$addNodess(() => Array.from(this._$children).map((s) => (() => {
        const i = new _.IfNode();
        return i._$addCond(() => he(s), () => [new _.ExpressionNode(s)]), i._$addCond(() => !0, () => {
          const a = new _.ExpressionNode(s);
          return a._$addProp("className", () => I`
                           flex-shrink: 0;
                           margin: ${this.margin};
                        `, this, ["margin"], !1), [a];
        }), [i];
      })())), [n];
    })()), [r];
  }
}
class Ht extends T {
  constructor() {
    super(...arguments);
    o(this, "_$derivedPairs", {
      margin: ["alignment"]
    });
    o(this, "_$deps", {
      spacing: /* @__PURE__ */ new Map(),
      alignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map(),
      margin: /* @__PURE__ */ new Map()
    });
    o(this, "_$tag", "VStack");
    o(this, "_$$spacing", "_$prop");
    o(this, "spacing", 10);
    o(this, "_$$alignment", "_$prop");
    o(this, "alignment", "leading");
    o(this, "_$$width", "_$prop");
    o(this, "width", "max-content");
    o(this, "_$$height", "_$prop");
    o(this, "height", "100%");
    o(this, "margin", () => function() {
      switch (this.alignment) {
        case "leading":
          return "0 auto 0 0";
        case "tailing":
          return "0 0 0 auto";
        case "center":
          return "0 auto";
        default:
          return "";
      }
    }.call(this));
  }
  Body() {
    const r = new _.HtmlNode("div");
    return r._$addProp("className", () => I`
              height: ${this.height};
              width: ${this.width};
              row-gap: ${this.spacing}px;
              display: flex;
              flex-direction: column;
            `, this, ["height", "width", "spacing"]), r._$addNodes((() => {
      const n = new _.ForNode();
      return n._$addNodess(() => Array.from(this._$children).map((s) => (() => {
        const i = new _.IfNode();
        return i._$addCond(() => he(s), () => [new _.ExpressionNode(s)]), i._$addCond(() => !0, () => {
          const a = new _.ExpressionNode(s);
          return a._$addProp("className", () => I`
                           flex-shrink: 0;
                           margin: ${this.margin};
                        `, this, ["margin"], !1), [a];
        }), [i];
      })())), [n];
    })()), [r];
  }
}
class zt extends T {
  constructor() {
    super(...arguments);
    o(this, "_$deps", {
      hAlignment: /* @__PURE__ */ new Map(),
      vAlignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map()
    });
    o(this, "_$tag", "ZStack");
    o(this, "_$$hAlignment", "_$prop");
    o(this, "hAlignment", "center");
    o(this, "_$$vAlignment", "_$prop");
    o(this, "vAlignment", "center");
    o(this, "_$$width", "_$prop");
    o(this, "width", "max-content");
    o(this, "_$$height", "_$prop");
    o(this, "height", "max-content");
  }
  Body() {
    const r = new _.HtmlNode("div");
    return r._$addProp("className", () => I`
              height: ${this.height};
              width: ${this.width};
              display: grid;
              align-items: ${{
      top: "flex-start",
      center: "center",
      bottom: "flex-end"
    }[this.vAlignment]};
              justify-items: ${{
      leading: "left",
      center: "center",
      tailing: "right"
    }[this.hAlignment]};
            `, this, ["height", "width", "vAlignment", "hAlignment"]), r._$addNodes((() => {
      const n = new _.ForNode();
      return n._$addNodess(() => Array.from(this._$children).map((s) => (() => {
        const i = new _.ExpressionNode(s);
        return i._$addProp("className", I`
                      position: relative;
                      grid-area: 1 / 1/ 1 / 1;
                    `), [i];
      })())), [n];
    })()), [r];
  }
}
function Ne() {
  return location.hash.slice(2);
}
function Se() {
  return location.pathname.slice(1);
}
function Ce(e, t) {
  let r;
  if (e[0] === "/")
    r = e;
  else {
    e[0] !== "." && (e = "./" + e);
    const n = t === "history" ? window.location.pathname : window.location.hash.replace(/^#/, ""), s = e.split("/"), i = n.split("/").filter((c) => c);
    let a = 0;
    for (let c of s) {
      if (![".", ".."].includes(c))
        break;
      c === ".." && (i.length === 0 && console.warn(`no ../ in ${e}`), i.pop()), a++;
    }
    r = "/" + [...i, ...s.slice(a)].join("/");
  }
  return r;
}
class Vt {
  constructor() {
    o(this, "mode", "hash");
  }
  hashTo(t) {
    window.location.href = "#" + Ce(t, this.mode);
  }
  historyTo(t) {
    window.history.pushState({}, "", Ce(t, this.mode));
  }
  to(t) {
    if (this.mode === "hash") {
      this.hashTo(t);
      return;
    }
    this.historyTo(t);
  }
}
class Yt extends T {
  constructor() {
    super(...arguments);
    o(this, "_$deps", {
      _$content: /* @__PURE__ */ new Map()
    });
    o(this, "_$tag", "Route");
    o(this, "_$$_$content", "_$prop");
    o(this, "_$content", " none");
  }
  // 空格不是合法url，所以不会有问题
  Body() {
    return [new _.ExpressionNode(this._$children)];
  }
}
const se = history.pushState;
let L = [];
class Kt extends T {
  constructor() {
    super(...arguments);
    o(this, "_$derivedPairs", {
      currUrl: ["mode"],
      showedRoute: ["currUrl"]
    });
    o(this, "_$deps", {
      mode: /* @__PURE__ */ new Map(),
      navigator: /* @__PURE__ */ new Map(),
      currUrl: /* @__PURE__ */ new Map(),
      showedRoute: /* @__PURE__ */ new Map()
    });
    o(this, "_$tag", "RouterSpace");
    o(this, "_$$mode", "_$prop");
    o(this, "mode", "history");
    o(this, "_$$navigator");
    o(this, "_$$currUrl", () => this.mode === "hash" ? Ne() : Se());
    o(this, "baseUrl", "");
    o(this, "prevPathCondition", "");
    o(this, "prevRoutes", []);
    o(this, "showedRoute", () => function() {
      const r = this.prevPathCondition;
      this.prevPathCondition = "";
      const n = this.currUrl.replace(new RegExp(`^${this.baseUrl}`), "");
      let s = [];
      for (let i of this._$children) {
        if (i._$tag !== "Route") {
          s.push(i);
          continue;
        }
        let a = i._$content, c = !1;
        if (typeof i._$content == "string") {
          a = a.replace(/^(\.\/)+/, "");
          const d = a === "." && n === "", u = (n + "/").startsWith(a + "/");
          c = d || u || a === " none";
        } else
          a instanceof RegExp && (c = a.test(n));
        if (c) {
          if (a === r)
            return this.prevPathCondition = r, this.prevRoutes;
          s.push(i), this.prevPathCondition = a;
          break;
        }
      }
      return this.prevRoutes = s, s;
    }.call(this));
    o(this, "historyChangeListen", () => {
      this.currUrl = Se();
    });
    o(this, "hashChangeListen", () => {
      this.currUrl = Ne();
    });
  }
  get navigator() {
    return this._$$navigator;
  }
  set navigator(r) {
    this._$$navigator !== r && (this._$$navigator = r, this._$runDeps("navigator"));
  }
  get currUrl() {
    return this._$$currUrl;
  }
  set currUrl(r) {
    this._$$currUrl !== r && (this._$$currUrl = r, this._$runDeps("currUrl"));
  }
  didMount() {
    if (this.mode === "hash") {
      addEventListener("load", this.hashChangeListen), addEventListener("hashchange", this.hashChangeListen);
      return;
    }
    addEventListener("load", this.historyChangeListen), addEventListener("popstate", this.historyChangeListen), L.push(this.historyChangeListen), history.pushState = new Proxy(se, {
      apply: (r, n, s) => {
        const i = r.apply(n, s);
        for (let a of L)
          a();
        return i;
      }
    });
  }
  willUnmount() {
    if (this.mode === "hash") {
      removeEventListener("load", this.hashChangeListen), removeEventListener("hashchange", this.hashChangeListen);
      return;
    }
    removeEventListener("load", this.historyChangeListen), removeEventListener("popstate", this.historyChangeListen), L = L.filter((r) => r !== this.historyChangeListen), L.length > 0 ? history.pushState = new Proxy(se, {
      apply: (r, n, s) => {
        const i = r.apply(n, s);
        for (let a of L)
          a();
        return i;
      }
    }) : history.pushState = se;
  }
  AfterConstruct() {
    let r = this._$parentNode;
    for (; r; )
      r._$tag === "Route" && (this.baseUrl = r._$content + "/" + this.baseUrl), r = r._$parentNode;
  }
  Preset() {
    const r = new Vt();
    r.mode = this.mode, r.baseUrl = this.baseUrl, this.navigator = r;
  }
  Body() {
    const r = new _.EnvNode();
    return r._$addNodes((() => [new _.ExpressionNode(() => this.showedRoute, this, ["showedRoute"])])()), r._$addProp("RouteParam", () => ({
      path: this.currUrl,
      navigator: this.navigator
    }), this, ["currUrl", "navigator"], !1), [r];
  }
}
class Zt extends T {
  constructor() {
    super(...arguments);
    o(this, "_$deps", {
      duration: /* @__PURE__ */ new Map(),
      easing: /* @__PURE__ */ new Map(),
      delay: /* @__PURE__ */ new Map()
    });
    o(this, "_$tag", "Transition");
    o(this, "_$$duration", "_$prop");
    o(this, "duration", 0.5);
    o(this, "_$$easing", "_$prop");
    o(this, "easing", "ease-in-out");
    o(this, "_$$delay", "_$prop");
    o(this, "delay", 0);
  }
  Body() {
    const r = new _.ExpressionNode(this._$children);
    return r._$addProp("className", () => I`
              transition: all ${this.duration}s ${this.easing} ${this.delay}s;
            `, this, ["duration", "easing", "delay"], !1), [r];
  }
}
class Jt extends T {
  constructor() {
    super(...arguments);
    o(this, "_$deps", {
      duration: /* @__PURE__ */ new Map(),
      easing: /* @__PURE__ */ new Map(),
      delay: /* @__PURE__ */ new Map(),
      appearWith: /* @__PURE__ */ new Map(),
      disappearWith: /* @__PURE__ */ new Map(),
      movable: /* @__PURE__ */ new Map()
    });
    o(this, "_$tag", "TransitionGroup");
    o(this, "_$duration", 0.5);
    o(this, "_$easing", "ease-in-out");
    o(this, "_$delay", 0);
    o(this, "_$$duration", "_$prop");
    o(this, "duration", this._$duration);
    o(this, "_$$easing", "_$prop");
    o(this, "easing", this._$easing);
    o(this, "_$$delay", "_$prop");
    o(this, "delay", this._$delay);
    o(this, "_duration", (r) => this.parseProp(r, "duration"));
    o(this, "_easing", (r) => this.parseProp(r, "easing"));
    o(this, "_delay", (r) => this.parseProp(r, "delay"));
    o(this, "firstRender", !0);
    o(this, "transition", (r, n) => `all ${this._duration(r)[n]}s ${this._easing(r)[n]} ${this._delay(r)[n]}s`);
    o(this, "_$$appearWith", "_$prop");
    o(this, "appearWith", {
      opacity: 0
    });
    o(this, "_$$disappearWith", "_$prop");
    o(this, "disappearWith", {
      opacity: 0
    });
    o(this, "_$$movable", "_$prop");
    o(this, "movable", !0);
    o(this, "prevElInfos", /* @__PURE__ */ new Map());
    o(this, "removeStore");
    o(this, "lastDisappear", !1);
    o(this, "removeStores");
  }
  // 这里的delay在新建会先把下面的push下去，等delay时间到了再出现，这其实是符合预期的，因为不然你setTimeOut控制它出现
  parseProp(r, n) {
    let s = {};
    const i = this[`_$${n}`], a = this[n];
    typeof a == "object" ? (s.appear = a.appear ?? i, s.firstAppear = a.firstAppear ?? s.appear, s.disappear = a.disappear ?? i, s.lastDisappear = a.lastDisappear ?? s.disappear, s.move = a.move ?? i) : (s.firstAppear = a, s.appear = a, s.disappear = a, s.lastDisappear = a, s.move = a);
    const c = (d) => typeof d == "function" ? d(r) : d;
    return s.appear = c(s.appear) ?? i, s.firstAppear = c(s.firstAppear) ?? s.appear, s.disappear = c(s.disappear) ?? i, s.lastDisappear = c(s.lastDisappear) ?? s.disappear, s.move = c(s.move) ?? i, s;
  }
  resolveDisappear(r) {
    const {
      el: n,
      parentNode: s,
      rect: i,
      idx: a
    } = r;
    n.style.position = "absolute", n.style.transition = this.lastDisappear ? this.transition(n, "lastDisappear") : this.transition(n, "disappear"), n.style.margin = "", n.style.transform = "", oe(n, (c) => {
      c.style.margin = "", c.style.transform = "";
    }), n.style.top = `${i.top}px`, n.style.left = `${i.left}px`, s.childNodes.length >= a ? s.appendChild(n) : s.insertBefore(n, s.childNodes[a]), requestAnimationFrame(() => {
      const c = () => {
        n.removeEventListener("transitionend", c), n.remove();
      };
      n.addEventListener("transitionend", c), Re(n, this.disappearWith);
    });
  }
  // ---- 最后一次消失
  willUnmount() {
    this.lastDisappear = !0;
    const r = this._$el;
    this.removeStores = [];
    for (let n of r)
      this.removeStores.push(Ae(n));
  }
  didUnmount() {
    for (let r of this.removeStores)
      this.resolveDisappear(r);
  }
  Body() {
    const r = new _.ExpressionNode(this._$children);
    return r._$onUpdateNodes(() => {
      for (let [n, s] of this.prevElInfos.entries())
        if (this.movable) {
          n.style.transform = "";
          const i = {
            rect: n.getBoundingClientRect(),
            stopTrigger: s.stopTrigger
          };
          if (this.prevElInfos.set(n, i), i.stopTrigger)
            continue;
          s.stopTrigger = !0;
          const a = s.rect.x - i.rect.x, c = s.rect.y - i.rect.y;
          Bt(n, this._duration(n).move, this._easing(n).move, this._delay(n).move, a, c, i);
        }
    }), r._$addProp("didAppear", (n) => {
      if (n.style.transition = this.firstRender ? this.transition(n, "firstAppear") : this.transition(n, "appear"), oe(n, (a) => {
        a.style.transition = this.firstRender ? this.transition(a, "firstAppear") : this.transition(a, "appear");
      }), requestAnimationFrame(() => {
        this.prevElInfos.set(n, {
          rect: n.getBoundingClientRect(),
          stopTrigger: !0
        });
      }), !this.appearWith)
        return;
      const s = n.style.cssText;
      Re(n, this.appearWith);
      const i = this.firstRender;
      requestAnimationFrame(() => {
        n.setAttribute("style", s);
        const a = () => {
          const c = this.prevElInfos.get(n);
          c.rect = n.getBoundingClientRect(), c.stopTrigger = !1, n.removeEventListener("transitionend", a);
        };
        n.addEventListener("transitionend", a), this.firstRender && (this.firstRender = !1), setTimeout(() => {
          this.prevElInfos.get(n).stopTrigger = !1;
        }, this._duration(n).appear * 1e3), i && requestAnimationFrame(() => {
          n.style.transition = this.transition(n, "appear");
        });
      });
    }), r._$addProp("willDisappear", (n) => {
      this.lastDisappear || (this.removeStore = Ae(n), this.prevElInfos.delete(n));
    }), r._$addProp("didDisappear", () => {
      this.lastDisappear || this.resolveDisappear(this.removeStore);
    }), [r];
  }
}
function Ae(e) {
  var t;
  return {
    el: e.cloneNode(!0),
    parentNode: e.parentNode,
    rect: {
      top: e.offsetTop,
      left: e.offsetLeft
    },
    idx: Array.from(((t = e.parentNode) == null ? void 0 : t.childNodes) ?? []).indexOf(e)
  };
}
function oe(e, t) {
  e.nodeType !== Node.TEXT_NODE && (t(e), e.childNodes.forEach((r) => oe(r, t)));
}
function Re(e, t) {
  typeof t == "function" && (t = t(e));
  const r = e.style.cssText;
  if (typeof t == "string")
    e.setAttribute("style", r + t);
  else
    for (let [n, s] of Object.entries(t))
      e.style[n] = s;
}
function Bt(e, t, r, n, s, i, a) {
  let c, d, u = !1;
  const p = `all ${t}s ${r} ${n}s`;
  function f($) {
    c === void 0 && (c = $, e.style.transition = p + ", transform 0s");
    const C = $ - c;
    if (d !== $) {
      const w = Math.max(C / (t * 1e3) - n, 0), h = w * s, x = w * i;
      w >= 1 ? (e.style.transform = "", u = !0) : e.style.transform = `translate(${s - h}px, ${i - x}px)`, a.rect = e.getBoundingClientRect();
    }
    d = $, !u && !a.stopTrigger ? requestAnimationFrame(f) : e.style.transition = p;
  }
  requestAnimationFrame(f);
}
class Xt extends T {
  constructor() {
    super(...arguments);
    o(this, "_$deps", {
      _$content: /* @__PURE__ */ new Map()
    });
    o(this, "_$tag", "Case");
    o(this, "_$$_$content", "_$prop");
    o(this, "_$content", " default");
  }
  Body() {
    return [];
  }
}
var Ft = void 0;
class Qt extends T {
  constructor() {
    super(...arguments);
    o(this, "_$derivedPairs", {
      caseChildren: ["_$content"]
    });
    o(this, "_$deps", {
      _$content: /* @__PURE__ */ new Map(),
      caseChildren: /* @__PURE__ */ new Map()
    });
    o(this, "_$tag", "Switch");
    o(this, "_$$_$content", "_$prop");
    o(this, "_$content", Ft);
    o(this, "caseChildren", () => function() {
      let r = [];
      for (let n of this._$children) {
        if (n._$tag !== "Case") {
          r.push(n);
          continue;
        }
        if (this._$content === n._$content || n._$content === " default") {
          r.push(...n._$children);
          break;
        }
      }
      return r;
    }.call(this));
  }
  Body() {
    return [new _.ExpressionNode(() => this.caseChildren, this, ["caseChildren"])];
  }
}
export {
  Xt as Case,
  Gt as HStack,
  Vt as Navigator,
  Yt as Route,
  Kt as RouterSpace,
  qt as Spacer,
  Qt as Switch,
  Zt as Transition,
  Jt as TransitionGroup,
  Ht as VStack,
  zt as ZStack
};
