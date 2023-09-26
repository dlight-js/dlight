import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PhonelinkOffFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 6V4H6.82l2 2H22zM1.92 1.65.65 2.92l1.82 1.82C2.18 5.08 2 5.52 2 6v11H0v3h17.73l2.35 2.35 1.27-1.27L3.89 3.62 1.92 1.65zM4 6.27 14.73 17H4V6.27zM23 8h-6c-.55 0-1 .45-1 1v4.18l2 2V10h4v7h-2.18l3 3H23c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z\"/>")
      .name("PhonelinkOffFilled")
  }
}

export default PhonelinkOffFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
