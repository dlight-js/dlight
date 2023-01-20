import { bindParentNode, initNodes } from '../../utils/nodes';
import {DLNode, DLNodeType} from '../DLNode';

export class MutableNode extends DLNode {


    afterUpdateNewNodes(nodes: DLNode[]) {}
    addAfterUpdateNewNodesFunc(func: (nodes: DLNode[]) => any) {
        const preLifeCycle = this.afterUpdateNewNodes
        this.afterUpdateNewNodes = function(nodes: DLNode[]) {
            func.call(this, nodes)
            preLifeCycle.call(this, nodes)
        }
    }

    onUpdateNodes(prevNodes: DLNode[], nodes: DLNode[]) {}
    addOnUpdateNodesFunc(func: (prevNodes: DLNode[], nodes: DLNode[]) => any) {
        const prevonUpdateNodes = this.onUpdateNodes
        this.onUpdateNodes = function(prevNodes: DLNode[], nodes: DLNode[]) {
            func.call(this, prevNodes, nodes)
            prevonUpdateNodes.call(this, prevNodes, nodes)
        }
    }

    _$bindNewNodes(nodes: DLNode[]) {
        this.afterUpdateNewNodes(nodes)
        bindParentNode(nodes, this)
        initNodes(nodes)
    }

}


