import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NetworkWifi3BarFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4zM2.92 9.07C5.51 7.08 8.67 6 12 6s6.49 1.08 9.08 3.07l-2.85 2.86A10.945 10.945 0 0 0 12 10c-2.31 0-4.46.71-6.23 1.93L2.92 9.07z\"/>")
      .name("NetworkWifi3BarFilled")
  }
}

export default NetworkWifi3BarFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
