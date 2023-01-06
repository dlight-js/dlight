import { DLBase } from "../DLBase";
import { addDeps } from "../utils";
import { Indicator } from "./SpecialEl";


export class HTMLEl {
    _$htmlEl = true
    _$id: string
    _$el: HTMLElement
    _$els: any[] = []
    dl: DLBase
    rendered = false
    constructor(dl: DLBase, tag: string, id: string) {
        this._$el = document.createElement(tag)
        this._$id = id
        this.dl = dl
    }

    _$addEls(elFunc: any) {
        this._$els = elFunc
    }

    _$addElProp(key: string, valueFunc: () => any, deps: string[]) {
        let func: (newValue: any) => any
    
        if (key[0] === "*") {
            func = (newValue: any) => this._$el.style[key.slice(1) as any] = newValue
        } else if (key === "innerText") {
            func = (newValue: any) => this._$el.innerText = newValue
        } else {
            func = (newValue: any) => (this._$el as any)[key] = newValue
        }
        func(valueFunc())
    
        addDeps(this.dl, deps, this._$id, func, valueFunc)
    }

    appenEls(childEls: any[], keepInnerHTML=false, prevIndicator?: Indicator) {
        // ---- 有childNodes自动忽略innerText
        if (!keepInnerHTML) this._$el.innerHTML = ""
        const indicator: Indicator = prevIndicator ?? {index: 0, specialEls: []}
        for (let childEl of childEls) {
            if (childEl._$specialEl) {
                childEl.render(this._$el, indicator)
                indicator.specialEls.push(childEl)
                continue
            }
            
            if (childEl._$textEl) {
                indicator.index ++
                this._$el.append(childEl._$el)
                continue
            }

            if (childEl._$htmlEl) {
                indicator.index ++
                childEl.render()
                this._$el.append(childEl._$el)
                continue
            }

            // ---- custom el
            const es = childEl.render()
            childEl.willMount()
            indicator.index += this.appenEls(es, true, indicator)
            childEl.didMount()
        }
        return indicator.index
    }

    render() {
        if (this._$els.length === 0 || this.rendered) return this._$el
        this.appenEls(this._$els)
        this.rendered = true
        return this._$el
    }
}