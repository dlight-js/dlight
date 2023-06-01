import { View } from "@dlightjs/dlight"
import { type Typed, button, div, h1, State, Prop } from "@dlightjs/types"

class App extends View {
    @Prop defaultCount: Prop<number> = 0
    @State count = this.defaultCount
    derivedCount = this.count + 1

    Body() {
        div()
        {
            h1("DLight.js")
            div(this.count)
            div(this.derivedCount)
        }
        button("+")
            .onclick(() => {
                this.count ++
            })
        button("-")
            .onclick(() => {
                this.count --
            })
    }
}

export default App as any as Typed<App>
