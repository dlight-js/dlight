import { DLBase } from "../DLBase";
import { addDeps } from "../utils";
import { PlainEl } from "./PlainEl";
import { Indicator } from "./SpecialEl";


export class HTMLEl extends PlainEl {
    _$els: any[] = []
    _$htmlEl = true
    dl: DLBase
    rendered = false
    constructor(dl: DLBase, tag: string, elFunc: (()=>any[]) | undefined, id: string) {
        super(document.createElement(tag), id)
        this.dl = dl
        if (elFunc) this._$els = elFunc()
    }

    render() {
        if (this._$els.length === 0 || this.rendered) return this.el
        this.appenEls(this._$els)
        this.rendered = true
        return this.el
    }

    appenEls(childEls: any[], keepInnerHTML=false, prevIndicator?: Indicator) {
        // ---- 有childNodes自动忽略innerText
        if (!keepInnerHTML) this.el.innerHTML = ""
        const indicator: Indicator = prevIndicator ?? {index: 0, customEls: []}
        for (let childEl of childEls) {
            if (childEl._$specialEl) {
                childEl.render(this.el, indicator)
                indicator.customEls.push(childEl)
                continue
            }
            
            if (childEl._$plainEl) {
                indicator.index ++
                if (childEl._$htmlEl) childEl.render()
                this.el.append(childEl.el)
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
    
    addElProp(key: string, valueFunc: () => any, deps: string[]) {
        let func: (newValue: any) => any
    
        if (key[0] === "*") {
            func = (newValue: any) => this.el.style[key.slice(1) as any] = newValue
        } else if (key === "innerText") {
            func = (newValue: any) => this.el.innerText = newValue
        } else {
            func = (newValue: any) => this.el[key] = newValue
        }
        func(valueFunc())
    
        addDeps(this.dl, deps, this._$id, func, valueFunc)
    }
    
}