import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ChangeHistoryFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 7.77 18.39 18H5.61L12 7.77M12 4 2 20h20L12 4z\"/>")
      .name("ChangeHistoryFilled")
  }
}

export default ChangeHistoryFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
