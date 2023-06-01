import { render } from "@dlightjs/dlight"
import ReactiveView from "./basic/reactive.view"
import PropPassingView from "./basic/propPassing.view"
import ObserveElementView from "./advanced/observeElement.view"
import BenchmarkView from "./benchmark/benchmark.view"
import ToDoApp from "./tutorial/ToDoApp"
import FetchDataView from "./basic/fetchData.view"
import DerivedValueView from "./basic/derivedValue.view"
import StyledView from "./advanced/styledView.view"

render("app", ReactiveView)
