import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FormatClearOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 8V5H6.39l3 3h1.83l-.55 1.28 2.09 2.1L14.21 8zM3.41 4.86 2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21l1.41-1.41z\"/>")
      .name("FormatClearOutlined")
  }
}

export default FormatClearOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
