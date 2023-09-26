import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CurrencyYuanOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.28 12H18v2h-5v7h-2v-7H6v-2h4.72L5 3h2.37L12 10.29 16.63 3H19z\"/>")
      .name("CurrencyYuanOutlined")
  }
}

export default CurrencyYuanOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
