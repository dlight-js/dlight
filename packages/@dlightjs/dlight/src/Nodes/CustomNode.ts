import { EnvNode } from "./EnvNode"
import { DLNode, DLNodeType } from "./DLNode"
import { addDLProp } from "../utils/prop";
import {HtmlNode} from '../Nodes';
import { loopNodes } from "../utils/nodes";
import {detachNodes} from "./utils";

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
export class CustomNode extends DLNode {
    _$deps: {[key: string]: Map<Object, ()=>any>} = {}
    _$envNodes?: EnvNode[]
    _$derivedPairs?: {[key: string]: string[]}
    _$tag: string = ""

    constructor() {
        super(DLNodeType.Custom)
    }
    
    _$addAfterset(func: () => any) {
        const preAfterset = this.Afterset.bind(this)
        this.Afterset = function() {
            preAfterset()
            func()
        }.bind(this)
    }

    _$runDeps(depName: string) {
        if (this._$deps[depName] === undefined) {
            console.warn(`${depName} is not a dependency in ${this.constructor.name}`)
            return
        }
        for (let func of this._$deps[depName].values()) {
            func.call(this)
        }
    }


    _$children: DLNode[] = []

    _$addChildren(nodeFuncs: DLNode[]) {
        this._$children = nodeFuncs
    }

    _$resetChildren() {
        for (let child of this._$children) {
            child._$nodes = []
        }
    }

    // ---- dep
    _$initDecorators() {
        if (this._$derivedPairs) {
            for (let [propertyKey, listenDeps] of Object.entries(this._$derivedPairs)) {
                const derivedFunc = (this as any)[propertyKey];
                if (typeof derivedFunc !== "function") return

                (this as any)[propertyKey] = (this as any)[propertyKey]()

                let prevValue = (this as any)[propertyKey]
                // ---- 不需要push到depObjectIds，因为是自己的
                this._$addDeps(listenDeps, {}, () => {
                    const newValue = derivedFunc()
                    if (newValue === prevValue) return;
                    (this as any)[propertyKey] = newValue
                    prevValue = newValue
                    this._$runDeps(propertyKey)
                })
            }
        }
    }

    _$addDeps(deps: string[], objectId: Object, func: (newValue?: any) => any) {
        for (let dep of deps) {
            this._$deps[dep].set(objectId, func)
        }
    }
    
    _$deleteDep(depName: string, objectId: Object) {
        this._$deps[depName].delete(objectId)
    }
    
    _$deleteDeps(objectId: Object) {
        for (let depName in this._$deps) {
            this._$deleteDep(depName, objectId)
        }
    }

    AfterConstruct() {}
    Preset() {}
    Afterset() {}
    _$init() {
        this.AfterConstruct()
        this._$initDecorators()
        this.Preset()
        this._$nodes = ((this as any).Body.bind(this) ?? (() => []))()
        this.Afterset()
        this._$bindNodes()
    }

    _$addProp(key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
        addDLProp(this, "prop", key, propFunc, dlScope, listenDeps, isTwoWayConnected)
    }

    // ---- lifecycles
    willMount(_els: HTMLElement[], _node: CustomNode) {}
    didMount(_els: HTMLElement[], _node: CustomNode) {}
    willUnmount(_els: HTMLElement[], _node: CustomNode) {}
    didUnmount(_els: HTMLElement[], _node: CustomNode) {}

    _$addLifeCycle(func: (_els: HTMLElement[], _node: CustomNode) => any, lifeCycleName: "willMount" | "didMount" | "willUnmount" | "didUnmount") {
        const preLifeCycle = this[lifeCycleName]
        this[lifeCycleName] = function(_els: HTMLElement[], _node: CustomNode) {
            func.call(this, this._$el, this)
            preLifeCycle.call(this, this._$el, this)
        }
    }


    render(idOrEl: string | HTMLElement) {
        const appNode = new HtmlNode("div")
        appNode._$addNodes([this])
        appNode._$addProp("id", typeof idOrEl === "string" ? idOrEl : idOrEl.id)
        appNode._$init()
        this.willMount(this._$el, this)
        loopNodes(this._$nodes, node => {
            switch (node._$nodeType) {
                case DLNodeType.HTML:
                    (node as HtmlNode).willAppear(node._$el, node as HtmlNode)
                    break
                case DLNodeType.Custom:
                    (node as CustomNode).willMount(node._$el, node as CustomNode)
                    break
            }
            return true
        })
         
        // ----
        if (typeof idOrEl === "string") {
            idOrEl = document.getElementById(idOrEl)!
        }
        idOrEl.replaceWith(appNode._$el)
        // -----
        loopNodes(this._$nodes, node => {
            switch (node._$nodeType) {
                case DLNodeType.HTML:
                    (node as HtmlNode).didAppear(node._$el, node as HtmlNode)
                    break
                case DLNodeType.Custom:
                    (node as CustomNode).didMount(node._$el, node as CustomNode)
                    break
            }
            return true
        })
        this.didMount(this._$el, this)
        
    }

    _$detach() {
        super._$detach()
        detachNodes(this._$children)
    }
}
