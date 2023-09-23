import { View } from "@dlightjs/dlight"
import { Prop, required, em, type Typed, type Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "."

interface ItalicProps {
  _$content: any
}
class Italic extends View implements ItalicProps {
  @Prop _$content = required

  Body() {
    em()
      .className(this.dlightMarkitItalic$)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitItalic$ = css``
}

export default Italic as Pretty as Typed<ItalicProps>
