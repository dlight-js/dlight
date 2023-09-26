import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EqualizerTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 9h4v11h-4zm-6-5h4v16h-4zm-6 8h4v8H4z\"/>")
      .name("EqualizerTwoTone")
  }
}

export default EqualizerTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
