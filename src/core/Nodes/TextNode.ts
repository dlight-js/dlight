import { addDeps } from '../utils/dep';
import { CustomNode } from './CustomNode';
import {DLNode, DLNodeType} from './DLNode';

export class TextNode extends DLNode {
    constructor(textOrFunc: string | (() => string),id?: string, dlScope?: CustomNode, listenDeps?: string[]) {
        super(DLNodeType.Text, id)
        if (!listenDeps) {
            this._$el = document.createTextNode(textOrFunc as string)
            return
        }

        textOrFunc = textOrFunc as (() => string)
        let prevValue: any = textOrFunc()
        this._$el = document.createTextNode(prevValue)
        const depFunc = () => {
            const newValue = (textOrFunc as (() => string))()
            if (prevValue === newValue) return
            this._$el.nodeValue = newValue
            prevValue = newValue
        }
        addDeps(dlScope!, listenDeps!, this._$id, depFunc)
    }

    render(parentEl: HTMLElement) {
        parentEl.appendChild(this._$el)
    }
}


