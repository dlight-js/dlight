import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Icon9mpSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 14h1.5v1.5H15z\"/><path d=\"M3 3v18h18V3H3zm7 7h3V9h-3V5.5h4.5v6H10V10zm2.5 8.5H11V14h-1v3H8.5v-3h-1v4.5H6v-6h6.5v6zM18 17h-3v1.5h-1.5v-6H18V17z\"/><path d=\"M11.5 6.5H13V8h-1.5z\"/>")
      .name("Icon9mpSharp")
  }
}

export default Icon9mpSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
