var R = Object.defineProperty;
var C = (i, o, e) => o in i ? R(i, o, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[o] = e;
var t = (i, o, e) => (C(i, typeof o != "symbol" ? o + "" : o, e), e);
import * as d from "@dlightjs/dlight";
import { View as l, DLNodeType as y } from "@dlightjs/dlight";
class I extends l {
  constructor() {
    super(...arguments);
    t(this, "_$tag", "Spacer");
  }
  Body() {
    return [new d.HtmlNode("div")];
  }
}
function w(i) {
  if (![y.HTML, y.Text].includes(i._$nodeType)) {
    if (i._$tag === "Spacer")
      return !0;
    for (let o of i._$nodes ?? [])
      if (w(o))
        return !0;
  }
  return !1;
}
class B extends l {
  constructor() {
    super(...arguments);
    t(this, "_$derivedPairs", {
      margin: ["alignment"]
    });
    t(this, "_$deps", {
      spacing: /* @__PURE__ */ new Map(),
      alignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map(),
      margin: /* @__PURE__ */ new Map()
    });
    t(this, "_$tag", "HStack");
    t(this, "_$$spacing", "_$prop");
    t(this, "spacing", 10);
    t(this, "_$$alignment", "_$prop");
    t(this, "alignment", "top");
    t(this, "_$$width", "_$prop");
    t(this, "width", "100%");
    t(this, "_$$height", "_$prop");
    t(this, "height", "max-content");
    t(this, "margin", () => function() {
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
    const e = new d.HtmlNode("div");
    return e._$addProp("_height", () => this.height, this, ["height"]), e._$addProp("_width", () => this.width, this, ["width"]), e._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), e._$addProp("_display", "flex"), e._$addProp("_flexDirection", "row"), e._$addNodes((() => {
      const r = new d.ForNode();
      return r._$addNodess(Array.from(this._$children).map((n) => (() => {
        const a = new d.IfNode();
        return a._$addCond(() => w(n), () => {
          const s = new d.ExpressionNode(n);
          return s._$addProp("_flexGrow", 1), [s];
        }), a._$addCond(() => !0, () => {
          const s = new d.ExpressionNode(n);
          return s._$addProp("_flexShrink", 0), s._$addProp("_margin", () => this.margin, this, ["margin"], !0), [s];
        }), [a];
      })())), [r];
    })()), [e];
  }
}
class F extends l {
  constructor() {
    super(...arguments);
    t(this, "_$derivedPairs", {
      margin: ["alignment"]
    });
    t(this, "_$deps", {
      spacing: /* @__PURE__ */ new Map(),
      alignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map(),
      margin: /* @__PURE__ */ new Map()
    });
    t(this, "_$tag", "VStack");
    t(this, "_$$spacing", "_$prop");
    t(this, "spacing", 10);
    t(this, "_$$alignment", "_$prop");
    t(this, "alignment", "leading");
    t(this, "_$$width", "_$prop");
    t(this, "width", "max-content");
    t(this, "_$$height", "_$prop");
    t(this, "height", "100%");
    t(this, "margin", () => function() {
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
    const e = new d.HtmlNode("div");
    return e._$addProp("_height", () => this.height, this, ["height"]), e._$addProp("_width", () => this.width, this, ["width"]), e._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), e._$addProp("_display", "flex"), e._$addProp("_flexDirection", "column"), e._$addNodes((() => {
      const r = new d.ForNode();
      return r._$addNodess(Array.from(this._$children).map((n) => (() => {
        const a = new d.IfNode();
        return a._$addCond(() => w(n), () => {
          const s = new d.ExpressionNode(n);
          return s._$addProp("_flexGrow", 1), [s];
        }), a._$addCond(() => !0, () => {
          const s = new d.ExpressionNode(n);
          return s._$addProp("_flexShrink", 0), s._$addProp("_margin", () => this.margin, this, ["margin"], !0), [s];
        }), [a];
      })())), [r];
    })()), [e];
  }
}
class H extends l {
  constructor() {
    super(...arguments);
    t(this, "_$deps", {
      hAlignment: /* @__PURE__ */ new Map(),
      vAlignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map()
    });
    t(this, "_$tag", "ZStack");
    t(this, "_$$hAlignment", "_$prop");
    t(this, "hAlignment", "center");
    t(this, "_$$vAlignment", "_$prop");
    t(this, "vAlignment", "center");
    t(this, "_$$width", "_$prop");
    t(this, "width", "max-content");
    t(this, "_$$height", "_$prop");
    t(this, "height", "max-content");
  }
  Body() {
    const e = new d.HtmlNode("div");
    return e._$addProp("_height", () => this.height, this, ["height"]), e._$addProp("_width", () => this.width, this, ["width"]), e._$addProp("_display", "grid"), e._$addProp("_alignItems", () => ({
      top: "flex-start",
      center: "center",
      bottom: "flex-end"
    })[this.vAlignment], this, ["vAlignment"]), e._$addProp("_justifyItems", () => ({
      leading: "left",
      center: "center",
      tailing: "right"
    })[this.hAlignment], this, ["hAlignment"]), e._$addNodes((() => {
      const r = new d.ForNode();
      return r._$addNodess(Array.from(this._$children).map((n) => (() => {
        const a = new d.ExpressionNode(n);
        return a._$addProp("_position", "relative"), a._$addProp("_gridArea", "1 / 1/ 1 / 1"), [a];
      })())), [r];
    })()), [e];
  }
}
function x() {
  return location.hash.slice(2);
}
function P() {
  return location.pathname.slice(1);
}
function N(i, o) {
  let e;
  if (i[0] === "/")
    e = i;
  else {
    i[0] !== "." && (i = "./" + i);
    const r = i.split("/"), n = o.split("/").filter((s) => s);
    let a = 0;
    for (let s of r) {
      if (![".", ".."].includes(s))
        break;
      s === ".." && (n.length === 0 && console.warn(`no ../ in ${i}`), n.pop()), a++;
    }
    e = "/" + [...n, ...r.slice(a)].join("/");
  }
  return e;
}
class L {
  constructor() {
    t(this, "mode", "hash");
    t(this, "baseUrl", "");
  }
  hashTo(o) {
    window.location.href = "#" + N(o, this.baseUrl);
  }
  historyTo(o) {
    window.history.pushState({}, "", N(o, this.baseUrl));
  }
  to(o) {
    if (this.mode === "hash") {
      this.hashTo(o);
      return;
    }
    this.historyTo(o);
  }
}
class k extends l {
  constructor() {
    super(...arguments);
    t(this, "_$deps", {
      _$content: /* @__PURE__ */ new Map()
    });
    t(this, "_$tag", "Route");
    t(this, "_$$_$content", "_$prop");
    t(this, "_$content", " none");
  }
  // 空格不是合法url，所以不会有问题
  Body() {
    return [new d.ExpressionNode(this._$children)];
  }
}
const m = history.pushState;
let c = [];
class q extends l {
  constructor() {
    super(...arguments);
    t(this, "_$derivedPairs", {
      currUrl: ["mode"],
      showedRoute: ["currUrl"]
    });
    t(this, "_$deps", {
      mode: /* @__PURE__ */ new Map(),
      navigator: /* @__PURE__ */ new Map(),
      currUrl: /* @__PURE__ */ new Map(),
      showedRoute: /* @__PURE__ */ new Map()
    });
    t(this, "_$tag", "RouterSpace");
    t(this, "_$$mode", "_$prop");
    t(this, "mode", "history");
    t(this, "_$$navigator");
    t(this, "_$$currUrl", () => this.mode === "hash" ? x() : P());
    t(this, "baseUrl", "");
    t(this, "prevPathCondition", "");
    t(this, "prevRoutes", []);
    t(this, "showedRoute", () => function() {
      const e = this.prevPathCondition;
      this.prevPathCondition = "";
      const r = this.currUrl.replace(new RegExp(`^${this.baseUrl}`), "");
      let n = [];
      for (let a of this._$childrenFunc) {
        const s = a();
        if (s._$tag !== "Route") {
          n.push(s);
          continue;
        }
        let p = s._$content, h = !1;
        if (typeof s._$content == "string") {
          p = p.replace(/^(\.\/)+/, "");
          const $ = p === "." && r === "", _ = (r + "/").startsWith(p + "/");
          h = $ || _ || p === " none";
        } else
          p instanceof RegExp && (h = p.test(r));
        if (h) {
          if (p === e)
            return this.prevPathCondition = e, this.prevRoutes;
          n.push(s), this.prevPathCondition = p;
          break;
        }
      }
      return this.prevRoutes = n, n;
    }.call(this));
    t(this, "historyChangeListen", () => {
      this.currUrl = P();
    });
    t(this, "hashChangeListen", () => {
      this.currUrl = x();
    });
  }
  get navigator() {
    return this._$$navigator;
  }
  set navigator(e) {
    this._$$navigator !== e && (this._$$navigator = e, this._$runDeps("navigator"));
  }
  get currUrl() {
    return this._$$currUrl;
  }
  set currUrl(e) {
    this._$$currUrl !== e && (this._$$currUrl = e, this._$runDeps("currUrl"));
  }
  didMount() {
    if (this.mode === "hash") {
      addEventListener("load", this.hashChangeListen), addEventListener("hashchange", this.hashChangeListen);
      return;
    }
    addEventListener("load", this.historyChangeListen), addEventListener("popstate", this.historyChangeListen), c.push(this.historyChangeListen), history.pushState = new Proxy(m, {
      apply: (e, r, n) => {
        const a = e.apply(r, n);
        for (let s of c)
          s();
        return a;
      }
    });
  }
  willUnmount() {
    if (this.mode === "hash") {
      removeEventListener("load", this.hashChangeListen), removeEventListener("hashchange", this.hashChangeListen);
      return;
    }
    removeEventListener("load", this.historyChangeListen), removeEventListener("popstate", this.historyChangeListen), c = c.filter((e) => e !== this.historyChangeListen), c.length > 0 ? history.pushState = new Proxy(m, {
      apply: (e, r, n) => {
        const a = e.apply(r, n);
        for (let s of c)
          s();
        return a;
      }
    }) : history.pushState = m;
  }
  AfterConstruct() {
    let e = this._$parentNode;
    for (; e; )
      e._$tag === "Route" && (this.baseUrl = e._$content + "/" + this.baseUrl), e = e._$parentNode;
  }
  Preset() {
    const e = new L();
    e.mode = this.mode, e.baseUrl = this.baseUrl, this.navigator = e;
  }
  Body() {
    const e = new d.EnvNode();
    return e._$addNodes((() => [new d.ExpressionNode(() => this.showedRoute, this, ["showedRoute"])])()), e._$addProp("RouteParam", () => ({
      path: this.currUrl,
      navigator: this.navigator
    }), this, ["currUrl", "navigator"], !1), [e];
  }
}
class O extends l {
  constructor() {
    super(...arguments);
    t(this, "_$deps", {
      duration: /* @__PURE__ */ new Map(),
      easing: /* @__PURE__ */ new Map(),
      delay: /* @__PURE__ */ new Map(),
      appearWith: /* @__PURE__ */ new Map(),
      disappearWith: /* @__PURE__ */ new Map(),
      movable: /* @__PURE__ */ new Map()
    });
    t(this, "_$tag", "Transition");
    t(this, "_$duration", 0.5);
    t(this, "_$easing", "ease-in-out");
    t(this, "_$delay", 0);
    t(this, "_$$duration", "_$prop");
    t(this, "duration", this._$duration);
    t(this, "_$$easing", "_$prop");
    t(this, "easing", this._$easing);
    t(this, "_$$delay", "_$prop");
    t(this, "delay", this._$delay);
    t(this, "_duration", (e) => this.parseProp(e, "duration"));
    t(this, "_easing", (e) => this.parseProp(e, "easing"));
    t(this, "_delay", (e) => this.parseProp(e, "delay"));
    t(this, "firstRender", !0);
    t(this, "transition", (e, r) => `all ${this._duration(e)[r]}s ${this._easing(e)[r]} ${this._delay(e)[r]}s`);
    t(this, "_$$appearWith", "_$prop");
    t(this, "appearWith", {
      opacity: 0
    });
    t(this, "_$$disappearWith", "_$prop");
    t(this, "disappearWith", {
      opacity: 0
    });
    t(this, "_$$movable", "_$prop");
    t(this, "movable", !0);
    t(this, "prevElInfos", /* @__PURE__ */ new Map());
    t(this, "removeStore");
    t(this, "lastDisappear", !1);
    t(this, "removeStores");
  }
  // 这里的delay在新建会先把下面的push下去，等delay时间到了再出现，这其实是符合预期的，因为不然你setTimeOut控制它出现
  parseProp(e, r) {
    let n = {};
    const a = this["_$" + r], s = this[r];
    typeof s == "object" ? (n.appear = s.appear ?? a, n.firstAppear = s.firstAppear ?? n.appear, n.disappear = s.disappear ?? a, n.lastDisappear = s.lastDisappear ?? n.disappear, n.move = s.move ?? a) : (n.firstAppear = s, n.appear = s, n.disappear = s, n.lastDisappear = s, n.move = s);
    const p = (h) => typeof h == "function" ? h(e) : h;
    return n.appear = p(n.appear) ?? a, n.firstAppear = p(n.firstAppear) ?? n.appear, n.disappear = p(n.disappear) ?? a, n.lastDisappear = p(n.lastDisappear) ?? n.disappear, n.move = p(n.move) ?? a, n;
  }
  resolveDisappear(e) {
    const {
      el: r,
      parentNode: n,
      rect: a,
      idx: s
    } = e;
    r.style.position = "absolute", r.style.transition = this.lastDisappear ? this.transition(r, "lastDisappear") : this.transition(r, "disappear"), r.style.margin = "", r.style.transform = "", v(r, (p) => {
      p.style.margin = "", p.style.transform = "";
    }), r.style.top = `${a.top}px`, r.style.left = `${a.left}px`, n.childNodes.length >= s ? n.appendChild(r) : n.insertBefore(r, n.childNodes[s]), requestAnimationFrame(() => {
      const p = () => {
        r.removeEventListener("transitionend", p), r.remove();
      };
      r.addEventListener("transitionend", p), S(r, this.disappearWith);
    });
  }
  // ---- 最后一次消失
  willUnmount() {
    this.lastDisappear = !0;
    const e = this._$el;
    this.removeStores = [];
    for (let r of e)
      this.removeStores.push(E(r));
  }
  didUnmount() {
    for (let e of this.removeStores)
      this.resolveDisappear(e);
  }
  Body() {
    const e = new d.ExpressionNode(this._$children);
    return e._$onUpdateNodes(() => {
      for (let [r, n] of this.prevElInfos.entries())
        if (this.movable) {
          r.style.transform = "";
          const a = {
            rect: r.getBoundingClientRect(),
            stopTrigger: n.stopTrigger
          };
          if (this.prevElInfos.set(r, a), a.stopTrigger)
            continue;
          n.stopTrigger = !0;
          const s = n.rect.x - a.rect.x, p = n.rect.y - a.rect.y;
          T(r, this._duration(r).move, this._easing(r).move, this._delay(r).move, s, p, a);
        }
    }), e._$addProp("didAppear", (r) => {
      if (r.style.transition = this.firstRender ? this.transition(r, "firstAppear") : this.transition(r, "appear"), v(r, (s) => {
        s.style.transition = this.firstRender ? this.transition(s, "firstAppear") : this.transition(s, "appear");
      }), requestAnimationFrame(() => {
        this.prevElInfos.set(r, {
          rect: r.getBoundingClientRect(),
          stopTrigger: !0
        });
      }), !this.appearWith)
        return;
      const n = r.style.cssText;
      S(r, this.appearWith);
      const a = this.firstRender;
      requestAnimationFrame(() => {
        r.setAttribute("style", n);
        const s = () => {
          const p = this.prevElInfos.get(r);
          p.rect = r.getBoundingClientRect(), p.stopTrigger = !1, r.removeEventListener("transitionend", s);
        };
        r.addEventListener("transitionend", s), this.firstRender && (this.firstRender = !1), setTimeout(() => {
          this.prevElInfos.get(r).stopTrigger = !1;
        }, this._duration(r).appear * 1e3), a && requestAnimationFrame(() => {
          r.style.transition = this.transition(r, "appear");
        });
      });
    }), e._$addProp("willDisappear", (r) => {
      this.lastDisappear || (this.removeStore = E(r), this.prevElInfos.delete(r));
    }), e._$addProp("didDisappear", () => {
      this.lastDisappear || this.resolveDisappear(this.removeStore);
    }), [e];
  }
}
function E(i) {
  var o;
  return {
    el: i.cloneNode(!0),
    parentNode: i.parentNode,
    rect: {
      top: i.offsetTop,
      left: i.offsetLeft
    },
    idx: Array.from(((o = i.parentNode) == null ? void 0 : o.childNodes) ?? []).indexOf(i)
  };
}
function v(i, o) {
  i.nodeType !== Node.TEXT_NODE && (o(i), i.childNodes.forEach((e) => v(e, o)));
}
function S(i, o) {
  typeof o == "function" && (o = o(i));
  const e = i.style.cssText;
  if (typeof o == "string")
    i.setAttribute("style", e + o);
  else
    for (let [r, n] of Object.entries(o))
      i.style[r] = n;
}
function T(i, o, e, r, n, a, s) {
  let p, h, $ = !1;
  const _ = `all ${o}s ${e} ${r}s`;
  function g(u) {
    p === void 0 && (p = u, i.style.transition = _ + ", transform 0s");
    const U = u - p;
    if (h !== u) {
      const f = Math.max(U / (o * 1e3) - r, 0), A = f * n, M = f * a;
      f >= 1 ? (i.style.transform = "", $ = !0) : i.style.transform = `translate(${n - A}px, ${a - M}px)`, s.rect = i.getBoundingClientRect();
    }
    h = u, !$ && !s.stopTrigger ? requestAnimationFrame(g) : i.style.transition = _;
  }
  requestAnimationFrame(g);
}
export {
  B as HStack,
  L as Navigator,
  k as Route,
  q as RouterSpace,
  I as Spacer,
  O as Transition,
  F as VStack,
  H as ZStack
};
