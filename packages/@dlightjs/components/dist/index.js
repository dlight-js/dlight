var g = Object.defineProperty;
var u = (a, o, t) => o in a ? g(a, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[o] = t;
var e = (a, o, t) => (u(a, typeof o != "symbol" ? o + "" : o, t), t);
import * as h from "@dlightjs/dlight";
import { View as p } from "@dlightjs/dlight";
class v extends p {
  constructor() {
    super(...arguments);
    e(this, "_$tag", "Spacer");
    e(this, "Body", () => [new h.HtmlNode("div")]);
  }
}
class P extends p {
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
          const r = new h.IfNode();
          return r._$addCond(() => n._$tag === "Spacer", () => {
            const s = new h.ExpressionNode(n);
            return s._$addProp("_flexGrow", 1), [s];
          }), r._$addCond(() => !0, () => {
            const s = new h.ExpressionNode(n);
            return s._$addProp("_flexShrink", 0), s._$addProp("_margin", () => this.margin, this, ["margin"], !0), [s];
          }), [r];
        })())), [i];
      })()), [t];
    });
  }
}
class y extends p {
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
          const r = new h.IfNode();
          return r._$addCond(() => n._$tag === "Spacer", () => {
            const s = new h.ExpressionNode(n);
            return s._$addProp("_flexGrow", 1), [s];
          }), r._$addCond(() => !0, () => {
            const s = new h.ExpressionNode(n);
            return s._$addProp("_flexShrink", 0), s._$addProp("_margin", () => this.margin, this, ["margin"], !0), [s];
          }), [r];
        })())), [i];
      })()), [t];
    });
  }
}
class x extends p {
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
          const r = new h.ExpressionNode(n);
          return r._$addProp("_position", "relative"), r._$addProp("_gridArea", "1 / 1/ 1 / 1"), [r];
        })())), [i];
      })()), [t];
    });
  }
}
function _() {
  return location.hash.slice(2);
}
function c() {
  return location.pathname.slice(1);
}
function l(a, o) {
  let t;
  if (a[0] === "/")
    t = a;
  else {
    a[0] !== "." && (a = "./" + a);
    const i = a.split("/"), n = o.split("/").filter((s) => s);
    let r = 0;
    for (let s of i) {
      if (![".", ".."].includes(s))
        break;
      s === ".." && (n.length === 0 && console.warn(`no ../ in ${a}`), n.pop()), r++;
    }
    t = "/" + [...n, ...i.slice(r)].join("/");
  }
  return t;
}
class m {
  constructor() {
    e(this, "mode", "hash");
    e(this, "baseUrl", "");
  }
  hashTo(o) {
    window.location.href = "#" + l(o, this.baseUrl);
  }
  historyTo(o) {
    window.history.pushState({}, "", l(o, this.baseUrl));
  }
  to(o) {
    if (this.mode === "hash") {
      this.hashTo(o);
      return;
    }
    this.historyTo(o);
  }
}
class N extends p {
  constructor() {
    super(...arguments);
    e(this, "_$deps", {
      _$content: /* @__PURE__ */ new Map()
    });
    e(this, "_$tag", "Route");
    e(this, "_$$_$content", "_$prop");
    e(this, "_$content", "_$default");
    e(this, "Body", () => {
      var i;
      return [new h.ExpressionNode((i = this._$children) == null ? void 0 : i.map((n) => n()))];
    });
  }
}
const $ = history.pushState;
let d = [];
class U extends p {
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
    e(this, "_$$currUrl", () => this.mode === "hash" ? _() : c());
    e(this, "baseUrl", "");
    e(this, "prevPathCondition", "");
    e(this, "prevRoutes", []);
    e(this, "showedRoute", () => function() {
      const t = this.prevPathCondition;
      this.prevPathCondition = "";
      let i = [];
      for (let n of this._$children) {
        const r = n();
        if (r._$tag !== "Route") {
          i.push(r);
          continue;
        }
        if (this.currUrl.startsWith(this.baseUrl + r._$content) || r._$content === "_$default") {
          if (r._$content === t)
            return this.prevPathCondition = t, this.prevRoutes;
          i.push(r), this.prevPathCondition = r._$content;
          break;
        }
      }
      return this.prevRoutes = i, i;
    }.call(this));
    e(this, "historyChangeListen", () => {
      this.currUrl = c();
    });
    e(this, "hashChangeListen", () => {
      this.currUrl = _();
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
    addEventListener("load", this.historyChangeListen), addEventListener("popstate", this.historyChangeListen), d.push(this.historyChangeListen), history.pushState = new Proxy($, {
      apply: (t, i, n) => {
        const r = t.apply(i, n);
        for (let s of d)
          s();
        return r;
      }
    });
  }
  willUnmount() {
    if (this.mode === "hash") {
      removeEventListener("load", this.hashChangeListen), removeEventListener("hashchange", this.hashChangeListen);
      return;
    }
    removeEventListener("load", this.historyChangeListen), removeEventListener("popstate", this.historyChangeListen), d = d.filter((t) => t !== this.historyChangeListen), d.length > 0 ? history.pushState = new Proxy($, {
      apply: (t, i, n) => {
        const r = t.apply(i, n);
        for (let s of d)
          s();
        return r;
      }
    }) : history.pushState = $;
  }
  AfterConstruct() {
    let t = this._$parentNode;
    for (; t; )
      t._$tag === "Route" && (this.baseUrl = t._$content + "/" + this.baseUrl), t = t._$parentNode;
  }
  Preset() {
    const t = new m();
    t.mode = this.mode, t.baseUrl = this.baseUrl, this.navigator = t;
  }
}
export {
  P as HStack,
  m as Navigator,
  N as Route,
  U as RouterSpace,
  v as Spacer,
  y as VStack,
  x as ZStack
};
