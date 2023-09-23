import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ChangeHistoryTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 7.77 5.61 18h12.78z\" opacity=\".3\"/><path d=\"M12 4 2 20h20L12 4zm0 3.77L18.39 18H5.61L12 7.77z\"/>")
      .name("ChangeHistoryTwoTone")
  }
}

export default ChangeHistoryTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
