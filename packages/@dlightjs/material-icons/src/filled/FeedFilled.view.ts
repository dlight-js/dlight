import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FeedFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8l-5-5zM7 7h5v2H7V7zm10 10H7v-2h10v2zm0-4H7v-2h10v2zm-2-4V5l4 4h-4z\"/>")
      .name("FeedFilled")
  }
}

export default FeedFilled as any as Typed<DLightIconType>
