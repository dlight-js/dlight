import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatIndentDecreaseTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 16V8l-4 4zm4-9h10v2H11zm0 4h10v2H11zm0 4h10v2H11zm-8 4h18v2H3zM3 3h18v2H3z\"/>")
      .name("FormatIndentDecreaseTwoTone")
  }
}

export default FormatIndentDecreaseTwoTone as any as Typed<DLightIconType>
