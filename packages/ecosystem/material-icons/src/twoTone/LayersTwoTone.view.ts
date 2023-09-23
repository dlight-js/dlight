import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LayersTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6.26 9 12 13.47 17.74 9 12 4.53z\" opacity=\".3\"/><path d=\"m19.37 12.8-7.38 5.74-7.37-5.73L3 14.07l9 7 9-7zM12 2 3 9l1.63 1.27L12 16l7.36-5.73L21 9l-9-7zm0 11.47L6.26 9 12 4.53 17.74 9 12 13.47z\"/>")
      .name("LayersTwoTone")
  }
}

export default LayersTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
