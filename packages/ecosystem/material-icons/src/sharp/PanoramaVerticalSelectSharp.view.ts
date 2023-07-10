import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PanoramaVerticalSelectSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18.49 11.99c0-5.25 1.54-9.01 1.92-10H3.59c.76 2.16 1.9 5.21 1.9 10 0 4.78-1.17 7.91-1.9 10H20.4c-.74-2.08-1.91-5.23-1.91-10z\"/>")
      .name("PanoramaVerticalSelectSharp")
  }
}

export default PanoramaVerticalSelectSharp as any as Typed<DLightIconType>
