import { render, renderToText } from "@dlightjs/dlight"
import TestView, { TestMarkit } from "./test.view"
import transformDlight from "@dlightjs/transpiler-standalone"

import { TodoApp } from "./TodoMVC"
import ReactiveView from "./basic/reactive.view"
import PropPassingView from "./basic/propPassing.view"
import ObserveElementView from "./advanced/observeElement.view"
import TransitionGroupView from "./advanced/transitionGroup.view"
import BenchmarkView from "./benchmark/benchmark-keyed.view"
import BenchmarkViewSubView from "./benchmark/benchmark-keyed-subview.view"
import ToDoApp from "./tutorial/ToDoApp"
import FetchDataView from "./basic/fetchData.view"
import DerivedValueView from "./basic/derivedValue.view"
import StyledView from "./advanced/styledView.view"
import transformDLight from "@dlightjs/transpiler-standalone"
// import { RouteTest } from "./components/Router.view"
// import JJ from "./aa.view"
const code = `
import { View } from "@dlightjs/dlight"
import { button, div, SubView } from "@dlightjs/types"

class TestView extends View {
  tabKey = 1
  b = function() {
    console.log(this.tabKey)
  }
  Body() {
    _(this.b)
  }
}
`

console.log(transformDLight(code))

// console.log(renderToText(BenchmarkView))
// render("app", BenchmarkView)
render("app", TestView)
