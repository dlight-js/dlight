import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ChecklistRtlTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 7H2v2h9V7zm0 8H2v2h9v-2zm5.34-4L12.8 7.46l1.41-1.41 2.12 2.12 4.24-4.24L22 5.34 16.34 11zm0 8-3.54-3.54 1.41-1.41 2.12 2.12 4.24-4.24L22 13.34 16.34 19z\"/>")
      .name("ChecklistRtlTwoTone")
  }
}

export default ChecklistRtlTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
