import {uid, addDeps, addDep, runDeps} from '../utils';
import {DecoratorMaker, DecoratorResolver} from '../decorator';


type NodeType = "html" | "flow" | "dlight"

export class DLNode {
    /**
     * @param _$id - 每一个Node都有id
     * @param _$el - 代表DOM上面的node，只有TextNode和HtmlNode有实体node
     * @param _$nodes - 所有嵌套Node的抽象表示
     * 
     * @param _$init - 这之前nodes和el都必须生成
     * @param _$update - flow需要更新整体结构
     * @param _$render - 传入parentEl，将_$nodes append上去
     */
    _$id: string = ""
    _$el: Node | HTMLElement | any
    _$nodes: DLNode[] = []
    _$nodeType: NodeType

    constructor(nodeType: NodeType, id?: string) {
        this._$id = id ?? uid()
        this._$nodeType = nodeType
    }

    _$init() {}
    _$update() {}
    render(parentEl: HTMLElement) {
        switch (this._$nodeType) {
            case "html":
                parentEl.appendChild(this._$el)
                break
            case "dlight":
                parentEl.appendChild
        }
    }

}

export class TextNode extends DLNode {
    constructor(id?: string) {
        super("html", id)
    }

    _$addText(dlScope: DLBase, textOrFunc: string | (() => string), listenDeps?: string[]) {
        if (typeof textOrFunc === "string") {
            this._$el = document.createTextNode(textOrFunc)
            return
        }
        this._$el = document.createTextNode(textOrFunc())
    }
}


export class HtmlNode extends DLNode {
    constructor(id?: string) {
        super("html", id)
    }
    _$addNode(dlNode: DLNode) {
        this._$nodes.push(dlNode)
    }

    _$addNodeProp(dlScope: DLBase, key: string, valueOrFunc: string | (() => any), listenDeps?: string[]) {
        let func: (newValue: any) => any
        if (key[0] === "*") {
            func = (newValue: any) => this._$el.style[key.slice(1) as any] = newValue
        } else if (key === "innerText") {
            func = (newValue: any) => this._$el.innerText = newValue
        } else {
            func = (newValue: any) => (this._$el as any)[key] = newValue
        }

        if (typeof valueOrFunc !== "function") {
            func(valueOrFunc)
            return
        }
        func(valueOrFunc())
        // ----add dep
    }
}

export abstract class DLightNode extends DLNode {
    _$depIds: string[] = []  
    _$deps: any = {}
    _$derived_deps: any = {}
    _$props: any = {}
    _$dotProps: any = {}

    abstract Body(): any

    constructor(id?: string) {
        super("dlight", id)
    }
    _$init() {
        const protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        for (let propertyKey of protoKeys) {
            DecoratorResolver.prop(propertyKey, this)
            DecoratorResolver.dotProp(propertyKey, this)
            DecoratorResolver.environment(propertyKey, this)
            DecoratorResolver.propDerived(propertyKey, this)
            DecoratorResolver.derivedFromProp(propertyKey, this)
            DecoratorResolver.state(propertyKey, this)
        }
        for (let propertyKey of protoKeys) {
            DecoratorResolver.derived(propertyKey, this, () =>
            DecoratorResolver.effect(propertyKey, this)
            )
        }

        this.Body()
    }

    resolveEnv() {
        for (let superEnvEl of this._$envEls) {
            (superEnvEl as any).setEnvObjs(this._$els!)
        }
    }




    _$addCElDotProp(dl: DLBase, key: string, propFunc: () => any, listenDeps: string[]) {
        this._$dotProps[key] = propFunc()
        this._$addCElPropTmp(dl, key, propFunc, listenDeps)
    }
    _$addCElProp(dl: DLBase, key: string, propFunc: () => any, listenDeps: string[]) {
        this._$props[key] = propFunc()
        this._$addCElPropTmp(dl, key, propFunc, listenDeps)
    }
    _$addCElPropTmp(dl: DLBase, key: string, propFunc: () => any, listenDeps: string[]) {
        const propStr = propFunc.toString().slice(6).trim()
        for (let dep of listenDeps) {
            const id = `${this._$id}_${key}_${dep}`;
            this._$depIds.push(id)
            // ---- 如果是完整match且是state不是derived，比如 {flag: this.flag}
            //      则把子dl的flag参数当成state
            if (propStr === `this.${dep}` && Object.keys(dl._$deps).includes(propStr.replaceAll("this.", ""))) {
                Object.defineProperty(Object.getPrototypeOf(this), DecoratorMaker.state(key), {
                    writable: true
                })
                const depFunc = () => (dl as any)[dep] = (this as any)[key]
                this._$deps[key] = {[id]: [depFunc]}
                addDep(dl, dep, id, () => {
                    // ---- 先取消回掉自己的dep，等改完值了再加上，不然会无限回掉
                    delete this._$deps[key][id];
                    (this as any)[key] = propFunc()
                    this._$deps[key][id] = [depFunc]
                })
                return
            }
            Object.defineProperty(Object.getPrototypeOf(this), DecoratorMaker.derivedFromProp(key), {
                writable: true
            })
            this._$deps[key] = {}
            addDep(dl, dep, id, () => {
                (this as any)[key] = propFunc()
                runDeps(this, key)
            })
        }
    }

    // ---- lifecycles
    willMount() {}
    didMount() {}
    willUnmount() {}
    didUnmount() {}
    willRender() {}
}
