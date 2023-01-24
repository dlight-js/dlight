import { CustomNode } from './CustomNode';
import { DLNode, DLNodeType } from './DLNode';
import { EnvNode } from './EnvNode';


export class HtmlNode extends DLNode {
    _$envNodes?: EnvNode[] = []

    constructor(tag: string) {
        super(DLNodeType.HTML)
        this._$el = document.createElement(tag)
    }
    _$init(): void {
        this._$bindNodes()
        for (let node of this._$nodes) {
            node.render(this._$el)
        }
    }
    _$addNodes(nodes: DLNode[]) {
        this._$nodes = nodes
    }

    _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
        let func: (newValue: any) => any

        if (key[0] === "_") {
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
        let prevValue: any = valueOrFunc()
        func(prevValue)
        const depFunc = () => {
            const newValue = valueOrFunc()
            if (prevValue !== newValue) {
                func(newValue)
                prevValue = newValue
            }
        }
        const objectId = {}
        this._$depObjectIds.push(objectId)
        dlScope!._$addDeps(listenDeps!, objectId, depFunc)
    }

    // ---- lifecycles
    willAppear(_el?: HTMLElement, _props?: HTMLLifeCycleProp): any {}
    didAppear(_el?: HTMLElement, _props?: HTMLLifeCycleProp): any {}
    willDisappear(_el?: HTMLElement, _props?: HTMLLifeCycleProp): any {}
    didDisappear(_el?: HTMLElement, _props?: HTMLLifeCycleProp): any {}
    _$addLifeCycle(func: (el?: HTMLElement, props?: HTMLLifeCycleProp) => any, lifeCycleName: "willAppear" | "didAppear" | "willDisappear" | "didDisappear") {
        const preLifeCycle = this[lifeCycleName]
        this[lifeCycleName] = function(el?: HTMLElement, props?: HTMLLifeCycleProp) {
            preLifeCycle.call(this, el, props)
            return func.call(this, el, props)
        }
    }
    render(parentEl: HTMLElement) {
        this.willAppear(this._$el, {})
        parentEl.appendChild(this._$el)
        this.didAppear(this._$el, {})
    }
}

export interface HTMLLifeCycleProp {
    [key: string]: any
}