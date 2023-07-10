import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HexagonFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.2 3H6.8l-5.2 9 5.2 9h10.4l5.2-9z\"/>")
      .name("HexagonFilled")
  }
}

export default HexagonFilled as any as Typed<DLightIconType>
