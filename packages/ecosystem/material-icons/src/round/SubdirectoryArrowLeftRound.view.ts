import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SubdirectoryArrowLeftRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m5.71 15.71 4.58 4.58c.39.39 1.03.39 1.42 0 .39-.39.39-1.03 0-1.42L8.83 16H19c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1s-1 .45-1 1v9H8.83l2.88-2.87c.39-.39.39-1.03 0-1.42-.39-.39-1.03-.39-1.42 0l-4.58 4.58c-.39.39-.39 1.03 0 1.42z\"/>")
      .name("SubdirectoryArrowLeftRound")
  }
}

export default SubdirectoryArrowLeftRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
