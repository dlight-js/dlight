import { DLightNode, EnvNode } from "../Nodes"

export function addDep(dl: DLightNode, dep: string, id: string, func: (newValue?: any) => any) {
    dl._$deps[dep][id] = func
}
export function addDeps(dl: DLightNode, deps: string[], id: string, func: (newValue?: any) => any) {
    for (let dep of deps) {
        addDep(dl, dep, id, func)
    }
}


export function deleteDep(dl: DLightNode, depName: string, id: string) {
    delete dl._$deps[depName][id]
}

export function deleteDeps(dl: DLightNode, id: string) {
    for (let depName in dl._$deps) {
        deleteDep(dl, depName, id)
    }
}

export function runDeps(dl: DLightNode | EnvNode, depName: string) {
    for (let id in (dl._$deps??{})[depName] ?? []) {
        for (let dep of dl._$deps[depName][id]) {
            dep.call(dl)
        }
    }
}
