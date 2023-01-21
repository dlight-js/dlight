import { CustomNode } from './CustomNode';
import { DLNode, DLNodeType } from './DLNode';
import { addDLProp } from '../utils/prop';
import { loopNodes } from '../utils/nodes';


export class EnvNode extends DLNode {
    constructor() {
        super(DLNodeType.Env)
    }

    _$addNodes(nodes: DLNode[]) {
        this._$nodes = nodes
    }

    _$addProp(key: string, propOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
        // ---- 每一次加一个prop都相当于给底下所有的DlightNode加一个prop，其他类型的就遍历直到dlight就
        this.addNodesProp(this._$nodes, key, propOrFunc, dlScope, listenDeps)
    }

    addNodesProp(nodes: DLNode[], key: string, propOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
        loopNodes(nodes, (node: DLNode) => {
            if (node._$nodeType === DLNodeType.Custom) {
                addDLProp(node as CustomNode, "env", key, propOrFunc, dlScope, listenDeps)
            }
            return true
        })
    }

    _$init() {
        this._$bindNodes()
    }

    render(parentEl: HTMLElement) {
        for (let node of this._$nodes) {
            node.render(parentEl)
        }
    }
}

