import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AppRegistrationSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 4h4v4h-4zM4 16h4v4H4zm0-6h4v4H4zm0-6h4v4H4zm12 0h4v4h-4zm-5 13.86V20h2.1l5.98-5.97-2.12-2.12zm3-5.83V10h-4v4h2.03zm3.671-.824 1.415-1.414 2.12 2.12-1.413 1.415z\"/>")
      .name("AppRegistrationSharp")
  }
}

export default AppRegistrationSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
