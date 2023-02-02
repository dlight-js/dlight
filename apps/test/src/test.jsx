import {View} from "@dlightjs/dlight"

export {}
// class JK extends View {
//     @Prop ok

//     didMount() {
//         console.log(this.ok)
//     }

//     Body = (
//         <div>
//             <button
//                 onclick={() => {
//                     this.ok ++
//                 }}
//             > go</button>
//             {this.ok}
//         </div>

//     )

// }


export class HH extends View {
    @State count = 0
    watchCount0 = function() {
        this.count = this.count + 1
        console.log("0")
    }.call(this)
    watchCount1 = function() {
        this.count = (this.count + 1) * 100
        console.log("1")
    }.call(this)
    watchCount2 = function() {
        this.count = 1
        console.log("2")
    }.call(this)
    watchCount3 = function() {
        this.count += 1
        console.log("3")
    }.call(this)
    watchCount4 = function() {
        const a = this.count
        console.log("4")
    }.call(this)

    Body = (
        <>
            <button onclick={() => this.count ++}>
                hh
            </button>
            {this.count}
        </>
    )
}
