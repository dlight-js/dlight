import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DynamicFeedOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 8H6v7c0 1.1.9 2 2 2h9v-2H8V8z\"/><path d=\"M20 3h-8c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 8h-8V7h8v4zM4 12H2v7c0 1.1.9 2 2 2h9v-2H4v-7z\"/>")
      .name("DynamicFeedOutlined")
  }
}

export default DynamicFeedOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
