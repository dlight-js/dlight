import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SchemaSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 9v2h-3V9H8.5V7H11V1H4v6h2.5v2H4v6h2.5v2H4v6h7v-6H8.5v-2H11v-2h3v2h7V9h-7z\"/>")
      .name("SchemaSharp")
  }
}

export default SchemaSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
