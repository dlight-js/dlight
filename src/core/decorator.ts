import {DLBase} from "./DLBase";
import { EnvEl } from "./Els";
import {addDep, addDeps, geneDeps, isKeyDep, runDeps} from "./utils";

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
    static environment(rawKey: string) {
        return this.make(rawKey, "environment")
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
    static environment(rawKey: string) {
        return this.trim(rawKey, "environment")
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
                    if (this[propertyKey] === value) return
                    this[propertyKey] = value
                    runDeps(dl, rawKey)
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
            const derivedDeps = [...(dl as any)[propertyKey], ...geneDeps(prop.toString())]


            dl._$derived_deps[rawKey] = derivedDeps;
            // ---- 重新定义，因为本来里面存了@Derived(deps)的deps
            Object.defineProperty(Object.getPrototypeOf(dl), propertyKey, {
                writable: true
            });
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
            const listenDeps = [...(dl as any)[propertyKey], ...geneDeps(effectFuncStr)]
            addDeps(dl, listenDeps, dl._$id, () => effectFunc.call(dl))
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

    static environment(propertyKey: string, dl: DLBase, callBack?: () => any) {
        return this.rosolve(propertyKey, "environment", () => {
            const rawKey = DecoratorTrimmer.environment(propertyKey);
            let envEl: EnvEl | undefined = undefined
            for (let env of dl._$envEls) {
                if (Object.keys(env._$deps).includes(rawKey)) {
                    envEl = env as EnvEl
                    break
                }
            }
            if (!envEl) return

            (dl as any)[propertyKey] = (envEl as any)[rawKey]
            Object.defineProperty(dl, rawKey, {
                get() {
                    return this[propertyKey]
                },
                set(value: any) {
                    if (this[propertyKey] === value) return
                    this[propertyKey] = value
                    runDeps(dl, rawKey)
                }
            })
            const id = `${envEl._$id}_${dl._$id}_${rawKey}`
            dl._$depIds.push(id)
            const depFunc = () => (envEl as any)[rawKey] = (dl as any)[rawKey]
            dl._$deps[rawKey] = {[id]: [depFunc]}
            addDep(envEl, rawKey, id, () => {
                // ---- 先取消回掉自己的dep，等改完值了再加上，不然会无限回调
                delete dl._$deps[rawKey][id];
                (dl as any)[rawKey] = (envEl as any)[rawKey]
                dl._$deps[rawKey][id] = [depFunc]
            })
        }, callBack)
    }
}

export const State = (target: any, rawKey: string) => {
    Object.defineProperty(target, DecoratorMaker.state(rawKey), {
        writable: true
    })
}

export const Derived = (...props: any[]) => {
    if (props.length === 3) {
        // prop是三个，代表是decorator
        const [target, rawKey] = props
        Object.defineProperty(target, DecoratorMaker.derived(rawKey), {
            get: () => [],
            configurable: true
        })
        return
    }
    // prop只有一个，代表是传入的监听变量，需要返回decorator
    return (target: any, rawKey: string) => {
        Object.defineProperty(target, DecoratorMaker.derived(rawKey), {
            get: () => props[0],
            configurable: true
        })
    }
}


export const Effect = (...props: any[]) => {
    if (props.length === 3) {
        // prop是三个，代表是decorator
        const [target, rawKey] = props
        Object.defineProperty(target, DecoratorMaker.effect(rawKey), {
            get: () => []
        })
        return
    }
    // prop只有一个，代表是传入的监听变量，需要返回decorator
    return (target: any, rawKey: string) => {
        Object.defineProperty(target, DecoratorMaker.effect(rawKey), {
            get: () => props[0]
        })
    }
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

export const Environment = (target: any, rawKey: string) => {
    Object.defineProperty(target, DecoratorMaker.environment(rawKey), {
        writable: true
    })
}