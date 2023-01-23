import {View} from "./core"

export {}
class JK extends View {
    @PropState ok

    Body = (
        <div>
            <button
                onclick={() => {
                    this.ok ++
                }}
            > go</button>
            {this.ok}
        </div>

    )

}


export class HH extends View {
    a = "11"
    @State count = 0
    @State apple = [1,2,3]
    clickme = () => {
        this.count ++
        this.add()
    }
    add = () => {
        this.apple = [...this.apple, this.apple.length]
    }

    Body = (
        <>
            <div _color="red">
                <For expression="let t of this.apple">
                    <div>jj-1</div>
                </For>
                <div>{this.count}</div>
                <button onclick={this.clickme}> 试试 </button>
            </div>
            <div>
                {!console.log("fuck") && <div>very good</div>}
            </div>
            <If condition={this.count>1}>
                你对了
            </If>
            <ElseIf condition={this.count>-1}>
                斤斤计较斤斤计较突然r r r r
            </ElseIf>
            <JK ok={this.count} />
        </>
    )
}
