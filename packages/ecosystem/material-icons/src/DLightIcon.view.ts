import DLight, { View } from "@dlightjs/dlight"
import { Prop, type PartialPropWrapper, required, span, type Typed, type DLightHTMLAttributes } from "@dlightjs/types"

class DLightIcon extends View {
  @Prop content: Prop<string> = required
  @Prop name: Prop<string> = required
  /**
   * @default 24
   */
  @Prop width: Prop<number> = 24 as any
  /**
   * @default 24
   */
  @Prop height: Prop<number> = 24 as any
  @Prop color: Prop<string> = undefined as any
  @Prop opacity: Prop<string> = undefined as any
  /**
   * font-size
   */
  @Prop fontSize: Prop<string> = undefined as any

  _$forwardProps = true

  Body() {
    span()
      .className(`MUI-Icon-${this.name}`)
      .innerHTML(`<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}" viewBox="0 0 24 24"${this.color ? ` fill="${this.color}"` : ""}${this.opacity ? ` opacity="${this.opacity}"` : ""}${this.fontSize ? ` font-size="${this.fontSize}"` : ""}>${this.content}</svg>`)
      .forwardProps()
  }
}

export type DLightIconType = PartialPropWrapper<DLightHTMLAttributes<HTMLSpanElement, {}>> & Omit<DLightIcon, "content" | "name">

export default DLightIcon as any as Typed<DLightIcon>
