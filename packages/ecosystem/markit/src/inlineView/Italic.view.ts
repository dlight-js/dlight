import { Prop, View, required, Content } from "@dlightjs/dlight"
import { em, type Typed, type Pretty, type ContentProp } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import InlineRenderer from "."

interface ItalicProps {
  ast: ContentProp<any>
}
@View
class Italic implements ItalicProps {
  @Prop @Content ast = required

  Body() {
    em()
      .className(this.dlightMarkitItalic$)
    {
      for (const content of this.ast) {
        InlineRenderer[content.type](content.content)
      }
    }
  }

  dlightMarkitItalic$ = css``
}

export default Italic as Pretty as Typed<ItalicProps>
