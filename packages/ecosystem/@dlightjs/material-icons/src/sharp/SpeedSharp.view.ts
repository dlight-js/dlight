import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SpeedSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m20.39 8.56-1.24 1.86a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.86-1.24A10 10 0 0 0 4 20h16a10 10 0 0 0 .38-11.44z\"/><path d=\"M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z\"/>")
      .name("SpeedSharp")
  }
}

export default SpeedSharp as any as Typed<DLightIconType>
