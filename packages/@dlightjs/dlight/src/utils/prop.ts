import { CustomNode } from "../Nodes"
import { EnvNode } from "../Nodes"


export function forwardDLProp(dlNode: CustomNode, key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    // ---- 新建一个state
    (dlNode as any)[`_$$${key}`] = listenDeps ? propFunc() : propFunc

    Object.defineProperty(dlNode, key, {
        get() {
            return this[`_$$${key}`]
        },
        set(value: any) {
            if (this[`_$$${key}`] === value) return
            this[`_$$${key}`] = value;
            this._$runDeps(key);
        }
    })
    dlNode._$deps[key] = new Map()

    if (listenDeps) addTwoWayDLProp(dlScope!, dlNode, key, propFunc, listenDeps)
}

export function addDLProp(dlNode: CustomNode, tag: string, key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
    if (dlNode?._$forwardProps) {
        forwardDLProp(dlNode, key, propFunc, dlScope, listenDeps)
        return
    }
    if (!(key in dlNode)) return
    if (!listenDeps) {
        (dlNode as any)[key] = propFunc
        return
    }

    if ((dlNode as any)[`_$$${key}`] !== `_$${tag}` &&
        !(`_$$${key}` in dlNode)) {
        // ---- 既不是@Prop，也不是@PropState，直接不传
        return
    }


    if ((dlNode as any)[`_$$${key}`] === `_$${tag}`) {
        addOneWayDLProp(dlScope!, dlNode, key, propFunc, listenDeps)
        return
    }

    if (isTwoWayConnected && `_$$${listenDeps[0]}` in dlScope!) {
        addTwoWayDLProp(dlScope!, dlNode, key, propFunc, listenDeps)
        return
    }
    addHalfWayDLProp(dlScope!, dlNode, key, propFunc, listenDeps)
}


export function addOneWayDLProp(dlScope: CustomNode, dlNode: CustomNode, key: string, propFunc: () => any, listenDeps: string[]) {
    const objectId = {}
    dlNode._$depObjectIds.push(objectId);

    (dlNode as any)[key] = propFunc()
    dlScope._$addDeps(listenDeps, objectId, () => {
        (dlNode as any)[key] = propFunc();
        (dlNode as any)._$runDeps(key)
    })

}

export function addTwoWayDLProp(dlScope: CustomNode, dlNode: CustomNode, key: string, propFunc: () => any, listenDeps: string[]) {
    // ---- 如果是完整match且是state不是derived，比如 {flag: this.flag}
    //      则把子dl的flag参数当成state
    const objectId = {}
    dlNode._$depObjectIds.push(objectId);

    for (let dep of listenDeps) {
        const depFunc = () => (dlScope as any)[dep] = (dlNode as any)[key]
        dlNode._$addDeps([key], objectId, depFunc);
        (dlNode as any)[key] = propFunc()
        dlScope._$addDeps(listenDeps, objectId, () => {
            // ---- 先取消回掉自己的dep，等改完值了再加上，不然会无限回掉
            dlNode._$deleteDep(key, objectId);
            (dlNode as any)[key] = propFunc()
            dlNode._$addDeps([key], objectId, depFunc);
        })
    }
}

export function addHalfWayDLProp(dlScope: CustomNode, dlNode: CustomNode | EnvNode, key: string, propFunc: () => any, listenDeps: string[]) {
    const objectId = {}
    dlNode._$depObjectIds.push(objectId);

    (dlNode as any)[`_$${key}`] = propFunc()
    dlScope._$addDeps(listenDeps, objectId, () => {
        (dlNode as any)[`_$${key}`] = propFunc();
        (dlNode as any)._$runDeps(key)
    })
}
