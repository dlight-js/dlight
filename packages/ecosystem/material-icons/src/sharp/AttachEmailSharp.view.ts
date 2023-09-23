import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AttachEmailSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 10V2H1v16h13v-5c0-1.66 1.34-3 3-3h4zm-10 1L3 6V4l8 5 8-5v2l-8 5z\"/><path d=\"M21 14v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4.5c0-.28.22-.5.5-.5s.5.22.5.5V18h2v-4.5a2.5 2.5 0 0 0-5 0V18c0 2.21 1.79 4 4 4s4-1.79 4-4v-4h-2z\"/>")
      .name("AttachEmailSharp")
  }
}

export default AttachEmailSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
