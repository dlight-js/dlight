import { Navigator } from "./Navigator";
declare const _default: () => Required<{
    mode?: ((value: "history" | "hash" | undefined) => Required<{
        navigator?: ((value: Navigator | undefined) => Required<{}>) | undefined;
    }>) | undefined;
    navigator?: ((value: Navigator | undefined) => Required<{
        mode?: ((value: "history" | "hash" | undefined) => Required<{}>) | undefined;
    }>) | undefined;
}>;
export default _default;
