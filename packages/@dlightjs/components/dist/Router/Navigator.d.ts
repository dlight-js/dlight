export declare class Navigator {
    mode: "history" | "hash";
    baseUrl: string;
    hashTo(url: string): void;
    historyTo(url: string): void;
    to(url: string): void;
}
