import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ScreenLockPortraitSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 16h6v-5h-1v-.9c0-1-.69-1.92-1.68-2.08C11.07 7.83 10 8.79 10 10v1H9v5zm1.8-6c0-.66.54-1.2 1.2-1.2s1.2.54 1.2 1.2v1h-2.4v-1zM19 1H5v22h14V1zm-2 18H7V5h10v14z\"/>")
      .name("ScreenLockPortraitSharp")
  }
}

export default ScreenLockPortraitSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
