import {DecoratorMaker, DecoratorTrimmer, DecoratorVerifier} from "./decorator"
import {$createEl, $listen} from "./func"

// @ts-ignore
const _ = [$createEl, $listen]

export abstract class DLBase {
    _$deps: any = {}
    _$el?: HTMLElement
    _$DLBase = true

    abstract Body: any

    _$init() {
        for (let propertyKey of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            if (DecoratorVerifier.state(propertyKey)) {
                this._$deps[DecoratorTrimmer.state(propertyKey)] = []
            }
        }
    }

    _$addProp(el: HTMLElement | DLBase, key: string, valueStr: string) {
        if ((el as any)._$DLBase) {
            // ----
        } else {
            // ---- 是html tag
            // ---- 处理content，htmlTag直接变成innerText
            if (key === "_$content") key = "innerText"
            const listenDeps = []
            const stateKeys = Object.keys(this._$deps)

            for (let stateKey of stateKeys) {
                if (valueStr.includes(stateKey)) {
                    listenDeps.push(stateKey)
                    console.log(valueStr, 'before')
                    valueStr = valueStr.replaceAll(stateKey, `this.${DecoratorMaker.state(stateKey)}`)
                    console.log(valueStr, 'after')
                }
            }
            let addPropFunc: string
            if (listenDeps.length === 0 || ["onclick"].includes(key)) {
                // ---- 没有依赖
                addPropFunc = `el.${key} = ${valueStr}\n`
            } else {
                addPropFunc = `$listen(this, el, "${key}", ["${listenDeps.join('", "')}"], ()=>${valueStr})`
            }
            console.log(addPropFunc, 'addPropFunc')
            eval(addPropFunc)
        }
    }

    render() {
        this._$init()
        eval(this.Body)

        return this._$el!
    }
}
