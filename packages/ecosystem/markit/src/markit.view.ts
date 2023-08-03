import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, type Typed, type RequiredProp, div } from "@dlightjs/types"
import BlockRenderer from "./blockView"
import { parse } from "@iandx/markit"

class MarkitView extends View {
  /** @prop */
  @Prop _$content: RequiredProp<string> = required
  @Prop getAst: (data: any) => void = () => null

  /** @reactive */
  markitAst: any = parse(this._$content)

  /** @member */

  /** @function */

  /** @lifecycle */
  willMount() {
    if (this.getAst) {
      this.getAst(this.markitAst)
    }
  }

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

export default MarkitView as any as Typed<MarkitView>
