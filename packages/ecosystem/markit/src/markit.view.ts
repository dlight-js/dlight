import { View } from "@dlightjs/dlight"
import { Prop, required, type Typed, div, type Pretty } from "@dlightjs/types"
import BlockRenderer from "./blockView"
import { parse } from "@iandx/markit"

interface MarkitProps {
  _$content: any
  getAst: (data: any) => any
}
class MarkitView extends View implements MarkitProps {
  /** @prop */
  @Prop _$content = required
  @Prop getAst = undefined as any

  /** @reactive */
  markitAst: any = parse(this._$content)
  omitAst = this.getAst?.(this.markitAst)

  /** @view */
  Body() {
    div()
    {
      for (const ast of this.markitAst) {
        BlockRenderer[ast.type](ast.content)
          .props(ast.props)
      }
    }
  }
}

export default MarkitView as Pretty as Typed<MarkitProps>
