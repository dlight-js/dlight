import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HailFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5-4h2v.4c-.1 2.2-.8 3.9-2.3 5.1-.5.4-1.1.7-1.7.9V22h-2v-6h-2v6H9V10.1c-.3.1-.5.2-.6.3-.9.7-1.39 1.6-1.4 3.1v.5H5v-.5c0-2 .71-3.59 2.11-4.79C8.21 7.81 10 7 12 7s2.68-.46 3.48-1.06C16.48 5.14 17 4 17 2.5V2zM4 16h3v6H4v-6z\"/>")
      .name("HailFilled")
  }
}

export default HailFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
