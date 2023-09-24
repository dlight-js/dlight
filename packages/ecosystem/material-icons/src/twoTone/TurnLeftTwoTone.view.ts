import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TurnLeftTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m6.83 11 1.59 1.59L7 14l-4-4 4-4 1.41 1.41L6.83 9H15c1.1 0 2 .9 2 2v9h-2v-9H6.83z\"/>")
      .name("TurnLeftTwoTone")
  }
}

export default TurnLeftTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
