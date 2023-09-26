import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HexagonTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.05 19h-8.1l-4.04-7 4.04-7h8.1l4.04 7z\" opacity=\".3\"/><path d=\"M17.2 3H6.8l-5.2 9 5.2 9h10.4l5.2-9-5.2-9zm-1.15 16h-8.1l-4.04-7 4.04-7h8.09l4.04 7-4.03 7z\"/>")
      .name("HexagonTwoTone")
  }
}

export default HexagonTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
