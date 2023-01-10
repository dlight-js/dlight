import { EnvNode } from "./EnvNode"
import { DLNode } from "./Node"
import {addOneWayDLProp, addTwoWayDLProp, initNodes, parentNodes, resolveEnvs} from "./utils"
import {addDeps, uid} from "../utils";
export const hh = {value:0}

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
 */
export abstract class DLightNode extends DLNode {
    _$depIds: string[] = []  
    _$deps: {[key: string]: {[key: string]: () => any}} = {}
    _$props?: any 
    _$dotProps?: any 
    _$envNodes?: EnvNode[]
    _$derivedPairs?: {[key: string]: string[]}

    abstract Body(): any

    constructor(id?: string) {
        super("dlight", id)
    }
    _$runDeps(depName: string) {
        for (let [, func] of Object.entries(this._$deps[depName])) {
            func.call(this)
        }
    }
    _$initDecorators() {
        if (this._$derivedPairs) {
            for (let [propertyKey, listenDeps] of Object.entries(this._$derivedPairs)) {
                const derivedFunc = (this as any)[propertyKey];
                if ((this as any)[`_$${propertyKey}`] === undefined) {
                    // 不在depChain上，添加
                    (this as any)[`_$${propertyKey}`] = "_$derived";
                 }
                if ((this as any)[`_$${propertyKey}`] !== "_$derived") {
                    (this as any)[`_$${propertyKey}`] = (this as any)[`_$${propertyKey}`]()
                } else {
                    (this as any)[propertyKey] = (this as any)[propertyKey]()
                }

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
    _$init() {
        this._$initDecorators()
        let t1 = performance.now();
        this.Body()
        let t2 = performance.now()
        hh.value += t2-t1
        parentNodes(this._$nodes, this)
        resolveEnvs(this._$nodes, this)

        initNodes(this._$nodes)

    }

    _$addProp(key: string, propFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
        if (!listenDeps) {
            (this as any)[key] = propFunc
            return
        }

        if ((this as any)[`_$${key}`] === "_$derived") {
            addOneWayDLProp(dlScope!, this, key, propFunc, listenDeps)
            return
        }
        if (isTwoWayConnected && (dlScope as any)[`_$${listenDeps[0]}`] !==  "_$derived") {
            addTwoWayDLProp(dlScope!, this, key, propFunc, listenDeps)
        }
    }
    

    render(parentEl: HTMLElement) {
        this.willMount()
        for (let node of this._$dlNodes) {
            node.render(parentEl)
        }
        this.didMount()
    }

    // ---- lifecycles
    willMount() {}
    didMount() {}
    willUnmount() {}
    didUnmount() {}
}
