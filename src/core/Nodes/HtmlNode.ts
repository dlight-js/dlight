import { DLightNode } from './DlightNode';
import {DLNode} from './Node';

import { EnvNode } from './EnvNode';
import { addDeps } from '../utils/dep';
import { bindParentNode, initNodes } from '../utils/nodes';


export class HtmlNode extends DLNode {
    _$envNodes?: EnvNode[] = []

    constructor(tag: string, id?: string) {
        super("html", id)
        this._$el = document.createElement(tag)
    }
    _$init(): void {
        bindParentNode(this._$nodes, this)
        initNodes(this._$nodes)
        for (let node of this._$dlNodes) {
            node.render(this._$el)
        }
    }
    _$addNode(dlNode: DLNode) {
        this._$dlNodes.push(dlNode)
    }

    _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[]) {
        let func: (newValue: any) => any
        let prevValue: any = undefined

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
        const depFunc = () => {
            const newValue = valueOrFunc()
            if (prevValue !== newValue) {
                func(newValue)
                prevValue = newValue
            }
        }
        addDeps(dlScope!, listenDeps!, `${this._$id}_${key}`, depFunc)
    }

    render(parentEl: HTMLElement) {
        parentEl.appendChild(this._$el)
    }
}