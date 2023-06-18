import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ScatterPlotRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"7\" cy=\"14\" r=\"3\"/><circle cx=\"11\" cy=\"6\" r=\"3\"/><circle cx=\"16.6\" cy=\"17.6\" r=\"3\"/>")
      .name("ScatterPlotRound")
  }
}

export default ScatterPlotRound as any as Typed<DLightIconType>
