// @ts-ignore
import {TestElement} from "./el1.tsd";
// @ts-ignore
import {Benchmark} from "./benchmark.tsd";
// @ts-ignore
import {TestElement2} from "./el2.tsd";
import {render} from "./core/utils";


export {}
// render("root", new Benchmark())
// render("root", new TestElement2())
render("#app", new TestElement())


