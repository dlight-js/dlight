import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SportsFootballSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3.02 15.62c-.08 2.42.32 4.34.67 4.69s2.28.76 4.69.67l-5.36-5.36zM13.08 3.28c-2.33.42-4.79 1.34-6.62 3.18s-2.76 4.29-3.18 6.62l7.63 7.63c2.34-.41 4.79-1.34 6.62-3.18s2.76-4.29 3.18-6.62l-7.63-7.63zM9.9 15.5l-1.4-1.4 5.6-5.6 1.4 1.4-5.6 5.6zm11.08-7.12c.08-2.42-.32-4.34-.67-4.69s-2.28-.76-4.69-.67l5.36 5.36z\"/>")
      .name("SportsFootballSharp")
  }
}

export default SportsFootballSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
