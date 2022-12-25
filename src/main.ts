import {State} from './core/decorator';
import { DLBase } from "./core/DLBase";
import {view} from "./compiler";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="root"/>
`
export {}

class TestElement extends DLBase {
  @State count: number = 1
  Body = view`
    div('ok') {
      button("plus")
        .onclick(() => {
          console.log('我被加了')
          count += 2
        })
      button("minus")
        .onclick(() => {
          console.log('我被减了')
          count -= 2
        })
      div(count)
        .style(count > 10 ? 'color: red;' : 'color: blue;')
      div {
        span('what')
      }
    }
      .height('100')
  `
}

let newEl = new TestElement()
let body = newEl.render()
console.log(newEl.Body)

document.getElementById('root')!.appendChild(body)
