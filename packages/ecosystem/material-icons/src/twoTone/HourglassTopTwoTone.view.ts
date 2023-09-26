import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HourglassTopTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m8 7.5 4 4 4-4V4H8z\" opacity=\".3\"/><path d=\"m8 7.5 4 4 4-4V4H8z\" opacity=\".3\"/><path d=\"M18 2H6v6l4 4-3.99 4.01L6 22h12l-.01-5.99L14 12l4-3.99V2zm-2 14.5V20H8v-3.5l4-4 4 4zm0-9-4 4-4-4V4h8v3.5z\"/>")
      .name("HourglassTopTwoTone")
  }
}

export default HourglassTopTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
