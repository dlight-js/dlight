import { View } from "@dlightjs/dlight"

export default class App extends View {
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
