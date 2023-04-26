import { Types } from "./customTag"
import { area, div, img } from "./htmlTag"

const View = undefined as any

const _ = document.getElementById("j")

interface SubViewProps {
  /**
     * @ok fuck me
     */
  hh?: string
  haha: number
  fuck: string
}

const a: SubViewProps = null as any

class MyComp extends View implements SubViewProps {
  hh: string = "ss"
  haha = 1
  fuck = "k"
  @Prop a = 1
  @KK ta = 1

  Body() {
    div("jjj")
      ._KhtmlBoxAlign()
      .className()
      .id()
      .className()

    img()
      .src()
      .alt

    area()
      .coords()
  }
}

const SubViewView = Types<SubViewProps>(MyComp)

const d = SubViewView()
  .fuck("ss")
  .haha(1)

class FuckView extends View {
  Body() {
    div("jjj")
      ._display("s")
      .className("h")
      ._counterSet()

    // ._display("initial")
    // .didAppear(() => {})

    SubViewView()
        .fuck("hh")
  }
}
