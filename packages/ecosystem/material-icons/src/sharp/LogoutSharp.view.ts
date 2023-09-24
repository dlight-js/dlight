import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LogoutSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 5h7V3H3v18h9v-2H5z\"/><path d=\"m21 12-4-4v3H9v2h8v3z\"/>")
      .name("LogoutSharp")
  }
}

export default LogoutSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
