import {render} from "@dlightjs/dlight";
// import {StackTest} from "./components/stack.tsd";
// @ts-ignore
import {ToDoApp} from "./ToDoApp/index.tsd";
// import {Benchmark} from "./performance/Benchmark.tsd";

render("app", new ToDoApp())