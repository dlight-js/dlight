import {DecoratorResolver} from "./decorator"

export abstract class DLBase {
    _$deps: any = {}
    _$derived_deps: any = {}
    _$el?: HTMLElement

    abstract Body: any

    _$init() {
        const protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        for (let propertyKey of protoKeys) {
            DecoratorResolver.state(propertyKey, this)
                .catch(() => {})
        }
        for (let propertyKey of protoKeys) {
            DecoratorResolver.derived(propertyKey, this)
                .then(propertyKey => DecoratorResolver.effect(propertyKey, this))
                .catch(() => {})
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
}
