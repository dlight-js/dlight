import { View } from "@dlightjs/dlight"
import { div, type Pretty, Prop, required, type Typed } from "@dlightjs/types"
import InlineRenderer from "../inlineView"

interface CodeBlockProps {
  _$content: any
  props: any
}

class CodeBlock extends View implements CodeBlockProps {
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

export default CodeBlock as Pretty as Typed<CodeBlockProps>
