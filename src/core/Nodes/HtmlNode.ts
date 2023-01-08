import { DLightNode } from './DlightNode';
import {DLNode} from './Node';
import {addDeps, getCurrListenDeps} from '../utils';
import { initNodes, parentNodes, resolveEnvs } from './utils';
import { EnvNode } from './EnvNode';


export class HtmlNode extends DLNode {
    _$envNodes?: EnvNode[] = []

    constructor(tag: string, id?: string) {
        super("html", id)
        this._$el = document.createElement(tag)
    }
    _$init(): void {
        parentNodes(this._$nodes, this)
        resolveEnvs(this._$nodes, this)
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
        const listenedKeys = getCurrListenDeps(dlScope!, listenDeps)
        func(valueOrFunc())
        if (listenedKeys.length === 0) return
        addDeps(dlScope!, listenedKeys!, this._$id, func, valueOrFunc)
    }

    render(parentEl: HTMLElement) {
        parentEl.appendChild(this._$el)
    }
}