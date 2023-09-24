import { Prop, View, required, Content } from "@dlightjs/dlight"
import { sup, a, type Typed, type Pretty, type ContentProp } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface FootnoteSupProps {
  ast: ContentProp<any>
  props: any
}
@View
class FootnoteSup implements FootnoteSupProps {
  @Prop @Content ast = required

  @Prop props = required
  footnoteSupId = this.props.footnoteSupId

  Body() {
    a()
      .href(`#Markit-Footnote-${this.ast}-0`)
      .className(this.dlightMarkitFootnoteSup$)
    {
      sup(this.ast)
        .id(`Markit-FootnoteSup-${this.ast}-${this.footnoteSupId}`)
        .className(this.dlightMarkitFootnoteSupSup$)
    }
  }

  dlightMarkitFootnoteSup$ = css`
    color: gray;
    text-decoration: none;
  `

  dlightMarkitFootnoteSupSup$ = css``
}

export default FootnoteSup as Pretty as Typed<FootnoteSupProps>
