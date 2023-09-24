import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WineBarTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 13c-1.86 0-3.41-1.28-3.86-3h7.72c-.45 1.72-2 3-3.86 3z\" opacity=\".3\"/><path d=\"M6 3v6c0 2.97 2.16 5.43 5 5.91V19H8v2h8v-2h-3v-4.09c2.84-.48 5-2.94 5-5.91V3H6zm6 10c-1.86 0-3.41-1.28-3.86-3h7.72c-.45 1.72-2 3-3.86 3zm4-5H8V5h8v3z\"/>")
      .name("WineBarTwoTone")
  }
}

export default WineBarTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
