import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MovingFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.71 9.71 22 12V6h-6l2.29 2.29-4.17 4.17a.996.996 0 0 1-1.41 0l-1.17-1.17a3 3 0 0 0-4.24 0L2 16.59 3.41 18l5.29-5.29a.996.996 0 0 1 1.41 0l1.17 1.17a3 3 0 0 0 4.24 0l4.19-4.17z\"/>")
      .name("MovingFilled")
  }
}

export default MovingFilled as any as Typed<DLightIconType>
