import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SportsCricketSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.05 12.81 6.56 4.32a.996.996 0 0 0-1.41 0L2.32 7.15a.996.996 0 0 0 0 1.41l8.49 8.49c.39.39 1.02.39 1.41 0l2.83-2.83a.996.996 0 0 0 0-1.41zm-.709 4.946 1.414-1.414 4.243 4.243-1.414 1.414z\"/><circle cx=\"18.5\" cy=\"5.5\" r=\"3.5\"/>")
      .name("SportsCricketSharp")
  }
}

export default SportsCricketSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
