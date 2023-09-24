import { type CustomNode } from "@dlightjs/dlight"
import { type DLightHTMLAttributes } from "./htmlTag"

// 非常神奇的一个解法
// vscode解析ts的提示时，如果是 type A<T> = B<xxx<T>> 的形式，会显示详细的类型，
// 但如果 type A<T> = B<xxx<T>> & xxx，只会显示alias（这里是A）
// 因为不想在外暴露详细类型，所以 type A<T> = B<xxx<T>> & Useless
// 但是如果type Useless = { useless: never }会导致这个类型多一个属性 userless
// 所以直接不添加key！
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

export type DefaultProp<T> = T & { _$idDefault: true }

export type RemoveOptional<T> = {
  [K in keyof T]-?: T[K]
}

type DefaultKeyName<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T]-?: T[K] extends DefaultProp<infer _> ? K : never
}[keyof T]

type CustomClassTag<T, O> = DefaultKeyName<RemoveOptional<O>> extends undefined
  ? () => DLightObject<T>
  : undefined extends O[DefaultKeyName<RemoveOptional<O>>]
    ? (defaultProp?: O[DefaultKeyName<RemoveOptional<O>>] extends (DefaultProp<infer U> | undefined) ? U : never) => DLightObject<T>
    : (defaultProp: O[DefaultKeyName<RemoveOptional<O>>] extends DefaultProp<infer U> ? U : never) => DLightObject<T>

type CustomTagType<T, G> = CustomClassTag<T & CustomNodeProps & DLightHTMLAttributes<G>, T> & Useless
export type Typed<T={}, G={}> = CustomTagType<T, G> & Useless

export type Pretty = any

// ---- reverse
export type UnTyped<T> = T extends Typed<infer U> ? U : never

// ---- 前一个版本 -> type
// type CustomTag<P extends { _$content?: any }, T> = P["_$content"] extends Requiredinfer U
//   ? (_$content: U) => DLightObject<Omit<T, "_$content">>
//   : P["_$content"] extends infer U
//     ? (_$content?: U) => DLightObject<Omit<T, "_$content">>
//     : () => DLightObject<T>

// // ---- auto gene type
// export const Prop = null as any
// // eslint-disable-next-line @typescript-eslint/no-redeclare
// export type T = T & { _$isProp: true, _$required: false }
// export type RequiredT = T & { _$isProp: true, _$required: true }

// // 过滤掉所有的 never
// type FilterNever<T> = Omit<
// T,
// { [K in keyof T]: T[K] extends never ? K : never }[keyof T]
// >

// type SelectProps<T> = FilterNever<{
//   [K in keyof T]-?: T[K] extends Requiredinfer U
//     ? U
//     : T[K] extends infer U
//       ? (U | undefined)
//       : never
// }>

// export type Typed<T, G={}> = CustomTag<T, SelectProps<T> & CustomNodeProps & G> & Useless

// export type PropWrapper<T> = {
//   [key in keyof T]-?: undefined extends T[key] ? T[key] : RequiredT[key];
// }

// export type PartialPropWrapper<T> = {
//   [key in keyof T]: T[key];
// }

// export type RequiredPropWrapper<T> = {
//   [key in keyof T]: RequiredT[key];
// }

// export type UnPropWrapper<T> = {
//   [key in keyof T]: T[key] extends Requiredinfer U ? U :
//     T[key] extends infer U ? U | undefined :
//       never;
// }

// ---- 前2个版本，虽然全，但是太深了
// // ---- 判断是不是只有 optional 的 prop
// type IsOptionalT = undefined extends T ? true : false
// type HasOnlyOptionalProps<T> = keyof T extends infer K
//   ? K extends keyof T
//     ? IsOptionalT[K] extends true
//       ? HasOnlyOptionalProps<Omit<T, K>>
//       : false
//     : true
//   : true
// type RemoveOptionalProps<T> =
//   HasOnlyOptionalProps<T> extends true
//     ? Required<T>
//     : T
// interface Never { _$never: true }
// // no any
// type IsAny<T> = (
//   unknown extends T
//     ? [keyof T] extends [never] ? false : true
//     : false
// )
// type NoAny<T> = {
//   [K in keyof T]: IsAny<T[K]> extends true ? never : T[K]
// }
// // 抽取被Prop包裹的Key
// type ExtractPropKeys<T> = {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   [K in keyof T]: T[K] extends infer _
//     ? (T[K] extends infer U ? U : Never)
//     : Never
// }
// type GetOptionalKeys<T> = {
//   [K in keyof T]: T extends { [_ in K]: infer U }
//     ? (undefined extends U ? K : Never)
//     : K;
// }[keyof T]
// type RequiredPart<T> = FilterNever<{
//   [K in keyof T]: T[K] extends Requiredinfer U ? U : Never
// }>
// type OptionalPart<T> = FilterNever<{
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   [K in keyof T]?: T[K] extends Requiredinfer _ ? Never : T[K]
// }>
// type Together<T> = OptionalPart<T> & RequiredPart<T>
// type AllProperties<T> = NoAny<Together<T>>
// type RequiredProperties<T> = FilterNever<ExtractPropKeys<Required<AllProperties<T>>>>
// type OptionalKeys<T> = GetOptionalKeys<AllProperties<T>>
// type PropsKeys<T> = FilterNever<{
//   // @ts-ignore
//   [K in keyof AllProperties<T>]: K extends keyof RequiredProperties<T> ?
//     K extends OptionalKeys<T>
//       ? Exclude<AllProperties<T>[K], undefined> extends infer U ? U : Never
//       : RequiredProperties<T>[K]
//     : Never
// }> & OptionalUseless
