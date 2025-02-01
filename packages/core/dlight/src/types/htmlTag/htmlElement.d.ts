import { type Properties } from "csstype"

// ---- Used to determine whether X and Y are equal, return A if equal, otherwise B
type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B

export type OmitIndexSignature<ObjectType> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
    ? never
    : KeyType]: ObjectType[KeyType]
}

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

type OmitFuncAndReadOnly<T> = RemoveReadOnly<
  OmitFunction<OmitIndexSignature<T>>
>

// ---- properties
type OmitFuncAndReadOnlyProperty<G> = Omit<
  OmitFuncAndReadOnly<G>,
  "className" | "htmlFor" | "style" | "innerText"
>

type CustomCSSProperties = {
  [Key in `--${string}`]: string | number
}

export type HTMLAttributes<T> = OmitFuncAndReadOnlyProperty<T> & {
  style: Properties & CustomCSSProperties
  class: string
  for: string
}
