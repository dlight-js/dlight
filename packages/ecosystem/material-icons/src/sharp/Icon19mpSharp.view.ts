import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Icon19mpSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.5 6.5H15V8h-1.5zM15 14h1.5v1.5H15z\"/><path d=\"M3 3v18h18V3H3zm9 7h3V9h-3V5.5h4.5v6H12V10zM7 5.5h3v6H8.5V7H7V5.5zm5.5 13H11V14h-1v3H8.5v-3h-1v4.5H6v-6h6.5v6zM18 17h-3v1.5h-1.5v-6H18V17z\"/>")
      .name("Icon19mpSharp")
  }
}

export default Icon19mpSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
