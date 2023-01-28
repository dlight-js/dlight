var B = Object.defineProperty;
var H = (i, e, t) => e in i ? B(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var o = (i, e, t) => (H(i, typeof e != "symbol" ? e + "" : e, t), t);
function C(i) {
  for (let e of i) {
    if (Array.isArray(e)) {
      C(e);
      continue;
    }
    e._$init();
  }
}
function F(i, e) {
  for (let t of i) {
    if (Array.isArray(t)) {
      F(t, e);
      continue;
    }
    t._$parentNode = e;
  }
}
function w(i, e) {
  for (let t of i)
    e(t) && w(t._$nodes, e);
}
function u(i, e, t = !0) {
  for (let s of i)
    [0, 1].includes(s._$nodeType) ? (e(s._$el, s), t && u(s._$nodes, e)) : u(s._$nodes, e, t);
}
function G(i) {
  let e = [];
  return u(i, (t, s) => {
    s._$nodeType === 0 && e.push(t);
  }, !1), e;
}
var W = ((i) => (i[i.HTML = 0] = "HTML", i[i.Text = 1] = "Text", i[i.Custom = 2] = "Custom", i[i.For = 3] = "For", i[i.If = 4] = "If", i[i.Env = 5] = "Env", i[i.Expression = 6] = "Expression", i))(W || {}), b = class {
  constructor(i) {
    o(this, "_$nodeType");
    o(this, "__$el");
    o(this, "_$parentNode");
    o(this, "_$nodes", []);
    o(this, "_$depObjectIds", []);
    this._$nodeType = i;
  }
  get _$el() {
    return this.__$el ?? G(this._$nodes);
  }
  set _$el(i) {
    this.__$el = i;
  }
  _$beforeInitSubNodes() {
  }
  _$bindNodes() {
    F(this._$nodes, this), this._$beforeInitSubNodes(), C(this._$nodes);
  }
  _$init() {
  }
  render(i) {
  }
};
function E(i, e, t, s, n, d, r) {
  if (t in i) {
    if (!d) {
      i[t] = s;
      return;
    }
    if (i[`_$$${t}`] === `_$${e}`) {
      V(n, i, t, s, d);
      return;
    }
    if (r && `_$$${d[0]}` in i) {
      Z(n, i, t, s, d);
      return;
    }
    q(n, i, t, s, d);
  }
}
function V(i, e, t, s, n) {
  let d = {};
  e._$depObjectIds.push(d), e[t] = s(), i._$addDeps(n, d, () => {
    e[t] = s(), e._$runDeps(t);
  });
}
function Z(i, e, t, s, n) {
  let d = {};
  e._$depObjectIds.push(d);
  for (let r of n) {
    let l = () => i[r] = e[t];
    e._$addDeps([t], d, l), e[t] = s(), i._$addDeps(n, d, () => {
      e._$deleteDep(t, d), e[t] = s(), e._$addDeps([t], d, l);
    });
  }
}
function q(i, e, t, s, n) {
  let d = {};
  e._$depObjectIds.push(d), e[`_$${t}`] = s(), i._$addDeps(n, d, () => {
    e[`_$${t}`] = s(), e._$runDeps(t);
  });
}
var z = class extends b {
  constructor() {
    super(2);
    o(this, "_$deps", {});
    o(this, "_$envNodes");
    o(this, "_$derivedPairs");
    o(this, "_$children");
    o(this, "_$tag", "");
    o(this, "Body", () => []);
  }
  _$addAfterset(e) {
    let t = this.Preset;
    this.Preset = () => {
      t(), e();
    };
  }
  _$runDeps(e) {
    if (this._$deps[e] === void 0) {
      console.warn(`${e} is not a dependency in ${this.constructor.name}`);
      return;
    }
    for (let t of this._$deps[e].values())
      t.call(this);
  }
  _$addChildren(e) {
    this._$children = e;
  }
  _$initDecorators() {
    if (this._$derivedPairs)
      for (let [e, t] of Object.entries(this._$derivedPairs)) {
        let s = this[e];
        if (typeof s != "function")
          return;
        this[e] = this[e]();
        let n = this[e];
        this._$addDeps(t, {}, () => {
          let d = s();
          d !== n && (this[e] = d, n = d, this._$runDeps(e));
        });
      }
  }
  _$addDeps(e, t, s) {
    for (let n of e)
      this._$deps[n].set(t, s);
  }
  _$deleteDep(e, t) {
    this._$deps[e].delete(t);
  }
  _$deleteDeps(e) {
    for (let t in this._$deps)
      this._$deleteDep(t, e);
  }
  AfterConstruct() {
  }
  Preset() {
  }
  Afterset() {
  }
  _$init() {
    this.AfterConstruct(), this._$initDecorators(), this.Preset(), this._$nodes = this.Body(), this.Afterset(), this._$bindNodes();
  }
  _$addProp(e, t, s, n, d) {
    E(this, "prop", e, t, s, n, d);
  }
  render(e) {
    this.willMount(this);
    for (let t of this._$nodes)
      t.render(e);
    this.didMount(this);
  }
  willMount(e) {
  }
  didMount(e) {
  }
  willUnmount(e) {
  }
  didUnmount(e) {
  }
  _$addLifeCycle(e, t) {
    let s = this[t];
    this[t] = function(n) {
      e.call(this, this), s.call(this, this);
    };
  }
}, D = class extends b {
  constructor(e) {
    super(0);
    o(this, "_$envNodes", []);
    this._$el = document.createElement(e);
  }
  _$init() {
    this._$bindNodes();
    for (let e of this._$nodes)
      e.render(this._$el);
  }
  _$addNodes(e) {
    this._$nodes = e;
  }
  _$addProp(e, t, s, n) {
    let d;
    if (e[0] === "_" ? d = (h) => this._$el.style[e.slice(1)] = h : e === "innerText" ? d = (h) => this._$el.innerText = h : d = (h) => this._$el[e] = h, !n) {
      d(t);
      return;
    }
    let r = t();
    d(r);
    let l = () => {
      let h = t();
      r !== h && (d(h), r = h);
    }, a = {};
    this._$depObjectIds.push(a), s._$addDeps(n, a, l);
  }
  willAppear(e) {
  }
  didAppear(e) {
  }
  willDisappear(e) {
  }
  didDisappear(e) {
  }
  _$addLifeCycle(e, t) {
    let s = this[t];
    this[t] = function(n) {
      return s.call(this, n), e.call(this, n);
    };
  }
  render(e) {
    this.willAppear(this._$el), e.appendChild(this._$el), this.didAppear(this._$el);
  }
};
function v(i) {
  X(i), u(i, (e, t) => {
    t._$nodeType === 0 && t.willDisappear(e), e.remove(), t._$nodeType === 0 && t.didDisappear(e);
  }), Y(i);
}
function P(i, e) {
  w(i, (t) => {
    for (let s of t._$depObjectIds)
      e._$deleteDeps(s);
    return !0;
  });
}
function m(i, e, t, s) {
  let n = s ?? t.childNodes.length;
  return J(i), u(i, (d, r) => {
    let l = t.childNodes[e];
    [0].includes(r._$nodeType) && r.willAppear(d), e === n ? t.appendChild(d) : t.insertBefore(d, l), [0].includes(r._$nodeType) && r.didAppear(d), e++, n++;
  }, !1), Q(i), [e, n];
}
function U(i, e) {
  return j(i._$nodes, e);
}
function x(i) {
  return j(i, void 0);
}
function j(i, e) {
  let t = 0, s = !1;
  return w(i, (n) => s ? !1 : n === e ? (s = !0, !1) : [1, 0].includes(n._$nodeType) ? (t++, !1) : !0), t;
}
function S(i, e) {
  w(i, (t) => ([2, 6].includes(t._$nodeType) && t[e](t), !0));
}
function J(i) {
  S(i, "willMount");
}
function Q(i) {
  S(i, "didMount");
}
function X(i) {
  S(i, "willUnmount");
}
function Y(i) {
  S(i, "didUnmount");
}
var T = class extends b {
  afterUpdateNewNodes(i) {
  }
  addAfterUpdateNewNodesFunc(i) {
    let e = this.afterUpdateNewNodes;
    this.afterUpdateNewNodes = function(t) {
      i.call(this, t), e.call(this, t);
    };
  }
  onUpdateNodes(i, e) {
  }
  addOnUpdateNodesFunc(i) {
    let e = this.onUpdateNodes;
    this.onUpdateNodes = function(t, s) {
      i.call(this, t, s), e.call(this, t, s);
    };
  }
  _$bindNewNodes(i) {
    this.afterUpdateNewNodes(i), F(i, this), this._$beforeInitSubNodes(), C(i);
  }
}, M = class extends T {
  constructor() {
    super(3);
    o(this, "keys", []);
    o(this, "array", []);
    o(this, "_$nodess", []);
    o(this, "nodeFunc");
    o(this, "keyFunc");
    o(this, "arrayFunc");
    o(this, "dlScope");
    o(this, "listenDeps");
    o(this, "_$envNodes", []);
    o(this, "duplicatedOrNoKey", !1);
  }
  _$getItem(e, t) {
    let s = this.duplicatedOrNoKey ? t : this.keys.indexOf(e);
    return this.array[s];
  }
  _$addNodeFunc(e) {
    this.nodeFunc = e;
  }
  _$addKeyFunc(e) {
    this.keyFunc = e;
  }
  _$addArrayFunc(e, t, s) {
    this.dlScope = e, this.arrayFunc = t, this.listenDeps = s;
  }
  _$addNodess(e) {
    this._$nodess = e, this._$nodes = this._$nodess.flat(1);
  }
  setArray() {
    this.array = [...this.arrayFunc()];
  }
  setKeys() {
    if (!this.keyFunc) {
      this.duplicatedOrNoKey = !0;
      return;
    }
    let e = [...this.keyFunc()];
    if (e.length === [...new Set(e)].length) {
      this.keys = e;
      return;
    }
    this.keys = [...Array(this.array.length).keys()], console.warn("重复key了"), this.duplicatedOrNoKey = !0;
  }
  _$init() {
    if (!this.listenDeps) {
      this._$bindNodes();
      return;
    }
    let e = this._$parentNode;
    for (; e && e._$nodeType !== 0; )
      e = e._$parentNode;
    if (!e)
      return;
    let t = this.keyFunc ? () => this.updateWithKey(e) : () => this.updateWithOutKey(e), s = {};
    if (this._$depObjectIds.push(s), this.dlScope._$addDeps(this.listenDeps, s, t), this.setArray(), this.setKeys(), this.duplicatedOrNoKey)
      for (let n of this.array.keys())
        this._$nodess.push(this.nodeFunc(null, n, this));
    else
      for (let [n, d] of this.keys.entries())
        this._$nodess.push(this.nodeFunc(d, n, this));
    this._$nodes = this._$nodess.flat(1), this._$bindNodes();
  }
  render(e) {
    for (let t of this._$nodes)
      t.render(e);
  }
  getNewNodes(e, t) {
    let s = this.nodeFunc(e, t, this);
    return this._$bindNewNodes(s), s;
  }
  updateWithOutKey(e) {
    let t = e._$el, s = this.array.length;
    this.setArray();
    let n = this.array.length;
    if (s !== n) {
      if (s < n) {
        let d = U(e, this), r = t.childNodes.length;
        for (let l = 0; l < n; l++) {
          if (l < s) {
            d += x(this._$nodess[l]);
            continue;
          }
          let a = this.getNewNodes(null, l);
          [d, r] = m(a, d, t, r), this._$nodess.push(a);
        }
        this._$nodes = this._$nodess.flat(1);
        return;
      }
      for (let d = n; d < s; d++)
        P(this._$nodess[d], this.dlScope), v(this._$nodess[d]);
      this._$nodess = this._$nodess.slice(0, n), this._$nodes = this._$nodess.flat(1);
    }
  }
  async updateWithKey(e) {
    let t = e._$el, s = U(e, this), n = this.keys, d = [...this.array], r = [...this._$nodess], l = [...this._$nodes];
    this.setArray(), this.setKeys(), this.duplicatedOrNoKey && (n = [...Array(d.length).keys()]);
    let a = [], h = [];
    for (let [p, _] of n.entries()) {
      if (this.keys.includes(_)) {
        a.push(_), h.push(r[p]);
        continue;
      }
      P(r[p], this.dlScope), v(r[p]);
    }
    n = a;
    let $ = s, f = t.childNodes.length;
    for (let [p, _] of this.keys.entries()) {
      if (n.includes(_)) {
        $ += x(h[n.indexOf(_)]);
        continue;
      }
      let c = this.getNewNodes(_, p);
      [$, f] = m(c, $, t, f), h.splice(p, 0, c), n.splice(p, 0, _);
    }
    $ = s;
    for (let [p, _] of this.keys.entries()) {
      let c = n.indexOf(_);
      if (c === p) {
        $ += x(h[p]);
        continue;
      }
      let k = h[c], R = n[c];
      [$, f] = m(k, $, t, f), h.splice(c, 1), n.splice(c, 1), h.splice(p + 1, 0, k), n.splice(p + 1, 0, R);
    }
    this._$nodess = h, this._$nodes = this._$nodess.flat(1), this.onUpdateNodes(l, this._$nodes);
  }
  _$listen(e, t, s, n) {
    let d = {};
    e._$depObjectIds.push(d), e._$addDeps(s, d, () => {
      let r = t();
      if (r === void 0) {
        e._$deleteDeps(d);
        return;
      }
      n(r);
    });
  }
}, K = class extends T {
  constructor() {
    super(4);
    o(this, "conditionPairs", []);
    o(this, "condition");
    o(this, "listenDeps", []);
    o(this, "dlScope");
    o(this, "_$envNodes", []);
  }
  _$addCond(e, t, s, n) {
    this.conditionPairs.push({ condition: e, node: t }), n && (this.dlScope || (this.dlScope = s), this.listenDeps.push(...n));
    let d = [];
    for (let r of this.conditionPairs)
      if (r.condition()) {
        this.condition = r.condition.toString(), d = r.node();
        break;
      }
    this._$nodes = d;
  }
  _$init() {
    var t;
    let e = this._$parentNode;
    for (; e && e._$nodeType !== 0; )
      e = e._$parentNode;
    if (e) {
      let s = {};
      this._$depObjectIds.push(s), (t = this.dlScope) == null || t._$addDeps(this.listenDeps, s, () => this.update(e));
    }
    this._$bindNodes();
  }
  update(e) {
    let t = this._$nodes, s = this.condition;
    this._$nodes = [];
    for (let r of this.conditionPairs)
      if (r.condition()) {
        this.condition !== r.condition.toString() ? (P(t, this.dlScope), v(t), this.condition = r.condition.toString(), this._$nodes = r.node(), this._$bindNewNodes(this._$nodes)) : this._$nodes = t;
        break;
      }
    if (t.length !== 0 && this._$nodes.length === 0 && (this.condition = "[none]", P(t, this.dlScope), v(t)), s === this.condition)
      return;
    let n = U(e, this), d = e._$el;
    m(this._$nodes, n, d, d.childNodes.length), this.onUpdateNodes(t, this._$nodes);
  }
  render(e) {
    for (let t of this._$nodes)
      t.render(e);
  }
}, ee = class extends b {
  constructor(i, e, t) {
    if (super(1), !t) {
      this._$el = document.createTextNode(i);
      return;
    }
    i = i;
    let s = i();
    this._$el = document.createTextNode(s);
    let n = () => {
      let r = i();
      s !== r && (this._$el.nodeValue = r, s = r);
    }, d = {};
    this._$depObjectIds.push(d), e._$addDeps(t, d, n);
  }
  render(i) {
    i.appendChild(this._$el);
  }
}, te = class extends b {
  constructor() {
    super(5);
    o(this, "addPropFuncs", []);
  }
  _$addNodes(e) {
    this._$nodes = e;
  }
  _$addProp(e, t, s, n) {
    this.addPropFuncs.push((d) => E(d, "env", e, t, s, n));
  }
  addProps(e) {
    for (let t of this.addPropFuncs)
      t(e);
  }
  addPropsToNodes(e) {
    w(e, (t) => (t._$beforeInitSubNodes = () => {
      this.addPropsToNodes(t._$nodes);
    }, t._$nodeType === 2 && this.addProps(t), !0));
  }
  _$init() {
    this.addPropsToNodes(this._$nodes), this._$bindNodes();
  }
  render(e) {
    for (let t of this._$nodes)
      t.render(e);
  }
}, g = class extends T {
  constructor(e, t, s) {
    super(6);
    o(this, "nodeOrFunc");
    o(this, "listenDeps");
    o(this, "dlScope");
    o(this, "propFuncs", []);
    o(this, "propScope", () => !0);
    o(this, "deepLoopEl", !1);
    if (!s) {
      this._$nodes = this.formatNodes(e);
      return;
    }
    this.nodeOrFunc = e, this.listenDeps = s, this.dlScope = t, this._$nodes = this.formatNodes(this.nodeOrFunc());
  }
  _$onUpdateNodes(e) {
    w(this._$nodes, (t) => ([4, 3, 6].includes(t._$nodeType) && t.addOnUpdateNodesFunc(e), !0));
  }
  _$addProp(e, t, s, n) {
    let d = this.propScope, r = this.deepLoopEl, l = (a) => {
      let h = a._$el;
      !d(h, a) || e[0] === "_" && (a._$el.style[e.slice(1)] ?? "").trim() !== "" || e[0] !== "_" && a._$el[e] !== void 0 || a._$addProp(e, t, s, n);
    };
    this.propFuncs.push(() => {
      for (let a of this._$nodes)
        switch (a._$nodeType) {
          case 0:
            l(a), r && u(a._$nodes, (h, $) => {
              $._$nodeType === 0 && l($);
            }, !0);
            break;
          case 3:
          case 4:
          case 6:
            a.addAfterUpdateNewNodesFunc((h) => {
              u(h, ($, f) => {
                f._$nodeType === 0 && l(f);
              }, r);
            });
          default:
            u(a._$nodes, (h, $) => {
              $._$nodeType === 0 && l($);
            }, r);
        }
    });
  }
  formatNodes(e) {
    return Array.isArray(e) || (e = [e]), e = e.flat(1), e = e.filter((t) => t != null).map((t) => t._$nodeType !== void 0 ? t : new ee(t)), e;
  }
  _$init() {
    if (this.listenDeps === void 0) {
      this._$bindNodes();
      for (let s of this.propFuncs)
        s();
      return;
    }
    let e = this._$parentNode;
    for (; e && e._$nodeType !== 0; )
      e = e._$parentNode;
    if (!e)
      return;
    let t = {};
    this._$depObjectIds.push(t), this.dlScope._$addDeps(this.listenDeps, t, () => this.update(e)), this._$bindNodes();
    for (let s of this.propFuncs) {
      s();
      let n = {};
      this._$depObjectIds.push(n), this.dlScope._$addDeps(this.listenDeps, n, s);
    }
  }
  render(e) {
    this.willMount(this);
    for (let t of this._$nodes)
      t.render(e);
    this.didMount(this);
  }
  update(e) {
    let t = this._$nodes;
    P(this._$nodes, this.dlScope), v(this._$nodes), this._$nodes = this.formatNodes(this.nodeOrFunc()), this._$bindNewNodes(this._$nodes);
    let s = e._$el, n = U(e, this);
    m(this._$nodes, n, s, s.childNodes.length), this.onUpdateNodes(t, this._$nodes);
  }
  willMount(e) {
  }
  didMount(e) {
  }
  willUnmount(e) {
  }
  didUnmount(e) {
  }
  _$addLifeCycle(e, t) {
    let s = this[t];
    this[t] = function(n) {
      e.call(this, this), s.call(this, this);
    };
  }
}, N = z;
class ne extends N {
  constructor() {
    super(...arguments);
    o(this, "_$tag", "Spacer");
    o(this, "Body", () => [new D("div")]);
  }
}
class oe extends N {
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
    o(this, "Body", () => {
      const t = new D("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), t._$addProp("_display", "flex"), t._$addProp("_flexDirection", "row"), t._$addNodes((() => {
        const s = new M();
        return s._$addNodess(Array.from(this._$children.map((n) => n())).map((n) => (() => {
          const d = new K();
          return d._$addCond(() => n._$tag === "Spacer", () => {
            const r = new g(n);
            return r._$addProp("_flexGrow", 1), [r];
          }), d._$addCond(() => !0, () => {
            const r = new g(n);
            return r._$addProp("_flexShrink", 0), r._$addProp("_margin", () => this.margin, this, ["margin"], !0), [r];
          }), [d];
        })())), [s];
      })()), [t];
    });
  }
}
class de extends N {
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
    o(this, "alignment", "top");
    o(this, "_$$width", "_$prop");
    o(this, "width", "max-content");
    o(this, "_$$height", "_$prop");
    o(this, "height", "100%");
    o(this, "margin", () => function() {
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
    o(this, "Body", () => {
      const t = new D("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), t._$addProp("_display", "flex"), t._$addProp("_flexDirection", "column"), t._$addNodes((() => {
        const s = new M();
        return s._$addNodess(Array.from(this._$children.map((n) => n())).map((n) => (() => {
          const d = new K();
          return d._$addCond(() => n._$tag === "Spacer", () => {
            const r = new g(n);
            return r._$addProp("_flexGrow", 1), [r];
          }), d._$addCond(() => !0, () => {
            const r = new g(n);
            return r._$addProp("_flexShrink", 0), r._$addProp("_margin", () => this.margin, this, ["margin"], !0), [r];
          }), [d];
        })())), [s];
      })()), [t];
    });
  }
}
class re extends N {
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
    o(this, "Body", () => {
      const t = new D("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", `${this.spacing}px`), t._$addProp("_display", "grid"), t._$addProp("_alignItems", () => ({
        top: "flex-start",
        center: "center",
        bottom: "flex-end"
      })[this.vAlignment], this, ["vAlignment"]), t._$addProp("_justifyItems", () => ({
        leading: "left",
        center: "center",
        tailing: "right"
      })[this.hAlignment], this, ["hAlignment"]), t._$addNodes((() => {
        const s = new M();
        return s._$addNodess(Array.from(this._$children.map((n) => n())).map((n) => (() => {
          const d = new g(n);
          return d._$addProp("_position", "relative"), d._$addProp("_gridArea", "1 / 1/ 1 / 1"), [d];
        })())), [s];
      })()), [t];
    });
  }
}
function O() {
  return location.hash.slice(2);
}
function L() {
  return location.pathname.slice(1);
}
function I(i, e) {
  let t;
  if (i[0] === "/")
    t = i;
  else {
    i[0] !== "." && (i = "./" + i);
    const s = i.split("/"), n = e.split("/").filter((r) => r);
    let d = 0;
    for (let r of s) {
      if (![".", ".."].includes(r))
        break;
      r === ".." && (n.length === 0 && console.warn(`no ../ in ${i}`), n.pop()), d++;
    }
    t = "/" + [...n, ...s.slice(d)].join("/");
  }
  return t;
}
class se {
  constructor() {
    o(this, "mode", "hash");
    o(this, "baseUrl", "");
  }
  hashTo(e) {
    window.location.href = "#" + I(e, this.baseUrl);
  }
  historyTo(e) {
    window.history.pushState({}, "", I(e, this.baseUrl));
  }
  to(e) {
    if (this.mode === "hash") {
      this.hashTo(e);
      return;
    }
    this.historyTo(e);
  }
}
class he extends N {
  constructor() {
    super(...arguments);
    o(this, "_$deps", {
      _$content: /* @__PURE__ */ new Map()
    });
    o(this, "_$tag", "Route");
    o(this, "_$$_$content", "_$prop");
    o(this, "_$content", "_$default");
    o(this, "Body", () => {
      var s;
      return [new g((s = this._$children) == null ? void 0 : s.map((n) => n()))];
    });
  }
}
const A = history.pushState;
let y = [];
class ae extends N {
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
    o(this, "_$$currUrl", () => this.mode === "hash" ? O() : L());
    o(this, "baseUrl", "");
    o(this, "prevPathCondition", "");
    o(this, "prevRoutes", []);
    o(this, "showedRoute", () => function() {
      const t = this.prevPathCondition;
      this.prevPathCondition = "";
      let s = [];
      for (let n of this._$children) {
        const d = n();
        if (d._$tag !== "Route") {
          s.push(d);
          continue;
        }
        if (this.currUrl.startsWith(this.baseUrl + d._$content) || d._$content === "_$default") {
          if (d._$content === t)
            return this.prevPathCondition = t, this.prevRoutes;
          s.push(d), this.prevPathCondition = d._$content;
          break;
        }
      }
      return this.prevRoutes = s, s;
    }.call(this));
    o(this, "historyChangeListen", () => {
      this.currUrl = L();
    });
    o(this, "hashChangeListen", () => {
      this.currUrl = O();
    });
    o(this, "Body", () => {
      const t = new te();
      return t._$addNodes((() => [new g(() => this.showedRoute, this, ["showedRoute"])])()), t._$addProp("RouteParam", () => ({
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
    addEventListener("load", this.historyChangeListen), addEventListener("popstate", this.historyChangeListen), y.push(this.historyChangeListen), history.pushState = new Proxy(A, {
      apply: (t, s, n) => {
        const d = t.apply(s, n);
        for (let r of y)
          r();
        return d;
      }
    });
  }
  willUnmount() {
    if (this.mode === "hash") {
      removeEventListener("load", this.hashChangeListen), removeEventListener("hashchange", this.hashChangeListen);
      return;
    }
    removeEventListener("load", this.historyChangeListen), removeEventListener("popstate", this.historyChangeListen), y = y.filter((t) => t !== this.historyChangeListen), y.length > 0 ? history.pushState = new Proxy(A, {
      apply: (t, s, n) => {
        const d = t.apply(s, n);
        for (let r of y)
          r();
        return d;
      }
    }) : history.pushState = A;
  }
  AfterConstruct() {
    let t = this._$parentNode;
    for (; t; )
      t._$tag === "Route" && (this.baseUrl = t._$content + "/" + this.baseUrl), t = t._$parentNode;
  }
  Preset() {
    const t = new se();
    t.mode = this.mode, t.baseUrl = this.baseUrl, this.navigator = t;
  }
}
export {
  oe as HStack,
  se as Navigator,
  he as Route,
  ae as RouterSpace,
  ne as Spacer,
  de as VStack,
  re as ZStack
};
