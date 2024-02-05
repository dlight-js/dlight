import { ContentKeyName } from "./compTag"

type RemoveDLightLifecycle<T> = Omit<
  T,
  "willMount" | "didMount" | "didUpdate" | "willUnmount"
>

type ObjectLengthZero<T> = keyof T extends never ? true : false

export type Modeling<Model, Props = object> = {
  modeling: ContentKeyName<Props> extends never
    ? ObjectLengthZero<Props> extends true
      ? () => RemoveDLightLifecycle<Model>
      : (props: Props) => RemoveDLightLifecycle<Model>
    : (
        props: Omit<Props, ContentKeyName<Props>>,
        content: ContentKeyName<Props>
      ) => RemoveDLightLifecycle<Model>
}
