import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MailOutlineSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2.01L2 20h20V4zm-2 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z\"/>")
      .name("MailOutlineSharp")
  }
}

export default MailOutlineSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
