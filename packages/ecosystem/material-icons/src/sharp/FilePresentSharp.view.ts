import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FilePresentSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 2H4v20h16V8l-6-6zm2 13c0 2.21-1.79 4-4 4s-4-1.79-4-4V9.5a2.5 2.5 0 0 1 5 0V15h-2V9.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V15c0 1.1.9 2 2 2s2-.9 2-2v-4h2v4zm-2-7V4l4 4h-4z\"/>")
      .name("FilePresentSharp")
  }
}

export default FilePresentSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
