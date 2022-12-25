export class DecoratorMaker {
    static make(rawKey: string, decoratorTag: string) {
        return `_$${rawKey}_${decoratorTag}`
    }
    static state(rawKey: string) {
        return this.make(rawKey, "state")
    }
}

export class DecoratorTrimmer {
    static trim(rawKey: string, decoratorTag: string) {
        return rawKey.slice(2, rawKey.length - decoratorTag.length - 1)
    }
    static state(rawKey: string) {
        return this.trim(rawKey, "state")
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

//
// export class DecoratorResolver {
//     static rosolve(propertyKey: string, decoratorTag: string, func: () => any) {
//         return new Promise((resolve, reject) => {
//             if (DecoratorVerifier.verify(propertyKey, decoratorTag)) {
//                 func()
//                 reject()
//             } else {
//                 resolve(propertyKey)
//             }
//           })
//     }
//
//     static state(propertyKey: string, dl: DLBase) {
//         return this.rosolve(propertyKey, "state", () => {
//             const rawKey = DecoratorTrimmer.state(propertyKey);
//             (dl as any)[propertyKey] = {
//                 value: (dl as any)[rawKey],
//                 setValue: (value: any) => {
//                     (dl as any)[propertyKey].value = value
//                     for (let dep of dl._$deps['okk'] ?? []) {
//                         dep()
//                     }
//                 }
//             }
//         })
//     }
// }

export const State = (target: any, rawKey: string) => {
    Object.defineProperty(target, DecoratorMaker.state(rawKey), {
        get() {
            return this[rawKey]
        },
        set(value: any) {
            this[rawKey] = value
            for (let dep of this._$deps[rawKey] ?? []) {
                dep()
            }
        }
    })
}

