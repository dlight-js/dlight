import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ClassSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 2H4v20h16V2zM6 4h5v8l-2.5-1.5L6 12V4z\"/>")
      .name("ClassSharp")
  }
}

export default ClassSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
