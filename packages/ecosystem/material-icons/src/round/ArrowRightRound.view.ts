import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowRightRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m11.71 15.29 2.59-2.59a.996.996 0 0 0 0-1.41L11.71 8.7c-.63-.62-1.71-.18-1.71.71v5.17c0 .9 1.08 1.34 1.71.71z\"/>")
      .name("ArrowRightRound")
  }
}

export default ArrowRightRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
