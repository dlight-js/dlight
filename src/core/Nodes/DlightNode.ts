import { EnvNode } from "./EnvNode"
import { DLNode } from "./Node"
import {addOneWayDLProp, addTwoWayDLProp, initNodes, parentNodes, resolveEnvs} from "./utils"
import {addDeps, getCurrListenDeps, runDeps, uid} from "../utils";
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
    _$deps?: any
    _$props?: any 
    _$dotProps?: any 
    _$envNodes?: EnvNode[]
    _$derivedPairs?: {[key: string]: string[]}

    abstract Body(): any

    constructor(id?: string) {
        super("dlight", id)
    }
    _$runDeps(depName: string) {
        for (let id in (this._$deps??{})[depName] ?? []) {
            for (let dep of this._$deps[depName][id]) {
                dep.call(this)
            }
        }
    }
    _$initDecorators() {
        if (this._$derivedPairs) {
            for (let [propertyKey, depKeys] of Object.entries(this._$derivedPairs)) {
                const derivedFunc = (this as any)[propertyKey];
                (this as any)[propertyKey] = (this as any)[propertyKey]()
                let prevValue = (this as any)[propertyKey]
                const listenedKeys = getCurrListenDeps(this, depKeys)
                const func = () => {
                    const newValue = derivedFunc()
                    if (newValue === prevValue) return;
                    (this as any)[propertyKey] = newValue
                    prevValue = newValue
                    runDeps(this, propertyKey)
                }
                // ---- depChain，排除state已经有了
                if (!Object.hasOwn(this, `_$${propertyKey}`)) {
                    (this as any)[`_$${propertyKey}`] = "_$derived"
                }
                addDeps(this, listenedKeys, uid(), func)
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

        listenDeps = getCurrListenDeps(dlScope!, listenDeps)


        if (listenDeps.length === 0) {
            (this as any)[key] = propFunc()
            return
        }

        if (isTwoWayConnected && (dlScope as any)[`_$${listenDeps[0]}`] !==  "_$derived") {
            addTwoWayDLProp(dlScope!, this, key, propFunc, listenDeps)
        } else {
            addOneWayDLProp(dlScope!, this, key, propFunc, listenDeps)
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
