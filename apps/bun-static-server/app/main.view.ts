import { View, div, p, span, Main, button } from '@dlightjs/dlight'

@Main
@View
export default class App {
  count = 0

  Body() {
    div()
    {
      div()
      {
        p()
        {
          span('D')
          span('Light')
        }
        p('DX-First UI')
        p('Rendering Library')
      }
      div()
      {
        p(this.count)
        div()
        {
          button('count ++').onClick(() => {
            this.count++
          })
          button('count --').onClick(() => {
            this.count--
          })
        }
      }
    }
  }
}