// ---- 判断是不是只有 optional 的 prop
type IsOptionalProp<T> = undefined extends T ? true : false
type HasOnlyOptionalProps<T> = keyof T extends infer K
  ? K extends keyof T
    ? IsOptionalProp<T[K]> extends true
      ? HasOnlyOptionalProps<Omit<T, K>>
      : false
    : true
  : true

type RemoveOptionalProps<T> =
  HasOnlyOptionalProps<T> extends true
    ? Required<T>
    : T

// 非常神奇的一个解法
// vscode解析ts的提示时，如果是 type A<T> = B<xxx<T>> 的形式，会显示详细的类型，
// 但如果 type A<T> = B<xxx<T>> & xxx，只会显示alias（这里是A）
// 因为不想在外暴露详细类型，所以 type A<T> = B<xxx<T>> & Useless
// 但是如果type Useless = { useless: never }会导致这个类型多一个属性 userless
// 所以直接不添加key！
// @ts-ignore
type Useless = { [key in ""]: never }
type OptionalUseless = { [key in ""]?: never }

type DLightObject<T> = RemoveOptionalProps<{
  [K in keyof T]: (value: T[K]) => DLightObject<Omit<T, K>>
}> & Useless

// @ts-expect-error I don't know why
type CustomTag<T> = "_$content" extends keyof T ? (_$content?: T["_$content"]) => DLightObject<T> : () => DLightObject<T>

// ---- auto gene type
export const Prop = null as any
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Prop<T> = T & { _$isProp: true }
export type RequiredProp<T> = T & { _$isProp: true, _$required: true }

interface Never { _$never: true }

// no any
type IsAny<T> = (
  unknown extends T
    ? [keyof T] extends [never] ? false : true
    : false
)
type NoAny<T> = {
  [K in keyof T]: IsAny<T[K]> extends true ? never : T[K]
}

// 抽取被Prop包裹的Key
type ExtractPropKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T]: T[K] extends Prop<infer _>
    ? (T[K] extends Prop<infer U> ? U : Never)
    : Never
}

type GetOptionalKeys<T> = {
  [K in keyof T]: T extends { [_ in K]: infer U }
    ? (undefined extends U ? K : Never)
    : K;
}[keyof T]

// 过滤掉所有的 never
type FilterNever<T> = Omit<
T,
{ [K in keyof T]: T[K] extends (Never | undefined) ? K : never }[keyof T]
>

// 把没有required转成optional的
type RequiredPart<T> = FilterNever<{
  [K in keyof T]: T[K] extends RequiredProp<infer U> ? Prop<U> : Never
}>
type OptionalPart<T> = FilterNever<{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T]?: T[K] extends RequiredProp<infer _> ? Never : T[K]
}>
type Together<T> = OptionalPart<T> & RequiredPart<T>
type AllProperties<T> = NoAny<Together<T>>
type RequiredProperties<T> = FilterNever<ExtractPropKeys<Required<AllProperties<T>>>>
type OptionalKeys<T> = GetOptionalKeys<AllProperties<T>>
type PropsKeys<T> = FilterNever<{
  [K in keyof AllProperties<T>]: K extends keyof RequiredProperties<T> ?
    K extends OptionalKeys<T>
      ? Exclude<AllProperties<T>[K], undefined> extends Prop<infer U> ? U : Never
      : RequiredProperties<T>[K]
    : Never
}> & OptionalUseless

export type Typed<T> = CustomTag<PropsKeys<T>> & Useless
