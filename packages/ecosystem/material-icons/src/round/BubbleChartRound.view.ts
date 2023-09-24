import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BubbleChartRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"7.2\" cy=\"14.4\" r=\"3.2\"/><circle cx=\"14.8\" cy=\"18\" r=\"2\"/><circle cx=\"15.2\" cy=\"8.8\" r=\"4.8\"/>")
      .name("BubbleChartRound")
  }
}

export default BubbleChartRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
