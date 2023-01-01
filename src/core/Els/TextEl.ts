import {DLBase} from "../DLBase";
import {addDeps, geneDeps, uid} from "../utils";


export class TextEl {
    _$textEl = true
    valueFunc: () => string
    el: Node
    id: string = uid()
    constructor(dl: DLBase, valueFunc: () => string) {
        this.valueFunc = valueFunc
        this.el = document.createTextNode(this.valueFunc())
        const listenDeps = geneDeps(dl, valueFunc.toString())
        addDeps(dl, listenDeps, this.id, () => {
            this.el.nodeValue = valueFunc()
        })
    
    }
    
}