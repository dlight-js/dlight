import { View } from "@dlightjs/dlight"
import { type Typed, div } from "@dlightjs/types"

class Test extends View {
  @Prop aa
  Body() {
    div(this.aa ?? "fuck")
  }
}

export default Test as any as Typed<Test>
