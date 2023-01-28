var B = Object.defineProperty;
var H = (i, e, t) => e in i ? B(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var n = (i, e, t) => (H(i, typeof e != "symbol" ? e + "" : e, t), t);
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
    n(this, "_$nodeType");
    n(this, "__$el");
    n(this, "_$parentNode");
    n(this, "_$nodes", []);
    n(this, "_$depObjectIds", []);
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
function E(i, e, t, s, o, d, r) {
  if (t in i) {
    if (!d) {
      i[t] = s;
      return;
    }
    if (i[`_$$${t}`] === `_$${e}`) {
      V(o, i, t, s, d);
      return;
    }
    if (r && `_$$${d[0]}` in i) {
      Z(o, i, t, s, d);
      return;
    }
    q(o, i, t, s, d);
  }
}
function V(i, e, t, s, o) {
  let d = {};
  e._$depObjectIds.push(d), e[t] = s(), i._$addDeps(o, d, () => {
    e[t] = s(), e._$runDeps(t);
  });
}
function Z(i, e, t, s, o) {
  let d = {};
  e._$depObjectIds.push(d);
  for (let r of o) {
    let l = () => i[r] = e[t];
    e._$addDeps([t], d, l), e[t] = s(), i._$addDeps(o, d, () => {
      e._$deleteDep(t, d), e[t] = s(), e._$addDeps([t], d, l);
    });
  }
}
function q(i, e, t, s, o) {
  let d = {};
  e._$depObjectIds.push(d), e[`_$${t}`] = s(), i._$addDeps(o, d, () => {
    e[`_$${t}`] = s(), e._$runDeps(t);
  });
}
var z = class extends b {
  constructor() {
    super(2);
    n(this, "_$deps", {});
    n(this, "_$envNodes");
    n(this, "_$derivedPairs");
    n(this, "_$children");
    n(this, "_$tag", "");
    n(this, "Body", () => []);
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
        let o = this[e];
        this._$addDeps(t, {}, () => {
          let d = s();
          d !== o && (this[e] = d, o = d, this._$runDeps(e));
        });
      }
  }
  _$addDeps(e, t, s) {
    for (let o of e)
      this._$deps[o].set(t, s);
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
  _$addProp(e, t, s, o, d) {
    E(this, "prop", e, t, s, o, d);
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
    this[t] = function(o) {
      e.call(this, this), s.call(this, this);
    };
  }
}, D = class extends b {
  constructor(e) {
    super(0);
    n(this, "_$envNodes", []);
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
  _$addProp(e, t, s, o) {
    let d;
    if (e[0] === "_" ? d = (h) => this._$el.style[e.slice(1)] = h : e === "innerText" ? d = (h) => this._$el.innerText = h : d = (h) => this._$el[e] = h, !o) {
      d(t);
      return;
    }
    let r = t();
    d(r);
    let l = () => {
      let h = t();
      r !== h && (d(h), r = h);
    }, a = {};
    this._$depObjectIds.push(a), s._$addDeps(o, a, l);
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
    this[t] = function(o) {
      return s.call(this, o), e.call(this, o);
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
  let o = s ?? t.childNodes.length;
  return J(i), u(i, (d, r) => {
    let l = t.childNodes[e];
    [0].includes(r._$nodeType) && r.willAppear(d), e === o ? t.appendChild(d) : t.insertBefore(d, l), [0].includes(r._$nodeType) && r.didAppear(d), e++, o++;
  }, !1), Q(i), [e, o];
}
function U(i, e) {
  return j(i._$nodes, e);
}
function x(i) {
  return j(i, void 0);
}
function j(i, e) {
  let t = 0, s = !1;
  return w(i, (o) => s ? !1 : o === e ? (s = !0, !1) : [1, 0].includes(o._$nodeType) ? (t++, !1) : !0), t;
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
    n(this, "keys", []);
    n(this, "array", []);
    n(this, "_$nodess", []);
    n(this, "nodeFunc");
    n(this, "keyFunc");
    n(this, "arrayFunc");
    n(this, "dlScope");
    n(this, "listenDeps");
    n(this, "_$envNodes", []);
    n(this, "duplicatedOrNoKey", !1);
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
      for (let o of this.array.keys())
        this._$nodess.push(this.nodeFunc(null, o, this));
    else
      for (let [o, d] of this.keys.entries())
        this._$nodess.push(this.nodeFunc(d, o, this));
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
    let o = this.array.length;
    if (s !== o) {
      if (s < o) {
        let d = U(e, this), r = t.childNodes.length;
        for (let l = 0; l < o; l++) {
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
      for (let d = o; d < s; d++)
        P(this._$nodess[d], this.dlScope), v(this._$nodess[d]);
      this._$nodess = this._$nodess.slice(0, o), this._$nodes = this._$nodess.flat(1);
    }
  }
  async updateWithKey(e) {
    let t = e._$el, s = U(e, this), o = this.keys, d = [...this.array], r = [...this._$nodess], l = [...this._$nodes];
    this.setArray(), this.setKeys(), this.duplicatedOrNoKey && (o = [...Array(d.length).keys()]);
    let a = [], h = [];
    for (let [_, p] of o.entries()) {
      if (this.keys.includes(p)) {
        a.push(p), h.push(r[_]);
        continue;
      }
      P(r[_], this.dlScope), v(r[_]);
    }
    o = a;
    let $ = s, f = t.childNodes.length;
    for (let [_, p] of this.keys.entries()) {
      if (o.includes(p)) {
        $ += x(h[o.indexOf(p)]);
        continue;
      }
      let c = this.getNewNodes(p, _);
      [$, f] = m(c, $, t, f), h.splice(_, 0, c), o.splice(_, 0, p);
    }
    $ = s;
    for (let [_, p] of this.keys.entries()) {
      let c = o.indexOf(p);
      if (c === _) {
        $ += x(h[_]);
        continue;
      }
      let k = h[c], R = o[c];
      [$, f] = m(k, $, t, f), h.splice(c, 1), o.splice(c, 1), h.splice(_ + 1, 0, k), o.splice(_ + 1, 0, R);
    }
    this._$nodess = h, this._$nodes = this._$nodess.flat(1), this.onUpdateNodes(l, this._$nodes);
  }
  _$listen(e, t, s, o) {
    let d = {};
    e._$depObjectIds.push(d), e._$addDeps(s, d, () => {
      let r = t();
      if (r === void 0) {
        e._$deleteDeps(d);
        return;
      }
      o(r);
    });
  }
}, K = class extends T {
  constructor() {
    super(4);
    n(this, "conditionPairs", []);
    n(this, "condition");
    n(this, "listenDeps", []);
    n(this, "dlScope");
    n(this, "_$envNodes", []);
  }
  _$addCond(e, t, s, o) {
    this.conditionPairs.push({ condition: e, node: t }), o && (this.dlScope || (this.dlScope = s), this.listenDeps.push(...o));
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
    let o = U(e, this), d = e._$el;
    m(this._$nodes, o, d, d.childNodes.length), this.onUpdateNodes(t, this._$nodes);
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
    let o = () => {
      let r = i();
      s !== r && (this._$el.nodeValue = r, s = r);
    }, d = {};
    this._$depObjectIds.push(d), e._$addDeps(t, d, o);
  }
  render(i) {
    i.appendChild(this._$el);
  }
}, te = class extends b {
  constructor() {
    super(5);
    n(this, "addPropFuncs", []);
  }
  _$addNodes(e) {
    this._$nodes = e;
  }
  _$addProp(e, t, s, o) {
    this.addPropFuncs.push((d) => E(d, "env", e, t, s, o));
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
    n(this, "nodeOrFunc");
    n(this, "listenDeps");
    n(this, "dlScope");
    n(this, "propFuncs", []);
    n(this, "propScope", () => !0);
    n(this, "deepLoopEl", !1);
    if (!s) {
      this._$nodes = this.formatNodes(e);
      return;
    }
    this.nodeOrFunc = e, this.listenDeps = s, this.dlScope = t, this._$nodes = this.formatNodes(this.nodeOrFunc());
  }
  _$onUpdateNodes(e) {
    w(this._$nodes, (t) => ([4, 3, 6].includes(t._$nodeType) && t.addOnUpdateNodesFunc(e), !0));
  }
  _$addProp(e, t, s, o) {
    let d = this.propScope, r = this.deepLoopEl, l = (a) => {
      let h = a._$el;
      !d(h, a) || e[0] === "_" && (a._$el.style[e.slice(1)] ?? "").trim() !== "" || e[0] !== "_" && a._$el[e] !== void 0 || a._$addProp(e, t, s, o);
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
      let o = {};
      this._$depObjectIds.push(o), this.dlScope._$addDeps(this.listenDeps, o, s);
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
    let s = e._$el, o = U(e, this);
    m(this._$nodes, o, s, s.childNodes.length), this.onUpdateNodes(t, this._$nodes);
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
    this[t] = function(o) {
      e.call(this, this), s.call(this, this);
    };
  }
}, N = z;
class ne extends N {
  constructor() {
    super(...arguments);
    n(this, "_$tag", "Spacer");
    n(this, "Body", () => [new D("div")]);
  }
}
class oe extends N {
  constructor() {
    super(...arguments);
    n(this, "_$derivedPairs", {
      margin: ["alignment"]
    });
    n(this, "_$deps", {
      spacing: /* @__PURE__ */ new Map(),
      alignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map(),
      margin: /* @__PURE__ */ new Map()
    });
    n(this, "_$tag", "HStack");
    n(this, "_$$spacing", "_$prop");
    n(this, "spacing", 10);
    n(this, "_$$alignment", "_$prop");
    n(this, "alignment", "top");
    n(this, "_$$width", "_$prop");
    n(this, "width", "100%");
    n(this, "_$$height", "_$prop");
    n(this, "height", "max-content");
    n(this, "margin", () => function() {
      switch (this.alignment) {
        case "top":
          return "0 0 auto 0";
        case "bottom":
          return "auto 0 0 0";
        case "center":
          return "auto 0";
        default:
          return "auto";
      }
    }.call(this));
    n(this, "Body", () => {
      const t = new D("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), t._$addProp("_display", "flex"), t._$addProp("_flexDirection", "row"), t._$addNodes((() => {
        const s = new M();
        return s._$addNodess(Array.from(this._$children).map((o) => (() => {
          const d = new K();
          return d._$addCond(() => o._$tag === "Spacer", () => {
            const r = new g(o());
            return r._$addProp("_flexGrow", 1), [r];
          }), d._$addCond(() => !0, () => {
            const r = new g(o());
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
    n(this, "_$derivedPairs", {
      margin: ["alignment"]
    });
    n(this, "_$deps", {
      spacing: /* @__PURE__ */ new Map(),
      alignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map(),
      margin: /* @__PURE__ */ new Map()
    });
    n(this, "_$tag", "VStack");
    n(this, "_$$spacing", "_$prop");
    n(this, "spacing", 10);
    n(this, "_$$alignment", "_$prop");
    n(this, "alignment", "top");
    n(this, "_$$width", "_$prop");
    n(this, "width", "max-content");
    n(this, "_$$height", "_$prop");
    n(this, "height", "100%");
    n(this, "margin", () => function() {
      switch (this.alignment) {
        case "top":
          return "0 auto 0 0";
        case "bottom":
          return "0 0 0 auto";
        case "center":
          return "0 auto";
        default:
          return "auto";
      }
    }.call(this));
    n(this, "Body", () => {
      const t = new D("div");
      return t._$addProp("_height", () => this.height, this, ["height"]), t._$addProp("_width", () => this.width, this, ["width"]), t._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), t._$addProp("_display", "flex"), t._$addProp("_flexDirection", "column"), t._$addNodes((() => {
        const s = new M();
        return s._$addNodess(Array.from(this._$children).map((o) => (() => {
          const d = new K();
          return d._$addCond(() => o._$tag === "Spacer", () => {
            const r = new g(o());
            return r._$addProp("_flexGrow", 1), [r];
          }), d._$addCond(() => !0, () => {
            const r = new g(o());
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
    n(this, "_$deps", {
      hAlignment: /* @__PURE__ */ new Map(),
      vAlignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map()
    });
    n(this, "_$tag", "ZStack");
    n(this, "_$$hAlignment", "_$prop");
    n(this, "hAlignment", "center");
    n(this, "_$$vAlignment", "_$prop");
    n(this, "vAlignment", "center");
    n(this, "_$$width", "_$prop");
    n(this, "width", "max-content");
    n(this, "_$$height", "_$prop");
    n(this, "height", "max-content");
    n(this, "Body", () => {
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
        return s._$addNodess(Array.from(this._$children).map((o) => (() => {
          const d = new g(o());
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
    const s = i.split("/"), o = e.split("/").filter((r) => r);
    let d = 0;
    for (let r of s) {
      if (![".", ".."].includes(r))
        break;
      r === ".." && (o.length === 0 && console.warn(`no ../ in ${i}`), o.pop()), d++;
    }
    t = "/" + [...o, ...s.slice(d)].join("/");
  }
  return t;
}
class se {
  constructor() {
    n(this, "mode", "hash");
    n(this, "baseUrl", "");
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
    n(this, "_$deps", {
      _$content: /* @__PURE__ */ new Map()
    });
    n(this, "_$tag", "Route");
    n(this, "_$$_$content", "_$prop");
    n(this, "_$content", "_$default");
    n(this, "Body", () => {
      var s;
      return [new g((s = this._$children) == null ? void 0 : s.map((o) => o()))];
    });
  }
}
const A = history.pushState;
let y = [];
class ae extends N {
  constructor() {
    super(...arguments);
    n(this, "_$derivedPairs", {
      currUrl: ["mode"],
      showedRoute: ["currUrl"]
    });
    n(this, "_$deps", {
      mode: /* @__PURE__ */ new Map(),
      navigator: /* @__PURE__ */ new Map(),
      currUrl: /* @__PURE__ */ new Map(),
      showedRoute: /* @__PURE__ */ new Map()
    });
    n(this, "_$tag", "RouterSpace");
    n(this, "_$$mode", "_$prop");
    n(this, "mode", "history");
    n(this, "_$$navigator");
    n(this, "_$$currUrl", () => this.mode === "hash" ? O() : L());
    n(this, "baseUrl", "");
    n(this, "prevPathCondition", "");
    n(this, "prevRoutes", []);
    n(this, "showedRoute", () => function() {
      const t = this.prevPathCondition;
      this.prevPathCondition = "";
      let s = [];
      for (let o of this._$children) {
        const d = o();
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
    n(this, "historyChangeListen", () => {
      this.currUrl = L();
    });
    n(this, "hashChangeListen", () => {
      this.currUrl = O();
    });
    n(this, "Body", () => {
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
      apply: (t, s, o) => {
        const d = t.apply(s, o);
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
      apply: (t, s, o) => {
        const d = t.apply(s, o);
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
