import { DecoratorMaker } from "../decorator";
import { DLBase } from "../DLBase";
import { deleteDepsPrefix } from "../utils";


export class EnvEl extends DLBase {
    _$envEl = true
    envObject: any = {}
    constructor(elFunc: () => any[], id: string) {
        super(id)
        this._$els = elFunc()
    }
    addPair(dl: DLBase, key: string, propFunc: () => any, listenDeps: string[]) {
        this.envObject[key] = propFunc()
        this.addCElPropTmp(dl, key, propFunc, listenDeps)
    }

    preset() {
        for (let [key, value] of Object.entries(this.envObject)) {
            (this as any)[key] = value
            Object.defineProperty(Object.getPrototypeOf(this), DecoratorMaker.state(key), {
                writable: true
            })
        }
        this._$init()
        this.cleanDeps()
        this.setEnvObjs(this._$els!)
    }
    
    cleanDeps() {
        // ---- 如果多层EnvEl嵌套，由于protoType相同，所以会出现空的冗余的需要删除
        for (let depKey in this._$deps) {
            const value = this.envObject[depKey]
            if ((value === undefined) || (value === null)) {
                delete this._$deps[depKey]
            }
        }
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
            this.setEnvObjs(el._$els)
            el._$envEls.push(this)
            return
        }
        if (el._$envEl) {
            this.setEnvObjs(el._$els)
            return
        }
        if (el._$htmlEl) {
            this.setEnvObjs(el._$els)
            return 
        }

        el._$envEls.push(this)
        // ---- 必须把原先的依赖删掉
        const didUnmount = el.didUnmount
        el.didUnmount = () => {
            didUnmount()
            deleteDepsPrefix(this, `${this._$id}_${el._$id}`)
        }
    }

}

