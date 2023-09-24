import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ContrastOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm1-17.93c3.94.49 7 3.85 7 7.93s-3.05 7.44-7 7.93V4.07z\"/>")
      .name("ContrastOutlined")
  }
}

export default ContrastOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
