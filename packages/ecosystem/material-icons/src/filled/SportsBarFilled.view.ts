import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SportsBarFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 9h-1.56c.35-.59.56-1.27.56-2 0-2.21-1.79-4-4-4-.34 0-.66.05-.98.13A4.707 4.707 0 0 0 10 2.02c-1.89 0-3.51 1.11-4.27 2.71C4.15 5.26 3 6.74 3 8.5c0 1.86 1.28 3.41 3 3.86V21h11v-2h2c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zM7 10.5c-1.1 0-2-.9-2-2 0-.85.55-1.6 1.37-1.88l.8-.27.36-.76C8 4.62 8.94 4.02 10 4.02c.79 0 1.39.35 1.74.65l.78.65S13.16 5 13.99 5c1.1 0 2 .9 2 2h-3C9.67 7 9.15 10.5 7 10.5zM19 17h-2v-6h2v6z\"/>")
      .name("SportsBarFilled")
  }
}

export default SportsBarFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
