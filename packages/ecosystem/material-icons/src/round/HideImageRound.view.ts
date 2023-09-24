import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HideImageRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5.83L21 18.17V5c0-1.1-.9-2-2-2zm-15.49.51A.996.996 0 1 0 2.1 4.92l.9.91V19c0 1.1.9 2 2 2h13.17l.9.9a.996.996 0 1 0 1.41-1.41L3.51 3.51zM7 17a.5.5 0 0 1-.4-.8l2-2.67c.2-.27.6-.27.8 0L11.25 16l.82-1.1 2.1 2.1H7z\"/>")
      .name("HideImageRound")
  }
}

export default HideImageRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
