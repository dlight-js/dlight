import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ScatterPlotTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"11\" cy=\"6\" r=\"2\" opacity=\".3\"/><circle cx=\"16.6\" cy=\"17.6\" r=\"2\" opacity=\".3\"/><circle cx=\"7\" cy=\"14\" r=\"2\" opacity=\".3\"/><path d=\"M7 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-10c0-2.21-1.79-4-4-4S7 3.79 7 6s1.79 4 4 4 4-1.79 4-4zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.6 5.6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"/>")
      .name("ScatterPlotTwoTone")
  }
}

export default ScatterPlotTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
