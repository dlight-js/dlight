import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MultipleStopOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m17 4 4 4-4 4V9h-4V7h4V4zm-7 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM6 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm1 10h4v-2H7v-3l-4 4 4 4v-3zm7 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z\"/>")
      .name("MultipleStopOutlined")
  }
}

export default MultipleStopOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
