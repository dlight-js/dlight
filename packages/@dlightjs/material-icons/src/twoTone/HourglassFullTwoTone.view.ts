import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HourglassFullTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m8 7.5 4 4 4-4V4H8zm0 9V20h8v-3.5l-4-4z\" opacity=\".3\"/><path d=\"M18 2H6v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2zm-2 14.5V20H8v-3.5l4-4 4 4zm0-9-4 4-4-4V4h8v3.5z\"/>")
      .name("HourglassFullTwoTone")
  }
}

export default HourglassFullTwoTone as any as Typed<DLightIconType>
