import {DecoratorResolver} from "./decorator"
import {uid} from "./utils";

export abstract class DLBase {
    _$dlBase = true
    _$id = uid()
    _$el?: HTMLElement[]
    _$depIds: string[] = []  // 用来存和自己有关的depId
    _$deps: any = {}
    _$derived_deps: any = {}
    _$props: any = {}
    _$dotProps: any = {}

    abstract Body(): any


    _$init() {
        const protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        for (let propertyKey of protoKeys) {
            DecoratorResolver.prop(propertyKey, this)
            DecoratorResolver.dotProp(propertyKey, this)
            DecoratorResolver.propDerived(propertyKey, this)
            DecoratorResolver.state(propertyKey, this)
            DecoratorResolver.derivedFromProp(propertyKey, this)
        }
        for (let propertyKey of protoKeys) {
            DecoratorResolver.derived(propertyKey, this, () =>
            DecoratorResolver.effect(propertyKey, this)
            )
        }
    }

    render() {
        if (this._$el !== undefined) return this._$el
        this._$init()
        this.Body()
        return this._$el!
    }

    // ---- lifecycles
    willMount() {}
    didMount() {}
    willUnmount() {}
    didUnmount() {}
}



export const View = DLBase
