import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GMobiledataTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 11v2h2v2H9V9h7c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h5c1.1 0 2-.9 2-2v-4h-4z\"/>")
      .name("GMobiledataTwoTone")
  }
}

export default GMobiledataTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
