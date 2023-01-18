import { DLightNode } from './DlightNode';
import {DLNode, DLNodeType} from './DLNode';
import { addDLProp } from '../utils/prop';
import { loopNodes } from '../utils/nodes';


export class EnvNode extends DLNode {
    _$depIds: string[] = []
    _$deps?: any
    _$envNodes?: EnvNode[]

    constructor(id?: string) {
        super(DLNodeType.Env, id)
    }

    _$addNode(dlNode: DLNode) {
        this._$dlNodes.push(dlNode)
    }

    _$addProp(key: string, propOrFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[]) {
        // ---- 每一次加一个prop都相当于给底下所有的DlightNode加一个prop，其他类型的就遍历直到dlight就
        this.addNodesProp(this._$dlNodes, key, propOrFunc, dlScope, listenDeps)
    }

    addNodesProp(nodes: DLNode[], key: string, propOrFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[]) {
        loopNodes(nodes, (node: DLNode) => {
            if (node._$nodeType === DLNodeType.Dlight) {
                addDLProp(node as DLightNode, "env", key, propOrFunc, dlScope, listenDeps)
            }
            return true
        })
    }

    _$init() {
        this._$bindNodes(this._$nodes)
    }

    render(parentEl: HTMLElement) {
        for (let node of this._$dlNodes) {
            node.render(parentEl)
        }
    }
}

