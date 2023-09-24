import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MenuOpenOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z\"/>")
      .name("MenuOpenOutlined")
  }
}

export default MenuOpenOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
