import { View } from "@dlightjs/dlight"
import { type Typed, _, Prop } from "@dlightjs/types"
import { css } from "@dlightjs/emotion"

class Transition extends View {
  @Prop duration: Prop<number> = 0.5 as any
  @Prop easing: Prop<string> = "ease-in-out" as any
  @Prop delay: Prop<number> = 0 as any

  Body() {
    _(this._$children)
      .className(css`
        transition: all ${this.duration}s ${this.easing} ${this.delay}s;
      `)
  }
}

export default Transition as any as Typed<Transition>
