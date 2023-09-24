import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ScatterPlotSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"7\" cy=\"14\" r=\"3\"/><circle cx=\"11\" cy=\"6\" r=\"3\"/><circle cx=\"16.6\" cy=\"17.6\" r=\"3\"/>")
      .name("ScatterPlotSharp")
  }
}

export default ScatterPlotSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
