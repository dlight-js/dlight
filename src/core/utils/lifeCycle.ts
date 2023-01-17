import {DLNode} from "../Nodes/Node";

export function addLifeCycle(dlNode: DLNode, func: () => any, lifeCycleName: "willAppear" | "didAppear" | "willDisappear" | "didDisappear") {
    const preLifeCycle = dlNode[lifeCycleName]
    dlNode[lifeCycleName] = function() {
        func.call(this)
        preLifeCycle.call(this)
    }
}