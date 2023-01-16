import { DLightNode } from './DlightNode';
import {DLNode} from './Node';
import {deleteDepsPrefix} from '../utils';
import { addDLProp, initNodes, bindParentNode } from './utils';


export class EnvNode extends DLNode {
    envObject: {[key: string]: any} = {}
    _$depIds: string[] = []
    _$deps?: any
    _$envNodes?: EnvNode[]

    constructor(id?: string) {
        super("env", id)
    }

    _$addPair(key: string, propOrFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[]) {
        if (!listenDeps) {
            this.envObject[key] = propOrFunc
            return
        }
        this.envObject[key] = propOrFunc()
        addDLProp(dlScope!, this, key, propOrFunc, listenDeps)
    }

    _$addNode(dlNode: DLNode) {
        this._$dlNodes.push(dlNode)
    }

    cleanDeps() {
        // ---- 如果多层EnvEl嵌套，由于protoType相同，所以会出现空的冗余的需要删除
        for (let depKey in this._$deps ?? {}) {
            const value = this.envObject[depKey]
            if ((value === undefined) || (value === null)) {
                delete this._$deps[depKey]
            }
        }
    }

    _$initDecorators() {
        // ---- 见utils，只会用到这两个
        // const protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        // for (let propertyKey of protoKeys) {
        //     DecoratorResolver.derivedFromProp(propertyKey, this as any)
        //     DecoratorResolver.state(propertyKey, this as any)
        // }
    }

    setEnvObjs(node: DLNode) {
        switch (node._$nodeType) {
            case "env":
            case "html":
            case "if":
            case "for":
                if (!(node as any)._$envNodes) (node as any)._$envNodes = [];
                (node as any)._$envNodes.push(this)
                break
            case "dlight":
                if (!(node as DLightNode)._$envNodes) (node as DLightNode)._$envNodes = [];
                (node as DLightNode)._$envNodes!.push(this)
                // ---- 必须把原先的依赖删掉
                const didDisappear = (node as DLightNode).didDisappear;
                (node as DLightNode).didDisappear = () => {
                    didDisappear()
                    deleteDepsPrefix(this as any, `${this._$id}_${node._$id}`)
                }
        }
    }

    _$init() {
        for (let [key, value] of Object.entries(this.envObject)) {
            (this as any)[key] = value
            Object.defineProperty(Object.getPrototypeOf(this), key, {
                writable: true
            })
        }
        this.cleanDeps()
        bindParentNode(this._$dlNodes, this)
        for (let node of this._$dlNodes) {
            this.setEnvObjs(node)
            for (let envNode of this._$envNodes ?? []) {
                envNode.setEnvObjs(node)
            }
        }
        this._$initDecorators()
        initNodes(this._$nodes)
    }

    
    render(parentEl: HTMLElement) {
        for (let node of this._$dlNodes) {
            node.render(parentEl)
        }
    }
}

