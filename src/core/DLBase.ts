import {DecoratorResolver} from "./decorator"
import {uid} from "./utils";

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
            DecoratorResolver.propDerived(propertyKey, this)
            DecoratorResolver.derivedFromProp(propertyKey, this)
            DecoratorResolver.state(propertyKey, this)
        }
        for (let propertyKey of protoKeys) {
            DecoratorResolver.environment(propertyKey, this, () =>
            DecoratorResolver.derived(propertyKey, this, () =>
            DecoratorResolver.effect(propertyKey, this)
            ))
        }
    }

    resolveEnv() {
        for (let superEnvEl of this._$envEls) {
            (superEnvEl as any).setEnvObjs(this._$els!)
        }
    }

    render() {
        if (this._$els !== undefined) return this._$els
        console.log(this._$envEls, this.constructor.name, this)
        this._$init()
        this.Body()
        this.resolveEnv()

        return this._$els!
    }


    // ---- lifecycles
    willMount() {}
    didMount() {}
    willUnmount() {}
    didUnmount() {}
    willRender() {}
}



export const View = DLBase
