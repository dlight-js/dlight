import { View } from "@dlightjs/dlight";
import { Navigator } from "./Navigator";
export declare class RouterSpace extends View {
    mode: "hash" | "history";
    navigator?: Navigator;
    currUrl: string;
    baseUrl: string;
    prevPathCondition: string;
    prevRoutes: never[];
    showedRoute: any;
    historyChangeListen: () => void;
    hashChangeListen: () => void;
    didMount(): void;
    willUnmount(): void;
    AfterConstruct(): void;
    Preset(): void;
    Body(): void;
}
