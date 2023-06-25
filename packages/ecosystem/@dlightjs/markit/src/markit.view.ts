import DLight, { type CustomNode, View } from "@dlightjs/dlight"
import { Prop, required, type Typed, type RequiredProp, button } from "@dlightjs/types"
import BlockRenderer from "./BlockView"
import { parse } from "@iandx/markit"

class MarkitView extends View {
  /** @prop */
  @Prop _$content: RequiredProp<string> = required

  /** @reactive */
  markitAst: any[] = []

  /** @member */

  /** @function */

  /** @lifecycle */
  didMount(_els: HTMLElement[], _node: CustomNode): void {
    this.markitAst = parse(this._$content)
    console.log(this.markitAst)
  }

  /** @view */
  Body() {
    for (const ast of this.markitAst) {
      BlockRenderer[ast.type](ast.content)
        .props(ast.props)
    }
  }
}

export default MarkitView as any as Typed<MarkitView>
