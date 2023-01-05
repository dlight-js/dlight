import {DLBase} from "../DLBase";
import {addDeps, geneDeps} from "../utils";
import { PlainEl } from "./PlainEl";


export class TextEl extends PlainEl {
    valueFunc: () => string
    constructor(dl: DLBase, valueFunc: () => string, id: string) {
        super(document.createTextNode(valueFunc()), id)
        this.valueFunc = valueFunc
        const listenDeps = geneDeps(valueFunc.toString())
        addDeps(dl, listenDeps, this._$id, (newValue: string) => {
            this.el.nodeValue = newValue
        }, valueFunc)
    }
}