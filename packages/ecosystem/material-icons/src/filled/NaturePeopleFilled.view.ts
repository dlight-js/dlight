import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NaturePeopleFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22.17 9.17c0-3.87-3.13-7-7-7s-7 3.13-7 7A6.98 6.98 0 0 0 14 16.06V20H6v-3h1v-4c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v4h1v5h16v-2h-3v-3.88a7 7 0 0 0 6.17-6.95zM4.5 11c.83 0 1.5-.67 1.5-1.5S5.33 8 4.5 8 3 8.67 3 9.5 3.67 11 4.5 11z\"/>")
      .name("NaturePeopleFilled")
  }
}

export default NaturePeopleFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
