import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BatterySaverTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 4h-2V2h-4v2H8c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 10h-2v2h-2v-2H9v-2h2v-2h2v2h2v2z\"/>")
      .name("BatterySaverTwoTone")
  }
}

export default BatterySaverTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
