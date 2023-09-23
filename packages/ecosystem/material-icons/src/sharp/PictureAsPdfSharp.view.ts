import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PictureAsPdfSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H6v16h16V2zm-10.5 9H9v2H7.5V7h4v4zm5 .5c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v16h16v-2H4V6zm10 5.5h1v-3h-1v3z\"/>")
      .name("PictureAsPdfSharp")
  }
}

export default PictureAsPdfSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
