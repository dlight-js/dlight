
function removeEmpty(obj: any): any {
    if (typeof obj !== "object") return obj
    if (Array.isArray(obj)) {
        return obj
            .filter(i => i !== null && i !== undefined)
            .map(i => removeEmpty(i))
    }
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([_, v]) => v != null)
            .map(([k, v]) => [k, removeEmpty(v)])
    )
}

function nestedProxy(obj: any, proxyHandler: ProxyHandler<any>) {
    if (typeof obj !== "object") return obj
    if (Array.isArray(obj)) {
        for (let [idx, value] of obj.entries()) {
            obj[idx] = nestedProxy(value, proxyHandler)
        }
    } else {
        for (let [key, value] of Object.entries(obj)) {
            obj[key] = nestedProxy(value, proxyHandler)
        }
    }

    return new Proxy(obj, proxyHandler)
}
export const StateObject = {
    preset: (value: any, setState: any) => {
        return StateObject.func(value, setState)
    },
    func: (value: any, setState: any) => {
        if (!value || typeof value !== "object") return

        const stateObjectProxy: ProxyHandler<any> = {
            set(target, property, value) {
                // ---- 长度会重复设置，所以不管
                if (Array.isArray(target) && property === "length") {
                    target[property] = value
                    return true
                }
                target[property] = value
                // ---- 为了从 proxyValue 中拿到不带proxy的，用了一点hack
                proxyValue = JSON.parse(JSON.stringify(proxyValue))
                setState(proxyValue)
                return true
            },
            deleteProperty(target, property) {
                if (!(property in target)) {
                    return true
                }
                delete target[property]
                // ---- 这里还要去除空的
                proxyValue = removeEmpty(JSON.parse(JSON.stringify(proxyValue)))
                setState(proxyValue)
                return true
            },
        }
        let proxyValue = nestedProxy(value, stateObjectProxy)
        return proxyValue
    }
} as any
