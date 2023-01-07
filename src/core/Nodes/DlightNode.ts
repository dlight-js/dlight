import { DecoratorResolver } from "../decorator"
import { EnvNode } from "./EnvNode"
import { DLNode } from "./Node"
import { addDLProp, initNodes, parentNodes, resolveEnvs } from "./utils"

export abstract class DLightNode extends DLNode {
    _$depIds: string[] = []  
    _$deps: any = {}
    _$derived_deps: any = {}
    _$props: any = {}
    _$dotProps: any = {}
    _$envNodes: EnvNode[] = []

    abstract Body(): any

    constructor(id?: string) {
        super("dlight", id)
    }
    
    _$initDecorators() {
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
    }
    _$init() {
        this._$initDecorators()
        this.Body()
        parentNodes(this._$nodes, this)
        resolveEnvs(this._$nodes, this)
        initNodes(this._$nodes)
    }

    _$addDotProp(key: string, propFunc: any | (() => any), dl?: DLightNode, listenDeps?: string[]) {
        if (!listenDeps) {
            this._$dotProps[key] = propFunc
            return
        }
        this._$dotProps[key] = propFunc()
        addDLProp(dl!, this, key, propFunc, listenDeps)

    }
    _$addProp(key: string, propFunc: any | (() => any), dl?: DLightNode, listenDeps?: string[]) {
        if (!listenDeps) {
            this._$props[key] = propFunc
            return
        }
        this._$props[key] = propFunc()
        addDLProp(dl!, this, key, propFunc, listenDeps)
    }
    

    render(parentEl: HTMLElement) {
        this.willMount()
        for (let node of this._$dlNodes) {
            node.render(parentEl)
        }
        this.didMount()
    }

    // ---- lifecycles
    willMount() {}
    didMount() {}
    willUnmount() {}
    didUnmount() {}
}
