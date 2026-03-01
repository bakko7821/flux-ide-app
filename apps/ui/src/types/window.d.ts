import type { FluxApi } from "../../../desktop/src/preload";

declare global {
  interface Window {
    flux: FluxApi;
  }
}

export {};
