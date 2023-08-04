import { View } from "@dlightjs/dlight"
import { a, div, img, Prop, required, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"

class Image extends View {
  @Prop _$content = required
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

export default Image as any as Typed<Image>
