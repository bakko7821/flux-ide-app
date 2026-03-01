import type { FluxApi } from "../../../desktop/src/preload";

export {};

declare global {
  interface Window {
    flux: FluxApi;
    theme: {
      getSystem: () => Promise<"dark" | "light">;
      setSource?: (
        source: "system" | "light" | "dark",
      ) => Promise<"dark" | "light">;
      onSystemChanged: (cb: (t: "dark" | "light") => void) => () => void;
    };
  }
}
