import { View } from "@dlightjs/dlight"
import { div, button, span } from "@dlightjs/types"

function observe(elKey = "el", styleKeyMap: Record<string, string>) {
  if (!this[elKey]) return
  const el = this[elKey] as HTMLElement
  const callback = () => {
    for (const [key, value] of Object.entries(styleKeyMap)) {
      if (!(value in this)) continue
      this[value] = getComputedStyle(el)[key as any]
    }
  }
  callback()
  const observer = new MutationObserver(callback)

  observer.observe(el, {
    attributes: true
  })
}

class ObserveElementView extends View {
  count = 0
  width1?: number
  el?: HTMLElement

  didMount() {
    observe.call(this, "el", {
      width: "width1"
    })
  }

  Body() {
    div()
    {
      "The div's current width is "
      span(this.width1)
        ._color("blue")
    }
    button("+ 50px")
      .onclick(() => {
        this.count++
      })
    button("- 50px")
      .onclick(() => {
        this.count--
      })

    div()
      .element(this.el)
      ._height("60px")
      ._width(`${200 + this.count * 50}px`)
      ._backgroundColor("red")
  }
}

export default ObserveElementView
