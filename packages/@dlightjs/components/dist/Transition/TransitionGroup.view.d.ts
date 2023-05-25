type TransitionPropSub<T> = T | ((el: HTMLElement) => T);
type Timing = "appear" | "firstAppear" | "move" | "disappear" | "lastDisappear";
type TransitionProp<T> = TransitionPropSub<T> | ({
    [key in Timing]: TransitionPropSub<T>;
});
declare const _default: () => Required<{
    duration?: ((value: TransitionProp<number> | undefined) => Required<{
        easing?: ((value: TransitionProp<string> | undefined) => Required<{
            delay?: ((value: TransitionProp<number> | undefined) => Required<{}>) | undefined;
        }>) | undefined;
        delay?: ((value: TransitionProp<number> | undefined) => Required<{
            easing?: ((value: TransitionProp<string> | undefined) => Required<{}>) | undefined;
        }>) | undefined;
    }>) | undefined;
    easing?: ((value: TransitionProp<string> | undefined) => Required<{
        duration?: ((value: TransitionProp<number> | undefined) => Required<{
            delay?: ((value: TransitionProp<number> | undefined) => Required<{}>) | undefined;
        }>) | undefined;
        delay?: ((value: TransitionProp<number> | undefined) => Required<{
            duration?: ((value: TransitionProp<number> | undefined) => Required<{}>) | undefined;
        }>) | undefined;
    }>) | undefined;
    delay?: ((value: TransitionProp<number> | undefined) => Required<{
        duration?: ((value: TransitionProp<number> | undefined) => Required<{
            easing?: ((value: TransitionProp<string> | undefined) => Required<{}>) | undefined;
        }>) | undefined;
        easing?: ((value: TransitionProp<string> | undefined) => Required<{
            duration?: ((value: TransitionProp<number> | undefined) => Required<{}>) | undefined;
        }>) | undefined;
    }>) | undefined;
}>;
export default _default;
