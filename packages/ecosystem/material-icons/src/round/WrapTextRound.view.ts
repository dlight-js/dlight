import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WrapTextRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 7h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1zm11.83 4H5c-.55 0-1 .45-1 1s.45 1 1 1h12.13c1 0 1.93.67 2.09 1.66.21 1.25-.76 2.34-1.97 2.34H15v-.79c0-.45-.54-.67-.85-.35l-1.79 1.79c-.2.2-.2.51 0 .71l1.79 1.79c.32.32.85.09.85-.35V19h2c2.34 0 4.21-2.01 3.98-4.39-.2-2.08-2.06-3.61-4.15-3.61zM9 17H5c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1z\"/>")
      .name("WrapTextRound")
  }
}

export default WrapTextRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
