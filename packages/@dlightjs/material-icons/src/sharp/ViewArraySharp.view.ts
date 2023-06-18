import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewArraySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 5h-3v14h3V5zm-4 0H7v14h10V5zM6 5H3v14h3V5z\"/>")
      .name("ViewArraySharp")
  }
}

export default ViewArraySharp as any as Typed<DLightIconType>
