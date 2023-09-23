import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FireHydrantAltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 11h-3V8h2V6h-2.35a5.99 5.99 0 0 0-11.3 0H4v2h2v3H3v6h3v3H4v2h16v-2h-2v-3h3v-6zm-9 6.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z\"/><circle cx=\"12\" cy=\"14\" r=\"1.5\"/>")
      .name("FireHydrantAltSharp")
  }
}

export default FireHydrantAltSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
