import { ContentKeyName, ContentProp } from "./compTag"

type RemoveDLightInternal<T, Props> = Omit<
  T,
  "willMount" | "didMount" | "didUpdate" | "willUnmount" | keyof Props
>

export type Modeling<Model, Props = object> = (props: Props) => Model

type GetProps<T> = keyof T extends never
  ? never
  : ContentKeyName<T> extends undefined
    ? T
    : Omit<T, ContentKeyName<T>>

type GetContent<T> = ContentKeyName<T> extends undefined
  ? never
  : T[ContentKeyName<T>] extends ContentProp<infer U>
    ? U
    : never

export const use: <M>(
  model: M,
  // @ts-expect-error Model should be a function
  props?: GetProps<Parameters<M>[0]>,
  // @ts-expect-error Model should be a function
  content?: GetContent<Parameters<M>[0]>
  // @ts-expect-error Model should be a function
) => RemoveDLightInternal<ReturnType<M>, Parameters<M>[0]>
