import { View, div, p, span, Main, button } from '@dlightjs/dlight'

@Main
@View
export default class App {
  count = 0

  Body() {
    div().class()
    {
      div().class()
      {
        p()
        {
          span('D').class()
          span('Light').class()
        }
        p('DX-First UI').class()
        p('Rendering Library')
      }
      div().class()
      {
        p(this.count).class()
        div().class()
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