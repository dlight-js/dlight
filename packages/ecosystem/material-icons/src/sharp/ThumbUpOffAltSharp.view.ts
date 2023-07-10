import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ThumbUpOffAltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.17 1 7 8.18V21h12.31L23 12.4V8h-8.31l1.12-5.38L14.17 1zM1 9h4v12H1V9z\"/>")
      .name("ThumbUpOffAltSharp")
  }
}

export default ThumbUpOffAltSharp as any as Typed<DLightIconType>
