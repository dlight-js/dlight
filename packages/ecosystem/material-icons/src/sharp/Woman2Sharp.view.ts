import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Woman2Sharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.41 7h-2.82L7 16h3.5v6h3v-6H17z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("Woman2Sharp")
  }
}

export default Woman2Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
