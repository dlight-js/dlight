import { View } from "@dlightjs/dlight"
import {SubTyped, type div, type Pretty, type Typed, type UnTyped, ContentProp } from "./index"

const VV = View as any as (typeof View & ((...args: any) => any))
/**
 * @content kk
*/
interface Props {
  /** jfjsf */
  a: ContentProp<string>
  b: string
  c?: number
  content?: string
  n: any
}
const Prop = null as any
type CC = SubTyped<Props>
let j: CC
j()
type TT = Typed<Props>
let k: TT
k().
class JJClass extends VV implements Props {
  @Prop a = ""
  @Prop b = ""
  c = 1

  @VV
  Body() {
  }
}
const t = JJClass as Pretty as Typed<Props>
// type j = ContentKeyName<Props>
t()
  .c(1)

const g: Typed<UnTyped<typeof t>, HTMLDivElement> = null as any
g()
  .a("1")
  .b("2")
  .c(3)
  .
