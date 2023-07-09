import DLight, { View } from "@dlightjs/dlight"
import { div, htmlTag, Prop, required, type Typed } from "@dlightjs/types"
import InlineRenderer from "../InlineView"

class CodeBlock extends View {
  @Prop _$content = required
  @Prop props = required
  language = this.props.language

  Body() {
  }
}

export default CodeBlock as any as Typed<CodeBlock>
