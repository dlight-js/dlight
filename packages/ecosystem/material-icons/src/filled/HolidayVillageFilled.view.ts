import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HolidayVillageFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 20V8.35L13.65 4h-2.83L16 9.18V20h2zm4 0V6.69L19.31 4h-2.83L20 7.52V20h2zM8 4l-6 6v10h5v-5h2v5h5V10L8 4zm1 9H7v-2h2v2z\"/>")
      .name("HolidayVillageFilled")
  }
}

export default HolidayVillageFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
