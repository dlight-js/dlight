import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignalCellularAlt1BarOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 14h3v6H5v-6z\"/>")
      .name("SignalCellularAlt1BarOutlined")
  }
}

export default SignalCellularAlt1BarOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
