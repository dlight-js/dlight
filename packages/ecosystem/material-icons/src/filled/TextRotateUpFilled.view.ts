import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TextRotateUpFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 12v1.5l11 4.75v-2.1l-2.2-.9v-5l2.2-.9v-2.1L3 12zm7 2.62-5.02-1.87L10 10.88v3.74zm8-10.37-3 3h2v12.5h2V7.25h2l-3-3z\"/>")
      .name("TextRotateUpFilled")
  }
}

export default TextRotateUpFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
