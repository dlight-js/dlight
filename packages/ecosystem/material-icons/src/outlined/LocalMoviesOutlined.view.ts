import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LocalMoviesOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 5v14h-4V5h4m6-2h-2v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3zm-4 6V7h2v2h-2zM6 9V7h2v2H6zm10 4v-2h2v2h-2zM6 13v-2h2v2H6zm10 4v-2h2v2h-2zM6 17v-2h2v2H6z\"/>")
      .name("LocalMoviesOutlined")
  }
}

export default LocalMoviesOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
