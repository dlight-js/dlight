declare const _default: (_$content?: any) => {
    [x: string]: (value: any) => {
        [x: number]: (value: any) => {
            [x: symbol]: (value: any) => Required<{}>;
        };
        [x: symbol]: (value: any) => {
            [x: number]: (value: any) => Required<{}>;
        };
    };
};
export default _default;
