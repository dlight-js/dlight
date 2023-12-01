import { type CustomNode } from "@dlightjs/dlight"
import { type DLightHTMLAttributes } from "./htmlTag"

// a very magical solution
// when vscode parse ts, if it is type A<T> = B<xxx<T>>, it will show the detailed type,
// but if type A<T> = B<xxx<T>> & xxx, it will only show alias (here is A)
// because I don't want to expose the detailed type, so type A<T> = B<xxx<T>> & Useless
// but if type Useless = { useless: never } will cause this type to have an additional property userless
// so just don't add key!
type Useless = { [key in ""]: never }

type DLightObject<T> = {
  [K in keyof T]-?: ((value: T[K]) => DLightObject<Omit<T, K>>)
}

type CustomLifecycleFuncType = ((els?: HTMLElement[], node?: CustomNode) => void) | undefined
interface CustomNodeProps {
  do: (node: CustomNode) => void
  forwardProps: true
  element: HTMLElement[] | ((holder: HTMLElement[]) => void) | undefined
  willMount: CustomLifecycleFuncType
  didMount: CustomLifecycleFuncType
  willUnmount: CustomLifecycleFuncType
  didUnmount: CustomLifecycleFuncType
}

export type ContentProp<T={}> = T & { _$idContent: true }

export type RemoveOptional<T> = {
  [K in keyof T]-?: T[K]
}

type IsAny<T> = { _$isAny: true } extends T ? true : false

type ContentKeyName<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T]: IsAny<T[K]> extends true ? never : (T[K] extends ContentProp<infer _> ? K : never)
}[keyof T]

type CheckContent<T> = RemoveOptional<T>[ContentKeyName<RemoveOptional<T>>]

type CustomClassTag<T, O> = ContentKeyName<RemoveOptional<O>> extends undefined
  ? () => DLightObject<T>
  : undefined extends O[ContentKeyName<RemoveOptional<O>>]
    ? CheckContent<O> extends ContentProp<infer U>
      ? (content?: U extends unknown ? any : unknown) => DLightObject<Omit<T, ContentKeyName<RemoveOptional<O>>>> : never
    : CheckContent<O> extends ContentProp<infer U>
      ? (content: U extends unknown ? any : unknown) => DLightObject<Omit<T, ContentKeyName<RemoveOptional<O>>>> : never

type CustomSubViewTag<T> = T extends { "content": infer U }
  ? (content: U) => DLightObject<Omit<T, "content">>
  : T extends { "content"?: infer U }
    ? (content?: U) => DLightObject<Omit<T, "content">>
    : () => DLightObject<T>

type CustomTagType<T, G> = CustomClassTag<T & CustomNodeProps & (keyof G extends never ? {} : DLightHTMLAttributes<G>), T> & Useless
export type Typed<T={}, G={}> = CustomTagType<T, G> & Useless
export type SubTyped<T={}> = CustomSubViewTag<T> & Useless

export type Pretty = any

// ---- reverse
export type UnTyped<T> = T extends Typed<infer U> ? U : never

// ---- env
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type AnyEnv = { _$anyEnv: true }

export function env<T=AnyEnv>(): T extends AnyEnv ? any : DLightObject<T> {
  return null as any
}
