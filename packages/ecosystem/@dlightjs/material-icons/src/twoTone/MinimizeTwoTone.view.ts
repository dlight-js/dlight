import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MinimizeTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 19h12v2H6v-2z\"/>")
      .name("MinimizeTwoTone")
  }
}

export default MinimizeTwoTone as any as Typed<DLightIconType>
