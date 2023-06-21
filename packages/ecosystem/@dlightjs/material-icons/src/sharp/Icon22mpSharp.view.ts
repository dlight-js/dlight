import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Icon22mpSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3v18h18V3H3zm3.5 5h3V7h-3V5.5H11V9H8v1h3v1.5H6.5V8zm6 10.5H11V14h-1v3H8.5v-3h-1v4.5H6v-6h6.5v6zM13 8h3V7h-3V5.5h4.5V9h-3v1h3v1.5H13V8zm5 9h-3v1.5h-1.5v-6H18V17z\"/><path d=\"M15 14h1.5v1.5H15z\"/>")
      .name("Icon22mpSharp")
  }
}

export default Icon22mpSharp as any as Typed<DLightIconType>
