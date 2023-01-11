import { DLightNode } from './DlightNode';
import {DLNode} from './Node';
import {addDeps} from '../utils';

export class TextNode extends DLNode {
    constructor(textOrFunc: string | (() => string),id?: string, dlScope?: DLightNode, listenDeps?: string[]) {
        super("text", id)
        if (!listenDeps) {
            this._$el = document.createTextNode(textOrFunc as string)
            return
        }
        // , textOrFunc
        this._$el = document.createTextNode((textOrFunc as () => string)())
        addDeps(dlScope!, listenDeps, this._$$id, (newValue: string) => {
            this._$el.nodeValue = newValue
        })
    }

    render(parentEl: HTMLElement) {
        parentEl.appendChild(this._$el)
    }
}


