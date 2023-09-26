import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class StackedLineChartRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m2.79 14.78-.09-.09a.996.996 0 0 1 0-1.41l6.09-6.1a.996.996 0 0 1 1.41 0l3.29 3.29 6.39-7.18a1 1 0 0 1 1.45-.04c.37.38.39.98.04 1.37l-7.17 8.07a.992.992 0 0 1-1.45.04L9.5 9.48l-5.3 5.3a.996.996 0 0 1-1.41 0zm1.41 6 5.3-5.3 3.25 3.25c.41.41 1.07.39 1.45-.04l7.17-8.07c.35-.39.33-.99-.04-1.37a1 1 0 0 0-1.45.04l-6.39 7.18-3.29-3.29a.996.996 0 0 0-1.41 0l-6.09 6.1a.996.996 0 0 0 0 1.41l.09.09c.39.39 1.03.39 1.41 0z\"/>")
      .name("StackedLineChartRound")
  }
}

export default StackedLineChartRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
