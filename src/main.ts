import {State} from './decorator';
import { DLBase } from "./DLBase";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="root"/>
`
export {}

class TestElement extends DLBase {
  @State count: number = 1
  Body = `
    div('ok') {
      button("plus")
        .onclick(() => {
          console.log('我被点了')
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

let my = new TestElement()
document.getElementById('root')!.appendChild(my.render())


