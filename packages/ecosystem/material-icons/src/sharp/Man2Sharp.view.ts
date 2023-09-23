import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Man2Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 7H8v8h2.5v7h3v-7H16z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("Man2Sharp")
  }
}

export default Man2Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
