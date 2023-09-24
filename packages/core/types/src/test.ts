import { View } from "@dlightjs/dlight"
import { Default, type div, type Pretty, type Typed, type UnTyped } from "./index"

const VV = View as any as (typeof View & ((...args: any) => any))
/**
 * @content kk
*/
interface Props {
  /** jfjsf */
  a?: Default<string>
  b: string
  c?: number
  _$content?: string
}
const Prop = null as any

class JJClass extends VV implements Props {
  @Prop a = ""
  @Prop b = ""
  c = 1
  @VV
  Body() {
  }
}
const t = JJClass as Pretty as Typed<Props>
// type j = DefaultKeyName<Props>
t()
  .c(1)
  .
const g: Typed<UnTyped<typeof t>, HTMLDivElement> = null as any
g()
  .a("1")
  .b("2")
  .c(3)
  .
