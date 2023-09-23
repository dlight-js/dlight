import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SchemaRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 10.5v.5h-3v-.5c0-.83-.67-1.5-1.5-1.5h-1V7h1c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-4C4.67 1 4 1.67 4 2.5v3C4 6.33 4.67 7 5.5 7h1v2h-1C4.67 9 4 9.67 4 10.5v3c0 .83.67 1.5 1.5 1.5h1v2h-1c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5h4c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-1v-2h1c.83 0 1.5-.67 1.5-1.5V13h3v.5c0 .83.67 1.5 1.5 1.5h4c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-4c-.83 0-1.5.67-1.5 1.5z\"/>")
      .name("SchemaRound")
  }
}

export default SchemaRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
