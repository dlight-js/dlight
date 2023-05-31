import { render } from "@dlightjs/dlight"
import ReactiveView from "./basic/reactive.view"
import PropPassingView from "./basic/propPassing.view"
import ObserveElementView from "./advanced/observeElement.view"
import BenchmarkView from "./benchmark/benchmark.view"

render("app", BenchmarkView)
