/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentKeyName, ContentProp } from "./compTag"

type RemoveDLightLifecycle<T> = Omit<
  T,
  "willMount" | "didMount" | "didUpdate" | "willUnmount"
>

export type Modeling<Model, Props = object> = {
  model: RemoveDLightLifecycle<Model>
  props: keyof Props extends never
    ? never
    : ContentKeyName<Props> extends undefined
      ? Props
      : Omit<Props, ContentKeyName<Props>>
  content: ContentKeyName<Props> extends undefined
    ? never
    : Props[ContentKeyName<Props>] extends ContentProp<infer U>
      ? U
      : never
}
