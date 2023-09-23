import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ShowerSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"8\" cy=\"17\" r=\"1\"/><circle cx=\"12\" cy=\"17\" r=\"1\"/><circle cx=\"16\" cy=\"17\" r=\"1\"/><path d=\"M13 5.08V3h-2v2.08C7.61 5.57 5 8.47 5 12v2h14v-2c0-3.53-2.61-6.43-6-6.92z\"/><circle cx=\"8\" cy=\"20\" r=\"1\"/><circle cx=\"12\" cy=\"20\" r=\"1\"/><circle cx=\"16\" cy=\"20\" r=\"1\"/>")
      .name("ShowerSharp")
  }
}

export default ShowerSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
