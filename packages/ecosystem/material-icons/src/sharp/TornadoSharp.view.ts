import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TornadoSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20.11 8 23 3H1l2.89 5zM7.95 15 12 22l4.05-7zm11-5H5.05l1.74 3h10.42z\"/>")
      .name("TornadoSharp")
  }
}

export default TornadoSharp as any as Typed<DLightIconType>
