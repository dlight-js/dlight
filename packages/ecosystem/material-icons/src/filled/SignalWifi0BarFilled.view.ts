import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignalWifi0BarFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 6c3.33 0 6.49 1.08 9.08 3.07L12 18.17l-9.08-9.1C5.51 7.08 8.67 6 12 6m0-2C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4z\"/>")
      .name("SignalWifi0BarFilled")
  }
}

export default SignalWifi0BarFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
