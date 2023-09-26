import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SportsGolfFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 16c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7 3.13 7 7 7zm0-12c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z\"/><circle cx=\"10\" cy=\"8\" r=\"1\"/><circle cx=\"14\" cy=\"8\" r=\"1\"/><circle cx=\"12\" cy=\"6\" r=\"1\"/><path d=\"M7 19h2c1.1 0 2 .9 2 2v1h2v-1c0-1.1.9-2 2-2h2v-2H7v2z\"/>")
      .name("SportsGolfFilled")
  }
}

export default SportsGolfFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
