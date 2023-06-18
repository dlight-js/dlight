import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PriorityHighTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"19\" r=\"2\"/><path d=\"M10 3h4v12h-4z\"/>")
      .name("PriorityHighTwoTone")
  }
}

export default PriorityHighTwoTone as any as Typed<DLightIconType>
