import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Man4Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7.96 7 10 22h4l2.04-15z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("Man4Sharp")
  }
}

export default Man4Sharp as any as Typed<DLightIconType>
