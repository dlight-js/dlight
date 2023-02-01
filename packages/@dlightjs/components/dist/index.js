var R = Object.defineProperty;
var C = (i, o, t) => o in i ? R(i, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[o] = t;
var e = (i, o, t) => (C(i, typeof o != "symbol" ? o + "" : o, t), t);
import * as d from "@dlightjs/dlight";
import { View as l, DLNodeType as y } from "@dlightjs/dlight";
class I extends l {
  constructor() {
    super(...arguments);
    e(this, "_$tag", "Spacer");
    e(this, "Body", () => [new d.HtmlNode("div")]);
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
    e(this, "_$derivedPairs", {
      margin: ["alignment"]
    });
    e(this, "_$deps", {
      spacing: /* @__PURE__ */ new Map(),
      alignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map(),
      margin: /* @__PURE__ */ new Map()
    });
    e(this, "_$tag", "HStack");
    e(this, "_$$spacing", "_$prop");
    e(this, "spacing", 10);
    e(this, "_$$alignment", "_$prop");
    e(this, "alignment", "top");
    e(this, "_$$width", "_$prop");
    e(this, "width", "100%");
    e(this, "_$$height", "_$prop");
    e(this, "height", "max-content");
    e(this, "margin", () => function() {
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
    e(this, "Body", () => {
      const t = new d.HtmlNode("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), t._$addProp("_display", "flex"), t._$addProp("_flexDirection", "row"), t._$addNodes((() => {
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
      })()), [t];
    });
  }
}
class F extends l {
  constructor() {
    super(...arguments);
    e(this, "_$derivedPairs", {
      margin: ["alignment"]
    });
    e(this, "_$deps", {
      spacing: /* @__PURE__ */ new Map(),
      alignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map(),
      margin: /* @__PURE__ */ new Map()
    });
    e(this, "_$tag", "VStack");
    e(this, "_$$spacing", "_$prop");
    e(this, "spacing", 10);
    e(this, "_$$alignment", "_$prop");
    e(this, "alignment", "top");
    e(this, "_$$width", "_$prop");
    e(this, "width", "max-content");
    e(this, "_$$height", "_$prop");
    e(this, "height", "100%");
    e(this, "margin", () => function() {
      switch (this.alignment) {
        case "top":
          return "0 auto 0 0";
        case "bottom":
          return "0 0 0 auto";
        case "center":
          return "0 auto";
        default:
          return "";
      }
    }.call(this));
    e(this, "Body", () => {
      const t = new d.HtmlNode("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), t._$addProp("_display", "flex"), t._$addProp("_flexDirection", "column"), t._$addNodes((() => {
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
      })()), [t];
    });
  }
}
class H extends l {
  constructor() {
    super(...arguments);
    e(this, "_$deps", {
      hAlignment: /* @__PURE__ */ new Map(),
      vAlignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map()
    });
    e(this, "_$tag", "ZStack");
    e(this, "_$$hAlignment", "_$prop");
    e(this, "hAlignment", "center");
    e(this, "_$$vAlignment", "_$prop");
    e(this, "vAlignment", "center");
    e(this, "_$$width", "_$prop");
    e(this, "width", "max-content");
    e(this, "_$$height", "_$prop");
    e(this, "height", "max-content");
    e(this, "Body", () => {
      const t = new d.HtmlNode("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", `${this.spacing}px`), t._$addProp("_display", "grid"), t._$addProp("_alignItems", () => ({
        top: "flex-start",
        center: "center",
        bottom: "flex-end"
      })[this.vAlignment], this, ["vAlignment"]), t._$addProp("_justifyItems", () => ({
        leading: "left",
        center: "center",
        tailing: "right"
      })[this.hAlignment], this, ["hAlignment"]), t._$addNodes((() => {
        const r = new d.ForNode();
        return r._$addNodess(Array.from(this._$children).map((n) => (() => {
          const a = new d.ExpressionNode(n);
          return a._$addProp("_position", "relative"), a._$addProp("_gridArea", "1 / 1/ 1 / 1"), [a];
        })())), [r];
      })()), [t];
    });
  }
}
function x() {
  return location.hash.slice(2);
}
function P() {
  return location.pathname.slice(1);
}
function N(i, o) {
  let t;
  if (i[0] === "/")
    t = i;
  else {
    i[0] !== "." && (i = "./" + i);
    const r = i.split("/"), n = o.split("/").filter((s) => s);
    let a = 0;
    for (let s of r) {
      if (![".", ".."].includes(s))
        break;
      s === ".." && (n.length === 0 && console.warn(`no ../ in ${i}`), n.pop()), a++;
    }
    t = "/" + [...n, ...r.slice(a)].join("/");
  }
  return t;
}
class L {
  constructor() {
    e(this, "mode", "hash");
    e(this, "baseUrl", "");
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
    e(this, "_$deps", {
      _$content: /* @__PURE__ */ new Map()
    });
    e(this, "_$tag", "Route");
    e(this, "_$$_$content", "_$prop");
    e(this, "_$content", " none");
    // 空格不是合法url，所以不会有问题
    e(this, "Body", () => [new d.ExpressionNode(this._$children)]);
  }
}
const m = history.pushState;
let c = [];
class q extends l {
  constructor() {
    super(...arguments);
    e(this, "_$derivedPairs", {
      currUrl: ["mode"],
      showedRoute: ["currUrl"]
    });
    e(this, "_$deps", {
      mode: /* @__PURE__ */ new Map(),
      navigator: /* @__PURE__ */ new Map(),
      currUrl: /* @__PURE__ */ new Map(),
      showedRoute: /* @__PURE__ */ new Map()
    });
    e(this, "_$tag", "RouterSpace");
    e(this, "_$$mode", "_$prop");
    e(this, "mode", "history");
    e(this, "_$$navigator");
    e(this, "_$$currUrl", () => this.mode === "hash" ? x() : P());
    e(this, "baseUrl", "");
    e(this, "prevPathCondition", "");
    e(this, "prevRoutes", []);
    e(this, "showedRoute", () => function() {
      const t = this.prevPathCondition;
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
          if (p === t)
            return this.prevPathCondition = t, this.prevRoutes;
          n.push(s), this.prevPathCondition = p;
          break;
        }
      }
      return this.prevRoutes = n, n;
    }.call(this));
    e(this, "historyChangeListen", () => {
      this.currUrl = P();
    });
    e(this, "hashChangeListen", () => {
      this.currUrl = x();
    });
    e(this, "Body", () => {
      const t = new d.EnvNode();
      return t._$addNodes((() => [new d.ExpressionNode(() => this.showedRoute, this, ["showedRoute"])])()), t._$addProp("RouteParam", () => ({
        path: this.currUrl,
        navigator: this.navigator
      }), this, ["currUrl", "navigator"], !1), [t];
    });
  }
  get navigator() {
    return this._$$navigator;
  }
  set navigator(t) {
    this._$$navigator !== t && (this._$$navigator = t, this._$runDeps("navigator"));
  }
  get currUrl() {
    return this._$$currUrl;
  }
  set currUrl(t) {
    this._$$currUrl !== t && (this._$$currUrl = t, this._$runDeps("currUrl"));
  }
  didMount() {
    if (this.mode === "hash") {
      addEventListener("load", this.hashChangeListen), addEventListener("hashchange", this.hashChangeListen);
      return;
    }
    addEventListener("load", this.historyChangeListen), addEventListener("popstate", this.historyChangeListen), c.push(this.historyChangeListen), history.pushState = new Proxy(m, {
      apply: (t, r, n) => {
        const a = t.apply(r, n);
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
    removeEventListener("load", this.historyChangeListen), removeEventListener("popstate", this.historyChangeListen), c = c.filter((t) => t !== this.historyChangeListen), c.length > 0 ? history.pushState = new Proxy(m, {
      apply: (t, r, n) => {
        const a = t.apply(r, n);
        for (let s of c)
          s();
        return a;
      }
    }) : history.pushState = m;
  }
  AfterConstruct() {
    let t = this._$parentNode;
    for (; t; )
      t._$tag === "Route" && (this.baseUrl = t._$content + "/" + this.baseUrl), t = t._$parentNode;
  }
  Preset() {
    const t = new L();
    t.mode = this.mode, t.baseUrl = this.baseUrl, this.navigator = t;
  }
}
class G extends l {
  constructor() {
    super(...arguments);
    e(this, "_$deps", {
      duration: /* @__PURE__ */ new Map(),
      easing: /* @__PURE__ */ new Map(),
      delay: /* @__PURE__ */ new Map(),
      appearWith: /* @__PURE__ */ new Map(),
      disappearWith: /* @__PURE__ */ new Map(),
      movable: /* @__PURE__ */ new Map()
    });
    e(this, "_$tag", "Transition");
    e(this, "_$duration", 0.5);
    e(this, "_$easing", "ease-in-out");
    e(this, "_$delay", 0);
    e(this, "_$$duration", "_$prop");
    e(this, "duration", this._$duration);
    e(this, "_$$easing", "_$prop");
    e(this, "easing", this._$easing);
    e(this, "_$$delay", "_$prop");
    e(this, "delay", this._$delay);
    e(this, "_duration", (t) => this.parseProp(t, "duration"));
    e(this, "_easing", (t) => this.parseProp(t, "easing"));
    e(this, "_delay", (t) => this.parseProp(t, "delay"));
    e(this, "firstRender", !0);
    e(this, "transition", (t, r) => `all ${this._duration(t)[r]}s ${this._easing(t)[r]} ${this._delay(t)[r]}s`);
    e(this, "_$$appearWith", "_$prop");
    e(this, "appearWith", {
      opacity: 0
    });
    e(this, "_$$disappearWith", "_$prop");
    e(this, "disappearWith", {
      opacity: 0
    });
    e(this, "_$$movable", "_$prop");
    e(this, "movable", !0);
    e(this, "prevElInfos", /* @__PURE__ */ new Map());
    e(this, "removeStore");
    e(this, "lastDisappear", !1);
    e(this, "removeStores");
    e(this, "Body", () => {
      const t = new d.ExpressionNode(this._$children);
      return t._$onUpdateNodes(() => {
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
      }), t._$addProp("didAppear", (r) => {
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
      }), t._$addProp("willDisappear", (r) => {
        this.lastDisappear || (this.removeStore = E(r), this.prevElInfos.delete(r));
      }), t._$addProp("didDisappear", () => {
        this.lastDisappear || this.resolveDisappear(this.removeStore);
      }), [t];
    });
  }
  // 这里的delay在新建会先把下面的push下去，等delay时间到了再出现，这其实是符合预期的，因为不然你setTimeOut控制它出现
  parseProp(t, r) {
    let n = {};
    const a = this["_$" + r], s = this[r];
    typeof s == "object" ? (n.appear = s.appear ?? a, n.firstAppear = s.firstAppear ?? n.appear, n.disappear = s.disappear ?? a, n.lastDisappear = s.lastDisappear ?? n.disappear, n.move = s.move ?? a) : (n.firstAppear = s, n.appear = s, n.disappear = s, n.lastDisappear = s, n.move = s);
    const p = (h) => typeof h == "function" ? h(t) : h;
    return n.appear = p(n.appear) ?? a, n.firstAppear = p(n.firstAppear) ?? n.appear, n.disappear = p(n.disappear) ?? a, n.lastDisappear = p(n.lastDisappear) ?? n.disappear, n.move = p(n.move) ?? a, n;
  }
  resolveDisappear(t) {
    const {
      el: r,
      parentNode: n,
      rect: a,
      idx: s
    } = t;
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
    const t = this._$el;
    this.removeStores = [];
    for (let r of t)
      this.removeStores.push(E(r));
  }
  didUnmount() {
    for (let t of this.removeStores)
      this.resolveDisappear(t);
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
  i.nodeType !== Node.TEXT_NODE && (o(i), i.childNodes.forEach((t) => v(t, o)));
}
function S(i, o) {
  typeof o == "function" && (o = o(i));
  const t = i.style.cssText;
  if (typeof o == "string")
    i.setAttribute("style", t + o);
  else
    for (let [r, n] of Object.entries(o))
      i.style[r] = n;
}
function T(i, o, t, r, n, a, s) {
  let p, h, $ = !1;
  const _ = `all ${o}s ${t} ${r}s`;
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
  G as Transition,
  F as VStack,
  H as ZStack
};
