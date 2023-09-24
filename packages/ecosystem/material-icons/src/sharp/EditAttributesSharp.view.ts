import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EditAttributesSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.63 7H6.37C3.96 7 2 9.24 2 12s1.96 5 4.37 5h11.26c2.41 0 4.37-2.24 4.37-5s-1.96-5-4.37-5zM7.24 14.46l-2.57-2.57.7-.7 1.87 1.87 3.52-3.52.7.7-4.22 4.22z\"/>")
      .name("EditAttributesSharp")
  }
}

export default EditAttributesSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
