import { CustomNode } from './CustomNode';
import { DLNode, DLNodeType } from './DLNode';
import { addDLProp } from '../utils/prop';
import { loopNodes } from '../utils/nodes';


export class EnvNode extends DLNode {
    addPropFuncs: ((node: CustomNode) => any)[] = []

    constructor() {
        super(DLNodeType.Env)
    }

    _$addNodes(nodes: DLNode[]) {
        this._$nodes = nodes
    }

    _$addProp(key: string, propOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
        this.addPropFuncs.push(node => addDLProp(node, "env", key, propOrFunc, dlScope, listenDeps))
    }

    addProps(node: CustomNode) {
        for (let addPropFunc of this.addPropFuncs) {
            addPropFunc(node)
        }
    }

    addPropsToNodes(nodes: DLNode[]) {
        loopNodes(nodes, (node: DLNode) => {
            node._$beforeInitSubNodes = () => {
                this.addPropsToNodes(node._$nodes)
            }
            if (node._$nodeType === DLNodeType.Custom) {
                this.addProps(node as CustomNode);
            }
            return true
        })
    }

    _$init() {
        this.addPropsToNodes(this._$nodes)
        this._$bindNodes()
    }

    render(parentEl: HTMLElement) {
        for (let node of this._$nodes) {
            node.render(parentEl)
        }
    }
}

