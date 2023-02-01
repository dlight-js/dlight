var y = Object.defineProperty;
var P = (o, s, t) => s in o ? y(o, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[s] = t;
var e = (o, s, t) => (P(o, typeof s != "symbol" ? s + "" : s, t), t);
import * as h from "@dlightjs/dlight";
import { View as p, DLNodeType as f, toEls as x } from "@dlightjs/dlight";
class C extends p {
  constructor() {
    super(...arguments);
    e(this, "_$tag", "Spacer");
    e(this, "Body", () => [new h.HtmlNode("div")]);
  }
}
function g(o) {
  if (![f.HTML, f.Text].includes(o._$nodeType)) {
    if (o._$tag === "Spacer")
      return !0;
    for (let s of o._$nodes ?? [])
      if (g(s))
        return !0;
  }
  return !1;
}
class L extends p {
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
      const t = new h.HtmlNode("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), t._$addProp("_display", "flex"), t._$addProp("_flexDirection", "row"), t._$addNodes((() => {
        const i = new h.ForNode();
        return i._$addNodess(Array.from(this._$children.map((r) => r())).map((r) => (() => {
          const a = new h.IfNode();
          return a._$addCond(() => g(r), () => {
            const n = new h.ExpressionNode(r);
            return n._$addProp("_flexGrow", 1), [n];
          }), a._$addCond(() => !0, () => {
            const n = new h.ExpressionNode(r);
            return n._$addProp("_flexShrink", 0), n._$addProp("_margin", () => this.margin, this, ["margin"], !0), [n];
          }), [a];
        })())), [i];
      })()), [t];
    });
  }
}
class I extends p {
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
      const t = new h.HtmlNode("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), t._$addProp("_display", "flex"), t._$addProp("_flexDirection", "column"), t._$addNodes((() => {
        const i = new h.ForNode();
        return i._$addNodess(Array.from(this._$children.map((r) => r())).map((r) => (() => {
          const a = new h.IfNode();
          return a._$addCond(() => g(r), () => {
            const n = new h.ExpressionNode(r);
            return n._$addProp("_flexGrow", 1), [n];
          }), a._$addCond(() => !0, () => {
            const n = new h.ExpressionNode(r);
            return n._$addProp("_flexShrink", 0), n._$addProp("_margin", () => this.margin, this, ["margin"], !0), [n];
          }), [a];
        })())), [i];
      })()), [t];
    });
  }
}
class R extends p {
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
      const t = new h.HtmlNode("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", `${this.spacing}px`), t._$addProp("_display", "grid"), t._$addProp("_alignItems", () => ({
        top: "flex-start",
        center: "center",
        bottom: "flex-end"
      })[this.vAlignment], this, ["vAlignment"]), t._$addProp("_justifyItems", () => ({
        leading: "left",
        center: "center",
        tailing: "right"
      })[this.hAlignment], this, ["hAlignment"]), t._$addNodes((() => {
        const i = new h.ForNode();
        return i._$addNodess(Array.from(this._$children.map((r) => r())).map((r) => (() => {
          const a = new h.ExpressionNode(r);
          return a._$addProp("_position", "relative"), a._$addProp("_gridArea", "1 / 1/ 1 / 1"), [a];
        })())), [i];
      })()), [t];
    });
  }
}
function m() {
  return location.hash.slice(2);
}
function w() {
  return location.pathname.slice(1);
}
function v(o, s) {
  let t;
  if (o[0] === "/")
    t = o;
  else {
    o[0] !== "." && (o = "./" + o);
    const i = o.split("/"), r = s.split("/").filter((n) => n);
    let a = 0;
    for (let n of i) {
      if (![".", ".."].includes(n))
        break;
      n === ".." && (r.length === 0 && console.warn(`no ../ in ${o}`), r.pop()), a++;
    }
    t = "/" + [...r, ...i.slice(a)].join("/");
  }
  return t;
}
class E {
  constructor() {
    e(this, "mode", "hash");
    e(this, "baseUrl", "");
  }
  hashTo(s) {
    window.location.href = "#" + v(s, this.baseUrl);
  }
  historyTo(s) {
    window.history.pushState({}, "", v(s, this.baseUrl));
  }
  to(s) {
    if (this.mode === "hash") {
      this.hashTo(s);
      return;
    }
    this.historyTo(s);
  }
}
class S extends p {
  constructor() {
    super(...arguments);
    e(this, "_$deps", {
      _$content: /* @__PURE__ */ new Map()
    });
    e(this, "_$tag", "Route");
    e(this, "_$$_$content", "_$prop");
    e(this, "_$content", " none");
    // 空格不是合法url，所以不会有问题
    e(this, "Body", () => {
      var i;
      return [new h.ExpressionNode((i = this._$children) == null ? void 0 : i.map((r) => r()))];
    });
  }
}
const u = history.pushState;
let l = [];
class A extends p {
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
    e(this, "_$$currUrl", () => this.mode === "hash" ? m() : w());
    e(this, "baseUrl", "");
    e(this, "prevPathCondition", "");
    e(this, "prevRoutes", []);
    e(this, "showedRoute", () => function() {
      const t = this.prevPathCondition;
      this.prevPathCondition = "";
      const i = this.currUrl.replace(new RegExp(`^${this.baseUrl}`), "");
      let r = [];
      for (let a of this._$children) {
        const n = a();
        if (n._$tag !== "Route") {
          r.push(n);
          continue;
        }
        let d = n._$content, $ = !1;
        if (typeof n._$content == "string") {
          d = d.replace(/^(\.\/)+/, "");
          const _ = d === "." && i === "", c = (i + "/").startsWith(d + "/");
          $ = _ || c || d === " none";
        } else
          d instanceof RegExp && ($ = d.test(i));
        if ($) {
          if (d === t)
            return this.prevPathCondition = t, this.prevRoutes;
          r.push(n), this.prevPathCondition = d;
          break;
        }
      }
      return this.prevRoutes = r, r;
    }.call(this));
    e(this, "historyChangeListen", () => {
      this.currUrl = w();
    });
    e(this, "hashChangeListen", () => {
      this.currUrl = m();
    });
    e(this, "Body", () => {
      const t = new h.EnvNode();
      return t._$addNodes((() => [new h.ExpressionNode(() => this.showedRoute, this, ["showedRoute"])])()), t._$addProp("RouteParam", () => ({
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
    addEventListener("load", this.historyChangeListen), addEventListener("popstate", this.historyChangeListen), l.push(this.historyChangeListen), history.pushState = new Proxy(u, {
      apply: (t, i, r) => {
        const a = t.apply(i, r);
        for (let n of l)
          n();
        return a;
      }
    });
  }
  willUnmount() {
    if (this.mode === "hash") {
      removeEventListener("load", this.hashChangeListen), removeEventListener("hashchange", this.hashChangeListen);
      return;
    }
    removeEventListener("load", this.historyChangeListen), removeEventListener("popstate", this.historyChangeListen), l = l.filter((t) => t !== this.historyChangeListen), l.length > 0 ? history.pushState = new Proxy(u, {
      apply: (t, i, r) => {
        const a = t.apply(i, r);
        for (let n of l)
          n();
        return a;
      }
    }) : history.pushState = u;
  }
  AfterConstruct() {
    let t = this._$parentNode;
    for (; t; )
      t._$tag === "Route" && (this.baseUrl = t._$content + "/" + this.baseUrl), t = t._$parentNode;
  }
  Preset() {
    const t = new E();
    t.mode = this.mode, t.baseUrl = this.baseUrl, this.navigator = t;
  }
}
class b extends p {
  constructor() {
    super(...arguments);
    e(this, "_$derivedPairs", {
      durationMili: ["duration"]
    });
    e(this, "_$deps", {
      duration: /* @__PURE__ */ new Map(),
      durationMili: /* @__PURE__ */ new Map(),
      prevElInfos: /* @__PURE__ */ new Map()
    });
    e(this, "_$tag", "Transition");
    e(this, "_$$duration", "_$prop");
    e(this, "duration", 0.5);
    e(this, "durationMili", () => this.duration * 1e3);
    e(this, "_$$prevElInfos");
    e(this, "getElInfos", () => x(this._$children.map((t) => t())).reduce((t, i) => (t.set(i, i.getBoundingClientRect()), t), /* @__PURE__ */ new Map()));
    e(this, "Body", () => {
      const t = new h.ExpressionNode(this._$children.map((i) => i()));
      return t.deepLoopEl = !0, t._$addProp("_transition", () => `all ${this.duration}s`, this, ["duration"], !1), t._$onUpdateNodes((i, r) => {
        const a = this.getElInfos();
        for (let [n, d] of this.prevElInfos.entries())
          if (a.has(n)) {
            const $ = a.get(n), _ = d.x - $.x, c = d.y - $.y;
            if (_ === 0 && c === 0)
              continue;
            n.style.transform = `translate(${_}px, ${c}px)`, n.style.transitionDuration = "0s", setTimeout(() => {
              n.style.transform = "", n.style.transitionDuration = `${this.duration}s`;
            }, 0);
          } else
            n.style.opacity = "0", setTimeout(() => {
              n.style.opacity = "1";
            }, 0);
        this.prevElInfos = a;
      }), t._$addLifeCycle((i) => {
        for (let r of i._$el)
          console.log(r), r.style.opacity = "0", setTimeout(() => {
            r.style.opacity = "";
          }, 0);
      }, "didMount"), [t];
    });
  }
  get prevElInfos() {
    return this._$$prevElInfos;
  }
  set prevElInfos(t) {
    this._$$prevElInfos !== t && (this._$$prevElInfos = t, this._$runDeps("prevElInfos"));
  }
  didMount() {
    this.prevElInfos = this.getElInfos(), setTimeout(() => {
      this.prevElInfos = this.getElInfos();
    }, 0);
  }
}
export {
  L as HStack,
  E as Navigator,
  S as Route,
  A as RouterSpace,
  C as Spacer,
  b as Transition,
  I as VStack,
  R as ZStack
};
