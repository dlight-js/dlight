import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewCompactAltSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2v16h20V4zM11.5 16.5h-4v-4h4v4zm0-5h-4v-4h4v4zm5 5h-4v-4h4v4zm0-5h-4v-4h4v4z\"/>")
      .name("ViewCompactAltSharp")
  }
}

export default ViewCompactAltSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
