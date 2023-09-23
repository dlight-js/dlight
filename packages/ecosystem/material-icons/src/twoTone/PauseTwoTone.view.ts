import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PauseTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 5h4v14H6zm8 0h4v14h-4z\"/>")
      .name("PauseTwoTone")
  }
}

export default PauseTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
