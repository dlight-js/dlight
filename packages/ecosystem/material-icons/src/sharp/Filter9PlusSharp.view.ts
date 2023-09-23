import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Filter9PlusSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 5H1v18h18v-2H3V5zm11 9V6H9v5h3v1H9v2h5zm-3-5V8h1v1h-1zm12-8H5v18h18V1zm-2 8h-2V7h-2v2h-2v2h2v2h2v-2h2v6H7V3h14v6z\"/>")
      .name("Filter9PlusSharp")
  }
}

export default Filter9PlusSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
