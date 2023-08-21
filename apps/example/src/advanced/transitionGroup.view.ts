// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { TransitionGroup } from "@dlightjs/components"
import { button, div } from "@dlightjs/types"

let i = 0
function getData(text: string) {
  return {
    id: Math.random() + i++,
    text
  }
}
export default class TransitionTest extends View {
  list = [
    getData("First one"),
    getData("II 222"),
    getData("333333 okk"),
    getData("This is four"),
    getData("555555!!")
  ]

  remove() {
    this.list.splice(Math.floor(Math.random() * (this.list.length - 1)), 1)
    this.list = [...this.list]
  }

  add() {
    this.list.splice(Math.floor(Math.random() * (this.list.length - 1)), 0, getData(`---${this.list.length}`))
    this.list = [...this.list]
  }

  shuffle() {
    let newList = this.list
    while (JSON.stringify(newList) === JSON.stringify(this.list)) {
      newList = this.list
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    }
    console.log(this.list.map(i => i.text), newList.map(i => i.text))
    this.list = [...newList]
  }

  length = 100
  toggle = true

  Body() {
    button("shuffle")
      .onclick(() => {
        this.shuffle()
      })
    button("toggle")
      .onclick(() => {
        this.toggle = !this.toggle
      })
    button("remove")
      .onclick(() => {
        this.remove()
      })
    button("add")
      .onclick(() => {
        this.add()
      })
    button("+")
      .onclick(() => {
        this.length += 50
      })
    button("-")
      .onclick(() => {
        this.length -= 50
      })
    div("hello")
      .style({
        backgroundColor: "black",
        width: "100px",
        height: "100px"
      })
    if (this.toggle) {
      TransitionGroup()
        .duration(1)
        .delay({
          firstAppear: (el) => {
            return +(el.dataset.index ?? 0) * 0.7
          }
        })
        .appearWith((el) => ({
          opacity: 0,
          backgroundColor: "yellow",
          transform: `translateX(${40 + 80 * +(el.dataset.index ?? 0)}px)`
        }))
        .disappearWith({
          opacity: 0,
          transform: "translateX(100px)",
          backgroundColor: "yellow"
        })
      {
        for (const [idx, ok] of Object.entries(this.list)) {
          [ok.id]
          div(ok.text)
            .willAppear((el) => {
              if (el) el.dataset.index = idx
            })
            .style({
              width: `${this.length}px`,
              marginTop: "10px",
              backgroundColor: this.toggle ? "blue" : "red"
            })
        }
      }
      div("hello")
        .style({
          backgroundColor: "black",
          width: "100px",
          height: "100px"
        })
    }
  }
}
