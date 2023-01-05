import {DecoratorMaker, DecoratorResolver} from "./decorator"
import {addDep, geneDeps, isFunc, runDeps, uid} from "./utils";

export abstract class DLBase {
    _$dlBase = true
    _$id: string
    _$els?: HTMLElement[]
    _$depIds: string[] = []  // 用来存和自己有关的depId
    _$deps: any = {}
    _$derived_deps: any = {}
    _$props: any = {}
    _$dotProps: any = {}
    _$envEls: DLBase[] = []

    abstract Body(): any

    constructor(id?: string) {
        this._$id = id ?? uid()
    }
    _$init() {
        const protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        for (let propertyKey of protoKeys) {
            DecoratorResolver.prop(propertyKey, this)
            DecoratorResolver.dotProp(propertyKey, this)
            DecoratorResolver.environment(propertyKey, this)
            DecoratorResolver.propDerived(propertyKey, this)
            DecoratorResolver.derivedFromProp(propertyKey, this)
            DecoratorResolver.state(propertyKey, this)
        }
        for (let propertyKey of protoKeys) {
            DecoratorResolver.derived(propertyKey, this, () =>
            DecoratorResolver.effect(propertyKey, this)
            )
        }
    }

    resolveEnv() {
        for (let superEnvEl of this._$envEls) {
            (superEnvEl as any).setEnvObjs(this._$els!)
        }
    }

    preset() {}

    render() {
        this.preset()
        if (this._$els !== undefined) return this._$els
        this._$init()
        this.Body()
        this.resolveEnv()

        return this._$els!
    }



    addCElDotProp(dl: DLBase, key: string, propFunc: () => any, listenDeps: string[]) {
        this._$dotProps[key] = propFunc()
        this.addCElPropTmp(dl, key, propFunc, listenDeps)
    }
    addCElProp(dl: DLBase, key: string, propFunc: () => any, listenDeps: string[]) {
        this._$props[key] = propFunc()
        this.addCElPropTmp(dl, key, propFunc, listenDeps)
    }
    addCElPropTmp(dl: DLBase, key: string, propFunc: () => any, listenDeps: string[]) {
        const propStr = propFunc.toString().slice(6).trim()
        for (let dep of listenDeps) {
            const id = `${this._$id}_${key}_${dep}`;
            this._$depIds.push(id)
            // ---- 如果是完整match且是state不是derived，比如 {flag: this.flag}
            //      则把子dl的flag参数当成state
            if (propStr === `this.${dep}` && Object.keys(dl._$deps).includes(propStr.replaceAll("this.", ""))) {
                Object.defineProperty(Object.getPrototypeOf(this), DecoratorMaker.state(key), {
                    writable: true
                })
                const depFunc = () => (dl as any)[dep] = (this as any)[key]
                this._$deps[key] = {[id]: [depFunc]}
                addDep(dl, dep, id, () => {
                    // ---- 先取消回掉自己的dep，等改完值了再加上，不然会无限回掉
                    delete this._$deps[key][id];
                    (this as any)[key] = propFunc()
                    this._$deps[key][id] = [depFunc]
                })
                return
            }
            Object.defineProperty(Object.getPrototypeOf(this), DecoratorMaker.derivedFromProp(key), {
                writable: true
            })
            this._$deps[key] = {}
            addDep(dl, dep, id, () => {
                (this as any)[key] = propFunc()
                runDeps(this, key)
            })
        }
    }

    // ---- lifecycles
    willMount() {}
    didMount() {}
    willUnmount() {}
    didUnmount() {}
    willRender() {}
}



export const View = DLBase
