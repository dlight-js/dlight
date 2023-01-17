import { EnvNode } from "./EnvNode"
import { DLNode } from "./Node"
import { addDLProp } from "../utils/prop";
import { addDeps } from "../utils/dep";
import { bindParentNode, initNodes } from "../utils/nodes";
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
 * @Pipeline
 *      new constructor()（初始化不在depChain上的member）
 *      等待外部调用 initNodes([this]) 或者 this._$init()
 *   -> this.AfterConstruct()（留的hook)
 *   -> this._$initDecorators()（生成depChain，补齐剩下的参数）
 *   -> this.Preset()（留的hook)
 *   -> this.Body()（run Body函数并挂到this._$nodes上）
 *   -> bindParentNode()（把刚生成的nodes的_$parentNode指向自己）
 *   -> initNodes()（递归init刚生成的nodes）
 *   -> this._$afterElsCreated()（所有新建完成的html element都会递归调用）
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
        super("dlight", id)
        this._$tag = tag ?? this.constructor.name
    }

    get _$el() {
        return this._$dlNodes.map(node => node._$el)
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
        this.AfterConstruct()
        this._$initDecorators()
        this.Preset()
        const nodes = this.Body()
        if (nodes && nodes.length > 0) this._$nodes = nodes
        this._$nodes = this._$nodes ?? []
        bindParentNode(this._$nodes, this)
        initNodes(this._$nodes)
        this._$afterElsCreated(this._$dlNodes)
        this.Afterset()
    }

    /**
     * 三种情况
     * 1. 里面Prop => 外面不管传什么都是里面监听外面改变
     * 2. 里面PropState + 外面State/PropState => 直接map过去互相改变
     * 3. 里面PropState + 外面是普通的或者derived => 里面是个State，同时监听外面改变
     * @param key
     * @param propFunc
     * @param dlScope
     * @param listenDeps
     * @param isTwoWayConnected
     */
    

    _$addProp(key: string, propFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
        addDLProp(this, "prop", key, propFunc, dlScope, listenDeps, isTwoWayConnected)
    }

    _$addDotProp(key: string, propFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
        addDLProp(this, "dotProp", key, propFunc, dlScope, listenDeps, isTwoWayConnected)
    }
    

    _$addEnv(key: string, propFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
        addDLProp(this, "env", key, propFunc, dlScope, listenDeps, isTwoWayConnected)
    }

    render(parentEl: HTMLElement) {
        this.willAppear()
        for (let node of this._$dlNodes) {
            node.render(parentEl)
        }
        this.didAppear()
    }
}


export function addLifeCycle(dlNode: DLightNode, func: () => any, lifeCycleName: "willAppear" | "didAppear" | "willDisappear" | "didDisappear") {
    const preLifeCycle = dlNode[lifeCycleName]
    dlNode[lifeCycleName] = function() {
        func.call(this)
        preLifeCycle.call(this)
    }
}