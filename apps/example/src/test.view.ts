import { HStack } from "@dlightjs/components"
import DLight, { View, $, type CustomNode } from "@dlightjs/dlight"
import { styled } from "@dlightjs/emotion"
import { path, required, span, svg } from "@dlightjs/types"
import { div, Prop, type Typed, _, button, SubView } from "@dlightjs/types"
import { transformWithEsbuild } from "vite"
import { DLightIcon, DLightIconType, HelpOutlineOutlined } from "@dlightjs/material-icons"

export type OnDragFunc = (x: number, y: number) => void
export type DragAxis = "x" | "y" | "all"

class TT extends View {
  @Prop _$content

  count = 1
  @Prop hh: Prop<string> = "" as any

  didMount(_els: HTMLElement[], _node: CustomNode): void {
    this._$el = this._$el[0]
  }

  Body() {
    div(this.count)
    div(this._$content)
  }
}

const MyDiv = styled.div`
  color: red;
`
// <svg width="129" height="128" viewBox="0 0 129 128" fill="none" xmlns="http://www.w3.org/2000/svg">
// </svg>

class Logo extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .content(`<circle cx="11.539" cy="56.5114" r="11.539" fill="#F1D6A0"/>
    <circle cx="11.539" cy="106.809" r="11.539" fill="#BAE291"/>
    <circle cx="62.7245" cy="118.201" r="9.46788" fill="#FABE8E"/>
    <circle cx="53.2569" cy="9.46788" r="9.46788" fill="#FABE8E"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M43.7891 9.46776C43.7891 9.4678 43.7891 9.46784 43.7891 9.46788L43.7891 80.477C43.7891 85.7059 48.028 89.9449 53.2569 89.9449C58.4859 89.9449 62.7248 85.7059 62.7248 80.477L62.7248 9.46788C62.7248 4.23891 58.4859 -2.28567e-07 53.2569 0C53.2569 0 53.2569 0 53.2569 0V9.46776H43.7891Z" fill="#FABE8E"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M43.7888 0H43.7891V9.46783H53.257V0H61.9684C98.4727 0 129 28.0799 129 63.839C129 99.3508 98.8933 127.289 62.7246 127.674V108.737C89.4376 108.357 110.064 87.9099 110.064 63.839C110.064 39.5414 89.0473 18.9358 61.9684 18.9358H43.7888V0Z" fill="#FABE8E"/>
    `)
      .viewBox("0 0 129 128")
      .forwardProps(true)
      .name("Logo")
  }
}

class TestView extends View {
  a = [
    {
      name: {
        first: "yihan",
        last: "duan"
      }
    }
  ]

  /** @view */
  Body() {
    // HelpOutlineOutlined()
    //   .width(800)
    //   .height(800)
    for (const { name: { first, last } } of this.a) {
      div(`${first} ${last}`)
    }
    button()
      .onclick(() => {
        this.a.push({
          name: {
            first: "orange",
            last: "chen"
          }
        })
        this.a = [...this.a]
      })
  }
}

export default TestView
