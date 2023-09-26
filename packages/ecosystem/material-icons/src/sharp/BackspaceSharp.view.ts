import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BackspaceSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M24 3H6l-6 9 6 9h18V3zm-5 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z\"/>")
      .name("BackspaceSharp")
  }
}

export default BackspaceSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
