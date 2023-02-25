
export const Watch = (func: any) => ({
    preset: (value: any) => {
        func()
        return value
    },
}) as any
