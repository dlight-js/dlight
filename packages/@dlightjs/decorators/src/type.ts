
type DLDecoratorFunc<T> = (value: T, setValue: (newValue: T) => null) => any

type DLDecoratorObject<T> = {
    func: DLDecoratorFunc<T>,
    preget: (value: T) => any,
    preset: DLDecoratorFunc<T>
}

export type DLDecorator<T=any> = DLDecoratorFunc<T> | DLDecoratorObject<T>

