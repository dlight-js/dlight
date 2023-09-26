import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ThumbDownSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.83 23 17 15.82V3H4.69L1 11.6V16h8.31l-1.12 5.38zM19 3h4v12h-4z\"/>")
      .name("ThumbDownSharp")
  }
}

export default ThumbDownSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
