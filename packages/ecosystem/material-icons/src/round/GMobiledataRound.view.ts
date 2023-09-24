import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GMobiledataRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 12c0 .55.45 1 1 1h1v2H9V9h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h5c1.1 0 2-.9 2-2v-3c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1z\"/>")
      .name("GMobiledataRound")
  }
}

export default GMobiledataRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
