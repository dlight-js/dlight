import {DLBase} from "./DLBase";
import {addDeps, geneDeps, isKeyDep, runDeps} from "./utils";

export class DecoratorMaker {
    static make(rawKey: string, decoratorTag: string) {
        return `_$${rawKey}_${decoratorTag}`
    }
    static state(rawKey: string) {
        return this.make(rawKey, "state")
    }
    static derived(rawKey: string) {
        return this.make(rawKey, "derived")
    }
    static effect(rawKey: string) {
        return this.make(rawKey, "effect")
    }
    static prop(rawKey: string) {
        return this.make(rawKey, "prop")
    }
    static dotProp(rawKey: string) {
        return this.make(rawKey, "dotProp")
    }
    static derivedFromProp(rawKey: string) {
        return this.make(rawKey, "derivedFromProp")
    }
    static propDerived(rawKey: string) {
        return this.make(rawKey, "propDerived")
    }
}

export class DecoratorTrimmer {
    static trim(rawKey: string, decoratorTag: string) {
        return rawKey.slice(2, rawKey.length - decoratorTag.length - 1)
    }
    static state(rawKey: string) {
        return this.trim(rawKey, "state")
    }
    static derived(rawKey: string) {
        return this.trim(rawKey, "derived")
    }
    static effect(rawKey: string) {
        return this.trim(rawKey, "effect")
    }
    static prop(rawKey: string) {
        return this.trim(rawKey, "prop")
    }
    static dotProp(rawKey: string) {
        return this.trim(rawKey, "dotProp")
    }
    static derivedFromProp(rawKey: string) {
        return this.trim(rawKey, "derivedFromProp")
    }
    static propDerived(rawKey: string) {
        return this.trim(rawKey, "propDerived")
    }
}

export class DecoratorVerifier {
    static verify(propertyKey: string, decoratorTag: string) {
        return new RegExp(`^_\\$.+?${decoratorTag}$`).test(propertyKey)
    }
}


export class DecoratorResolver {
    static rosolve(propertyKey: string, decoratorTag: string, func: () => any, callBack?: () => any) {
        if (DecoratorVerifier.verify(propertyKey, decoratorTag)) {
            func()
        } else {
            !!callBack && callBack()
        }
    }

    static state(propertyKey: string, dl: DLBase, callBack?: () => any) {
        return this.rosolve(propertyKey, "state", () => {
            const rawKey = DecoratorTrimmer.state(propertyKey);
            (dl as any)[propertyKey] = (dl as any)[rawKey];

            Object.defineProperty(dl, rawKey, {
                get() {
                    return this[propertyKey]
                },
                set(value: any) {
                    this[propertyKey] = value
                    runDeps(this, rawKey)
                }
            })

            if (dl._$deps[rawKey] === undefined) dl._$deps[rawKey] = {}
        }, callBack)
    }

    static derivedFromProp(propertyKey: string, dl: DLBase, callBack?: () => any) {
        return this.rosolve(propertyKey, "derivedFromProp", () => {
            const rawKey = DecoratorTrimmer.derivedFromProp(propertyKey);
            if (dl._$deps[rawKey] === undefined) dl._$deps[rawKey] = {}
        }, callBack)
    }

    static derived(propertyKey: string, dl: DLBase, callBack?: () => any) {
        return this.rosolve(propertyKey, "derived", () => {
            const rawKey = DecoratorTrimmer.derived(propertyKey);
            const prop = (dl as any)[rawKey]
            const propStr = prop.toString()
            const derivedDeps = []
            for (let depKey of Object.keys(dl._$deps)) {
                if (isKeyDep(depKey, propStr)) {
                    derivedDeps.push(depKey)
                }
            }
            for (let derivedDepKey of Object.keys(dl._$derived_deps)) {
                if (isKeyDep(derivedDepKey, propStr)) {
                    derivedDeps.push(...dl._$derived_deps[derivedDepKey])
                }
            }

            dl._$derived_deps[rawKey] = derivedDeps;
            (dl as any)[propertyKey] = prop
            Object.defineProperty(dl, rawKey, {
                get() {
                    return this[propertyKey]()
                },
                set(value: any) {
                    // ---- 赋值删依赖
                    this[propertyKey] = () => value
                    delete this._$derived_deps[rawKey]
                }
            })
        }, callBack)
    }

    static effect(propertyKey: string, dl: DLBase, callBack?: () => any) {
        return this.rosolve(propertyKey, "effect", () => {
            const rawKey = DecoratorTrimmer.effect(propertyKey);
            const effectFunc = (dl as any)[rawKey]
            const effectFuncStr = effectFunc.toString()
            const listenDeps = geneDeps(dl, effectFuncStr)
            addDeps(dl, listenDeps, dl._$id, () => effectFunc())
        }, callBack)
    }

    static prop(propertyKey: string, dl: DLBase, callBack?: () => any) {
        return this.rosolve(propertyKey, "prop", () => {
            const rawKey = DecoratorTrimmer.prop(propertyKey);
            if (dl._$props[rawKey] === undefined) {
                dl._$props[rawKey] = (dl as any)[rawKey]
            }
            Object.defineProperty(dl, rawKey, {
                get() {
                    return this._$props[rawKey]
                },
                set(value: any) {
                    this._$props[rawKey] = value
                }
            })
        }, callBack)
    }
    static dotProp(propertyKey: string, dl: DLBase, callBack?: () => any) {
        return this.rosolve(propertyKey, "dotProp", () => {
            const rawKey = DecoratorTrimmer.dotProp(propertyKey);
            if (dl._$dotProps[rawKey] === undefined) {
                dl._$dotProps[rawKey] = (dl as any)[rawKey]
            }
            Object.defineProperty(dl, rawKey, {
                get() {
                    return this._$dotProps[rawKey]
                },
                set(value: any) {
                    this._$dotProps[rawKey] = value
                }
            })
        }, callBack)
    }

    static propDerived(propertyKey: string, dl: DLBase, callBack?: () => any) {
        return this.rosolve(propertyKey, "propDerived", () => {
            const rawKey = DecoratorTrimmer.propDerived(propertyKey);
            (dl as any)[rawKey] = (dl as any)[rawKey]()
        }, callBack)
    }
}

export const State = (target: any, rawKey: string) => {
    Object.defineProperty(target, DecoratorMaker.state(rawKey), {
        writable: true
    })
}

export const Derived = (target: any, rawKey: string) => {
    Object.defineProperty(target, DecoratorMaker.derived(rawKey), {
        writable: true
    })
}

export const Effect = (target: any, rawKey: string) => {
    Object.defineProperty(target, DecoratorMaker.effect(rawKey), {})
}

export const Prop = (target: any, rawKey: string) => {
    Object.defineProperty(target, DecoratorMaker.prop(rawKey), {})
}

export const DotProp = (target: any, rawKey: string) => {
    Object.defineProperty(target, DecoratorMaker.dotProp(rawKey), {})
}

export const PropDerived = (target: any, rawKey: string) => {
    Object.defineProperty(target, DecoratorMaker.propDerived(rawKey), {})
}