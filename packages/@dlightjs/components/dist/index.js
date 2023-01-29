var f = Object.defineProperty;
var v = (s, o, t) => o in s ? f(s, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[o] = t;
var e = (s, o, t) => (v(s, typeof o != "symbol" ? o + "" : o, t), t);
import * as h from "@dlightjs/dlight";
import { View as $ } from "@dlightjs/dlight";
class N extends $ {
  constructor() {
    super(...arguments);
    e(this, "_$tag", "Spacer");
    e(this, "Body", () => [new h.HtmlNode("div")]);
  }
}
class C extends $ {
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
        return i._$addNodess(Array.from(this._$children.map((n) => n())).map((n) => (() => {
          const a = new h.IfNode();
          return a._$addCond(() => n._$tag === "Spacer", () => {
            const r = new h.ExpressionNode(n);
            return r._$addProp("_flexGrow", 1), [r];
          }), a._$addCond(() => !0, () => {
            const r = new h.ExpressionNode(n);
            return r._$addProp("_flexShrink", 0), r._$addProp("_margin", () => this.margin, this, ["margin"], !0), [r];
          }), [a];
        })())), [i];
      })()), [t];
    });
  }
}
class L extends $ {
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
        return i._$addNodess(Array.from(this._$children.map((n) => n())).map((n) => (() => {
          const a = new h.IfNode();
          return a._$addCond(() => n._$tag === "Spacer", () => {
            const r = new h.ExpressionNode(n);
            return r._$addProp("_flexGrow", 1), [r];
          }), a._$addCond(() => !0, () => {
            const r = new h.ExpressionNode(n);
            return r._$addProp("_flexShrink", 0), r._$addProp("_margin", () => this.margin, this, ["margin"], !0), [r];
          }), [a];
        })())), [i];
      })()), [t];
    });
  }
}
class M extends $ {
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
        return i._$addNodess(Array.from(this._$children.map((n) => n())).map((n) => (() => {
          const a = new h.ExpressionNode(n);
          return a._$addProp("_position", "relative"), a._$addProp("_gridArea", "1 / 1/ 1 / 1"), [a];
        })())), [i];
      })()), [t];
    });
  }
}
function l() {
  return location.hash.slice(2);
}
function g() {
  return location.pathname.slice(1);
}
function u(s, o) {
  let t;
  if (s[0] === "/")
    t = s;
  else {
    s[0] !== "." && (s = "./" + s);
    const i = s.split("/"), n = o.split("/").filter((r) => r);
    let a = 0;
    for (let r of i) {
      if (![".", ".."].includes(r))
        break;
      r === ".." && (n.length === 0 && console.warn(`no ../ in ${s}`), n.pop()), a++;
    }
    t = "/" + [...n, ...i.slice(a)].join("/");
  }
  return t;
}
class P {
  constructor() {
    e(this, "mode", "hash");
    e(this, "baseUrl", "");
  }
  hashTo(o) {
    window.location.href = "#" + u(o, this.baseUrl);
  }
  historyTo(o) {
    window.history.pushState({}, "", u(o, this.baseUrl));
  }
  to(o) {
    if (this.mode === "hash") {
      this.hashTo(o);
      return;
    }
    this.historyTo(o);
  }
}
class S extends $ {
  constructor() {
    super(...arguments);
    e(this, "_$deps", {
      _$content: /* @__PURE__ */ new Map()
    });
    e(this, "_$tag", "Route");
    e(this, "_$$_$content", "_$prop");
    e(this, "_$content", " none");
    e(this, "Body", () => {
      var i;
      return [new h.ExpressionNode((i = this._$children) == null ? void 0 : i.map((n) => n()))];
    });
  }
}
const c = history.pushState;
let p = [];
class R extends $ {
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
    e(this, "_$$currUrl", () => this.mode === "hash" ? l() : g());
    e(this, "baseUrl", "");
    e(this, "prevPathCondition", " none");
    // 空格不是合法url，所以不会有问题
    e(this, "prevRoutes", []);
    e(this, "showedRoute", () => function() {
      const t = this.prevPathCondition;
      this.prevPathCondition = " none";
      const i = this.currUrl.replace(new RegExp(`^${this.baseUrl}`), "");
      let n = [];
      for (let a of this._$children) {
        const r = a();
        if (r._$tag !== "Route") {
          n.push(r);
          continue;
        }
        let d = r._$content, _ = !1;
        if (typeof r._$content == "string") {
          d = d.replace(/^(\.\/)+/, "");
          const m = d === "." && i === "", w = (i + "/").startsWith(d + "/");
          _ = m || w || d === " none";
        } else
          d instanceof RegExp && (_ = d.test(i));
        if (_) {
          if (d === t)
            return this.prevPathCondition = t, this.prevRoutes;
          n.push(r), this.prevPathCondition = d;
          break;
        }
      }
      return this.prevRoutes = n, n;
    }.call(this));
    e(this, "historyChangeListen", () => {
      this.currUrl = g();
    });
    e(this, "hashChangeListen", () => {
      this.currUrl = l();
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
    addEventListener("load", this.historyChangeListen), addEventListener("popstate", this.historyChangeListen), p.push(this.historyChangeListen), history.pushState = new Proxy(c, {
      apply: (t, i, n) => {
        const a = t.apply(i, n);
        for (let r of p)
          r();
        return a;
      }
    });
  }
  willUnmount() {
    if (this.mode === "hash") {
      removeEventListener("load", this.hashChangeListen), removeEventListener("hashchange", this.hashChangeListen);
      return;
    }
    removeEventListener("load", this.historyChangeListen), removeEventListener("popstate", this.historyChangeListen), p = p.filter((t) => t !== this.historyChangeListen), p.length > 0 ? history.pushState = new Proxy(c, {
      apply: (t, i, n) => {
        const a = t.apply(i, n);
        for (let r of p)
          r();
        return a;
      }
    }) : history.pushState = c;
  }
  AfterConstruct() {
    let t = this._$parentNode;
    for (; t; )
      t._$tag === "Route" && (this.baseUrl = t._$content + "/" + this.baseUrl), t = t._$parentNode;
  }
  Preset() {
    const t = new P();
    t.mode = this.mode, t.baseUrl = this.baseUrl, this.navigator = t;
  }
}
export {
  C as HStack,
  P as Navigator,
  S as Route,
  R as RouterSpace,
  N as Spacer,
  L as VStack,
  M as ZStack
};
