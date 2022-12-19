
export const State = (target: any, propertyKey: string) => {
    Object.defineProperty(target, `${propertyKey}State`, {
        value: true,
        writable: true
    })
}
