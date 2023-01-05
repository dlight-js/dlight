
export class PlainEl {
    _$plainEl = true
    el: HTMLElement | Node | any
    _$id: string
    constructor(el: HTMLElement | Node, id: string) {
        this.el = el
        this._$id  = id
    }
    
}