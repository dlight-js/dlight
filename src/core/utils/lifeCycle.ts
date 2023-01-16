import { DLightNode } from "../Nodes";

export function addLifeCycle(dlNode: DLightNode, func: () => any, lifeCycleName: "willAppear" | "didAppear" | "willDisappear" | "didDisappear") {
    const preLifeCycle = dlNode[lifeCycleName]
    dlNode[lifeCycleName] = function() {
        func.call(this)
        preLifeCycle.call(this)
    }
}