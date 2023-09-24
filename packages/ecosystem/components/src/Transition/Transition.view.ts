import { Children, type DLNode, View, required, Prop } from "@dlightjs/dlight"
import { type Typed, _, type Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface TransitionProps {
  duration?: number
  easing?: string
  delay?: number
}

@View
class Transition implements TransitionProps {
  @Prop duration = 0.5
  @Prop easing = "ease-in-out"
  @Prop delay = 0
  @Children children: DLNode[] = required

  Body() {
    _(this.children)
      .className(css`
        transition: all ${this.duration}s ${this.easing} ${this.delay}s;
      `)
  }
}

export default Transition as Pretty as Typed<TransitionProps>
