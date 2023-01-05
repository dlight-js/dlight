import {DLBase} from './DLBase';
import {Indicator} from "./Els/SpecialEl";
import {addDep, addDeps, geneDeps, isFunc, runDeps} from "./utils";
import {DecoratorMaker} from "./decorator";
export * from "./Els";




export function addCElDotProp(dl: DLBase, cEl: DLBase, key: string, propFunc: () => any) {
    cEl._$dotProps[key] = propFunc()
    addCElPropTmp(dl, cEl, key, propFunc)
}
export function addCElProp(dl: DLBase, cEl: DLBase, key: string, propFunc: () => any) {
    cEl._$props[key] = propFunc()
    addCElPropTmp(dl, cEl, key, propFunc)
}
function addCElPropTmp(dl: DLBase, cEl: DLBase, key: string, propFunc: () => any) {
    const listenDeps = geneDeps(propFunc.toString())
    const propStr = propFunc.toString().slice(6).trim()
    if (listenDeps.length !== 0 && !isFunc(propStr)) {
        for (let dep of listenDeps) {
            const id = `${cEl._$id}_${key}_${dep}`
            cEl._$depIds.push(id)
            // ---- 如果是完整match且是state不是derived，比如 {flag: this.flag}
            //      则把子dl的flag参数当成state
            if (propStr === `this.${dep}` && Object.keys(dl._$deps).includes(propStr.replaceAll("this.", ""))) {
                Object.defineProperty(Object.getPrototypeOf(cEl), DecoratorMaker.state(key), {
                    writable: true
                })
                const depFunc = () => (dl as any)[dep] = (cEl as any)[key]
                cEl._$deps[key] = {[id]: [depFunc]}
                addDep(dl, dep, id, () => {
                    // ---- 先取消回掉自己的dep，等改完值了再加上，不然会无限回掉
                    delete cEl._$deps[key][id];
                    (cEl as any)[key] = propFunc()
                    cEl._$deps[key][id] = [depFunc]
                })
                return
            }
            Object.defineProperty(Object.getPrototypeOf(cEl), DecoratorMaker.derivedFromProp(key), {
                writable: true
            })
            cEl._$deps[key] = {}
            addDep(dl, dep, id, () => {
                (cEl as any)[key] = propFunc()
                runDeps(cEl, key)
            })
        }
    }
}




