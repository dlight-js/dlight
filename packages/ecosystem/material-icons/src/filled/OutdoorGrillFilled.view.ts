import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class OutdoorGrillFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 22c1.66 0 3-1.34 3-3s-1.34-3-3-3c-1.3 0-2.4.84-2.82 2H9.14l1.99-3.06a6.36 6.36 0 0 0 1.74 0l1.02 1.57c.42-.53.96-.95 1.6-1.21l-.6-.93A6.992 6.992 0 0 0 19 8H5c0 2.84 1.69 5.27 4.12 6.37l-3.95 6.08a1 1 0 0 0 .29 1.38 1 1 0 0 0 1.38-.29l1-1.55h6.34C14.6 21.16 15.7 22 17 22zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9.41 7h1c.15-1.15.23-1.64-.89-2.96-.42-.5-.68-.77-.46-2.04h-.99c-.21 1.11.03 2.05.89 2.96.22.24.79.67.45 2.04zm2.48 0h1c.15-1.15.23-1.64-.89-2.96-.42-.5-.68-.78-.46-2.04h-.99c-.21 1.11.03 2.05.89 2.96.23.24.8.67.45 2.04zm2.52 0h1c.15-1.15.23-1.64-.89-2.96-.42-.5-.68-.77-.46-2.04h-.99c-.21 1.11.03 2.05.89 2.96.22.24.79.67.45 2.04z\"/>")
      .name("OutdoorGrillFilled")
  }
}

export default OutdoorGrillFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
