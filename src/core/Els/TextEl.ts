import {DLBase} from "../DLBase";
import {addDeps, geneDeps} from "../utils";
import { PlainEl } from "./PlainEl";


export class TextEl extends PlainEl {
    valueFunc: () => string
    constructor(dl: DLBase, valueFunc: () => string) {
        super(document.createTextNode(valueFunc()))
        this.valueFunc = valueFunc
        const listenDeps = geneDeps(dl, valueFunc.toString())
        addDeps(dl, listenDeps, this._$id, () => {
            this.el.nodeValue = valueFunc()
        })
    }
}