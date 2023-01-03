import {uid} from "../utils";


export class PlainEl {
    _$plainEl = true
    el: HTMLElement | Node
    _$id: string = uid()
    constructor(el: HTMLElement | Node) {
        this.el = el
    }
    
}