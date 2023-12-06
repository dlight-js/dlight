import { render } from "@dlightjs/dlight"
import App from "./App.view"
import Main from "./benchmark-keyed.view"

import * as babel from "@babel/standalone"
import dlight from "babel-preset-dlight"

render("app", Main)

export default function transformDLight(code: string) {
  return babel.transform(code, {
    presets: [[dlight, { files: "*" }]]
  }).code
}

const a = transformDLight(`
import { View } from "@dlightjs/dlight"

@View
export default class App {
  count = 1
  toggle = false

  shit = {
    ok: true,
    aa: 100,
    str: "jjjj"
  }

  jj = [1, 2, 3]

  el
  didMount() {
    console.log("shit", this.el)
  }

  @View
  Shit({ ok, content }) {
    div(content)
    div(ok)
  }

  Body() {
    div(this.shit.aa)
    div(String(this.shit.ok))
    div(this.shit.str)

    div("------- above shit ---------")
    div(this.count)
    button("+")
      .onclick(() => {
        this.count++
      })
      .element((el) => {
        console.log(el)
      })

    if (this.toggle) {
      div("okkk")
    } else {
      div("not ok")
        .style({
          color: "red"
        })
    }
  }
}

`)

console.log(a)
