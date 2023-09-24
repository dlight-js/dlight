import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EmailSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2v16h20V4zm-2 4-8 5-8-5V6l8 5 8-5v2z\"/>")
      .name("EmailSharp")
  }
}

export default EmailSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
