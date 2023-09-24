import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NewLabelFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m21 12-4.37 6.16c-.37.52-.98.84-1.63.84h-3v-6H9v-3H3V7c0-1.1.9-2 2-2h10c.65 0 1.26.31 1.63.84L21 12zm-11 3H7v-3H5v3H2v2h3v3h2v-3h3v-2z\"/>")
      .name("NewLabelFilled")
  }
}

export default NewLabelFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
