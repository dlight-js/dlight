import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BedroomParentSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6.5 12h11v2h-11zm.75-3.5h4v2h-4zm5.5 0h4v2h-4z\"/><path d=\"M22 2H2v20h20V2zm-3 15h-1.5v-1.5h-11V17H5v-5l.65-.55V7H11c.37 0 .72.12 1 .32.28-.2.63-.32 1-.32h5.35v4.45L19 12v5z\"/>")
      .name("BedroomParentSharp")
  }
}

export default BedroomParentSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
