
export const Watch = (func: any) => ({
    preset: (value: any) => {
        func(value)
        return value
    },
}) as any
