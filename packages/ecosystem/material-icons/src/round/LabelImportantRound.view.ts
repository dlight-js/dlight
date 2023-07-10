import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LabelImportantRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5.94 18.99H15c.65 0 1.26-.31 1.63-.84l3.95-5.57a.99.99 0 0 0 0-1.16l-3.96-5.58A1.95 1.95 0 0 0 15 5H5.94c-.81 0-1.28.93-.81 1.59L9 12l-3.87 5.41c-.47.66 0 1.58.81 1.58z\"/>")
      .name("LabelImportantRound")
  }
}

export default LabelImportantRound as any as Typed<DLightIconType>
