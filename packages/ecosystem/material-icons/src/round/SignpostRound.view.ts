import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignpostRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 10h5l3-3-3-3h-5V2h-2v2H4v6h7v2H6l-3 3 3 3h5v4h2v-4h7v-6h-7z\"/>")
      .name("SignpostRound")
  }
}

export default SignpostRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
