import {DLBase} from './DLBase';
import {DecoratorMaker} from "./decorator";

export function $createEl(tag: string) {
    return document.createElement(tag)
}


// @ts-ignore
export function $listen(dl: DLBase, el: HTMLElement, propKey: string, deps: string[], action: ()=>any) {
    let func = () => eval(`el.${propKey} = action()`)
    func()
    for (let dep of deps) {
      if (dl._$deps[dep] === undefined) dl._$deps[dep] = []
      dl._$deps[dep].push(func)
    }
  }

export function $addProp(dl: DLBase, el: HTMLElement | DLBase, key: string, valueStr: string) {
    if ((el as any)._$DLBase) {
        // ----
    } else {
        // ---- 是html tag
        // ---- 处理content，htmlTag直接变成innerText
        if (key === "_$content") key = "innerText"
        const listenDeps = []
        const stateKeys = Object.keys(dl._$deps)

        for (let stateKey of stateKeys) {
            if (valueStr.includes(stateKey)) {
                listenDeps.push(stateKey)
                valueStr = valueStr.replaceAll(stateKey, `dl.${DecoratorMaker.state(stateKey)}`)
            }
        }
        let addPropFunc: string
        if (listenDeps.length === 0 || ["onclick"].includes(key)) {
            // ---- 没有依赖
            addPropFunc = `el.${key} = ${valueStr}\n`
        } else {
            addPropFunc = `$listen(dl, el, "${key}", ["${listenDeps.join('", "')}"], ()=>${valueStr})`
        }

        eval(addPropFunc)
    }
}