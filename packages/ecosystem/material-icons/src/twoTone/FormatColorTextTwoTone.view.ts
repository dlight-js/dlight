import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FormatColorTextTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 20h20v4H2v-4zm3.49-3h2.42l1.27-3.58h5.65L16.09 17h2.42L13.25 3h-2.5L5.49 17zm4.42-5.61 2.03-5.79h.12l2.03 5.79H9.91z\"/>")
      .name("FormatColorTextTwoTone")
  }
}

export default FormatColorTextTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
