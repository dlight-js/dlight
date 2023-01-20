import { CustomNode, EnvNode } from "../Nodes"

export function addDep(dl: CustomNode, dep: string, id: string, func: (newValue?: any) => any) {
    dl._$deps[dep][id] = func
}
export function addDeps(dl: CustomNode, deps: string[], id: string, func: (newValue?: any) => any) {
    for (let dep of deps) {
        addDep(dl, dep, id, func)
    }
}


export function deleteDep(dl: CustomNode, depName: string, id: string) {
    delete dl._$deps[depName][id]
}

export function deleteDeps(dl: CustomNode, id: string) {
    for (let depName in dl._$deps) {
        deleteDep(dl, depName, id)
    }
}

export function runDeps(dl: CustomNode | EnvNode, depName: string) {
    for (let id in (dl._$deps??{})[depName] ?? []) {
        for (let dep of dl._$deps[depName][id]) {
            dep.call(dl)
        }
    }
}
