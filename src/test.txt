import {DLBase} from "./DLBase";
import {State} from "./decorator";
import {view} from "./parser";

export class TestDuanYiHanDie extends DLBase {
    @State count: number = 1
    Body = view`
    div('ok') {
      button("plus")
        .onclick(() => {
          console.log('我被点了')
          count += 2
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

class TestElement extends DLBase {
    @State count: number = 1
    Body = view`
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

export default TestElement
