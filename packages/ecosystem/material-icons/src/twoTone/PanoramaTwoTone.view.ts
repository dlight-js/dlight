import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PanoramaTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 18h18V6H3v12zm5.5-5.5 2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z\" opacity=\".3\"/><path d=\"M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12zm-6.5-7L11 15.51 8.5 12.5 5 17h14z\"/>")
      .name("PanoramaTwoTone")
  }
}

export default PanoramaTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
