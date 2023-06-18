import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BrowserUpdatedSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 13v5h-5l1 1v2H6v-2l1-1H2V3h10v2H4v11h16v-3h2zm-7 2-5-5h4V3h2v7h4l-5 5z\"/>")
      .name("BrowserUpdatedSharp")
  }
}

export default BrowserUpdatedSharp as any as Typed<DLightIconType>
