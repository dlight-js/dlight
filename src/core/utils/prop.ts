import { CustomNode } from "../Nodes"
import { EnvNode } from "../Nodes"

export function addDLProp(dlNode: CustomNode, tag: string, key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
    if (!(key in dlNode)) return
    if (!listenDeps) {
        (dlNode as any)[key] = propFunc
        return
    }

    if ((dlNode as any)[`_$$${key}`] === `_$${tag}`) {
        addOneWayDLProp(dlScope!, dlNode, key, propFunc, listenDeps)
        return
    }
    
    if (isTwoWayConnected && (dlScope as any)[`_$$${listenDeps[0]}`] !== undefined) {
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