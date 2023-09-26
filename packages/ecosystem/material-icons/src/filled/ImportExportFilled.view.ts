import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ImportExportFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 3 5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z\"/>")
      .name("ImportExportFilled")
  }
}

export default ImportExportFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
