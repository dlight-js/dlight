import { DecoratorMaker, DecoratorTrimmer } from "../decorator";
import { DLBase } from "../DLBase";


export class EnvEl extends DLBase {
    envObject: any

    constructor(envObject: any, elFunc: () => any[], id: string) {
        super(id)
        this.envObject = envObject
        for (let [key, value] of Object.entries(this.envObject)) {
            (this as any)[key] = value
            Object.defineProperty(Object.getPrototypeOf(this), DecoratorMaker.state(key), {
                writable: true
            })
        }
        this._$init()
        this._$el = elFunc()
        this.setEnvObjs(this._$el!)
    }

    Body() {}

    setEnvObjs(el: any) {
        if (Array.isArray(el)) {
            for (let e of el) {
                this.setEnvObjs(e)
            }
            return
        }
        if (el._$specialEl) {
            this.setEnvObjs(el.els)
            return
        }
        if (el._$dlBase) {
            el._$envEls.push(this)
            // ---- 这里只能提前render了，好像没有什么问题
            this.setEnvObjs(el.render())
        }
    }

}

