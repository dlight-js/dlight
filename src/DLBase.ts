import {DecoratorResolver, DecoratorTrimmer, DecoratorVerifier} from "./decorator"
import {handleBodyStr} from "./parser";
import {$createEl, $listen} from "./func";

export abstract class DLBase {
    _$deps: any = {}
    _$el?: HTMLElement
    abstract Body: any

    init() {
        for (let propertyKey of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            if (DecoratorVerifier.state(propertyKey)) {
                this._$deps[DecoratorTrimmer.state(propertyKey)] = []
            }
        }
    }

    render() {
        this.init()
        // new Function(this.Body).call(this, {$createEl, $listen})
        new Function(handleBodyStr(this.Body, this)).call(this, {$createEl, $listen})
        // console.log(new Function(this.Body))
        return this._$el!
    }
}
