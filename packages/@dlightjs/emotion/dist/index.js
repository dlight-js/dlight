var Ae = Object.defineProperty;
var Re = (e, r, n) => r in e ? Ae(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[r] = n;
var _ = (e, r, n) => (Re(e, typeof r != "symbol" ? r + "" : r, n), n);
import * as Ie from "@dlightjs/dlight";
import { View as ce } from "@dlightjs/dlight";
function Pe(e) {
  if (e.sheet)
    return e.sheet;
  for (var r = 0; r < document.styleSheets.length; r++)
    if (document.styleSheets[r].ownerNode === e)
      return document.styleSheets[r];
}
function Ve(e) {
  var r = document.createElement("style");
  return r.setAttribute("data-emotion", e.key), e.nonce !== void 0 && r.setAttribute("nonce", e.nonce), r.appendChild(document.createTextNode("")), r.setAttribute("data-s", ""), r;
}
var De = /* @__PURE__ */ function() {
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
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Ve(this));
    var i = this.tags[this.tags.length - 1];
    if (process.env.NODE_ENV !== "production") {
      var a = s.charCodeAt(0) === 64 && s.charCodeAt(1) === 105;
      a && this._alreadyInsertedOrderInsensitiveRule && console.error(`You're attempting to insert the following rule:
` + s + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."), this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !a;
    }
    if (this.isSpeedy) {
      var o = Pe(i);
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
}(), x = "-ms-", K = "-moz-", l = "-webkit-", ne = "comm", se = "rule", ae = "decl", Te = "@import", ve = "@keyframes", Me = Math.abs, J = String.fromCharCode, je = Object.assign;
function We(e, r) {
  return E(e, 0) ^ 45 ? (((r << 2 ^ E(e, 0)) << 2 ^ E(e, 1)) << 2 ^ E(e, 2)) << 2 ^ E(e, 3) : 0;
}
function we(e) {
  return e.trim();
}
function qe(e, r) {
  return (e = r.exec(e)) ? e[0] : e;
}
function p(e, r, n) {
  return e.replace(r, n);
}
function re(e, r) {
  return e.indexOf(r);
}
function E(e, r) {
  return e.charCodeAt(r) | 0;
}
function q(e, r, n) {
  return e.slice(r, n);
}
function I(e) {
  return e.length;
}
function ie(e) {
  return e.length;
}
function Y(e, r) {
  return r.push(e), e;
}
function Le(e, r) {
  return e.map(r).join("");
}
var Z = 1, T = 1, Ee = 0, S = 0, g = 0, M = "";
function Q(e, r, n, s, i, a, o) {
  return { value: e, root: r, parent: n, type: s, props: i, children: a, line: Z, column: T, length: o, return: "" };
}
function W(e, r) {
  return je(Q("", null, null, "", null, null, 0), e, { length: -e.length }, r);
}
function ze() {
  return g;
}
function Ge() {
  return g = S > 0 ? E(M, --S) : 0, T--, g === 10 && (T = 1, Z--), g;
}
function O() {
  return g = S < Ee ? E(M, S++) : 0, T++, g === 10 && (T = 1, Z++), g;
}
function P() {
  return E(M, S);
}
function U() {
  return S;
}
function G(e, r) {
  return q(M, e, r);
}
function L(e) {
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
  return Z = T = 1, Ee = I(M = e), S = 0, [];
}
function $e(e) {
  return M = "", e;
}
function F(e) {
  return we(G(S - 1, te(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Ye(e) {
  for (; (g = P()) && g < 33; )
    O();
  return L(e) > 2 || L(g) > 3 ? "" : " ";
}
function Ue(e, r) {
  for (; --r && O() && !(g < 48 || g > 102 || g > 57 && g < 65 || g > 70 && g < 97); )
    ;
  return G(e, U() + (r < 6 && P() == 32 && O() == 32));
}
function te(e) {
  for (; O(); )
    switch (g) {
      case e:
        return S;
      case 34:
      case 39:
        e !== 34 && e !== 39 && te(g);
        break;
      case 40:
        e === 41 && te(e);
        break;
      case 92:
        O();
        break;
    }
  return S;
}
function Fe(e, r) {
  for (; O() && e + g !== 47 + 10; )
    if (e + g === 42 + 42 && P() === 47)
      break;
  return "/*" + G(r, S - 1) + "*" + J(e === 47 ? e : O());
}
function Be(e) {
  for (; !L(P()); )
    O();
  return G(e, S);
}
function Ke(e) {
  return $e(B("", null, null, null, [""], e = xe(e), 0, [0], e));
}
function B(e, r, n, s, i, a, o, c, f) {
  for (var d = 0, u = 0, h = o, v = 0, k = 0, $ = 0, m = 1, N = 1, y = 1, w = 0, A = "", j = i, V = a, R = s, b = A; N; )
    switch ($ = w, w = O()) {
      case 40:
        if ($ != 108 && E(b, h - 1) == 58) {
          re(b += p(F(w), "&", "&\f"), "&\f") != -1 && (y = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        b += F(w);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        b += Ye($);
        break;
      case 92:
        b += Ue(U() - 1, 7);
        continue;
      case 47:
        switch (P()) {
          case 42:
          case 47:
            Y(He(Fe(O(), U()), r, n), f);
            break;
          default:
            b += "/";
        }
        break;
      case 123 * m:
        c[d++] = I(b) * y;
      case 125 * m:
      case 59:
      case 0:
        switch (w) {
          case 0:
          case 125:
            N = 0;
          case 59 + u:
            k > 0 && I(b) - h && Y(k > 32 ? ue(b + ";", s, n, h - 1) : ue(p(b, " ", "") + ";", s, n, h - 2), f);
            break;
          case 59:
            b += ";";
          default:
            if (Y(R = fe(b, r, n, d, u, i, c, A, j = [], V = [], h), a), w === 123)
              if (u === 0)
                B(b, r, R, R, j, a, h, c, V);
              else
                switch (v === 99 && E(b, 3) === 110 ? 100 : v) {
                  case 100:
                  case 109:
                  case 115:
                    B(e, R, R, s && Y(fe(e, R, R, 0, 0, i, c, A, i, j = [], h), V), i, V, h, c, s ? j : V);
                    break;
                  default:
                    B(b, R, R, R, [""], V, 0, c, V);
                }
        }
        d = u = k = 0, m = y = 1, A = b = "", h = o;
        break;
      case 58:
        h = 1 + I(b), k = $;
      default:
        if (m < 1) {
          if (w == 123)
            --m;
          else if (w == 125 && m++ == 0 && Ge() == 125)
            continue;
        }
        switch (b += J(w), w * m) {
          case 38:
            y = u > 0 ? 1 : (b += "\f", -1);
            break;
          case 44:
            c[d++] = (I(b) - 1) * y, y = 1;
            break;
          case 64:
            P() === 45 && (b += F(O())), v = P(), u = h = I(A = b += Be(U())), w++;
            break;
          case 45:
            $ === 45 && I(b) == 2 && (m = 0);
        }
    }
  return a;
}
function fe(e, r, n, s, i, a, o, c, f, d, u) {
  for (var h = i - 1, v = i === 0 ? a : [""], k = ie(v), $ = 0, m = 0, N = 0; $ < s; ++$)
    for (var y = 0, w = q(e, h + 1, h = Me(m = o[$])), A = e; y < k; ++y)
      (A = we(m > 0 ? v[y] + " " + w : p(w, /&\f/g, v[y]))) && (f[N++] = A);
  return Q(e, r, n, i === 0 ? se : c, f, d, u);
}
function He(e, r, n) {
  return Q(e, r, n, ne, J(ze()), q(e, 2, -2), 0);
}
function ue(e, r, n, s) {
  return Q(e, r, n, ae, q(e, 0, s), q(e, s + 1, -1), s);
}
function D(e, r) {
  for (var n = "", s = ie(e), i = 0; i < s; i++)
    n += r(e[i], i, e, r) || "";
  return n;
}
function Je(e, r, n, s) {
  switch (e.type) {
    case Te:
    case ae:
      return e.return = e.return || e.value;
    case ne:
      return "";
    case ve:
      return e.return = e.value + "{" + D(e.children, s) + "}";
    case se:
      e.value = e.props.join(",");
  }
  return I(n = D(e.children, s)) ? e.return = e.value + "{" + n + "}" : "";
}
function Ze(e) {
  var r = ie(e);
  return function(n, s, i, a) {
    for (var o = "", c = 0; c < r; c++)
      o += e[c](n, s, i, a) || "";
    return o;
  };
}
function Qe(e) {
  return function(r) {
    r.root || (r = r.return) && e(r);
  };
}
function Xe(e) {
  var r = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return r[n] === void 0 && (r[n] = e(n)), r[n];
  };
}
var er = function(r, n, s) {
  for (var i = 0, a = 0; i = a, a = P(), i === 38 && a === 12 && (n[s] = 1), !L(a); )
    O();
  return G(r, S);
}, rr = function(r, n) {
  var s = -1, i = 44;
  do
    switch (L(i)) {
      case 0:
        i === 38 && P() === 12 && (n[s] = 1), r[s] += er(S - 1, n, s);
        break;
      case 2:
        r[s] += F(i);
        break;
      case 4:
        if (i === 44) {
          r[++s] = P() === 58 ? "&\f" : "", n[s] = r[s].length;
          break;
        }
      default:
        r[s] += J(i);
    }
  while (i = O());
  return r;
}, tr = function(r, n) {
  return $e(rr(xe(r), n));
}, de = /* @__PURE__ */ new WeakMap(), nr = function(r) {
  if (!(r.type !== "rule" || !r.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  r.length < 1)) {
    for (var n = r.value, s = r.parent, i = r.column === s.column && r.line === s.line; s.type !== "rule"; )
      if (s = s.parent, !s)
        return;
    if (!(r.props.length === 1 && n.charCodeAt(0) !== 58 && !de.get(s)) && !i) {
      de.set(r, !0);
      for (var a = [], o = tr(n, a), c = s.props, f = 0, d = 0; f < o.length; f++)
        for (var u = 0; u < c.length; u++, d++)
          r.props[d] = a[f] ? o[f].replace(/&\f/g, c[u]) : c[u] + " " + o[f];
    }
  }
}, sr = function(r) {
  if (r.type === "decl") {
    var n = r.value;
    // charcode for l
    n.charCodeAt(0) === 108 && // charcode for b
    n.charCodeAt(2) === 98 && (r.return = "", r.value = "");
  }
}, ar = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason", ir = function(r) {
  return r.type === "comm" && r.children.indexOf(ar) > -1;
}, or = function(r) {
  return function(n, s, i) {
    if (!(n.type !== "rule" || r.compat)) {
      var a = n.value.match(/(:first|:nth|:nth-last)-child/g);
      if (a) {
        for (var o = n.parent === i[0], c = o ? i[0].children : (
          // global rule at the root level
          i
        ), f = c.length - 1; f >= 0; f--) {
          var d = c[f];
          if (d.line < n.line)
            break;
          if (d.column < n.column) {
            if (ir(d))
              return;
            break;
          }
        }
        a.forEach(function(u) {
          console.error('The pseudo class "' + u + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + u.split("-child")[0] + '-of-type".');
        });
      }
    }
  };
}, Ne = function(r) {
  return r.type.charCodeAt(1) === 105 && r.type.charCodeAt(0) === 64;
}, cr = function(r, n) {
  for (var s = r - 1; s >= 0; s--)
    if (!Ne(n[s]))
      return !0;
  return !1;
}, le = function(r) {
  r.type = "", r.value = "", r.return = "", r.children = "", r.props = "";
}, fr = function(r, n, s) {
  Ne(r) && (r.parent ? (console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."), le(r)) : cr(n, s) && (console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."), le(r)));
};
function Se(e, r) {
  switch (We(e, r)) {
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
      return l + e + K + e + x + e + e;
    case 6828:
    case 4268:
      return l + e + x + e + e;
    case 6165:
      return l + e + x + "flex-" + e + e;
    case 5187:
      return l + e + p(e, /(\w+).+(:[^]+)/, l + "box-$1$2" + x + "flex-$1$2") + e;
    case 5443:
      return l + e + x + "flex-item-" + p(e, /flex-|-self/, "") + e;
    case 4675:
      return l + e + x + "flex-line-pack" + p(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return l + e + x + p(e, "shrink", "negative") + e;
    case 5292:
      return l + e + x + p(e, "basis", "preferred-size") + e;
    case 6060:
      return l + "box-" + p(e, "-grow", "") + l + e + x + p(e, "grow", "positive") + e;
    case 4554:
      return l + p(e, /([^-])(transform)/g, "$1" + l + "$2") + e;
    case 6187:
      return p(p(p(e, /(zoom-|grab)/, l + "$1"), /(image-set)/, l + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return p(e, /(image-set\([^]*)/, l + "$1$`$1");
    case 4968:
      return p(p(e, /(.+:)(flex-)?(.*)/, l + "box-pack:$3" + x + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + l + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return p(e, /(.+)-inline(.+)/, l + "$1$2") + e;
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
      if (I(e) - 1 - r > 6)
        switch (E(e, r + 1)) {
          case 109:
            if (E(e, r + 4) !== 45)
              break;
          case 102:
            return p(e, /(.+:)(.+)-([^]+)/, "$1" + l + "$2-$3$1" + K + (E(e, r + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~re(e, "stretch") ? Se(p(e, "stretch", "fill-available"), r) + e : e;
        }
      break;
    case 4949:
      if (E(e, r + 1) !== 115)
        break;
    case 6444:
      switch (E(e, I(e) - 3 - (~re(e, "!important") && 10))) {
        case 107:
          return p(e, ":", ":" + l) + e;
        case 101:
          return p(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + l + (E(e, 14) === 45 ? "inline-" : "") + "box$3$1" + l + "$2$3$1" + x + "$2box$3") + e;
      }
      break;
    case 5936:
      switch (E(e, r + 11)) {
        case 114:
          return l + e + x + p(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return l + e + x + p(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return l + e + x + p(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return l + e + x + e + e;
  }
  return e;
}
var ur = function(r, n, s, i) {
  if (r.length > -1 && !r.return)
    switch (r.type) {
      case ae:
        r.return = Se(r.value, r.length);
        break;
      case ve:
        return D([W(r, {
          value: p(r.value, "@", "@" + l)
        })], i);
      case se:
        if (r.length)
          return Le(r.props, function(a) {
            switch (qe(a, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return D([W(r, {
                  props: [p(a, /:(read-\w+)/, ":" + K + "$1")]
                })], i);
              case "::placeholder":
                return D([W(r, {
                  props: [p(a, /:(plac\w+)/, ":" + l + "input-$1")]
                }), W(r, {
                  props: [p(a, /:(plac\w+)/, ":" + K + "$1")]
                }), W(r, {
                  props: [p(a, /:(plac\w+)/, x + "input-$1")]
                })], i);
            }
            return "";
          });
    }
}, dr = [ur], lr = function(r) {
  var n = r.key;
  if (process.env.NODE_ENV !== "production" && !n)
    throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
  if (n === "css") {
    var s = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(s, function(m) {
      var N = m.getAttribute("data-emotion");
      N.indexOf(" ") !== -1 && (document.head.appendChild(m), m.setAttribute("data-s", ""));
    });
  }
  var i = r.stylisPlugins || dr;
  if (process.env.NODE_ENV !== "production" && /[^a-z-]/.test(n))
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + n + '" was passed');
  var a = {}, o, c = [];
  o = r.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
    function(m) {
      for (var N = m.getAttribute("data-emotion").split(" "), y = 1; y < N.length; y++)
        a[N[y]] = !0;
      c.push(m);
    }
  );
  var f, d = [nr, sr];
  process.env.NODE_ENV !== "production" && d.push(or({
    get compat() {
      return $.compat;
    }
  }), fr);
  {
    var u, h = [Je, process.env.NODE_ENV !== "production" ? function(m) {
      m.root || (m.return ? u.insert(m.return) : m.value && m.type !== ne && u.insert(m.value + "{}"));
    } : Qe(function(m) {
      u.insert(m);
    })], v = Ze(d.concat(i, h)), k = function(N) {
      return D(Ke(N), v);
    };
    f = function(N, y, w, A) {
      u = w, process.env.NODE_ENV !== "production" && y.map !== void 0 && (u = {
        insert: function(V) {
          w.insert(V + y.map);
        }
      }), k(N ? N + "{" + y.styles + "}" : y.styles), A && ($.inserted[y.name] = !0);
    };
  }
  var $ = {
    key: n,
    sheet: new De({
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
    insert: f
  };
  return $.sheet.hydrate(c), $;
};
function pr(e) {
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
}, pe = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, mr = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).", br = /[A-Z]|^ms/g, Oe = /_EMO_([^_]+?)_([^]*?)_EMO_/g, oe = function(r) {
  return r.charCodeAt(1) === 45;
}, he = function(r) {
  return r != null && typeof r != "boolean";
}, X = /* @__PURE__ */ Xe(function(e) {
  return oe(e) ? e : e.replace(br, "-$&").toLowerCase();
}), H = function(r, n) {
  switch (r) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(Oe, function(s, i, a) {
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
  var yr = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, gr = ["normal", "none", "initial", "inherit", "unset"], vr = H, wr = /^-ms-/, Er = /-(.)/g, me = {};
  H = function(r, n) {
    if (r === "content" && (typeof n != "string" || gr.indexOf(n) === -1 && !yr.test(n) && (n.charAt(0) !== n.charAt(n.length - 1) || n.charAt(0) !== '"' && n.charAt(0) !== "'")))
      throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + n + "\"'`");
    var s = vr(r, n);
    return s !== "" && !oe(r) && r.indexOf("-") !== -1 && me[r] === void 0 && (me[r] = !0, console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + r.replace(wr, "ms-").replace(Er, function(i, a) {
      return a.toUpperCase();
    }) + "?")), s;
  };
}
var ke = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function z(e, r, n) {
  if (n == null)
    return "";
  if (n.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== "production" && n.toString() === "NO_COMPONENT_SELECTOR")
      throw new Error(ke);
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
      return xr(e, r, n);
    }
    case "function": {
      if (e !== void 0) {
        var a = C, o = n(e);
        return C = a, z(e, r, o);
      } else
        process.env.NODE_ENV !== "production" && console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      break;
    }
    case "string":
      if (process.env.NODE_ENV !== "production") {
        var c = [], f = n.replace(Oe, function(u, h, v) {
          var k = "animation" + c.length;
          return c.push("const " + k + " = keyframes`" + v.replace(/^@keyframes animation-\w+/, "") + "`"), "${" + k + "}";
        });
        c.length && console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(c, ["`" + f + "`"]).join(`
`) + `

You should wrap it with \`css\` like this:

` + ("css`" + f + "`"));
      }
      break;
  }
  if (r == null)
    return n;
  var d = r[n];
  return d !== void 0 ? d : n;
}
function xr(e, r, n) {
  var s = "";
  if (Array.isArray(n))
    for (var i = 0; i < n.length; i++)
      s += z(e, r, n[i]) + ";";
  else
    for (var a in n) {
      var o = n[a];
      if (typeof o != "object")
        r != null && r[o] !== void 0 ? s += a + "{" + r[o] + "}" : he(o) && (s += X(a) + ":" + H(a, o) + ";");
      else {
        if (a === "NO_COMPONENT_SELECTOR" && process.env.NODE_ENV !== "production")
          throw new Error(ke);
        if (Array.isArray(o) && typeof o[0] == "string" && (r == null || r[o[0]] === void 0))
          for (var c = 0; c < o.length; c++)
            he(o[c]) && (s += X(a) + ":" + H(a, o[c]) + ";");
        else {
          var f = z(e, r, o);
          switch (a) {
            case "animation":
            case "animationName": {
              s += X(a) + ":" + f + ";";
              break;
            }
            default:
              process.env.NODE_ENV !== "production" && a === "undefined" && console.error(mr), s += a + "{" + f + "}";
          }
        }
      }
    }
  return s;
}
var be = /label:\s*([^\s;\n{]+)\s*(;|$)/g, _e;
process.env.NODE_ENV !== "production" && (_e = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var C, ee = function(r, n, s) {
  if (r.length === 1 && typeof r[0] == "object" && r[0] !== null && r[0].styles !== void 0)
    return r[0];
  var i = !0, a = "";
  C = void 0;
  var o = r[0];
  o == null || o.raw === void 0 ? (i = !1, a += z(s, n, o)) : (process.env.NODE_ENV !== "production" && o[0] === void 0 && console.error(pe), a += o[0]);
  for (var c = 1; c < r.length; c++)
    a += z(s, n, r[c]), i && (process.env.NODE_ENV !== "production" && o[c] === void 0 && console.error(pe), a += o[c]);
  var f;
  process.env.NODE_ENV !== "production" && (a = a.replace(_e, function(v) {
    return f = v, "";
  })), be.lastIndex = 0;
  for (var d = "", u; (u = be.exec(a)) !== null; )
    d += "-" + // $FlowFixMe we know it's not null
    u[1];
  var h = pr(a) + d;
  return process.env.NODE_ENV !== "production" ? {
    name: h,
    styles: a,
    map: f,
    next: C,
    toString: function() {
      return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
    }
  } : {
    name: h,
    styles: a,
    next: C
  };
}, $r = !0;
function Ce(e, r, n) {
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
  $r === !1) && r.registered[i] === void 0 && (r.registered[i] = n.styles);
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
  var s = [], i = Ce(e, s, n);
  return s.length < 2 ? n : i + r(s);
}
var Or = function(r) {
  var n = lr(r);
  n.sheet.speedy = function(c) {
    if (process.env.NODE_ENV !== "production" && this.ctr !== 0)
      throw new Error("speedy must be changed before any rules are inserted");
    this.isSpeedy = c;
  }, n.compat = !0;
  var s = function() {
    for (var f = arguments.length, d = new Array(f), u = 0; u < f; u++)
      d[u] = arguments[u];
    var h = ee(d, n.registered, void 0);
    return Sr(n, h, !1), n.key + "-" + h.name;
  }, i = function() {
    for (var f = arguments.length, d = new Array(f), u = 0; u < f; u++)
      d[u] = arguments[u];
    var h = ee(d, n.registered), v = "animation-" + h.name;
    return ye(n, {
      name: h.name,
      styles: "@keyframes " + v + "{" + h.styles + "}"
    }), v;
  }, a = function() {
    for (var f = arguments.length, d = new Array(f), u = 0; u < f; u++)
      d[u] = arguments[u];
    var h = ee(d, n.registered);
    ye(n, h);
  }, o = function() {
    for (var f = arguments.length, d = new Array(f), u = 0; u < f; u++)
      d[u] = arguments[u];
    return ge(n.registered, s, kr(d));
  };
  return {
    css: s,
    cx: o,
    injectGlobal: a,
    keyframes: i,
    hydrate: function(f) {
      f.forEach(function(d) {
        n.inserted[d] = !0;
      });
    },
    flush: function() {
      n.registered = {}, n.inserted = {}, n.sheet.flush();
    },
    // $FlowFixMe
    sheet: n.sheet,
    cache: n,
    getRegisteredStyles: Ce.bind(null, n.registered),
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
}, _r = Or({
  key: "css"
}), Cr = _r.css;
const t = (e) => (r, ...n) => {
  const s = (i, a) => {
    const o = Object.getOwnPropertyNames(a).filter((c) => c.startsWith("_$$")).map((c) => c.slice(3));
    i._$addProp("className", () => {
      const c = {};
      for (let d of o)
        c[d] = a[`_$$${d}`];
      let f = "";
      for (let d of [...Array(r.length).keys()])
        f += r[d], n[d] && (typeof n[d] == "function" ? f += n[d](c) : f += n[d]);
      return Cr`${f}`;
    }, a, o);
  };
  return typeof e == "string" ? class extends ce {
    constructor() {
      super(...arguments);
      _(this, "_$deps", {
        _$content: /* @__PURE__ */ new Map()
      });
      _(this, "_$tag", "Styled");
      _(this, "_$$_$content", "_$prop");
      // @ts-expect-error
      _(this, "_$content", "");
      _(this, "_$forwardProps", !0);
    }
    Afterset() {
      this._$el = this._$el[0];
    }
    Body() {
      const o = new Ie.HtmlNode(e);
      return o._$addProp("innerText", () => this._$content, this, ["_$content"]), this.forwardProps(o), ((c) => s(c, this))(o), [o];
    }
  } : class extends ce {
    constructor() {
      super(...arguments);
      _(this, "_$deps", {
        _$content: /* @__PURE__ */ new Map()
      });
      _(this, "_$tag", "Styled");
      _(this, "_$$_$content", "_$prop");
      // @ts-expect-error
      _(this, "_$content", "");
      _(this, "_$forwardProps", !0);
    }
    Body() {
      const o = new e();
      return this.forwardProps(o), ((c) => s(c, this))(o), [o];
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
