import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BackHandFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 24c-3.26 0-6.19-1.99-7.4-5.02l-3.03-7.61a1 1 0 0 1 1.24-1.32l.79.26c.56.18 1.02.61 1.24 1.16L7.25 15H8V3.25a1.25 1.25 0 0 1 2.5 0V12h1V1.25a1.25 1.25 0 0 1 2.5 0V12h1V2.75a1.25 1.25 0 0 1 2.5 0V12h1V5.75a1.25 1.25 0 0 1 2.5 0V16c0 4.42-3.58 8-8 8z\"/>")
      .name("BackHandFilled")
  }
}

export default BackHandFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
