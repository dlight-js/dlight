import { View } from "@dlightjs/dlight"
import { type Typed, _, Prop, type Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface TransitionProps {
  duration?: number
  easing?: string
  delay?: number
}

class Transition extends View implements TransitionProps {
  @Prop duration = 0.5
  @Prop easing = "ease-in-out"
  @Prop delay = 0

  Body() {
    _(this._$children)
      .className(css`
        transition: all ${this.duration}s ${this.easing} ${this.delay}s;
      `)
  }
}

export default Transition as Pretty as Typed<TransitionProps>
