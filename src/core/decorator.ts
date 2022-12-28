import {DLBase} from "./DLBase";
import {propRegStr} from "./func";

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
}

export class DecoratorVerifier {
    static verify(propertyKey: string, decoratorTag: string) {
        // TODO will startWith faster?
        return new RegExp(`^_\\$.+?${decoratorTag}$`).test(propertyKey)
    }
    static state(propertyKey: string) {
        return this.verify(propertyKey, "state")
    }
}


export class DecoratorResolver {
    static rosolve(propertyKey: string, decoratorTag: string, func: () => any): Promise<string> {
        return new Promise((resolve, reject) => {
            if (DecoratorVerifier.verify(propertyKey, decoratorTag)) {
                func()
                reject()
            } else {
                resolve(propertyKey)
            }
          })
    }

    static state(propertyKey: string, dl: DLBase) {
        return this.rosolve(propertyKey, "state", () => {
            const rawKey = DecoratorTrimmer.state(propertyKey);
            (dl as any)[propertyKey] = (dl as any)[rawKey];

            Object.defineProperty(dl, rawKey, {
                get() {
                    return this[propertyKey]
                },
                set(value: any) {
                    this[propertyKey] = value
                    for (let dep of this._$deps[rawKey] ?? []) {
                        dep.call(dl)
                    }
                }
            })

            dl._$deps[rawKey] = []
        })
    }

    static derived(propertyKey: string, dl: DLBase) {
        return this.rosolve(propertyKey, "derived", () => {
            const rawKey = DecoratorTrimmer.derived(propertyKey);
            const prop = (dl as any)[rawKey]
            const propStr = prop.toString()
            const derivedDeps = []
            for (let depKey of Object.keys(dl._$deps)) {
                if (new RegExp(propRegStr(depKey)).test(propStr)) {
                    derivedDeps.push(depKey)
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
                }
            })
        })
    }

    static effect(propertyKey: string, dl: DLBase) {
        return this.rosolve(propertyKey, "effect", () => {
            const rawKey = DecoratorTrimmer.effect(propertyKey);
            const effectFunc = (dl as any)[rawKey]
            const effectFuncStr = effectFunc.toString()
            for (let depKey in dl._$deps) {
                if (new RegExp(propRegStr(depKey)).test(effectFuncStr)) {
                    dl._$deps[depKey].push(effectFunc)
                }
            }

            for (let derivedDepKey in dl._$derived_deps) {
                if (new RegExp(propRegStr(derivedDepKey)).test(effectFuncStr)) {
                    for (let depKey of dl._$derived_deps[derivedDepKey]) {
                        dl._$deps[depKey].push(effectFunc)
                    }
                }
            }
        })
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
    Object.defineProperty(target, DecoratorMaker.effect(rawKey), {
        writable: true
    })
}
