import { type Properties } from "csstype"

// ---- Used to determine whether X and Y are equal, return A if equal, otherwise B
type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? A
  : B

// ---- For each key, check whether there is readonly, if there is, return never, and then Pick out is not never
type WritableKeysOf<T> = {
  [P in keyof T]: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P,
    never
  >
}[keyof T]
type RemoveReadOnly<T> = Pick<T, WritableKeysOf<T>>

// ---- Delete all functions
type OmitFunction<T> = Omit<
  T,
  { [K in keyof T]: T[K] extends (...args: any) => any ? K : never }[keyof T]
>

type OmitFuncAndReadOnly<T> = RemoveReadOnly<OmitFunction<T>>

// ---- properties
type OmitFuncAndReadOnlyProperty<G> = Omit<
  OmitFuncAndReadOnly<G>,
  "className" | "htmlFor" | "style" | "innerText"
>

export type HTMLAttributes<T> = OmitFuncAndReadOnlyProperty<T> & {
  style: Properties
  class: string
  for: string
}
