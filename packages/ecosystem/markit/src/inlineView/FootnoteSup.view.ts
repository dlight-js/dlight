import { View } from "@dlightjs/dlight"
import { Prop, required, sup, a, type Typed, type Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface FootnoteSupProps {
  _$content: any
  props: any
}
class FootnoteSup extends View implements FootnoteSupProps {
  @Prop _$content = required
  @Prop props = required
  footnoteSupId = this.props.footnoteSupId

  Body() {
    a()
      .href(`#Markit-Footnote-${this._$content}-0`)
      .className(this.dlightMarkitFootnoteSup$)
    {
      sup(this._$content)
        .id(`Markit-FootnoteSup-${this._$content}-${this.footnoteSupId}`)
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
