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

type DLightObject<T> = RemoveOptionalProps<{
  [K in keyof T]: (value: T[K]) => DLightObject<Omit<T, K>>
}>

// @ts-expect-error I don't know why
type CustomTag<T> = "_$content" extends keyof T ? (_$content?: T["_$content"]) => DLightObject<T> : () => DLightObject<T>

// ---- auto gene type
export type Prop<T> = T & { isProp: true }

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
  [K in keyof T]: T[K] extends { isProp: true }
    ? (T[K] extends Prop<infer U> ? U : never)
    : never;
}

// 过滤掉所有的 never
type FilterNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
}

export function Types<T>(cls: new (...args: any[]) => T) {
  type AllProperties = NoAny<T>
  type RequiredAllProperties = Required<AllProperties>
  type RequiredPropKeys = FilterNever<ExtractPropKeys<RequiredAllProperties>>
  type AllPropKeys = FilterNever<ExtractPropKeys<AllProperties>>
  type PropsKeys = {
    [K in keyof AllPropKeys]: AllPropKeys[K] extends undefined
      ? K extends keyof RequiredPropKeys ? RequiredPropKeys[K] : any
      : AllPropKeys[K]
  }
  return cls as any as CustomTag<PropsKeys>
}
