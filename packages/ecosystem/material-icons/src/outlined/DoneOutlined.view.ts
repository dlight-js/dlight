import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DoneOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"/>")
      .name("DoneOutlined")
  }
}

export default DoneOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
