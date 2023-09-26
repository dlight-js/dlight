import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CheckOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z\"/>")
      .name("CheckOutlined")
  }
}

export default CheckOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
