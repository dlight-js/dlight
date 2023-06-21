import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowUpwardSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z\"/>")
      .name("ArrowUpwardSharp")
  }
}

export default ArrowUpwardSharp as any as Typed<DLightIconType>
