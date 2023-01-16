import { DLightNode } from "../Nodes/DlightNode"
import { EnvNode } from "../Nodes/EnvNode"
import { addDeps, addDep, deleteDep } from "./dep"

export function addDLProp(dlNode: DLightNode, tag: string, key: string, propFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
    if (!Object.hasOwn(dlNode, key)) return
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


export function addOneWayDLProp(dlScope: DLightNode, dlNode: DLightNode | EnvNode, key: string, propFunc: () => any, listenDeps: string[]) {
    const id = `${dlNode._$id}_${key}`
    dlNode._$depIds.push(id);

    (dlNode as any)[key] = propFunc()
    addDeps(dlScope, listenDeps, id, () => {
        (dlNode as any)[key] = propFunc();
        (dlNode as any)._$runDeps(key)
    })

}

export function addTwoWayDLProp(dlScope: DLightNode, dlNode: DLightNode | EnvNode, key: string, propFunc: () => any, listenDeps: string[]) {
    // ---- 如果是完整match且是state不是derived，比如 {flag: this.flag}
    //      则把子dl的flag参数当成state
    const id = `${dlNode._$id}_${key}`;
    dlNode._$depIds.push(id);

    for (let dep of listenDeps) {
        const depFunc = () => (dlScope as any)[dep] = (dlNode as any)[key]
        addDep(dlNode as any, key, id, depFunc);
        (dlNode as any)[key] = propFunc()
        addDep(dlScope, dep, id, () => {
            // ---- 先取消回掉自己的dep，等改完值了再加上，不然会无限回掉
            deleteDep(dlNode as any, key, id);
            (dlNode as any)[key] = propFunc()
            addDep(dlNode as any, key, id, depFunc);
        })
    }
}

export function addHalfWayDLProp(dlScope: DLightNode, dlNode: DLightNode | EnvNode, key: string, propFunc: () => any, listenDeps: string[]) {
    const id = `${dlNode._$id}_${key}`
    dlNode._$depIds.push(id);

    (dlNode as any)[`_$${key}`] = propFunc()
    addDeps(dlScope, listenDeps, id, () => {
        (dlNode as any)[`_$${key}`] = propFunc();
        (dlNode as any)._$runDeps(key)
    })
}