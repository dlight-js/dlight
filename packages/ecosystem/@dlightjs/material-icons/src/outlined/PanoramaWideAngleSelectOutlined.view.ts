import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PanoramaWideAngleSelectOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 4c-3.97 0-6.85.63-9 1-.55 1.97-1 3.92-1 7 0 3.03.45 5.05 1 7 2.15.37 4.98 1 9 1 3.97 0 6.85-.63 9-1 .57-2.02 1-3.99 1-7 0-3.03-.45-5.05-1-7-2.15-.37-4.98-1-9-1z\"/>")
      .name("PanoramaWideAngleSelectOutlined")
  }
}

export default PanoramaWideAngleSelectOutlined as any as Typed<DLightIconType>
