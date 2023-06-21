import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"

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

  Body() {
    span()
      .className(`MUI-Icon-${this.name}`)
      .innerHTML(`<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}" viewBox="0 0 24 24"${this.color ? ` fill="${this.color}"` : ""}${this.opacity ? ` opacity="${this.opacity}"` : ""}${this.fontSize ? ` font-size="${this.fontSize}"` : ""}>${this.content}</svg>`)
  }
}

export type DLightIconType = Omit<DLightIcon, "content" | "name">

export default DLightIcon as any as Typed<DLightIcon>
