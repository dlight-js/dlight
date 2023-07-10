import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SingleBedSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 10V5H6v5H4v7h1.33L6 19h1l.67-2h8.67l.66 2h1l.67-2H20v-7h-2zm-7 0H8V7h3v3zm5 0h-3V7h3v3z\"/>")
      .name("SingleBedSharp")
  }
}

export default SingleBedSharp as any as Typed<DLightIconType>
