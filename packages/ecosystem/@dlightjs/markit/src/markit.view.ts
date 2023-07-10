import DLight, { type CustomNode, View } from "@dlightjs/dlight"
import { Prop, required, type Typed, type RequiredProp, div, h1 } from "@dlightjs/types"
import BlockRenderer from "./blockView"
import { parse } from "@iandx/markit"

class MarkitView extends View {
  /** @prop */
  @Prop _$content: RequiredProp<string> = required

  /** @reactive */
  markitAst: any = parse(this._$content)

  /** @member */

  /** @function */

  /** @lifecycle */
  didMount(_els: HTMLElement[], _node: CustomNode): void {
    console.log(this.markitAst)
  }

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
