import { View } from "@dlightjs/dlight"
import { a, div, type Pretty, Prop, required, span, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import Markit from "@iandx/markit"
import InlineRenderer from "../inlineView"

interface FootnoteProps {
  _$content: any
  props: any
}
class Footnote extends View implements FootnoteProps {
  @Prop _$content = required
  @Prop props = required
  noteName = this.props.noteName
  footnoteIdx = this.props.footnoteIdx
  rerender = this.props.rerender
  elementOrder = this.props.elementOrder

  footNoteSubTrees: any = Markit.ast
    .findInlineItems("FootnoteSup", footnoteSup => footnoteSup.content === this.noteName)

  Body() {
    div()
      .id(`Markit-Footnote-${this.noteName}-${this.footnoteIdx}`)
      .className(this.dlightMarkitFootNoteWrap$)
    {
      span(`[${this.noteName}] `)
        .className(this.dlightMarkitNoteName$)
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
      for (const footnoteSup of this.footNoteSubTrees) {
        a("↩")
          .href(`#Markit-FootnoteSup-${this.noteName}-${footnoteSup.props.footnoteSupId}`)
          .className(this.dlightMarkitFootNote$)
      }
    }
  }

  dlightMarkitFootNoteWrap$ = css`
    font-size: small;
  `

  dlightMarkitNoteName$ = css`
    white-space: pre-wrap;
  `

  dlightMarkitFootNote$ = css`
      text-decoration: none;
      color: gray;
  `
}

export default Footnote as Pretty as Typed<FootnoteProps>
