import {DLBase} from "./DLBase";
import {State} from "./decorator";

export class AnotherEl extends DLBase {
    Body = `
        div('fuck me')
          .style('background-color: red;')
    `
}