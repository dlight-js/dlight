import { DLightNode } from './DlightNode';
import {DLNode} from './Node';
import {addDeps} from '../utils';


export class HtmlNode extends DLNode {
    constructor(tag?: string, id?: string) {
        super("html", id)
        if (tag) this._$el = document.createElement(tag)
    }
    _$addNode(dlNode: DLNode) {
        dlNode._$parentNode = this;
        this._$dlNodes.push(dlNode)
    }

    _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[]) {
        let func: (newValue: any) => any
        if (key[0] === "*") {
            func = (newValue: any) => this._$el.style[key.slice(1) as any] = newValue
        } else if (key === "innerText") {
            func = (newValue: any) => this._$el.innerText = newValue
        } else {
            func = (newValue: any) => (this._$el as any)[key] = newValue
        }

        if (!listenDeps) {
            func(valueOrFunc)
            return
        }
        func(valueOrFunc())
        addDeps(dlScope!, listenDeps!, this._$id, func, valueOrFunc)
    }
}