import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FastRewindTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 14.14V9.86L5.97 12zm9 0V9.86L14.97 12z\" opacity=\".3\"/><path d=\"m11 6-8.5 6 8.5 6V6zm-2 8.14L5.97 12 9 9.86v4.28zM20 6l-8.5 6 8.5 6V6zm-2 8.14L14.97 12 18 9.86v4.28z\"/>")
      .name("FastRewindTwoTone")
  }
}

export default FastRewindTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
