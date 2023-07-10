import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SkipPreviousTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 14.14V9.86L12.97 12z\" opacity=\".3\"/><path d=\"M6 6h2v12H6zm12 12V6l-8.5 6 8.5 6zm-2-3.86L12.97 12 16 9.86v4.28z\"/>")
      .name("SkipPreviousTwoTone")
  }
}

export default SkipPreviousTwoTone as any as Typed<DLightIconType>
