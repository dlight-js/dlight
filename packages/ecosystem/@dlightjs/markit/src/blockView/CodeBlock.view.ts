import DLight, { View } from "@dlightjs/dlight"
import { div, Prop, required, type Typed } from "@dlightjs/types"
import InlineRenderer from "../inlineView"

class CodeBlock extends View {
  @Prop _$content = required
  @Prop props = required
  language = this.props.language

  Body() {
    div()
    {
      InlineRenderer.Text(this._$content)
    }
  }
}

export default CodeBlock as any as Typed<CodeBlock>
