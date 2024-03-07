import { type DLightHTMLAttributes } from "./htmlTag"

// a very magical solution
// when vscode parse ts, if it is type A<T> = B<xxx<T>>, it will show the detailed type,
// but if type A<T> = B<xxx<T>> & xxx, it will only show alias (here is A)
// because I don't want to expose the detailed type, so type A<T> = B<xxx<T>> & Useless
// but if type Useless = { useless: never } will cause this type to have an additional property userless
// so just don't add key!
type Useless = { [key in ""]: never }

export type DLightObject<T> = {
  [K in keyof T]-?: undefined extends T[K]
    ? (value?: T[K]) => DLightObject<Omit<T, K>>
    : (value: T[K]) => DLightObject<Omit<T, K>>
}
interface CustomNodeProps {
  willMount: (node: any) => void
  didMount: (node: any) => void
  willUnmount: (node: any) => void
  didUnmount: (node: any) => void
  didUpdate: (node: any, key: string, prevValue: any, currValue: any) => void
  ref: (node: any) => void
  elements: HTMLElement[] | ((holder: HTMLElement[]) => void) | undefined
  forwardProps: true | undefined
}

export type ContentProp<T = object> = T & { _$idContent: true }

export type RemoveOptional<T> = {
  [K in keyof T]-?: T[K]
}

type IsAny<T> = { _$isAny: true } extends T ? true : false

export type ContentKeyName<T> = {
  [K in keyof T]: IsAny<T[K]> extends true
    ? never
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
      T[K] extends ContentProp<infer _>
      ? K
      : never
}[keyof T]

export type CheckContent<T> = RemoveOptional<T>[ContentKeyName<
  RemoveOptional<T>
>]

type CustomClassTag<T, O> = ContentKeyName<RemoveOptional<O>> extends undefined
  ? () => DLightObject<T>
  : undefined extends O[ContentKeyName<RemoveOptional<O>>]
    ? CheckContent<O> extends ContentProp<infer U>
      ? (
          content?: U extends unknown ? any : unknown
        ) => DLightObject<Omit<T, ContentKeyName<RemoveOptional<O>>>>
      : never
    : CheckContent<O> extends ContentProp<infer U>
      ? (
          content: U extends unknown ? any : unknown
        ) => DLightObject<Omit<T, ContentKeyName<RemoveOptional<O>>>>
      : never

type CustomSnippetTag<T> = T extends { content: infer U }
  ? (content: U) => DLightObject<Omit<T, "content">>
  : T extends { content?: infer U }
    ? (content?: U) => DLightObject<Omit<T, "content">>
    : () => DLightObject<T>

type CustomTagType<T, G> = CustomClassTag<
  T &
    CustomNodeProps &
    (keyof G extends never
      ? object
      : DLightHTMLAttributes<G, object, HTMLElement>),
  T
> &
  Useless
export type Typed<T = object, G = object> = CustomTagType<T, G> & Useless
export type SnippetTyped<T = object> = CustomSnippetTag<T> & Useless

export type Pretty = any

// ---- reverse
export type UnTyped<T> = T extends Typed<infer U> ? U : never
