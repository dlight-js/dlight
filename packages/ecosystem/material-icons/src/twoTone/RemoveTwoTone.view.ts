import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RemoveTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 13H5v-2h14v2z\"/>")
      .name("RemoveTwoTone")
  }
}

export default RemoveTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
