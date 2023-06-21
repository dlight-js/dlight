import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SubdirectoryArrowRightTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m19 15-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z\"/>")
      .name("SubdirectoryArrowRightTwoTone")
  }
}

export default SubdirectoryArrowRightTwoTone as any as Typed<DLightIconType>
