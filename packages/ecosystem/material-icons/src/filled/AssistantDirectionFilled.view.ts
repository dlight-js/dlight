import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AssistantDirectionFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 10H9c-.6 0-1 .4-1 1v4h2v-3h4v2.5l3.5-3.5L14 7.5V10zm-2-9C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm7.73 11.58-7.19 7.22c-.35.27-.79.27-1.15 0L4.2 12.58a.932.932 0 0 1 0-1.16l7.19-7.22c.35-.27.79-.27 1.15 0l7.19 7.22c.36.27.36.8 0 1.16z\"/>")
      .name("AssistantDirectionFilled")
  }
}

export default AssistantDirectionFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
