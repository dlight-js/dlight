import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SkipNextSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z\"/>")
      .name("SkipNextSharp")
  }
}

export default SkipNextSharp as any as Typed<DLightIconType>
