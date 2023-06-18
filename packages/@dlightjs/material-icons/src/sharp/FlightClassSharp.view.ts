import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FlightClassSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 4h-6v9h6V4zM9.5 16H18v2H8L5 8V4h2v4l2.5 8zM8 19h10v2H8v-2z\"/>")
      .name("FlightClassSharp")
  }
}

export default FlightClassSharp as any as Typed<DLightIconType>
