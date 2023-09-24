import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewArraySharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 5h-3v14h3V5zm-4 0H7v14h10V5zM6 5H3v14h3V5z\"/>")
      .name("ViewArraySharp")
  }
}

export default ViewArraySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
