import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NextWeekSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 7h-6V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H2v15h20V7zM10 5h4v2h-4V5zm1 13.5-1-1 3-3-3-3 1-1 4 4-4 4z\"/>")
      .name("NextWeekSharp")
  }
}

export default NextWeekSharp as any as Typed<DLightIconType>
