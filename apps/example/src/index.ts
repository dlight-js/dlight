import { render } from "@dlightjs/dlight"
import TestView from "./test.view"
import ReactiveView from "./basic/reactive.view"
import PropPassingView from "./basic/propPassing.view"
import ObserveElementView from "./advanced/observeElement.view"
import TransitionGroupView from "./advanced/transitionGroup.view"
import BenchmarkView from "./benchmark/benchmark-keyed2.view"
import ToDoApp from "./tutorial/ToDoApp"
import FetchDataView from "./basic/fetchData.view"
import DerivedValueView from "./basic/derivedValue.view"
import StyledView from "./advanced/styledView.view"
import transformDLight from "@dlightjs/transpiler-standalone"

// const code = `
// import { View } from "@dlightjs/dlight"
// import { button, div, SubView } from "@dlightjs/types"

// class TestView extends View {
//   tabKey = 1
//   b = function() {
//     console.log(this.tabKey)
//   }
//   Body() {
//     _(this.b)
//   }
// }
// `

// console.log(transformDLight(code))

render("app", TestView)
