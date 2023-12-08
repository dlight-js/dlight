import { render } from "@dlightjs/dlight"
import App from "./App.view"
import Main from "./benchmark-keyed.view"

import * as babel from "@babel/standalone"
import dlight from "babel-preset-dlight"
import { TransitionTest } from "./transition.view"
render("main", TransitionTest)
