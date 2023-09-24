import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowBackIosOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.51 3.87 15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z\"/>")
      .name("ArrowBackIosOutlined")
  }
}

export default ArrowBackIosOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
