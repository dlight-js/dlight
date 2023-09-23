import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PaymentsSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 7v13H4v-2h17V7h2zm-4 9H1V4h18v12zm-6-6c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3z\"/>")
      .name("PaymentsSharp")
  }
}

export default PaymentsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
