import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowDropUpTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 14 5-5 5 5H7z\"/>")
      .name("ArrowDropUpTwoTone")
  }
}

export default ArrowDropUpTwoTone as any as Typed<DLightIconType>
