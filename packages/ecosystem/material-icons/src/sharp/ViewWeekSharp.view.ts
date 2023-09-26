import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewWeekSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7.33 20H2V4h5.33v16zM22 20V4h-5.33v16H22zm-7.33 0V4H9.33v16h5.34z\"/>")
      .name("ViewWeekSharp")
  }
}

export default ViewWeekSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
