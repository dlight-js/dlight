import {DLBase} from './DLBase';
import {Indicator} from "./Els/CustomEl";
import {addDep, addDeps, geneDeps, isFunc, runDeps} from "./utils";
import {DecoratorMaker} from "./decorator";
export * from "./Els";


export function addElProp(dl: DLBase, el: any, key: string, propFunc: () => any) {
    let func

    if (key[0] === "*") {
        func = () => el.el.style[key.slice(1) as any] = propFunc()
    } else if (key === "innerText") {
        func = () => el.el.innerText = propFunc()
    } else {
        func = () => (el.el as any)[key] = propFunc()
    }
    func()

    // ---t 1000个耗时10ms左右
    const propStr =  propFunc.toString()
    const listenDeps = geneDeps(dl, propStr)

    // ---t 1000个耗时5ms左右
    if (listenDeps.length !== 0 && !isFunc(propStr.slice(6))) {
        // ---1 有依赖
        // ---2 value不是function，如onClick之类的，不然本来就会监听变化，不用管
        addDeps(dl, listenDeps, el._$id, func)
    }
}

export function addCElDotProp(dl: DLBase, cEl: DLBase, key: string, propFunc: () => any) {
    cEl._$dotProps[key] = propFunc()
    addCElPropTmp(dl, cEl, key, propFunc)
}
export function addCElProp(dl: DLBase, cEl: DLBase, key: string, propFunc: () => any) {
    cEl._$props[key] = propFunc()
    addCElPropTmp(dl, cEl, key, propFunc)
}
function addCElPropTmp(dl: DLBase, cEl: DLBase, key: string, propFunc: () => any) {
    const listenDeps = geneDeps(dl, propFunc.toString())
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
            addDep(dl, dep, id, () => {
                (cEl as any)[key] = propFunc()
                runDeps(cEl, key)
            })
        }
    }
}



// ---- 添加child，很重要
export function addEls(dl: DLBase, el: any, childEls: any[], keepInnerHTML=false) {
    // ---- 有childNodes自动忽略innerText
    if (!keepInnerHTML) el.el.innerHTML = ""
    const indicator: Indicator = {index: 0, customEls: []}
    for (let childEl of childEls) {
        el.els.push(childEl)
        if (childEl._$customEl) {
            childEl.mount(dl, el.el, indicator)
            indicator.customEls.push(childEl)
            continue
        }
        if (childEl._$plainEl) {
            indicator.index ++
            el.el.append(childEl.el)
            continue
        }
        // ---- custom el
        const e = childEl.render()
        childEl.didMount()
        indicator.index += addEls(dl, el, e, true)
        childEl.willMount()
    }
    return indicator.index
}

