import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BentoSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 11V5h6v6h-6zm0 8h6v-6h-6v6zM14 5v14H2V5h12zm-4.5 7c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z\"/>")
      .name("BentoSharp")
  }
}

export default BentoSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
