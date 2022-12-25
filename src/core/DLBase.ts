import {DecoratorTrimmer, DecoratorVerifier} from "./decorator"
import {$createEl, $listen, $addProp} from "./func"

// @ts-ignore
const _ = [$createEl, $listen, $addProp]

export abstract class DLBase {
    _$deps: any = {}
    _$el?: HTMLElement
    _$DLBase = true

    abstract Body: any

    _$init() {
        for (let propertyKey of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            if (DecoratorVerifier.state(propertyKey)) {
                this._$deps[DecoratorTrimmer.state(propertyKey)] = []
            }
        }
    }

    render() {
        this._$init()
        eval(this.Body)

        return this._$el!
    }
}
