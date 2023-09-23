import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AlignVerticalBottomOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 22H2v-2h20v2zM10 2H7v16h3V2zm7 6h-3v10h3V8z\"/>")
      .name("AlignVerticalBottomOutlined")
  }
}

export default AlignVerticalBottomOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
