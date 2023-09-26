import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HolidayVillageOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m8 4-6 6v10h12V10L8 4zm4 14H9v-3H7v3H4v-7.17l4-4 4 4V18zm-3-5H7v-2h2v2zm9 7V8.35L13.65 4h-2.83L16 9.18V20h2zm4 0V6.69L19.31 4h-2.83L20 7.52V20h2z\"/>")
      .name("HolidayVillageOutlined")
  }
}

export default HolidayVillageOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
