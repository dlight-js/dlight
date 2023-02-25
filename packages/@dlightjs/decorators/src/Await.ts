
export const Await = (value: any, setValue?: any): any => {
    // ---- 一个参数认为是defaultValue，两个认为是value, setValue
    const defaultValue = setValue ? undefined : value
    const awaitFunc = (v: any, setV: any) => {
        v.then((d: any) => setV(d))
        setV(defaultValue)
        return defaultValue
    }
    return defaultValue ? awaitFunc : awaitFunc(value, setValue) as any
}
