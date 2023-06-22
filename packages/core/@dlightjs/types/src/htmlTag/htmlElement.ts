import { type Properties } from "csstype"

// ---- 用来判断 X和Y 是不是想等，想等返回A，否则B
type IfEquals<X, Y, A, B> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B

// ---- 对于每个key判断有没有readonly，有就返回never，然后Pick出来不是never的
type WritableKeysOf<T> = {
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T]
type RemoveReadOnly<T> = Pick<T, WritableKeysOf<T>>

// ---- 删除所有 extends Function的
type OmitFunction<T> = Omit<
T,
{ [K in keyof T]: T[K] extends (...args: any) => any ? K : never }[keyof T]
>

type OmitFuncAndReadOnly<T> = RemoveReadOnly<OmitFunction<T>>

// properties
type OmitFuncAndReadOnlyProperty<G> = Omit<OmitFuncAndReadOnly<G>, "className">

// shortcut inline style
// type PropertiesRequired = Required<Properties>

// type ShortcutStyle = {
//   [K in keyof PropertiesRequired as `_${string & K}`]: PropertiesRequired[K]
// }

export type HTMLAttributes<T> =
OmitFuncAndReadOnlyProperty<T>
& { style: Properties }
