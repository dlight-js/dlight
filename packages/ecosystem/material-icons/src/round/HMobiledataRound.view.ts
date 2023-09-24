import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HMobiledataRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 11H9V8c0-.55-.45-1-1-1s-1 .45-1 1v8c0 .55.45 1 1 1s1-.45 1-1v-3h6v3c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1s-1 .45-1 1v3z\"/>")
      .name("HMobiledataRound")
  }
}

export default HMobiledataRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
