import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewCozySharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2v16h20V4zM11.25 16.75h-4v-4h4v4zm0-5.5h-4v-4h4v4zm5.5 5.5h-4v-4h4v4zm0-5.5h-4v-4h4v4z\"/>")
      .name("ViewCozySharp")
  }
}

export default ViewCozySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
