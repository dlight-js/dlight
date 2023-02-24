
export const Await = (value: any, setValue?: any): any => {
    // ---- 一个参数认为是defaultValue，两个认为是value, setValue
    const defaultValue = setValue ? undefined : value
    const awaitFunc = (v: any, setV: any) => {
        v.then((d: any) => setV(d))
        setV(defaultValue)
        return defaultValue
    }
    return defaultValue ? awaitFunc : awaitFunc(value, setValue)
}

export const Object = (value: any, setState: any) => {
    const stateObjectProxy: ProxyHandler<any> = {
        get(target, key) {
            if (target[key] && typeof target[key] === 'object') {
                return new Proxy(target[key], stateObjectProxy)
            }
            return target[key]
        },
        set(target, property, value) {
            target[property] = value
            setState(new Proxy(target, stateObjectProxy))
            return true
        }
    }

    return new Proxy(value, stateObjectProxy)
}
