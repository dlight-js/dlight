import {DLBase} from "../DLBase";
import {addDeps} from "../utils";


export class TextEl {
    _$textEl = true
    _$id: string
    _$el: Node 


    constructor(dl: DLBase, valueFunc: () => string, listenDeps: string[], id: string) {
        this._$el = document.createTextNode(valueFunc())
        this._$id = id
        addDeps(dl, listenDeps, this._$id, (newValue: string) => {
            this._$el.nodeValue = newValue
        }, valueFunc)
    }
}