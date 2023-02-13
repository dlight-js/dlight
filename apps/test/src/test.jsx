import {View} from "@dlightjs/dlight"

class NN extends View {
    @Prop count
    Body = (
        <>
            <div>NNNN</div>
            <a>{this.count}</a>

        </>
    )
}

export class HH extends View {
    @State count = 1
    a = this.count + 1
    arr = ["apple","pear","watermelon"]
    handleClick = (i)=>{
        console.log(i)
    }
    Body = (
        <>
            <NN count={this.a} />
            <if cond={this.count}>
                <div>hhhh</div>
            </if>
            <ul>
            <for let={i} of={this.arr}>
                <li onclick={()=>this.handleClick(i)}>{i}</li>
            </for>
            </ul>
        </>
    )
}
