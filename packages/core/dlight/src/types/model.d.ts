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

export const use: <M extends Modeling<any, any>>(
  model: M,
  props?: M["props"],
  content?: M["content"]
) => M["model"]
