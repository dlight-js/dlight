import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Battery2BarFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 5v16c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h2V2h4v2h2c.55 0 1 .45 1 1zm-2 1H9v10h6V6z\"/>")
      .name("Battery2BarFilled")
  }
}

export default Battery2BarFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
