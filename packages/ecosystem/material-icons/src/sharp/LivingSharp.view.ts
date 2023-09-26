import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LivingSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.5 12v2.5h-7V12h-2v4.5h11V12z\"/><path d=\"M10 10v3h4v-3l2.25-.01V7.5h-8.5v2.49z\"/><path d=\"M22 2H2v20h20V2zm-3 7.99V18H5v-8l1.25-.01V6h11.5v3.99H19z\"/>")
      .name("LivingSharp")
  }
}

export default LivingSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
