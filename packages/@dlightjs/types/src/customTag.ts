// ---- 判断是不是只有 optional 的 prop
type IsOptionalProp<T> = undefined extends T ? true : false
type HasOnlyOptionalProps<T> = keyof T extends infer K
  ? K extends keyof T
    ? IsOptionalProp<T[K]> extends true
      ? HasOnlyOptionalProps<Omit<T, K>>
      : false
    : true
  : true

type RemoveOptionalProps<T, K extends keyof T> =
  HasOnlyOptionalProps<Omit<T, K>> extends true
    ? Required<Omit<T, K>>
    : Omit<T, K>

type DLightObject<T> = {
  [K in keyof T]: (value: T[K]) => DLightObject<RemoveOptionalProps<T, K>>
}

// @ts-expect-error I don't know wthy
type CustomTag<T> = "_$content" extends keyof T ? (_$content?: T["_$content"]) => DLightObject<T> : () => DLightObject<T>

export function Types<T=any>(cls: any) {
  return cls as CustomTag<T>
}
