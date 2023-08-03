import { View } from "@dlightjs/dlight"
import { Prop, required, table, th, tr, td, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import InlineRenderer from "../inlineView"

class Table extends View {
  @Prop _$content = required
  @Prop props = required
  headerAligns = this.props.headerAligns
  rowAligns = this.props.rowAligns

  Body() {
    table()
      .className(this.dlightMarkitTableStyle)
    {
      tr()
        .className(this.dlightMarkitTableTrStyle)
      {
        for (const [index, headerColumn] of this._$content[0].entries()) {
          for (const { type, content, props } of headerColumn) {
            th()
              .className(this.dlightMarkitTableThStyle(this.headerAligns[index]))
            {
              InlineRenderer[type](content)
                .props(props)
            }
          }
        }
      }
      for (const cellRow of this._$content.slice(1)) {
        tr()
          .className(this.dlightMarkitTableTrStyle)
        {
          for (const [index, cellColumn] of cellRow.entries()) {
            for (const { type, content, props } of cellColumn) {
              td()
                .className(this.dlightMarkitTableTdStyle(this.rowAligns[index]))
              {
                if (type) {
                  InlineRenderer[type](content)
                    .props(props)
                }
              }
            }
          }
        }
      }
    }
  }

  dlightMarkitTableStyle = css`
    border-collapse: collapse;
  `

  dlightMarkitTableTrStyle = css``

  dlightMarkitTableThStyle = (align: string) => css`
    border: solid 1px gray;
    padding: 5px;
    text-align: ${align};
  `

  dlightMarkitTableTdStyle = (align: string) => css`
    border: solid 1px gray;
    padding: 5px;
    text-align: ${align};
  `
}

export default Table as any as Typed<Table>
