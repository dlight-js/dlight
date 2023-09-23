import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Man2Outlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 7h-4c-1.1 0-2 .9-2 2v6h2.5v7h3v-7H16V9c0-1.1-.9-2-2-2z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("Man2Outlined")
  }
}

export default Man2Outlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
