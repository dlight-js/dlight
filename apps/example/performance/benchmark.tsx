// import {View} from "@/dlight";

// let idCounter = 1;

// const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"],
//     colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"],
//     nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];

// function _random (max) { return Math.round(Math.random() * 1000) % max; };

// function buildData(count) {
//     let data = new Array(count);
//     for (let i = 0; i < count; i++) {
//         data[i] = {
//             id: idCounter++,
//             label: `${adjectives[_random(adjectives.length)]} ${colours[_random(colours.length)]} ${nouns[_random(nouns.length)]}`
//         }
//     }
//     return data;
// }


// class Row extends View {
//     @Prop id: string
//     @Prop label: string
//     @Prop className: string
//     @Prop selectRow: any
//     @Prop deleteRow: any

//     Body = (
//         <tr className={this.className}>
//             <td className="col-md-1">{this.id}</td>
//             <td
//                 className="col-md-2"
//                 onclick={() => this.selectRow(this.id)}
//             >{this.label}</td>
//             <td
//                 className="col-md-3"
//                 onclick={() => this.deleteRow(this.id)}
//             ></td>
//             <td className="col-md-4"></td>
//         </tr>
//     )
// }

// export class Benchmark extends View {
//     @State rows = []
//     @State selectIdx = -1
//     addRows = () => {
//         this.rows = buildData(1000)
//     }
//     swapRows = () => {
//         if (this.rows.length > 999) {
//             this.rows = [this.rows[0], this.rows[998], ...this.rows.slice(2, 998), this.rows[1], this.rows[999]]
//         }
//     }
//     clearRows = () => {
//         this.rows = []
//     }
//     selectRow = id => {
//         this.selectIdx = id
//     }
//     deleteRow = id => {
//         const idx = this.rows.findIndex(row => row.id === id);
//         this.rows = [...this.rows.slice(0, idx), ...this.rows.slice(idx + 1)]
//     }
//     addBig = () => {
//         this.rows = buildData(10000)
//     }
//     append = () => {
//         this.rows = [...this.rows, ...buildData(1000)]
//     }
//     update = () => {
//         for (let i=0;i<this.rows.length;i+=10) {
//             this.rows[i].label += "!!! "
//         }
//         this.rows = [...this.rows]
//     }

//     Body = (
//         <>
//             <h1>DLightJS-"keyed"</h1>
//             <div>
//                 <button onclick={this.addRows}>
//                     Create 1,000 rows
//                 </button>
//             </div>
//             <div>
//                 <button onclick={this.addBig}>
//                     Create 10,000 rows
//                 </button>
//             </div>
//             <div>
//                 <button onclick={this.append}>
//                     Append 1,000 rows
//                 </button>
//             </div>
//             <div>
//                 <button onclick={this.update}>
//                     Update every 10th rows
//                 </button>
//             </div>
//             <div>
//                 <button onclick={this.clearRows}>
//                     Clear
//                 </button>
//             </div>
//             <div>
//                 <button onclick={this.swapRows}>
//                     Swap Rows
//                 </button>
//             </div>
//             <table>
//                 <For expression="let { id, label } of this.rows">
//                     <Row
//                         id={id}
//                         label={label}
//                         deleteRow={this.deleteRow}
//                         selectRow={this.selectRow}
//                         className={this.selectIdx === id ? "danger" : ""}
//                     />
//                 </For>
//             </table>
//         </>
//     )
// }


export {}