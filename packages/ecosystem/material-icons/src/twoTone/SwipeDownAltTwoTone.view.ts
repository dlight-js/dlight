import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SwipeDownAltTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"9\" r=\"3\" opacity=\".3\"/><path d=\"M13 13.9a5 5 0 1 0-2 0v4.27l-1.59-1.59L8 18l4 4 4-4-1.41-1.41L13 18.17V13.9zM15 9c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z\"/>")
      .name("SwipeDownAltTwoTone")
  }
}

export default SwipeDownAltTwoTone as any as Typed<DLightIconType>
