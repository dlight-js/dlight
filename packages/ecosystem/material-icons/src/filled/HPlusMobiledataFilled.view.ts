import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HPlusMobiledataFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 11H6V7H4v10h2v-4h6v4h2V7h-2v4zm10 0h-2V9h-2v2h-2v2h2v2h2v-2h2v-2z\"/>")
      .name("HPlusMobiledataFilled")
  }
}

export default HPlusMobiledataFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
