
# Quick start
NA now

# Performance
* 5 warm-ups, mean results of 10 times
re-calc on this weekend

# Core Concept
## DLNode
是half-VDOM的基础类，有一些重要的属性
```typescript
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
 */
```
## CustomNode
```typescript
/**
 * 整个依赖只有两种
 * State和Derived
 * @State
 *      1. 强制用state decorator来装饰
 *      2. 从prop中isTwoWayConnected导出的，可能是prop/dotProp/env
 * @Derived
 *      无显示装饰器
 *      从depChain而来
 *      e.g.
 *      A: State, B = A + 1, C = B + 1
 *      则depChain为 A -> B -> C
 *      这时 B/C 以及 derived from B/C 的都可以被监听到
 * @Prop
 *      外部传入的参数，有三种情况
 *          1. 里面Prop => 外面不管传什么都是里面监听外面改变
 *          2. 里面PropState + 外面State/PropState => 直接map过去互相改变
 *          3. 里面PropState + 外面是普通的或者derived => 里面是个State，同时监听外面改变
 *      传参数有三种方式（加上env有4种）
 *          1. MyComp({prop1: xx, prop2: xx})
 *             class MyComp extend View {
 *                 @Prop prop1 = defaultProp1
 *                 @Prop prop2
 *             }
 *          2. MyComp()
 *                  .prop1(xxx)
 *                  .prop2(xxx)
 *             class MyComp extend View {
 *                 @Prop prop1 = defaultProp1
 *                 @Prop prop2
 *             }
 *          1. MyComp(props)
 *             class MyComp extend View {
 *                 // 必须用_$content 来接
 *                 @Prop _$content
 *             }
 * @Children
 *          一般不会用到children，只有在写到组件库时候要用到，比如:
 *              MyComp() {
 *                  MyNestedComp1()
 *                  MyNestedComp2()
 *              }
 *          这时候，MyNestedComp1和MyNestedComp2就会放到this._$children里面
 *          如果想要把这些nodes转化放到body里面，用提供的Nodes或者Node容器，如：
 *          class MyComp extends View{
 *              Body() {
 *                  Nodes(this._$children)
 *                  div("other stuff")
 *              }
 *          }
 * @Pipeline
 *      new constructor()（初始化不在depChain上的member）
 *      等待外部调用 initNodes([this]) 或者 this._$init()
 *   -> this._$initDecorators()（生成depChain，补齐剩下的参数）
 *   -> this.Preset()（留的hook)
 *   -> this.Body()（run Body函数并挂到this._$nodes上）
 *   -> bindParentNode()（把刚生成的nodes的_$parentNode指向自己）
 *   -> initNodes()（递归init刚生成的nodes）
 *   -> this.Afterset（留的hook，目前只有.element()会调用)
 */
```

# Design Proposal

## tsd

```typescript
Body() {
  div(props) {
    
  }	
  	.dotProps()
  
  "string"
  `string ${anyVariable}`
  {{ anyVariable === 1 ? "is 1" : "not 1" }}
  {{ anyVariable === 1 ? {{ div(1) }} : {{ div(2) }} }}  
}
```





# TODO

* features
- [x] if
- [x] for
- [x] state
- [x] derived
- [x] effect
- [x] prop
- [x] dot prop
- [x] shortcut for style (e.g. div("hello")._height)
- [x] element map out
- [x] support text node
- [x] support jsx
- [x] jsx control flow
- [x] prop lifecycle
- [x] support environment/context
- [ ] support prop expression nesting
- [x] animation
- [ ] error hints
- [x] deps optimization
- [ ] PropState change to PropState/EnvState
- [x] add lifeCycle to htmlNode

* plugins
- [x] vite transpiler plugin
- [ ] vscode language server for auto completion



