import DLight, { type CustomNode, View } from "@dlightjs/dlight"
import { Prop, required, type Typed, type RequiredProp, button, div, h1 } from "@dlightjs/types"
import BlockRenderer from "./BlockView"
import { parse } from "@iandx/markit"
import { css } from "@iandx/easy-css"

class MarkitView extends View {
  /** @prop */
  @Prop _$content: RequiredProp<string> = required

  /** @reactive */
  markitAst: any[] = []

  /** @member */

  /** @function */

  /** @lifecycle */

  /** @view */
  Body() {
    h1("fashengleshenm")
    div()
    {
      for (const ast of this.markitAst) {
        BlockRenderer[ast.type](ast.content)
        
          .props(ast.props)
      }
    }
  }
}

export default MarkitView as any as Typed<MarkitView>
