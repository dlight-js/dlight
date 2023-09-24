import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VolumeMuteRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L11 9H8c-.55 0-1 .45-1 1z\"/>")
      .name("VolumeMuteRound")
  }
}

export default VolumeMuteRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
