import { View } from "@dlightjs/dlight"
import Types, { button, div, h1, State, Prop } from "@dlightjs/types"

interface AppProps {
    defaultCount?: number
}

class App extends View implements AppProps {
    @Prop defaultCount = 0
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

export default Types<AppProps>(App)
