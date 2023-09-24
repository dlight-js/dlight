import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TextureSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.66 3 3.07 19.59V21h1.41L21.07 4.42V3zm-7.71 0-8.88 8.88v2.83L14.78 3zM3.07 3v4l4-4zm18 18v-4l-4 4zm-8.88 0 8.88-8.88V9.29L9.36 21z\"/>")
      .name("TextureSharp")
  }
}

export default TextureSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
