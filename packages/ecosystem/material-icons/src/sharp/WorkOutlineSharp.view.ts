import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WorkOutlineSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 6V4h-4v2h4zM4 8v11h16V8H4zm18-2v15H2.01V6H8V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2h6z\"/>")
      .name("WorkOutlineSharp")
  }
}

export default WorkOutlineSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
