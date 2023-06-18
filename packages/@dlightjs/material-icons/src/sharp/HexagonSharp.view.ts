import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HexagonSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.2 3H6.8l-5.2 9 5.2 9h10.4l5.2-9z\"/>")
      .name("HexagonSharp")
  }
}

export default HexagonSharp as any as Typed<DLightIconType>
