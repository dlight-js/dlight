import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DevicesFoldSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 3V-.03l-7 3V21h12V3h-5zm3 16h-5.33L17 18V5h3v14zM2 3h2v2H2zm0 16h2v2H2zm0-4h2v2H2zm0-4h2v2H2zm0-4h2v2H2zm4-4h2v2H6zm0 16h2v2H6z\"/>")
      .name("DevicesFoldSharp")
  }
}

export default DevicesFoldSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
