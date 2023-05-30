import { View } from "@dlightjs/dlight"
import { _, env, button, div, Prop, PropState, required, State, tag, html, h3 } from "@dlightjs/types"
import { css, styled } from "@dlightjs/emotion"
import { HStack } from "@dlightjs/components"
import { manual } from "@dlightjs/dlight/src"

async function sleep() {
  return await new Promise(res => setTimeout(res, 1000))
}

async function hh() {
  await sleep()

  return 100
}

const A = styled.div`
  color: ${({ count }) => count > 0 ? "red" : "blue"};
`
class MyComp2 extends View {
  count = 0
  @Prop a

  Body() {
    button("+")
      .onclick(() => {
        this.a++
      })
  }
}

function fetchData(loading = "loading", data = "data") {
  this[loading] = true
  setTimeout(() => {
    this[data] = 100
    this[loading] = false
  }, 700)
}

export class tt extends View {
  count = 0
  call = manual(() => {
    this.gg()
  }, [this.count])

  isLoading = false
  myData = "fuck"
  gg = fetchData.bind(this, "isLoading", "myData")

  willMount() {
    this.gg()
  }

  Body() {
    button("+")
      .onclick(() => {
        this.count++
      })
    if (this.isLoading) {
      "loading...."
    } else {
      div(this.myData)
    }
  }
}

function observe(el = "el", obj: any) {
  const callback = () => {
    for (const [key, value] of Object.entries(obj)) {
      this[value] = getComputedStyle(this[el])[key]
    }
  }
  callback()
  const observer = new MutationObserver(callback)

  observer.observe(this[el], {
    attributes: true
  })
}

export class TestView3 extends View {
  count = 0
  height = 100
  el?: HTMLElement

  didMount() {
    observe.call(this, "el", {
      height: "height"
    })
  }

  Body() {
    div(this.height)
    button("+")
      .onclick(() => {
        this.count++
      })
    button("-")
      .onclick(() => {
        this.count--
      })

    div(this.count)
      ._height(`${500 + this.count * 10}px`)
      .element(this.el)
      ._color(this.count > 0 ? "red" : "blue")
  }
}

export class TestView extends View {
  count = 0
  countPlus1 = this.count + 1

  Body() {
    button("hh")
      .onclick(() => {
        this.count++
        console.log(this.countPlus1)
      })
  }
}
