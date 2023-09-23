import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MobileOffTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 5v8.61l2 2V3c0-1.1-.9-2-2-2H7c-.71 0-1.33.37-1.68.93L8.39 5H17zM1.49 3.76 5 7.27V21c0 1.1.9 2 2 2h10c1.02 0 1.85-.77 1.98-1.75l1.72 1.72 1.41-1.41L2.9 2.35 1.49 3.76zM7 9.27 16.73 19H7V9.27z\"/>")
      .name("MobileOffTwoTone")
  }
}

export default MobileOffTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
