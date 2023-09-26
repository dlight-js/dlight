import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SettingsInputHdmiFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z\"/>")
      .name("SettingsInputHdmiFilled")
  }
}

export default SettingsInputHdmiFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
