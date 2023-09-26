import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class UnfoldLessRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8.12 19.3c.39.39 1.02.39 1.41 0L12 16.83l2.47 2.47a.996.996 0 1 0 1.41-1.41l-3.17-3.17a.996.996 0 0 0-1.41 0l-3.17 3.17c-.4.38-.4 1.02-.01 1.41zm7.76-14.6a.996.996 0 0 0-1.41 0L12 7.17 9.53 4.7a.996.996 0 0 0-1.41 0c-.39.39-.39 1.03 0 1.42l3.17 3.17c.39.39 1.02.39 1.41 0l3.17-3.17c.4-.39.4-1.03.01-1.42z\"/>")
      .name("UnfoldLessRound")
  }
}

export default UnfoldLessRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
