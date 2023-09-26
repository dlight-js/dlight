import { Prop, required, View, Content } from "@dlightjs/dlight"
import { type ContentProp, div, type Pretty, type Typed } from "@dlightjs/types"
import InlineRenderer from "../inlineView"

interface CodeBlockProps {
  ast: ContentProp<any>
  props: any
}

@View
class CodeBlock implements CodeBlockProps {
  @Prop @Content ast = required

  @Prop props = required
  language = this.props.language

  Body() {
    div()
    {
      InlineRenderer.Text(this.ast)
    }
  }
}

export default CodeBlock as Pretty as Typed<CodeBlockProps>
