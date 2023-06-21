import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CompareRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1zm0 15H5l5-6v6zm9-15h-5v2h4c.55 0 1 .45 1 1v12l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\"/>")
      .name("CompareRound")
  }
}

export default CompareRound as any as Typed<DLightIconType>
