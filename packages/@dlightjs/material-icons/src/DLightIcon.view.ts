import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"

class DLightIconClass extends View {
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
  /**
   * @default 0 0 24 24
   */
  @Prop viewBox: Prop<string> = "0 0 24 24" as any
  @Prop opacity: Prop<string> = undefined as any
  /**
   * font-size
   */
  @Prop fontSize: Prop<string> = undefined as any

  Body() {
    span()
      .className(`MUI-Icon-${this.name}`)
      .innerHTML(`<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}" viewBox="${this.viewBox}"${this.opacity ? ` opacity="${this.opacity}"` : ""}${this.fontSize ? ` font-size="${this.fontSize}"` : ""}>${this.content}</svg>`)
  }
}

export type DLightIconType = Omit<DLightIconClass, "content" | "name">

export default DLightIconClass as any as Typed<DLightIconClass>
