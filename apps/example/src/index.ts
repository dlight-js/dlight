import { render } from "@dlightjs/dlight"
import TestView from "./test.view"
import ReactiveView from "./basic/reactive.view"
import PropPassingView from "./basic/propPassing.view"
import ObserveElementView from "./advanced/observeElement.view"
import TransitionGroupView from "./advanced/transitionGroup.view"
import BenchmarkView from "./benchmark/benchmark.view"
import ToDoApp from "./tutorial/ToDoApp"
import FetchDataView from "./basic/fetchData.view"
import DerivedValueView from "./basic/derivedValue.view"
import StyledView from "./advanced/styledView.view"
import transformDLight from "@dlightjs/transpiler-standalone"

const code = `
import { View } from "@dlightjs/dlight"
import { button, div, SubView } from "@dlightjs/types"

function getData() {
  return {
    id: Math.random()
  }
}

class TestView extends View {
  Body() {
    _("d")
  }
}
`

console.log(transformDLight(code))

render("app", TransitionGroupView)
