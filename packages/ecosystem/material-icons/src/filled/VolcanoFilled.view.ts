import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VolcanoFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 8h-7l-2 5H6l-4 9h20zm-5-7h2v4h-2zm3.121 4.468L18.95 2.64l1.414 1.414-2.829 2.828zM7.64 4.05l1.414-1.414 2.828 2.829-1.414 1.414z\"/>")
      .name("VolcanoFilled")
  }
}

export default VolcanoFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
