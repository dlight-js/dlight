import {View} from "@dlightjs/dlight";

export class Test extends View {
    @State count = 0  // use @State to make the class member "count" reactive
    countPlus1 = this.count + 1
    Body() {
        <>
            <h1>hello, dlight js, jsx</h1>
        </>
    }
}
