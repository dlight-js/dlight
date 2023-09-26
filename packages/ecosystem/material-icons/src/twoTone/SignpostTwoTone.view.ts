import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignpostTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 6h11.17l1 1-1 1H6V6zm12 10H6.83l-1-1 1-1H18v2z\" opacity=\".3\"/><path d=\"M13 10h5l3-3-3-3h-5V2h-2v2H4v6h7v2H6l-3 3 3 3h5v4h2v-4h7v-6h-7v-2zM6 6h11.17l1 1-1 1H6V6zm12 10H6.83l-1-1 1-1H18v2z\"/>")
      .name("SignpostTwoTone")
  }
}

export default SignpostTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
