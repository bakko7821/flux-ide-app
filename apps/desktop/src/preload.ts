import { contextBridge, ipcRenderer } from "electron";
import type { IpcInvokeMap } from "@flux/shared";

type InvokeKey = keyof IpcInvokeMap;

const api = {
  invoke: async <K extends InvokeKey>(
    channel: K,
    args: Parameters<IpcInvokeMap[K]>[0]
  ): Promise<ReturnType<IpcInvokeMap[K]>> => {
    return ipcRenderer.invoke(channel as string, args);
  }
};

contextBridge.exposeInMainWorld("flux", api);

export type FluxApi = typeof api;
