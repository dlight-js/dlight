import { View } from "@dlightjs/dlight";
import { type VAlignment } from "./types";
interface HStackProps {
    spacing?: number;
    alignment?: VAlignment;
    width?: string;
    height?: string;
}
export declare class HStack extends View implements HStackProps {
    spacing: number;
    alignment: VAlignment;
    width: string;
    height: string;
    margin: string;
    Body(): void;
}
declare const _default: () => Required<{
    spacing?: ((value: number | undefined) => Required<{
        alignment?: ((value: VAlignment | undefined) => Required<{
            width?: ((value: string | undefined) => Required<{
                height?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            height?: ((value: string | undefined) => Required<{
                width?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
        width?: ((value: string | undefined) => Required<{
            alignment?: ((value: VAlignment | undefined) => Required<{
                height?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            height?: ((value: string | undefined) => Required<{
                alignment?: ((value: VAlignment | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
        height?: ((value: string | undefined) => Required<{
            alignment?: ((value: VAlignment | undefined) => Required<{
                width?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            width?: ((value: string | undefined) => Required<{
                alignment?: ((value: VAlignment | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
    }>) | undefined;
    alignment?: ((value: VAlignment | undefined) => Required<{
        spacing?: ((value: number | undefined) => Required<{
            width?: ((value: string | undefined) => Required<{
                height?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            height?: ((value: string | undefined) => Required<{
                width?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
        width?: ((value: string | undefined) => Required<{
            spacing?: ((value: number | undefined) => Required<{
                height?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            height?: ((value: string | undefined) => Required<{
                spacing?: ((value: number | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
        height?: ((value: string | undefined) => Required<{
            spacing?: ((value: number | undefined) => Required<{
                width?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            width?: ((value: string | undefined) => Required<{
                spacing?: ((value: number | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
    }>) | undefined;
    width?: ((value: string | undefined) => Required<{
        spacing?: ((value: number | undefined) => Required<{
            alignment?: ((value: VAlignment | undefined) => Required<{
                height?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            height?: ((value: string | undefined) => Required<{
                alignment?: ((value: VAlignment | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
        alignment?: ((value: VAlignment | undefined) => Required<{
            spacing?: ((value: number | undefined) => Required<{
                height?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            height?: ((value: string | undefined) => Required<{
                spacing?: ((value: number | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
        height?: ((value: string | undefined) => Required<{
            spacing?: ((value: number | undefined) => Required<{
                alignment?: ((value: VAlignment | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            alignment?: ((value: VAlignment | undefined) => Required<{
                spacing?: ((value: number | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
    }>) | undefined;
    height?: ((value: string | undefined) => Required<{
        spacing?: ((value: number | undefined) => Required<{
            alignment?: ((value: VAlignment | undefined) => Required<{
                width?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            width?: ((value: string | undefined) => Required<{
                alignment?: ((value: VAlignment | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
        alignment?: ((value: VAlignment | undefined) => Required<{
            spacing?: ((value: number | undefined) => Required<{
                width?: ((value: string | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            width?: ((value: string | undefined) => Required<{
                spacing?: ((value: number | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
        width?: ((value: string | undefined) => Required<{
            spacing?: ((value: number | undefined) => Required<{
                alignment?: ((value: VAlignment | undefined) => Required<{}>) | undefined;
            }>) | undefined;
            alignment?: ((value: VAlignment | undefined) => Required<{
                spacing?: ((value: number | undefined) => Required<{}>) | undefined;
            }>) | undefined;
        }>) | undefined;
    }>) | undefined;
}>;
export default _default;
