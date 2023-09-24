import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CreditScoreSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 4v16h7v-2H4v-6h18V4H2zm18 4H4V6h16v2zm-5.07 11.17-2.83-2.83-1.41 1.41L14.93 22 22 14.93l-1.41-1.41-5.66 5.65z\"/>")
      .name("CreditScoreSharp")
  }
}

export default CreditScoreSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
