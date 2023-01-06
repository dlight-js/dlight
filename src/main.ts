// @ts-ignore
import {ToDoApp} from "./example/ToDoApp/index.tsd";
// @ts-ignore
import {Benchmark} from "./example/benchmark.tsd";
// @ts-ignore
import {TestElement} from "./example/el1.tsd";
import {NewElement} from "./example/newElement.tsd";
import {render} from "./core/utils";


export {}

render("#app", new NewElement())
// render("#app", new TestElement())
// render("#app", new ToDoApp())
