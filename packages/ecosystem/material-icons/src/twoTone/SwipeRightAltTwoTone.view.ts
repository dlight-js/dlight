import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SwipeRightAltTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"9\" cy=\"12\" r=\"3\" opacity=\".3\"/><path d=\"M13.9 11a5 5 0 1 0 0 2h4.27l-1.59 1.59L18 16l4-4-4-4-1.41 1.41L18.17 11H13.9zM9 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z\"/>")
      .name("SwipeRightAltTwoTone")
  }
}

export default SwipeRightAltTwoTone as any as Typed<DLightIconType>
