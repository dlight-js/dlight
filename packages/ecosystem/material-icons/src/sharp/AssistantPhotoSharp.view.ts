import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AssistantPhotoSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.4 6 14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z\"/>")
      .name("AssistantPhotoSharp")
  }
}

export default AssistantPhotoSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
