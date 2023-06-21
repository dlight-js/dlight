import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ExposureNeg1Round extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1zm15 6h-2V7.38L14 8.4V6.7L18.7 5h.3v13z\"/>")
      .name("ExposureNeg1Round")
  }
}

export default ExposureNeg1Round as any as Typed<DLightIconType>
