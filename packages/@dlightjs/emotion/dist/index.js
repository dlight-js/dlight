var _e = Object.defineProperty;
var Re = (e, r, n) => r in e ? _e(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[r] = n;
var Q = (e, r, n) => (Re(e, typeof r != "symbol" ? r + "" : r, n), n);
import { View as ce } from "@dlightjs/dlight";
function Ie(e) {
  if (e.sheet)
    return e.sheet;
  for (var r = 0; r < document.styleSheets.length; r++)
    if (document.styleSheets[r].ownerNode === e)
      return document.styleSheets[r];
}
function Pe(e) {
  var r = document.createElement("style");
  return r.setAttribute("data-emotion", e.key), e.nonce !== void 0 && r.setAttribute("nonce", e.nonce), r.appendChild(document.createTextNode("")), r.setAttribute("data-s", ""), r;
}
var Ve = /* @__PURE__ */ function() {
  function e(n) {
    var s = this;
    this._insertTag = function(i) {
      var a;
      s.tags.length === 0 ? s.insertionPoint ? a = s.insertionPoint.nextSibling : s.prepend ? a = s.container.firstChild : a = s.before : a = s.tags[s.tags.length - 1].nextSibling, s.container.insertBefore(i, a), s.tags.push(i);
    }, this.isSpeedy = n.speedy === void 0 ? process.env.NODE_ENV === "production" : n.speedy, this.tags = [], this.ctr = 0, this.nonce = n.nonce, this.key = n.key, this.container = n.container, this.prepend = n.prepend, this.insertionPoint = n.insertionPoint, this.before = null;
  }
  var r = e.prototype;
  return r.hydrate = function(s) {
    s.forEach(this._insertTag);
  }, r.insert = function(s) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Pe(this));
    var i = this.tags[this.tags.length - 1];
    if (process.env.NODE_ENV !== "production") {
      var a = s.charCodeAt(0) === 64 && s.charCodeAt(1) === 105;
      a && this._alreadyInsertedOrderInsensitiveRule && console.error(`You're attempting to insert the following rule:
` + s + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."), this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !a;
    }
    if (this.isSpeedy) {
      var o = Ie(i);
      try {
        o.insertRule(s, o.cssRules.length);
      } catch (c) {
        process.env.NODE_ENV !== "production" && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(s) && console.error('There was a problem inserting the following rule: "' + s + '"', c);
      }
    } else
      i.appendChild(document.createTextNode(s));
    this.ctr++;
  }, r.flush = function() {
    this.tags.forEach(function(s) {
      return s.parentNode && s.parentNode.removeChild(s);
    }), this.tags = [], this.ctr = 0, process.env.NODE_ENV !== "production" && (this._alreadyInsertedOrderInsensitiveRule = !1);
  }, e;
}(), x = "-ms-", B = "-moz-", l = "-webkit-", ne = "comm", se = "rule", ae = "decl", De = "@import", ve = "@keyframes", Te = Math.abs, J = String.fromCharCode, Me = Object.assign;
function je(e, r) {
  return E(e, 0) ^ 45 ? (((r << 2 ^ E(e, 0)) << 2 ^ E(e, 1)) << 2 ^ E(e, 2)) << 2 ^ E(e, 3) : 0;
}
function we(e) {
  return e.trim();
}
function Le(e, r) {
  return (e = r.exec(e)) ? e[0] : e;
}
function h(e, r, n) {
  return e.replace(r, n);
}
function re(e, r) {
  return e.indexOf(r);
}
function E(e, r) {
  return e.charCodeAt(r) | 0;
}
function L(e, r, n) {
  return e.slice(r, n);
}
function R(e) {
  return e.length;
}
function ie(e) {
  return e.length;
}
function G(e, r) {
  return r.push(e), e;
}
function qe(e, r) {
  return e.map(r).join("");
}
var H = 1, D = 1, Ee = 0, O = 0, g = 0, T = "";
function Z(e, r, n, s, i, a, o) {
  return { value: e, root: r, parent: n, type: s, props: i, children: a, line: H, column: D, length: o, return: "" };
}
function j(e, r) {
  return Me(Z("", null, null, "", null, null, 0), e, { length: -e.length }, r);
}
function We() {
  return g;
}
function ze() {
  return g = O > 0 ? E(T, --O) : 0, D--, g === 10 && (D = 1, H--), g;
}
function k() {
  return g = O < Ee ? E(T, O++) : 0, D++, g === 10 && (D = 1, H++), g;
}
function I() {
  return E(T, O);
}
function Y() {
  return O;
}
function z(e, r) {
  return L(T, e, r);
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
function xe(e) {
  return H = D = 1, Ee = R(T = e), O = 0, [];
}
function Ne(e) {
  return T = "", e;
}
function U(e) {
  return we(z(O - 1, te(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Ge(e) {
  for (; (g = I()) && g < 33; )
    k();
  return q(e) > 2 || q(g) > 3 ? "" : " ";
}
function Ye(e, r) {
  for (; --r && k() && !(g < 48 || g > 102 || g > 57 && g < 65 || g > 70 && g < 97); )
    ;
  return z(e, Y() + (r < 6 && I() == 32 && k() == 32));
}
function te(e) {
  for (; k(); )
    switch (g) {
      case e:
        return O;
      case 34:
      case 39:
        e !== 34 && e !== 39 && te(g);
        break;
      case 40:
        e === 41 && te(e);
        break;
      case 92:
        k();
        break;
    }
  return O;
}
function Ue(e, r) {
  for (; k() && e + g !== 47 + 10; )
    if (e + g === 42 + 42 && I() === 47)
      break;
  return "/*" + z(r, O - 1) + "*" + J(e === 47 ? e : k());
}
function Fe(e) {
  for (; !q(I()); )
    k();
  return z(e, O);
}
function Be(e) {
  return Ne(F("", null, null, null, [""], e = xe(e), 0, [0], e));
}
function F(e, r, n, s, i, a, o, c, u) {
  for (var d = 0, f = 0, p = o, v = 0, $ = 0, N = 0, m = 1, S = 1, y = 1, w = 0, A = "", M = i, P = a, _ = s, b = A; S; )
    switch (N = w, w = k()) {
      case 40:
        if (N != 108 && E(b, p - 1) == 58) {
          re(b += h(U(w), "&", "&\f"), "&\f") != -1 && (y = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        b += U(w);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        b += Ge(N);
        break;
      case 92:
        b += Ye(Y() - 1, 7);
        continue;
      case 47:
        switch (I()) {
          case 42:
          case 47:
            G(Ke(Ue(k(), Y()), r, n), u);
            break;
          default:
            b += "/";
        }
        break;
      case 123 * m:
        c[d++] = R(b) * y;
      case 125 * m:
      case 59:
      case 0:
        switch (w) {
          case 0:
          case 125:
            S = 0;
          case 59 + f:
            $ > 0 && R(b) - p && G($ > 32 ? ue(b + ";", s, n, p - 1) : ue(h(b, " ", "") + ";", s, n, p - 2), u);
            break;
          case 59:
            b += ";";
          default:
            if (G(_ = fe(b, r, n, d, f, i, c, A, M = [], P = [], p), a), w === 123)
              if (f === 0)
                F(b, r, _, _, M, a, p, c, P);
              else
                switch (v === 99 && E(b, 3) === 110 ? 100 : v) {
                  case 100:
                  case 109:
                  case 115:
                    F(e, _, _, s && G(fe(e, _, _, 0, 0, i, c, A, i, M = [], p), P), i, P, p, c, s ? M : P);
                    break;
                  default:
                    F(b, _, _, _, [""], P, 0, c, P);
                }
        }
        d = f = $ = 0, m = y = 1, A = b = "", p = o;
        break;
      case 58:
        p = 1 + R(b), $ = N;
      default:
        if (m < 1) {
          if (w == 123)
            --m;
          else if (w == 125 && m++ == 0 && ze() == 125)
            continue;
        }
        switch (b += J(w), w * m) {
          case 38:
            y = f > 0 ? 1 : (b += "\f", -1);
            break;
          case 44:
            c[d++] = (R(b) - 1) * y, y = 1;
            break;
          case 64:
            I() === 45 && (b += U(k())), v = I(), f = p = R(A = b += Fe(Y())), w++;
            break;
          case 45:
            N === 45 && R(b) == 2 && (m = 0);
        }
    }
  return a;
}
function fe(e, r, n, s, i, a, o, c, u, d, f) {
  for (var p = i - 1, v = i === 0 ? a : [""], $ = ie(v), N = 0, m = 0, S = 0; N < s; ++N)
    for (var y = 0, w = L(e, p + 1, p = Te(m = o[N])), A = e; y < $; ++y)
      (A = we(m > 0 ? v[y] + " " + w : h(w, /&\f/g, v[y]))) && (u[S++] = A);
  return Z(e, r, n, i === 0 ? se : c, u, d, f);
}
function Ke(e, r, n) {
  return Z(e, r, n, ne, J(We()), L(e, 2, -2), 0);
}
function ue(e, r, n, s) {
  return Z(e, r, n, ae, L(e, 0, s), L(e, s + 1, -1), s);
}
function V(e, r) {
  for (var n = "", s = ie(e), i = 0; i < s; i++)
    n += r(e[i], i, e, r) || "";
  return n;
}
function Je(e, r, n, s) {
  switch (e.type) {
    case De:
    case ae:
      return e.return = e.return || e.value;
    case ne:
      return "";
    case ve:
      return e.return = e.value + "{" + V(e.children, s) + "}";
    case se:
      e.value = e.props.join(",");
  }
  return R(n = V(e.children, s)) ? e.return = e.value + "{" + n + "}" : "";
}
function He(e) {
  var r = ie(e);
  return function(n, s, i, a) {
    for (var o = "", c = 0; c < r; c++)
      o += e[c](n, s, i, a) || "";
    return o;
  };
}
function Ze(e) {
  return function(r) {
    r.root || (r = r.return) && e(r);
  };
}
function Qe(e) {
  var r = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return r[n] === void 0 && (r[n] = e(n)), r[n];
  };
}
var Xe = function(r, n, s) {
  for (var i = 0, a = 0; i = a, a = I(), i === 38 && a === 12 && (n[s] = 1), !q(a); )
    k();
  return z(r, O);
}, er = function(r, n) {
  var s = -1, i = 44;
  do
    switch (q(i)) {
      case 0:
        i === 38 && I() === 12 && (n[s] = 1), r[s] += Xe(O - 1, n, s);
        break;
      case 2:
        r[s] += U(i);
        break;
      case 4:
        if (i === 44) {
          r[++s] = I() === 58 ? "&\f" : "", n[s] = r[s].length;
          break;
        }
      default:
        r[s] += J(i);
    }
  while (i = k());
  return r;
}, rr = function(r, n) {
  return Ne(er(xe(r), n));
}, de = /* @__PURE__ */ new WeakMap(), tr = function(r) {
  if (!(r.type !== "rule" || !r.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  r.length < 1)) {
    for (var n = r.value, s = r.parent, i = r.column === s.column && r.line === s.line; s.type !== "rule"; )
      if (s = s.parent, !s)
        return;
    if (!(r.props.length === 1 && n.charCodeAt(0) !== 58 && !de.get(s)) && !i) {
      de.set(r, !0);
      for (var a = [], o = rr(n, a), c = s.props, u = 0, d = 0; u < o.length; u++)
        for (var f = 0; f < c.length; f++, d++)
          r.props[d] = a[u] ? o[u].replace(/&\f/g, c[f]) : c[f] + " " + o[u];
    }
  }
}, nr = function(r) {
  if (r.type === "decl") {
    var n = r.value;
    // charcode for l
    n.charCodeAt(0) === 108 && // charcode for b
    n.charCodeAt(2) === 98 && (r.return = "", r.value = "");
  }
}, sr = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason", ar = function(r) {
  return r.type === "comm" && r.children.indexOf(sr) > -1;
}, ir = function(r) {
  return function(n, s, i) {
    if (!(n.type !== "rule" || r.compat)) {
      var a = n.value.match(/(:first|:nth|:nth-last)-child/g);
      if (a) {
        for (var o = n.parent === i[0], c = o ? i[0].children : (
          // global rule at the root level
          i
        ), u = c.length - 1; u >= 0; u--) {
          var d = c[u];
          if (d.line < n.line)
            break;
          if (d.column < n.column) {
            if (ar(d))
              return;
            break;
          }
        }
        a.forEach(function(f) {
          console.error('The pseudo class "' + f + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + f.split("-child")[0] + '-of-type".');
        });
      }
    }
  };
}, Se = function(r) {
  return r.type.charCodeAt(1) === 105 && r.type.charCodeAt(0) === 64;
}, or = function(r, n) {
  for (var s = r - 1; s >= 0; s--)
    if (!Se(n[s]))
      return !0;
  return !1;
}, le = function(r) {
  r.type = "", r.value = "", r.return = "", r.children = "", r.props = "";
}, cr = function(r, n, s) {
  Se(r) && (r.parent ? (console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."), le(r)) : or(n, s) && (console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."), le(r)));
};
function Oe(e, r) {
  switch (je(e, r)) {
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
      return l + e + B + e + x + e + e;
    case 6828:
    case 4268:
      return l + e + x + e + e;
    case 6165:
      return l + e + x + "flex-" + e + e;
    case 5187:
      return l + e + h(e, /(\w+).+(:[^]+)/, l + "box-$1$2" + x + "flex-$1$2") + e;
    case 5443:
      return l + e + x + "flex-item-" + h(e, /flex-|-self/, "") + e;
    case 4675:
      return l + e + x + "flex-line-pack" + h(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return l + e + x + h(e, "shrink", "negative") + e;
    case 5292:
      return l + e + x + h(e, "basis", "preferred-size") + e;
    case 6060:
      return l + "box-" + h(e, "-grow", "") + l + e + x + h(e, "grow", "positive") + e;
    case 4554:
      return l + h(e, /([^-])(transform)/g, "$1" + l + "$2") + e;
    case 6187:
      return h(h(h(e, /(zoom-|grab)/, l + "$1"), /(image-set)/, l + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return h(e, /(image-set\([^]*)/, l + "$1$`$1");
    case 4968:
      return h(h(e, /(.+:)(flex-)?(.*)/, l + "box-pack:$3" + x + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + l + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return h(e, /(.+)-inline(.+)/, l + "$1$2") + e;
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
      if (R(e) - 1 - r > 6)
        switch (E(e, r + 1)) {
          case 109:
            if (E(e, r + 4) !== 45)
              break;
          case 102:
            return h(e, /(.+:)(.+)-([^]+)/, "$1" + l + "$2-$3$1" + B + (E(e, r + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~re(e, "stretch") ? Oe(h(e, "stretch", "fill-available"), r) + e : e;
        }
      break;
    case 4949:
      if (E(e, r + 1) !== 115)
        break;
    case 6444:
      switch (E(e, R(e) - 3 - (~re(e, "!important") && 10))) {
        case 107:
          return h(e, ":", ":" + l) + e;
        case 101:
          return h(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + l + (E(e, 14) === 45 ? "inline-" : "") + "box$3$1" + l + "$2$3$1" + x + "$2box$3") + e;
      }
      break;
    case 5936:
      switch (E(e, r + 11)) {
        case 114:
          return l + e + x + h(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return l + e + x + h(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return l + e + x + h(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return l + e + x + e + e;
  }
  return e;
}
var fr = function(r, n, s, i) {
  if (r.length > -1 && !r.return)
    switch (r.type) {
      case ae:
        r.return = Oe(r.value, r.length);
        break;
      case ve:
        return V([j(r, {
          value: h(r.value, "@", "@" + l)
        })], i);
      case se:
        if (r.length)
          return qe(r.props, function(a) {
            switch (Le(a, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return V([j(r, {
                  props: [h(a, /:(read-\w+)/, ":" + B + "$1")]
                })], i);
              case "::placeholder":
                return V([j(r, {
                  props: [h(a, /:(plac\w+)/, ":" + l + "input-$1")]
                }), j(r, {
                  props: [h(a, /:(plac\w+)/, ":" + B + "$1")]
                }), j(r, {
                  props: [h(a, /:(plac\w+)/, x + "input-$1")]
                })], i);
            }
            return "";
          });
    }
}, ur = [fr], dr = function(r) {
  var n = r.key;
  if (process.env.NODE_ENV !== "production" && !n)
    throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
  if (n === "css") {
    var s = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(s, function(m) {
      var S = m.getAttribute("data-emotion");
      S.indexOf(" ") !== -1 && (document.head.appendChild(m), m.setAttribute("data-s", ""));
    });
  }
  var i = r.stylisPlugins || ur;
  if (process.env.NODE_ENV !== "production" && /[^a-z-]/.test(n))
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + n + '" was passed');
  var a = {}, o, c = [];
  o = r.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
    function(m) {
      for (var S = m.getAttribute("data-emotion").split(" "), y = 1; y < S.length; y++)
        a[S[y]] = !0;
      c.push(m);
    }
  );
  var u, d = [tr, nr];
  process.env.NODE_ENV !== "production" && d.push(ir({
    get compat() {
      return N.compat;
    }
  }), cr);
  {
    var f, p = [Je, process.env.NODE_ENV !== "production" ? function(m) {
      m.root || (m.return ? f.insert(m.return) : m.value && m.type !== ne && f.insert(m.value + "{}"));
    } : Ze(function(m) {
      f.insert(m);
    })], v = He(d.concat(i, p)), $ = function(S) {
      return V(Be(S), v);
    };
    u = function(S, y, w, A) {
      f = w, process.env.NODE_ENV !== "production" && y.map !== void 0 && (f = {
        insert: function(P) {
          w.insert(P + y.map);
        }
      }), $(S ? S + "{" + y.styles + "}" : y.styles), A && (N.inserted[y.name] = !0);
    };
  }
  var N = {
    key: n,
    sheet: new Ve({
      key: n,
      container: o,
      nonce: r.nonce,
      speedy: r.speedy,
      prepend: r.prepend,
      insertionPoint: r.insertionPoint
    }),
    nonce: r.nonce,
    inserted: a,
    registered: {},
    insert: u
  };
  return N.sheet.hydrate(c), N;
};
function lr(e) {
  for (var r = 0, n, s = 0, i = e.length; i >= 4; ++s, i -= 4)
    n = e.charCodeAt(s) & 255 | (e.charCodeAt(++s) & 255) << 8 | (e.charCodeAt(++s) & 255) << 16 | (e.charCodeAt(++s) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, r = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  switch (i) {
    case 3:
      r ^= (e.charCodeAt(s + 2) & 255) << 16;
    case 2:
      r ^= (e.charCodeAt(s + 1) & 255) << 8;
    case 1:
      r ^= e.charCodeAt(s) & 255, r = /* Math.imul(h, m): */
      (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  }
  return r ^= r >>> 13, r = /* Math.imul(h, m): */
  (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), ((r ^ r >>> 15) >>> 0).toString(36);
}
var hr = {
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
}, he = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, pr = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).", mr = /[A-Z]|^ms/g, ke = /_EMO_([^_]+?)_([^]*?)_EMO_/g, oe = function(r) {
  return r.charCodeAt(1) === 45;
}, pe = function(r) {
  return r != null && typeof r != "boolean";
}, X = /* @__PURE__ */ Qe(function(e) {
  return oe(e) ? e : e.replace(mr, "-$&").toLowerCase();
}), K = function(r, n) {
  switch (r) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(ke, function(s, i, a) {
          return C = {
            name: i,
            styles: a,
            next: C
          }, i;
        });
  }
  return hr[r] !== 1 && !oe(r) && typeof n == "number" && n !== 0 ? n + "px" : n;
};
if (process.env.NODE_ENV !== "production") {
  var br = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, yr = ["normal", "none", "initial", "inherit", "unset"], gr = K, vr = /^-ms-/, wr = /-(.)/g, me = {};
  K = function(r, n) {
    if (r === "content" && (typeof n != "string" || yr.indexOf(n) === -1 && !br.test(n) && (n.charAt(0) !== n.charAt(n.length - 1) || n.charAt(0) !== '"' && n.charAt(0) !== "'")))
      throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + n + "\"'`");
    var s = gr(r, n);
    return s !== "" && !oe(r) && r.indexOf("-") !== -1 && me[r] === void 0 && (me[r] = !0, console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + r.replace(vr, "ms-").replace(wr, function(i, a) {
      return a.toUpperCase();
    }) + "?")), s;
  };
}
var $e = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function W(e, r, n) {
  if (n == null)
    return "";
  if (n.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== "production" && n.toString() === "NO_COMPONENT_SELECTOR")
      throw new Error($e);
    return n;
  }
  switch (typeof n) {
    case "boolean":
      return "";
    case "object": {
      if (n.anim === 1)
        return C = {
          name: n.name,
          styles: n.styles,
          next: C
        }, n.name;
      if (n.styles !== void 0) {
        var s = n.next;
        if (s !== void 0)
          for (; s !== void 0; )
            C = {
              name: s.name,
              styles: s.styles,
              next: C
            }, s = s.next;
        var i = n.styles + ";";
        return process.env.NODE_ENV !== "production" && n.map !== void 0 && (i += n.map), i;
      }
      return Er(e, r, n);
    }
    case "function": {
      if (e !== void 0) {
        var a = C, o = n(e);
        return C = a, W(e, r, o);
      } else
        process.env.NODE_ENV !== "production" && console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      break;
    }
    case "string":
      if (process.env.NODE_ENV !== "production") {
        var c = [], u = n.replace(ke, function(f, p, v) {
          var $ = "animation" + c.length;
          return c.push("const " + $ + " = keyframes`" + v.replace(/^@keyframes animation-\w+/, "") + "`"), "${" + $ + "}";
        });
        c.length && console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(c, ["`" + u + "`"]).join(`
`) + `

You should wrap it with \`css\` like this:

` + ("css`" + u + "`"));
      }
      break;
  }
  if (r == null)
    return n;
  var d = r[n];
  return d !== void 0 ? d : n;
}
function Er(e, r, n) {
  var s = "";
  if (Array.isArray(n))
    for (var i = 0; i < n.length; i++)
      s += W(e, r, n[i]) + ";";
  else
    for (var a in n) {
      var o = n[a];
      if (typeof o != "object")
        r != null && r[o] !== void 0 ? s += a + "{" + r[o] + "}" : pe(o) && (s += X(a) + ":" + K(a, o) + ";");
      else {
        if (a === "NO_COMPONENT_SELECTOR" && process.env.NODE_ENV !== "production")
          throw new Error($e);
        if (Array.isArray(o) && typeof o[0] == "string" && (r == null || r[o[0]] === void 0))
          for (var c = 0; c < o.length; c++)
            pe(o[c]) && (s += X(a) + ":" + K(a, o[c]) + ";");
        else {
          var u = W(e, r, o);
          switch (a) {
            case "animation":
            case "animationName": {
              s += X(a) + ":" + u + ";";
              break;
            }
            default:
              process.env.NODE_ENV !== "production" && a === "undefined" && console.error(pr), s += a + "{" + u + "}";
          }
        }
      }
    }
  return s;
}
var be = /label:\s*([^\s;\n{]+)\s*(;|$)/g, Ce;
process.env.NODE_ENV !== "production" && (Ce = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var C, ee = function(r, n, s) {
  if (r.length === 1 && typeof r[0] == "object" && r[0] !== null && r[0].styles !== void 0)
    return r[0];
  var i = !0, a = "";
  C = void 0;
  var o = r[0];
  o == null || o.raw === void 0 ? (i = !1, a += W(s, n, o)) : (process.env.NODE_ENV !== "production" && o[0] === void 0 && console.error(he), a += o[0]);
  for (var c = 1; c < r.length; c++)
    a += W(s, n, r[c]), i && (process.env.NODE_ENV !== "production" && o[c] === void 0 && console.error(he), a += o[c]);
  var u;
  process.env.NODE_ENV !== "production" && (a = a.replace(Ce, function(v) {
    return u = v, "";
  })), be.lastIndex = 0;
  for (var d = "", f; (f = be.exec(a)) !== null; )
    d += "-" + // $FlowFixMe we know it's not null
    f[1];
  var p = lr(a) + d;
  return process.env.NODE_ENV !== "production" ? {
    name: p,
    styles: a,
    map: u,
    next: C,
    toString: function() {
      return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
    }
  } : {
    name: p,
    styles: a,
    next: C
  };
}, xr = !0;
function Ae(e, r, n) {
  var s = "";
  return n.split(" ").forEach(function(i) {
    e[i] !== void 0 ? r.push(e[i] + ";") : s += i + " ";
  }), s;
}
var Nr = function(r, n, s) {
  var i = r.key + "-" + n.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (s === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  xr === !1) && r.registered[i] === void 0 && (r.registered[i] = n.styles);
}, Sr = function(r, n, s) {
  Nr(r, n, s);
  var i = r.key + "-" + n.name;
  if (r.inserted[n.name] === void 0) {
    var a = n;
    do
      r.insert(n === a ? "." + i : "", a, r.sheet, !0), a = a.next;
    while (a !== void 0);
  }
};
function ye(e, r) {
  if (e.inserted[r.name] === void 0)
    return e.insert("", r, e.sheet, !0);
}
function ge(e, r, n) {
  var s = [], i = Ae(e, s, n);
  return s.length < 2 ? n : i + r(s);
}
var Or = function(r) {
  var n = dr(r);
  n.sheet.speedy = function(c) {
    if (process.env.NODE_ENV !== "production" && this.ctr !== 0)
      throw new Error("speedy must be changed before any rules are inserted");
    this.isSpeedy = c;
  }, n.compat = !0;
  var s = function() {
    for (var u = arguments.length, d = new Array(u), f = 0; f < u; f++)
      d[f] = arguments[f];
    var p = ee(d, n.registered, void 0);
    return Sr(n, p, !1), n.key + "-" + p.name;
  }, i = function() {
    for (var u = arguments.length, d = new Array(u), f = 0; f < u; f++)
      d[f] = arguments[f];
    var p = ee(d, n.registered), v = "animation-" + p.name;
    return ye(n, {
      name: p.name,
      styles: "@keyframes " + v + "{" + p.styles + "}"
    }), v;
  }, a = function() {
    for (var u = arguments.length, d = new Array(u), f = 0; f < u; f++)
      d[f] = arguments[f];
    var p = ee(d, n.registered);
    ye(n, p);
  }, o = function() {
    for (var u = arguments.length, d = new Array(u), f = 0; f < u; f++)
      d[f] = arguments[f];
    return ge(n.registered, s, kr(d));
  };
  return {
    css: s,
    cx: o,
    injectGlobal: a,
    keyframes: i,
    hydrate: function(u) {
      u.forEach(function(d) {
        n.inserted[d] = !0;
      });
    },
    flush: function() {
      n.registered = {}, n.inserted = {}, n.sheet.flush();
    },
    // $FlowFixMe
    sheet: n.sheet,
    cache: n,
    getRegisteredStyles: Ae.bind(null, n.registered),
    merge: ge.bind(null, n.registered, s)
  };
}, kr = function e(r) {
  for (var n = "", s = 0; s < r.length; s++) {
    var i = r[s];
    if (i != null) {
      var a = void 0;
      switch (typeof i) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(i))
            a = e(i);
          else {
            a = "";
            for (var o in i)
              i[o] && o && (a && (a += " "), a += o);
          }
          break;
        }
        default:
          a = i;
      }
      a && (n && (n += " "), n += a);
    }
  }
  return n;
}, $r = Or({
  key: "css"
}), Cr = $r.css, Ar = null;
const t = (e) => (r, ...n) => {
  const s = (i, a) => {
    const o = [...new Set(Object.getOwnPropertyNames(a).filter((c) => a[c] === "_$prop").map((c) => c.replace(/^_\$*/, "")))];
    i._$addProp("className", () => {
      const c = {};
      for (const f of o)
        c[f] = a[`_$$${f}`];
      let u = "";
      const d = Math.max(r.length, n.length);
      for (const f of [...Array(d).keys()])
        r[f] && (u += r[f]), n[f] && (typeof n[f] == "function" ? u += n[f](c) : u += n[f]);
      return Cr`${u}`;
    }, a, o);
  };
  return typeof e == "string" ? class extends ce {
    constructor() {
      super(...arguments);
      Q(this, "_$forwardProps", !0);
    }
    Afterset() {
      this._$el = this._$el[0];
    }
    Body() {
      const o = new (Ar(e))();
      return o._$addProp("_$content", this._$content), this.forwardProps(o), ((c) => {
        s(c, this);
      })(o), [o];
    }
  } : class extends ce {
    constructor() {
      super(...arguments);
      Q(this, "_$forwardProps", !0);
    }
    Body() {
      const o = new e();
      return this.forwardProps(o), ((c) => {
        s(c, this);
      })(o), [o];
    }
  };
};
t.a = t("a");
t.abbr = t("abbr");
t.address = t("address");
t.area = t("area");
t.article = t("article");
t.aside = t("aside");
t.audio = t("audio");
t.b = t("b");
t.base = t("base");
t.bdi = t("bdi");
t.bdo = t("bdo");
t.blockquote = t("blockquote");
t.body = t("body");
t.br = t("br");
t.button = t("button");
t.canvas = t("canvas");
t.caption = t("caption");
t.cite = t("cite");
t.code = t("code");
t.col = t("col");
t.colgroup = t("colgroup");
t.data = t("data");
t.datalist = t("datalist");
t.dd = t("dd");
t.del = t("del");
t.details = t("details");
t.dfn = t("dfn");
t.dialog = t("dialog");
t.div = t("div");
t.dl = t("dl");
t.dt = t("dt");
t.em = t("em");
t.embed = t("embed");
t.fieldset = t("fieldset");
t.figcaption = t("figcaption");
t.figure = t("figure");
t.footer = t("footer");
t.form = t("form");
t.h1 = t("h1");
t.h2 = t("h2");
t.h3 = t("h3");
t.h4 = t("h4");
t.h5 = t("h5");
t.h6 = t("h6");
t.head = t("head");
t.header = t("header");
t.hgroup = t("hgroup");
t.hr = t("hr");
t.html = t("html");
t.i = t("i");
t.iframe = t("iframe");
t.img = t("img");
t.input = t("input");
t.ins = t("ins");
t.kbd = t("kbd");
t.label = t("label");
t.legend = t("legend");
t.li = t("li");
t.link = t("link");
t.main = t("main");
t.map = t("map");
t.mark = t("mark");
t.menu = t("menu");
t.meta = t("meta");
t.meter = t("meter");
t.nav = t("nav");
t.noscript = t("noscript");
t.object = t("object");
t.ol = t("ol");
t.optgroup = t("optgroup");
t.option = t("option");
t.output = t("output");
t.p = t("p");
t.param = t("param");
t.picture = t("picture");
t.pre = t("pre");
t.progress = t("progress");
t.q = t("q");
t.rp = t("rp");
t.rt = t("rt");
t.ruby = t("ruby");
t.s = t("s");
t.samp = t("samp");
t.script = t("script");
t.section = t("section");
t.select = t("select");
t.slot = t("slot");
t.small = t("small");
t.source = t("source");
t.span = t("span");
t.strong = t("strong");
t.style = t("style");
t.sub = t("sub");
t.summary = t("summary");
t.sup = t("sup");
t.table = t("table");
t.tbody = t("tbody");
t.td = t("td");
t.template = t("template");
t.textarea = t("textarea");
t.tfoot = t("tfoot");
t.th = t("th");
t.thead = t("thead");
t.time = t("time");
t.title = t("title");
t.tr = t("tr");
t.track = t("track");
t.u = t("u");
t.ul = t("ul");
t.var = t("var");
t.video = t("video");
t.wbr = t("wbr");
export {
  Cr as css,
  t as styled
};
