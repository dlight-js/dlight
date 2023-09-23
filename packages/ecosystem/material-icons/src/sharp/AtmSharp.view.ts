import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AtmSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 9v1.5h2.25V15h1.5v-4.5H14V9H8zM7 9H2v6h1.5v-1.5h2V15H7V9zm-1.5 3h-2v-1.5h2V12zM22 9h-6.5v6H17v-4.5h1V14h1.5v-3.51h1V15H22V9z\"/>")
      .name("AtmSharp")
  }
}

export default AtmSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
