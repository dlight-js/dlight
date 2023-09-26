import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HtmlSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3.5 9H5v6H3.5v-2.5h-2V15H0V9h1.5v2h2V9zm15 0H12v6h1.5v-4.5h1V14H16v-3.51h1V15h1.5V9zM11 9H6v1.5h1.75V15h1.5v-4.5H11V9zm13 6v-1.5h-2.5V9H20v6h4z\"/>")
      .name("HtmlSharp")
  }
}

export default HtmlSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
