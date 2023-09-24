import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ReadMoreSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 7h9v2h-9zm0 8h9v2h-9zm3-4h6v2h-6zm-3 1L8 7v4H2v2h6v4z\"/>")
      .name("ReadMoreSharp")
  }
}

export default ReadMoreSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
