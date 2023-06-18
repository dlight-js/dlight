import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewCompactAltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2v16h20V4zM11.5 16.5h-4v-4h4v4zm0-5h-4v-4h4v4zm5 5h-4v-4h4v4zm0-5h-4v-4h4v4z\"/>")
      .name("ViewCompactAltSharp")
  }
}

export default ViewCompactAltSharp as any as Typed<DLightIconType>
