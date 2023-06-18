import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class QuestionAnswerSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 6h-3v9H6v3h12l4 4V6zm-5 7V2H2v15l4-4h11z\"/>")
      .name("QuestionAnswerSharp")
  }
}

export default QuestionAnswerSharp as any as Typed<DLightIconType>
