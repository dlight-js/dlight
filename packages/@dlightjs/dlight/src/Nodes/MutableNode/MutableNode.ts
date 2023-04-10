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

    onUpdateNodes(_prevNodes: DLNode[], _nodes: DLNode[]) {}
    addOnUpdateNodesFunc(func: (prevNodes: DLNode[], nodes: DLNode[]) => any) {
        const prevOnUpdateNodes = this.onUpdateNodes
        this.onUpdateNodes = function(prevNodes: DLNode[], nodes: DLNode[]) {
            func.call(this, prevNodes, nodes)
            prevOnUpdateNodes.call(this, prevNodes, nodes)
        }
    }

    _$bindNewNodes(nodes: DLNode[]) {
        bindParentNode(nodes, this)
        this._$beforeInitSubNodes(nodes)
        initNodes(nodes)
        this.afterUpdateNewNodes(nodes)
    }

    _$detach() {
        super._$detach()
        // TODO 这里没有嵌套调用，应该不用像DLNOde里面一样重置？
        // this.afterUpdateNewNodes = function() {}
        // this.onUpdateNodes = function() {}
    }
}


