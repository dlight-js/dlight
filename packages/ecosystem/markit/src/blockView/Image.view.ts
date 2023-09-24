import { Prop, required, View, Content } from "@dlightjs/dlight"
import { a, type ContentProp, div, img, type Pretty, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface ImageProps {
  ast: ContentProp<any>
  props: any
}
@View
class Image implements ImageProps {
  @Prop @Content ast = required

  @Prop props = required
  imageUrl = this.props.imageUrl
  alt = this.props.altContent
  title = this.props.title
  zoomSize = this.props.zoomSize
  alignment = this.props.alignment
  linkUrl = this.props.linkUrl

  margins = {
    left: "0px auto 0px 0px",
    center: "0px auto",
    right: "0px 0px 0px auto"
  }

  Body() {
    div()
      .className(this.dlightMarkitImageDiv$(this.alignment))
    {
      if (this.linkUrl) {
        a()
          .href(this.linkUrl)
          .className(this.dlightMarkitImageA$)
        {
          img()
            .src(this.imageUrl)
            .alt(this.alt)
            .title(this.title)
            .className(this.dlightMarkitImage$)
        }
      } else {
        img()
          .src(this.imageUrl)
          .alt(this.alt)
          .title(this.title)
          .className(this.dlightMarkitImage$)
      }
    }
  }

  dlightMarkitImageDiv$ = (marginType: "left" | "center" | "right") => css`
    margin: ${this.margins[marginType]};
    width: ${this.zoomSize};
    height: ${this.zoomSize};
  `

  dlightMarkitImage$ = css`
    width: 100%;
  `

  dlightMarkitImageA$ = css``
}

export default Image as Pretty as Typed<ImageProps>
