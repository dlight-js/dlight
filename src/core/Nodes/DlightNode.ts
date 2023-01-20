import { EnvNode } from "./EnvNode"
import { DLNode, DLNodeType } from "./DLNode"
import { addDLProp } from "../utils/prop";
import { addDeps } from "../utils/dep";
import { uid } from "../utils/util";

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
export class DLightNode extends DLNode {
    _$deps: {[key: string]: {[key: string]: () => any}} = {}
    _$envNodes?: EnvNode[]
    _$derivedPairs?: {[key: string]: string[]}
    _$children?: DLNode[]
    _$tag: string

    Body: any

    constructor(tag?: string, id?: string) {
        super(DLNodeType.Dlight, id)
        this._$tag = tag ?? this.constructor.name
    }

    get _$el() {
        return this._$nodes.map(node => node._$el)
    }

    _$addAfterset(func: () => any) {
        const prePreset = this.Preset
        this.Preset = () => {
            prePreset()
            func()
        }
    }

    _$runDeps(depName: string) {
        if (this._$deps[depName] === undefined) {
            console.warn(`${depName} is not a dependency in ${this.constructor.name}`)
            return
        }
        for (let [key, func] of Object.entries(this._$deps[depName])) {
            if (this._$deps[depName][key] === undefined) continue
            func.call(this)
        }
    }
    _$addChild(dlNode: DLNode) {
        if (this._$children === undefined) this._$children = []
        this._$children.push(dlNode)
    }


    _$initDecorators() {
        if (this._$derivedPairs) {
            for (let [propertyKey, listenDeps] of Object.entries(this._$derivedPairs)) {
                const derivedFunc = (this as any)[propertyKey];
                if (typeof derivedFunc !== "function") return

                (this as any)[propertyKey] = (this as any)[propertyKey]()

                let prevValue = (this as any)[propertyKey]
                addDeps(this, listenDeps, uid(), () => {
                    const newValue = derivedFunc()
                    if (newValue === prevValue) return;
                    (this as any)[propertyKey] = newValue
                    prevValue = newValue
                    this._$runDeps(propertyKey)
                })
            }
        }
    }

    Preset() {}
    Afterset() {}
    AfterConstruct() {}
    _$init() {
        this._$initDecorators()
        this.Preset()
        this._$bindNodes(this.Body())
        this.Afterset()
    }

    _$addProp(key: string, propFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
        addDLProp(this, "prop", key, propFunc, dlScope, listenDeps, isTwoWayConnected)
    }

    render(parentEl: HTMLElement) {
        this.willMount()
        for (let node of this._$nodes) {
            node.render(parentEl)
        }
        this.didMount()
    }

    // ---- lifecycles
    willMount() {}
    didMount() {}
    willUnmount() {}
    didUnmount() {}

    _$addLifeCycle(func: () => any, lifeCycleName: "willMount" | "didMount" | "willUnmount" | "didUnmount") {
        const preLifeCycle = this[lifeCycleName]
        this[lifeCycleName] = function() {
            func.call(this)
            preLifeCycle.call(this)
        }
    }
}
