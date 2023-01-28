var K = Object.defineProperty;
var C = (o, s, e) => s in o ? K(o, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[s] = e;
var d = (o, s, e) => (C(o, typeof s != "symbol" ? s + "" : s, e), e);
function T(o) {
  for (let s of o) {
    if (Array.isArray(s)) {
      T(s);
      continue;
    }
    s._$init();
  }
}
function S(o, s) {
  for (let e of o) {
    if (Array.isArray(e)) {
      S(e, s);
      continue;
    }
    e._$parentNode = s;
  }
}
function P(o, s) {
  for (let e of o)
    s(e) && P(e._$nodes, s);
}
function g(o, s, e = !0) {
  for (let t of o)
    [a.HTML, a.Text].includes(t._$nodeType) ? (s(t._$el, t), e && g(t._$nodes, s)) : g(t._$nodes, s, e);
}
function E(o) {
  const s = [];
  return g(o, (e, t) => {
    t._$nodeType === a.HTML && s.push(e);
  }, !1), s;
}
var a = /* @__PURE__ */ ((o) => (o[o.HTML = 0] = "HTML", o[o.Text = 1] = "Text", o[o.Custom = 2] = "Custom", o[o.For = 3] = "For", o[o.If = 4] = "If", o[o.Env = 5] = "Env", o[o.Expression = 6] = "Expression", o))(a || {});
class v {
  constructor(s) {
    /**
     * @member _$id
     *      - 每一个Node都有id
     * @member _$nodeType
     *      - 每一个Node都有具体的type，是一个枚举
     *      - enum DLNodeType {
     *          HTML, Text, Custom, For, If, Env
     *        }
     *      - 只提供基础类如HTML/Text，自定义类Dlight/Env，控制流类For/If
     *
     * @member _$nodes
     *      - 所有嵌套Node的抽象表示，就是个ast
     * @member _$el
     *      - 代表真实DOM上面的node，只有TextNode和HtmlNode有实体node
     * @method _$init
     *      - 这之前nodes和el都必须生成，flow需要更新整体结构
     * @method _$render
     *      - 传入parentEl，将_$nodes append上去
     * 
     * 
     * @pipeline
     * html: A; dlight: B; flow: C
     * 嵌套调用：A1 { A2 { B1 { B2 { C1 { C2 } } } } }
     * A1.construct <- A2.construct <- B1.construct <- B2.construct <- C1.construct <- C2.construct 
     * A1._$init -> A2._$init -> B1._$init -> B2._$init -> C1._$init -> C2._$init 
     *           ↳ A2.render  ↳ B1.render 
     * A1.render (A => Stop  B/C => B/C.render)
     * 
     * @hint
     * 所有的nodes初始化必须在construct阶段
     * 所有的bindNodes都必须在init中进行，保证子的init都可以访问到父parentNode
     */
    d(this, "_$nodeType");
    d(this, "__$el");
    d(this, "_$parentNode");
    d(this, "_$nodes", []);
    d(this, "_$depObjectIds", []);
    this._$nodeType = s;
  }
  get _$el() {
    return this.__$el ?? E(this._$nodes);
  }
  set _$el(s) {
    this.__$el = s;
  }
  _$beforeInitSubNodes() {
  }
  _$bindNodes() {
    S(this._$nodes, this), this._$beforeInitSubNodes(), T(this._$nodes);
  }
  _$init() {
  }
  // @ts-ignore
  render(s) {
  }
}
function k(o, s, e, t, n, i, r) {
  if (e in o) {
    if (!i) {
      o[e] = t;
      return;
    }
    if (console.log(), o[`_$$${e}`] === `_$${s}`) {
      V(n, o, e, t, i);
      return;
    }
    if (r && n[`_$$${i[0]}`] !== void 0) {
      B(n, o, e, t, i);
      return;
    }
    W(n, o, e, t, i);
  }
}
function V(o, s, e, t, n) {
  const i = {};
  s._$depObjectIds.push(i), s[e] = t(), o._$addDeps(n, i, () => {
    s[e] = t(), s._$runDeps(e);
  });
}
function B(o, s, e, t, n) {
  const i = {};
  s._$depObjectIds.push(i);
  for (let r of n) {
    const h = () => o[r] = s[e];
    s._$addDeps([e], i, h), s[e] = t(), o._$addDeps(n, i, () => {
      s._$deleteDep(e, i), s[e] = t(), s._$addDeps([e], i, h);
    });
  }
}
function W(o, s, e, t, n) {
  const i = {};
  s._$depObjectIds.push(i), s[`_$${e}`] = t(), o._$addDeps(n, i, () => {
    s[`_$${e}`] = t(), s._$runDeps(e);
  });
}
class G extends v {
  constructor() {
    super(a.Custom);
    d(this, "_$deps", {});
    d(this, "_$envNodes");
    d(this, "_$derivedPairs");
    d(this, "_$children");
    d(this, "_$tag", "");
    d(this, "Body", () => []);
  }
  _$addAfterset(e) {
    const t = this.Preset;
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
  // ---- dep
  _$initDecorators() {
    if (this._$derivedPairs)
      for (let [e, t] of Object.entries(this._$derivedPairs)) {
        const n = this[e];
        if (typeof n != "function")
          return;
        this[e] = this[e]();
        let i = this[e];
        this._$addDeps(t, {}, () => {
          const r = n();
          r !== i && (this[e] = r, i = r, this._$runDeps(e));
        });
      }
  }
  _$addDeps(e, t, n) {
    for (let i of e)
      this._$deps[i].set(t, n);
  }
  _$deleteDep(e, t) {
    this._$deps[e].delete(t);
  }
  _$deleteDeps(e) {
    for (let t in this._$deps)
      this._$deleteDep(t, e);
  }
  Preset() {
  }
  Afterset() {
  }
  _$bodyRun() {
    this._$initDecorators(), this.Preset(), this._$nodes = this.Body(), this.Afterset();
  }
  _$init() {
    this._$bodyRun(), this._$bindNodes();
  }
  _$addProp(e, t, n, i, r) {
    k(this, "prop", e, t, n, i, r);
  }
  render(e) {
    this.willMount(this);
    for (let t of this._$nodes)
      t.render(e);
    this.didMount(this);
  }
  // ---- lifecycles
  willMount(e) {
  }
  didMount(e) {
  }
  willUnmount(e) {
  }
  didUnmount(e) {
  }
  _$addLifeCycle(e, t) {
    const n = this[t];
    this[t] = function(i) {
      e.call(this, this), n.call(this, this);
    };
  }
}
class I extends v {
  constructor(e) {
    super(a.HTML);
    d(this, "_$envNodes", []);
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
  _$addProp(e, t, n, i) {
    let r;
    if (e[0] === "_" ? r = (_) => this._$el.style[e.slice(1)] = _ : e === "innerText" ? r = (_) => this._$el.innerText = _ : r = (_) => this._$el[e] = _, !i) {
      r(t);
      return;
    }
    let h = t();
    r(h);
    const c = () => {
      const _ = t();
      h !== _ && (r(_), h = _);
    }, $ = {};
    this._$depObjectIds.push($), n._$addDeps(i, $, c);
  }
  // ---- lifecycles
  willAppear(e) {
  }
  didAppear(e) {
  }
  willDisappear(e) {
  }
  didDisappear(e) {
  }
  _$addLifeCycle(e, t) {
    const n = this[t];
    this[t] = function(i) {
      return n.call(this, i), e.call(this, i);
    };
  }
  render(e) {
    this.willAppear(this._$el), e.appendChild(this._$el), this.didAppear(this._$el);
  }
}
function y(o) {
  z(o), g(o, (s, e) => {
    e._$nodeType === a.HTML && e.willDisappear(s), s.remove(), e._$nodeType === a.HTML && e.didDisappear(s);
  }), J(o);
}
function N(o, s) {
  P(o, (e) => {
    for (let t of e._$depObjectIds)
      s._$deleteDeps(t);
    return !0;
  });
}
function m(o, s, e, t) {
  let n = t ?? e.childNodes.length;
  return Z(o), g(o, (i, r) => {
    const h = e.childNodes[s];
    [a.HTML].includes(r._$nodeType) && r.willAppear(i), s === n ? e.appendChild(i) : e.insertBefore(i, h), [a.HTML].includes(r._$nodeType) && r.didAppear(i), s++, n++;
  }, !1), q(o), [s, n];
}
function b(o, s) {
  return O(o._$nodes, s);
}
function D(o) {
  return O(o, void 0);
}
function O(o, s) {
  let e = 0, t = !1;
  return P(o, (n) => t ? !1 : n === s ? (t = !0, !1) : [a.Text, a.HTML].includes(n._$nodeType) ? (e++, !1) : !0), e;
}
function M(o, s) {
  P(o, (e) => ([a.Custom, a.Expression].includes(e._$nodeType) && e[s](e), !0));
}
function Z(o) {
  M(o, "willMount");
}
function q(o) {
  M(o, "didMount");
}
function z(o) {
  M(o, "willUnmount");
}
function J(o) {
  M(o, "didUnmount");
}
class F extends v {
  afterUpdateNewNodes(s) {
  }
  addAfterUpdateNewNodesFunc(s) {
    const e = this.afterUpdateNewNodes;
    this.afterUpdateNewNodes = function(t) {
      s.call(this, t), e.call(this, t);
    };
  }
  onUpdateNodes(s, e) {
  }
  addOnUpdateNodesFunc(s) {
    const e = this.onUpdateNodes;
    this.onUpdateNodes = function(t, n) {
      s.call(this, t, n), e.call(this, t, n);
    };
  }
  _$bindNewNodes(s) {
    this.afterUpdateNewNodes(s), S(s, this), this._$beforeInitSubNodes(), T(s);
  }
}
class j extends F {
  constructor() {
    super(a.For);
    d(this, "keys", []);
    d(this, "array", []);
    d(this, "_$nodess", []);
    d(this, "nodeFunc");
    d(this, "keyFunc");
    d(this, "arrayFunc");
    d(this, "dlScope");
    d(this, "listenDeps");
    d(this, "_$envNodes", []);
    d(this, "duplicatedOrNoKey", !1);
  }
  _$getItem(e, t) {
    let n = this.duplicatedOrNoKey ? t : this.keys.indexOf(e);
    return this.array[n];
  }
  /**
   * @methodGroup - 只有有deps的时候才需要用各种func
   */
  _$addNodeFunc(e) {
    this.nodeFunc = e;
  }
  _$addKeyFunc(e) {
    this.keyFunc = e;
  }
  _$addArrayFunc(e, t, n) {
    this.dlScope = e, this.arrayFunc = t, this.listenDeps = n;
  }
  /**
   * @methodGroup - 无deps的时候直接加nodes
   */
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
    const e = [...this.keyFunc()];
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
    for (; e && e._$nodeType !== a.HTML; )
      e = e._$parentNode;
    if (!e)
      return;
    const t = this.keyFunc ? () => this.updateWithKey(e) : () => this.updateWithOutKey(e), n = {};
    if (this._$depObjectIds.push(n), this.dlScope._$addDeps(this.listenDeps, n, t), this.setArray(), this.setKeys(), this.duplicatedOrNoKey)
      for (let i of this.array.keys())
        this._$nodess.push(this.nodeFunc(null, i, this));
    else
      for (let [i, r] of this.keys.entries())
        this._$nodess.push(this.nodeFunc(r, i, this));
    this._$nodes = this._$nodess.flat(1), this._$bindNodes();
  }
  render(e) {
    for (let t of this._$nodes)
      t.render(e);
  }
  getNewNodes(e, t) {
    const n = this.nodeFunc(e, t, this);
    return this._$bindNewNodes(n), n;
  }
  /**
   * 没有key这样是优化过的，非常快 
   */
  updateWithOutKey(e) {
    const t = e._$el, n = this.array.length;
    this.setArray();
    const i = this.array.length;
    if (n !== i) {
      if (n < i) {
        let r = b(e, this), h = t.childNodes.length;
        for (let c = 0; c < i; c++) {
          if (c < n) {
            r += D(this._$nodess[c]);
            continue;
          }
          const $ = this.getNewNodes(null, c);
          [r, h] = m($, r, t, h), this._$nodess.push($);
        }
        this._$nodes = this._$nodess.flat(1);
        return;
      }
      for (let r = i; r < n; r++)
        N(this._$nodess[r], this.dlScope), y(this._$nodess[r]);
      this._$nodess = this._$nodess.slice(0, i), this._$nodes = this._$nodess.flat(1);
    }
  }
  /**
   * 有 key，三步走
   * 
   */
  async updateWithKey(e) {
    const t = e._$el, n = b(e, this);
    let i = this.keys;
    const r = [...this.array], h = [...this._$nodess], c = [...this._$nodes];
    this.setArray(), this.setKeys(), this.duplicatedOrNoKey && (i = [...Array(r.length).keys()]);
    let $ = [];
    const _ = [];
    for (let [l, u] of i.entries()) {
      if (this.keys.includes(u)) {
        $.push(u), _.push(h[l]);
        continue;
      }
      N(h[l], this.dlScope), y(h[l]);
    }
    i = $;
    let p = n, w = t.childNodes.length;
    for (let [l, u] of this.keys.entries()) {
      if (i.includes(u)) {
        p += D(_[i.indexOf(u)]);
        continue;
      }
      const f = this.getNewNodes(u, l);
      [p, w] = m(f, p, t, w), _.splice(l, 0, f), i.splice(l, 0, u);
    }
    p = n;
    for (let [l, u] of this.keys.entries()) {
      const f = i.indexOf(u);
      if (f === l) {
        p += D(_[l]);
        continue;
      }
      const L = _[f], H = i[f];
      [p, w] = m(L, p, t, w), _.splice(f, 1), i.splice(f, 1), _.splice(l + 1, 0, L), i.splice(l + 1, 0, H);
    }
    this._$nodess = _, this._$nodes = this._$nodess.flat(1), this.onUpdateNodes(c, this._$nodes);
  }
  // ---- 识别特殊for
  _$listen(e, t, n, i) {
    const r = {};
    e._$depObjectIds.push(r), e._$addDeps(n, r, () => {
      const h = t();
      if (h === void 0) {
        e._$deleteDeps(r);
        return;
      }
      i(h);
    });
  }
}
class U extends F {
  constructor() {
    super(a.If);
    d(this, "conditionPairs", []);
    d(this, "condition");
    d(this, "listenDeps", []);
    d(this, "dlScope");
    d(this, "_$envNodes", []);
  }
  _$addCond(e, t, n, i) {
    this.conditionPairs.push({ condition: e, node: t }), i && (this.dlScope || (this.dlScope = n), this.listenDeps.push(...i));
    let r = [];
    for (let h of this.conditionPairs)
      if (h.condition()) {
        this.condition = h.condition.toString(), r = h.node();
        break;
      }
    this._$nodes = r;
  }
  _$init() {
    var t;
    let e = this._$parentNode;
    for (; e && e._$nodeType !== a.HTML; )
      e = e._$parentNode;
    if (e) {
      const n = {};
      this._$depObjectIds.push(n), (t = this.dlScope) == null || t._$addDeps(this.listenDeps, n, () => this.update(e));
    }
    this._$bindNodes();
  }
  update(e) {
    const t = this._$nodes, n = this.condition;
    this._$nodes = [];
    for (let h of this.conditionPairs)
      if (h.condition()) {
        this.condition !== h.condition.toString() ? (N(t, this.dlScope), y(t), this.condition = h.condition.toString(), this._$nodes = h.node(), this._$bindNewNodes(this._$nodes)) : this._$nodes = t;
        break;
      }
    if (t.length !== 0 && this._$nodes.length === 0 && (this.condition = "[none]", N(t, this.dlScope), y(t)), n === this.condition)
      return;
    const i = b(e, this), r = e._$el;
    m(this._$nodes, i, r, r.childNodes.length), this.onUpdateNodes(t, this._$nodes);
  }
  render(e) {
    for (let t of this._$nodes)
      t.render(e);
  }
}
class Q extends v {
  constructor(s, e, t) {
    if (super(a.Text), !t) {
      this._$el = document.createTextNode(s);
      return;
    }
    s = s;
    let n = s();
    this._$el = document.createTextNode(n);
    const i = () => {
      const h = s();
      n !== h && (this._$el.nodeValue = h, n = h);
    }, r = {};
    this._$depObjectIds.push(r), e._$addDeps(t, r, i);
  }
  render(s) {
    s.appendChild(this._$el);
  }
}
class x extends F {
  constructor(e, t, n) {
    super(a.Expression);
    d(this, "nodeOrFunc");
    d(this, "listenDeps");
    d(this, "dlScope");
    d(this, "propFuncs", []);
    // ---- onUpdateNodes
    d(this, "propScope", () => !0);
    d(this, "deepLoopEl", !1);
    if (!n) {
      this._$nodes = this.formatNodes(e);
      return;
    }
    this.nodeOrFunc = e, this.listenDeps = n, this.dlScope = t, this._$nodes = this.formatNodes(this.nodeOrFunc());
  }
  _$onUpdateNodes(e) {
    P(this._$nodes, (t) => ([a.If, a.For, a.Expression].includes(t._$nodeType) && t.addOnUpdateNodesFunc(e), !0));
  }
  _$addProp(e, t, n, i) {
    const r = this.propScope, h = this.deepLoopEl, c = ($) => {
      const _ = $._$el;
      r(_, $) && (e[0] === "_" && ($._$el.style[e.slice(1)] ?? "").trim() !== "" || e[0] !== "_" && $._$el[e] !== void 0 || $._$addProp(e, t, n, i));
    };
    this.propFuncs.push(() => {
      for (let $ of this._$nodes)
        switch ($._$nodeType) {
          case a.HTML:
            c($), h && g($._$nodes, (_, p) => {
              p._$nodeType === a.HTML && c(p);
            }, !0);
            break;
          case a.For:
          case a.If:
          case a.Expression:
            $.addAfterUpdateNewNodesFunc((_) => {
              g(_, (p, w) => {
                w._$nodeType === a.HTML && c(w);
              }, h);
            });
          default:
            g($._$nodes, (_, p) => {
              p._$nodeType === a.HTML && c(p);
            }, h);
        }
    });
  }
  formatNodes(e) {
    return Array.isArray(e) || (e = [e]), e = e.flat(1), e = e.filter((t) => t != null).map((t) => t._$nodeType !== void 0 ? t : new Q(t)), e;
  }
  _$init() {
    if (this.listenDeps === void 0) {
      this._$bindNodes();
      for (let n of this.propFuncs)
        n();
      return;
    }
    let e = this._$parentNode;
    for (; e && e._$nodeType !== a.HTML; )
      e = e._$parentNode;
    if (!e)
      return;
    const t = {};
    this._$depObjectIds.push(t), this.dlScope._$addDeps(this.listenDeps, t, () => this.update(e)), this._$bindNodes();
    for (let n of this.propFuncs) {
      n();
      const i = {};
      this._$depObjectIds.push(i), this.dlScope._$addDeps(this.listenDeps, i, n);
    }
  }
  render(e) {
    this.willMount(this);
    for (let t of this._$nodes)
      t.render(e);
    this.didMount(this);
  }
  update(e) {
    const t = this._$nodes;
    N(this._$nodes, this.dlScope), y(this._$nodes), this._$nodes = this.formatNodes(this.nodeOrFunc()), this._$bindNewNodes(this._$nodes);
    const n = e._$el, i = b(e, this);
    m(this._$nodes, i, n, n.childNodes.length), this.onUpdateNodes(t, this._$nodes);
  }
  // ---- lifecycles
  willMount(e) {
  }
  didMount(e) {
  }
  willUnmount(e) {
  }
  didUnmount(e) {
  }
  _$addLifeCycle(e, t) {
    const n = this[t];
    this[t] = function(i) {
      e.call(this, this), n.call(this, this);
    };
  }
}
const A = G;
class X extends A {
  constructor() {
    super(...arguments);
    d(this, "_$tag", "Spacer");
    d(this, "Body", () => [new I("div")]);
  }
}
class Y extends A {
  constructor() {
    super(...arguments);
    d(this, "_$derivedPairs", {
      margin: ["alignment"]
    });
    d(this, "_$deps", {
      spacing: /* @__PURE__ */ new Map(),
      alignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map(),
      margin: /* @__PURE__ */ new Map()
    });
    d(this, "_$tag", "HStack");
    d(this, "_$$spacing", "_$prop");
    d(this, "spacing", 10);
    d(this, "_$$alignment", "_$prop");
    d(this, "alignment", "top");
    d(this, "_$$width", "_$prop");
    d(this, "width", "100%");
    d(this, "_$$height", "_$prop");
    d(this, "height", "max-content");
    d(this, "margin", () => function() {
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
    d(this, "Body", () => {
      const e = new I("div");
      return e._$addProp("_height", () => this.height, this, ["height"]), e._$addProp("_width", () => this.width, this, ["width"]), e._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), e._$addProp("_display", "flex"), e._$addProp("_flexDirection", "row"), e._$addNodes((() => {
        const t = new j();
        return t._$addNodess(Array.from(this._$children).map((n) => (() => {
          const i = new U();
          return i._$addCond(() => n._$tag === "Spacer", () => {
            const r = new x(n());
            return r._$addProp("_flexGrow", 1), [r];
          }), i._$addCond(() => !0, () => {
            const r = new x(n());
            return r._$addProp("_flexShrink", 0), r._$addProp("_margin", () => this.margin, this, ["margin"], !0), [r];
          }), [i];
        })())), [t];
      })()), [e];
    });
  }
}
class ee extends A {
  constructor() {
    super(...arguments);
    d(this, "_$derivedPairs", {
      margin: ["alignment"]
    });
    d(this, "_$deps", {
      spacing: /* @__PURE__ */ new Map(),
      alignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map(),
      margin: /* @__PURE__ */ new Map()
    });
    d(this, "_$tag", "VStack");
    d(this, "_$$spacing", "_$prop");
    d(this, "spacing", 10);
    d(this, "_$$alignment", "_$prop");
    d(this, "alignment", "top");
    d(this, "_$$width", "_$prop");
    d(this, "width", "max-content");
    d(this, "_$$height", "_$prop");
    d(this, "height", "100%");
    d(this, "margin", () => function() {
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
    d(this, "Body", () => {
      const e = new I("div");
      return e._$addProp("_height", () => this.height, this, ["height"]), e._$addProp("_width", () => this.width, this, ["width"]), e._$addProp("_columnGap", () => `${this.spacing}px`, this, ["spacing"]), e._$addProp("_display", "flex"), e._$addProp("_flexDirection", "column"), e._$addNodes((() => {
        const t = new j();
        return t._$addNodess(Array.from(this._$children).map((n) => (() => {
          const i = new U();
          return i._$addCond(() => n._$tag === "Spacer", () => {
            const r = new x(n());
            return r._$addProp("_flexGrow", 1), [r];
          }), i._$addCond(() => !0, () => {
            const r = new x(n());
            return r._$addProp("_flexShrink", 0), r._$addProp("_margin", () => this.margin, this, ["margin"], !0), [r];
          }), [i];
        })())), [t];
      })()), [e];
    });
  }
}
class te extends A {
  constructor() {
    super(...arguments);
    d(this, "_$deps", {
      hAlignment: /* @__PURE__ */ new Map(),
      vAlignment: /* @__PURE__ */ new Map(),
      width: /* @__PURE__ */ new Map(),
      height: /* @__PURE__ */ new Map()
    });
    d(this, "_$tag", "ZStack");
    d(this, "_$$hAlignment", "_$prop");
    d(this, "hAlignment", "center");
    d(this, "_$$vAlignment", "_$prop");
    d(this, "vAlignment", "center");
    d(this, "_$$width", "_$prop");
    d(this, "width", "max-content");
    d(this, "_$$height", "_$prop");
    d(this, "height", "max-content");
    d(this, "Body", () => {
      const e = new I("div");
      return e._$addProp("_height", () => this.height, this, ["height"]), e._$addProp("_width", () => this.width, this, ["width"]), e._$addProp("_columnGap", `${this.spacing}px`), e._$addProp("_display", "grid"), e._$addProp("_alignItems", () => ({
        top: "flex-start",
        center: "center",
        bottom: "flex-end"
      })[this.vAlignment], this, ["vAlignment"]), e._$addProp("_justifyItems", () => ({
        leading: "left",
        center: "center",
        tailing: "right"
      })[this.hAlignment], this, ["hAlignment"]), e._$addNodes((() => {
        const t = new j();
        return t._$addNodess(Array.from(this._$children).map((n) => (() => {
          const i = new x(n());
          return i._$addProp("_position", "relative"), i._$addProp("_gridArea", "1 / 1/ 1 / 1"), [i];
        })())), [t];
      })()), [e];
    });
  }
}
export {
  Y as HStack,
  X as Spacer,
  ee as VStack,
  te as ZStack
};
