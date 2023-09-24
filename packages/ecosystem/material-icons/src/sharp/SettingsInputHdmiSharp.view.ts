import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SettingsInputHdmiSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 7V2H6v5H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z\"/>")
      .name("SettingsInputHdmiSharp")
  }
}

export default SettingsInputHdmiSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
