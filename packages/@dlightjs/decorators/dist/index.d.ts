type DLDecoratorFunc<T> = (value: T, setValue: (newValue: T) => null) => any;
type DLDecoratorObject<T> = {
    func: DLDecoratorFunc<T>;
    preget: (value: T) => any;
    preset: DLDecoratorFunc<T>;
};
type DLDecorator<T = any> = DLDecoratorFunc<T> | DLDecoratorObject<T>;

declare const Await: (value: any, dlScope?: any, propName?: any) => any;

declare const Watch: (func: any) => any;

export { Await, DLDecorator, Watch };
