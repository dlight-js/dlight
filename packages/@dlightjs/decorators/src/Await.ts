
export const Await = (value: any, setValue?: any, prevValue?: any): any => {
    // ---- 一个参数认为是defaultValue，两个认为是value, setValue
    const defaultValue = setValue ? undefined : value
    const awaitFunc = (v: any, setV: any, prevValue: any) => {
        v.then((d: any) => {
            setV(d)
        })
        setV(defaultValue ?? prevValue)
    }
    return defaultValue ? awaitFunc : awaitFunc(value, setValue, prevValue) as any
}
