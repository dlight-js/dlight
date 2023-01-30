import { bindParentNode, initNodes } from '../../utils/nodes';
import { DLNode } from '../DLNode';

export class MutableNode extends DLNode {
    afterUpdateNewNodes(_nodes: DLNode[]) {}
    addAfterUpdateNewNodesFunc(func: (nodes: DLNode[]) => any) {
        const preLifeCycle = this.afterUpdateNewNodes
        this.afterUpdateNewNodes = function(nodes: DLNode[]) {
            func.call(this, nodes)
            preLifeCycle.call(this, nodes)
        }
    }

    onUpdate(_prevNodes: DLNode[], _nodes: DLNode[]) {}
    addOnUpdateNodesFunc(func: (prevNodes: DLNode[], nodes: DLNode[]) => any) {
        const prevonUpdateNodes = this.onUpdate
        this.onUpdate = function(prevNodes: DLNode[], nodes: DLNode[]) {
            func.call(this, prevNodes, nodes)
            prevonUpdateNodes.call(this, prevNodes, nodes)
        }
    }

    _$bindNewNodes(nodes: DLNode[]) {
        this.afterUpdateNewNodes(nodes)
        bindParentNode(nodes, this)
        this._$beforeInitSubNodes()
        initNodes(nodes)
    }

}


