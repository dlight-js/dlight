import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BrokenImageSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3v8.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V3h18zm-3 8.42 3 3.01V21H3v-8.58l3 2.99 4-4 4 4 4-3.99z\"/>")
      .name("BrokenImageSharp")
  }
}

export default BrokenImageSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
